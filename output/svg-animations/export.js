/**
 * SVG Animation Exporter
 *
 * Captures frames from an animated SVG using Playwright and encodes them
 * into video or GIF using ffmpeg.
 *
 * Usage:
 *   node export.js <input.svg> <output.mp4|gif|webm|mov> [options]
 *
 * Options:
 *   --fps <number>        Frame rate (default: 30)
 *   --width <number>      Output width in pixels (default: 1920)
 *   --height <number>     Output height in pixels (default: 1080)
 *   --transparent         Preserve alpha channel (WebM/MOV only)
 *   --duration <seconds>  Animation duration (auto-detected if omitted)
 *
 * Examples:
 *   node export.js logo.svg logo.mp4
 *   node export.js banner.svg banner.gif --fps 15 --width 800 --height 600
 *   node export.js overlay.svg overlay.webm --transparent
 *   node export.js intro.svg intro.mov --transparent --duration 8
 *
 * Requirements:
 *   - Node.js 18+
 *   - Playwright (npm install playwright)
 *   - ffmpeg accessible on PATH
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync, execFileSync } = require('child_process');
const os = require('os');

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = {
    input: null,
    output: null,
    fps: 30,
    width: 1920,
    height: 1080,
    transparent: false,
    duration: null, // auto-detect
  };

  const positional = [];

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--fps':
        opts.fps = parseInt(args[++i], 10);
        break;
      case '--width':
        opts.width = parseInt(args[++i], 10);
        break;
      case '--height':
        opts.height = parseInt(args[++i], 10);
        break;
      case '--transparent':
        opts.transparent = true;
        break;
      case '--duration':
        opts.duration = parseFloat(args[++i]);
        break;
      case '--help':
      case '-h':
        printUsage();
        process.exit(0);
        break;
      default:
        positional.push(args[i]);
    }
  }

  if (positional.length < 2) {
    printUsage();
    process.exit(1);
  }

  opts.input = path.resolve(positional[0]);
  opts.output = path.resolve(positional[1]);

  return opts;
}

function printUsage() {
  console.log(`
Usage: node export.js <input.svg> <output.mp4|gif|webm|mov> [options]

Options:
  --fps <number>        Frame rate (default: 30)
  --width <number>      Output width (default: 1920)
  --height <number>     Output height (default: 1080)
  --transparent         Preserve alpha channel (WebM/MOV only)
  --duration <seconds>  Animation duration (auto-detected if omitted)
  --help, -h            Show this help message
`);
}

// ---------------------------------------------------------------------------
// Preflight checks
// ---------------------------------------------------------------------------

function checkFfmpeg() {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'pipe' });
  } catch {
    console.error('Error: ffmpeg is not installed or not found on PATH.');
    console.error('Install it with: brew install ffmpeg (macOS) or apt install ffmpeg (Linux)');
    process.exit(1);
  }
}

function checkInput(inputPath) {
  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file not found: ${inputPath}`);
    process.exit(1);
  }
  if (!inputPath.toLowerCase().endsWith('.svg')) {
    console.error('Error: Input file must be an SVG file.');
    process.exit(1);
  }
}

function validateOutputFormat(outputPath) {
  const ext = path.extname(outputPath).toLowerCase();
  const supported = ['.mp4', '.gif', '.webm', '.mov'];
  if (!supported.includes(ext)) {
    console.error(`Error: Unsupported output format "${ext}". Supported: ${supported.join(', ')}`);
    process.exit(1);
  }
  return ext;
}

// ---------------------------------------------------------------------------
// Duration auto-detection
// ---------------------------------------------------------------------------

async function detectDuration(page) {
  return await page.evaluate(() => {
    const svg = document.querySelector('svg');
    if (!svg) return 5;

    let maxEnd = 0;

    // Check SMIL animation elements
    const smilTags = ['animate', 'animateTransform', 'animateMotion', 'set'];
    for (const tag of smilTags) {
      const elements = svg.querySelectorAll(tag);
      for (const el of elements) {
        const begin = parseFloat(el.getAttribute('begin')) || 0;
        const dur = el.getAttribute('dur');
        if (dur) {
          let durSeconds = 0;
          if (dur.endsWith('ms')) {
            durSeconds = parseFloat(dur) / 1000;
          } else if (dur.endsWith('s')) {
            durSeconds = parseFloat(dur);
          } else if (dur === 'indefinite') {
            durSeconds = 5; // treat indefinite as 5s default
          } else {
            durSeconds = parseFloat(dur) || 0;
          }

          const repeatCount = el.getAttribute('repeatCount');
          if (repeatCount && repeatCount !== 'indefinite') {
            durSeconds *= parseFloat(repeatCount);
          } else if (repeatCount === 'indefinite') {
            // For indefinite repeats, capture one full cycle
            durSeconds = durSeconds; // keep single cycle duration
          }

          const end = begin + durSeconds;
          if (end > maxEnd) maxEnd = end;
        }
      }
    }

    // Check CSS animations via computed styles
    const allElements = svg.querySelectorAll('*');
    for (const el of allElements) {
      const style = window.getComputedStyle(el);
      const durations = style.animationDuration || '';
      const delays = style.animationDelay || '';
      const iterations = style.animationIterationCount || '';

      if (durations && durations !== '0s') {
        const durParts = durations.split(',').map(d => parseFloat(d) || 0);
        const delayParts = delays.split(',').map(d => parseFloat(d) || 0);
        const iterParts = iterations.split(',').map(i => {
          if (i.trim() === 'infinite') return 1; // capture one cycle
          return parseFloat(i) || 1;
        });

        for (let j = 0; j < durParts.length; j++) {
          const d = durParts[j] || 0;
          const delay = delayParts[j] || delayParts[0] || 0;
          const iter = iterParts[j] || iterParts[0] || 1;
          const end = delay + d * iter;
          if (end > maxEnd) maxEnd = end;
        }
      }
    }

    return maxEnd > 0 ? maxEnd : 5; // default 5s if nothing detected
  });
}

// ---------------------------------------------------------------------------
// Frame capture
// ---------------------------------------------------------------------------

async function captureFrames(page, opts, duration, tempDir) {
  const totalFrames = Math.ceil(duration * opts.fps);
  const framePaths = [];

  // Try to pause SMIL animations first
  const hasSMIL = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    if (svg && typeof svg.pauseAnimations === 'function') {
      svg.pauseAnimations();
      return true;
    }
    return false;
  });

  // Also try to pause CSS animations
  await page.evaluate(() => {
    const svg = document.querySelector('svg');
    if (svg) {
      const allEls = svg.querySelectorAll('*');
      for (const el of allEls) {
        el.style.animationPlayState = 'paused';
      }
    }
  });

  for (let i = 0; i < totalFrames; i++) {
    const t = i / opts.fps;
    const frameNum = String(i).padStart(5, '0');
    const framePath = path.join(tempDir, `frame-${frameNum}.png`);

    // Step SMIL timeline
    if (hasSMIL) {
      await page.evaluate((time) => {
        const svg = document.querySelector('svg');
        if (svg && typeof svg.setCurrentTime === 'function') {
          svg.setCurrentTime(time);
        }
      }, t);
    }

    // Step CSS animations using Web Animations API
    await page.evaluate((time) => {
      const svg = document.querySelector('svg');
      if (!svg) return;
      const allEls = svg.querySelectorAll('*');
      for (const el of allEls) {
        const animations = el.getAnimations ? el.getAnimations() : [];
        for (const anim of animations) {
          anim.currentTime = time * 1000; // Web Animations API uses milliseconds
        }
      }
    }, t);

    // Small delay to let rendering settle
    await page.waitForTimeout(10);

    await page.screenshot({
      path: framePath,
      omitBackground: opts.transparent,
    });

    framePaths.push(framePath);

    // Progress reporting every 10 frames or on last frame
    if (i % 10 === 0 || i === totalFrames - 1) {
      process.stdout.write(`\rCapturing frame ${i + 1}/${totalFrames}...`);
    }
  }

  console.log(''); // newline after progress
  return framePaths;
}

// ---------------------------------------------------------------------------
// ffmpeg encoding
// ---------------------------------------------------------------------------

function encode(tempDir, outputPath, format, opts) {
  const inputPattern = path.join(tempDir, 'frame-%05d.png');

  let cmd;
  switch (format) {
    case '.mp4':
      cmd = [
        'ffmpeg', '-y',
        '-framerate', String(opts.fps),
        '-i', inputPattern,
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-crf', '18',
        outputPath,
      ];
      break;

    case '.gif':
      cmd = [
        'ffmpeg', '-y',
        '-framerate', String(opts.fps),
        '-i', inputPattern,
        '-vf', 'fps=15,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse',
        outputPath,
      ];
      break;

    case '.webm':
      cmd = [
        'ffmpeg', '-y',
        '-framerate', String(opts.fps),
        '-i', inputPattern,
        '-c:v', 'libvpx-vp9',
        '-pix_fmt', opts.transparent ? 'yuva420p' : 'yuv420p',
        outputPath,
      ];
      break;

    case '.mov':
      cmd = [
        'ffmpeg', '-y',
        '-framerate', String(opts.fps),
        '-i', inputPattern,
        '-c:v', 'prores_ks',
        '-profile:v', '4444',
        '-pix_fmt', opts.transparent ? 'yuva444p10le' : 'yuv444p10le',
        outputPath,
      ];
      break;

    default:
      console.error(`Unsupported format: ${format}`);
      process.exit(1);
  }

  console.log(`Encoding ${format.slice(1).toUpperCase()}...`);

  try {
    execFileSync(cmd[0], cmd.slice(1), { stdio: 'pipe' });
  } catch (err) {
    console.error('ffmpeg encoding failed:');
    if (err.stderr) {
      console.error(err.stderr.toString());
    }
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// Cleanup
// ---------------------------------------------------------------------------

function cleanup(tempDir) {
  const files = fs.readdirSync(tempDir);
  for (const file of files) {
    fs.unlinkSync(path.join(tempDir, file));
  }
  fs.rmdirSync(tempDir);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const opts = parseArgs(process.argv);

  // Preflight checks
  checkInput(opts.input);
  const format = validateOutputFormat(opts.output);
  checkFfmpeg();

  // Ensure output directory exists
  const outputDir = path.dirname(opts.output);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create temp directory for frames
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'svg-export-'));

  let browser;
  try {
    console.log(`Opening SVG: ${opts.input}`);
    console.log(`Output: ${opts.output} (${format.slice(1).toUpperCase()})`);
    console.log(`Resolution: ${opts.width}x${opts.height} @ ${opts.fps}fps`);
    if (opts.transparent) console.log('Transparency: enabled');

    // Launch headless browser
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: opts.width, height: opts.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    // Load the SVG file
    const svgUrl = `file://${opts.input}`;
    await page.goto(svgUrl, { waitUntil: 'networkidle' });

    // Wait a moment for any initial rendering
    await page.waitForTimeout(200);

    // Auto-detect duration if not specified
    let duration = opts.duration;
    if (!duration) {
      duration = await detectDuration(page);
      console.log(`Auto-detected animation duration: ${duration.toFixed(2)}s`);
    } else {
      console.log(`Using specified duration: ${duration}s`);
    }

    const totalFrames = Math.ceil(duration * opts.fps);
    console.log(`Total frames to capture: ${totalFrames}`);
    console.log('');

    // Capture frames
    const framePaths = await captureFrames(page, opts, duration, tempDir);

    if (framePaths.length === 0) {
      console.error('Error: No frames captured.');
      process.exit(1);
    }

    // Encode video/gif
    encode(tempDir, opts.output, format, opts);

    // Report result
    const stat = fs.statSync(opts.output);
    const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
    console.log('');
    console.log(`Done! Output: ${opts.output} (${sizeMB} MB)`);
    console.log(`  Format: ${format.slice(1).toUpperCase()}`);
    console.log(`  Frames: ${framePaths.length}`);
    console.log(`  Duration: ${duration.toFixed(2)}s`);
    console.log(`  Size: ${opts.width}x${opts.height}`);

  } catch (err) {
    if (err.message && err.message.includes('browserType.launch')) {
      console.error('Error: Playwright browsers not installed.');
      console.error('Run: npx playwright install chromium');
      process.exit(1);
    }
    console.error('Error:', err.message || err);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
    // Clean up temp frames
    try {
      cleanup(tempDir);
    } catch {
      // Ignore cleanup errors
    }
  }
}

main();
