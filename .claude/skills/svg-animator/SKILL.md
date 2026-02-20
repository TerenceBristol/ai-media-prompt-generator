---
name: svg-animator
description: Create, animate, and export SVG animations. Supports 4 modes (Create, Animate, Create+Animate, Export), motion primitives library, YouTube-optimized output, and video/GIF export.
---

# SVG Animator

## When to Use This Skill

Activate when the user:
- Asks to create/generate/make an SVG animation or animated SVG
- Asks to create a static SVG illustration or graphic
- Says "animate this SVG" or "add motion to this SVG"
- Requests a loading spinner, title card, logo animation, or animated icon
- Asks for motion graphics, kinetic typography, or SVG-based visuals
- Wants to export an animated SVG to video, GIF, or WebM
- Mentions SVG in the context of animation or visual creation

## Modes

| Mode | Description | Trigger Phrases |
|------|-------------|-----------------|
| **Create** | Generate a static SVG from a text description | "create an SVG of", "make me an SVG", "draw a" |
| **Animate** | Add animation to an existing static SVG file | "animate this SVG", "add motion to", "make this move" |
| **Create + Animate** | Full pipeline — generate SVG then animate it | "create an SVG animation", "animated SVG of", "make an animated" |
| **Export** | Convert an animated SVG to video/GIF formats | "export to video", "convert SVG to MP4", "make a GIF from" |

Auto-detect mode from user intent. If unclear, ask:
> "What would you like to do?"
>
> 1. **Create** — Generate a static SVG from a description
> 2. **Animate** — Add animation to an existing SVG file
> 3. **Create + Animate** — Generate an SVG and animate it in one go
> 4. **Export** — Convert an animated SVG to video/GIF

## Conversation Flow

### Step 1: Detect Mode

From the user's message, identify: Create / Animate / Create+Animate / Export.

If the request implies both creation and motion (e.g., "make me an animated logo"), default to **Create + Animate**. If the user provides an existing SVG file path, default to **Animate**.

### Step 2: Gather Context

Ask mode-specific clarifying questions. Adapt based on mode:

#### Create Mode Questions
1. **Subject/Concept**: "What should the SVG depict? (icon, illustration, scene, abstract shape, text, logo, etc.)"
2. **Visual Style**: "What style are you going for? (geometric, hand-drawn, minimalist, detailed, isometric, flat design, etc.)"
3. **Complexity Level**: "How detailed? (simple icon, moderate illustration, complex scene)"
4. **Color Palette**: "Any color preferences? (hex codes, mood description like 'warm sunset', named palette like 'pastel', or 'your choice')"
5. **Dimensions**: "Any size requirements? Or should I use a YouTube preset?"

#### Animate Mode Questions
1. **SVG File**: "Which SVG file should I animate? (provide the file path)"
2. **Desired Motion**: "What kind of motion or behavior do you want? (fade in, slide, bounce, rotate, pulse, morph, etc.)"
3. **Timing/Duration**: "How long should the animation last? Should it loop?"
4. **Emphasis**: "Any specific elements to emphasize or animate differently?"

#### Create + Animate Mode Questions
1. **Subject/Concept**: "What should the animated SVG depict?"
2. **Visual Style**: "What visual style? (geometric, minimalist, illustrated, etc.)"
3. **Desired Motion**: "What kind of motion or behavior? (fade in, slide, bounce, orbit, pulse, morph, etc.)"
4. **Color Palette**: "Color preferences? (hex codes, mood description, named palette, or 'your choice')"
5. **Timing/Duration**: "Animation duration? Should it loop?"
6. **Dimensions**: "Size requirements or YouTube preset?"

#### Export Mode Questions
1. **SVG File**: "Which animated SVG file should I export? (provide the file path)"
2. **Output Format**: "What format? (MP4, GIF, WebM with transparency, ProRes MOV with transparency)"
3. **Dimensions**: "Output dimensions? (default: match SVG viewBox)"
4. **Duration**: "Override duration? (default: match animation duration)"
5. **Transparency**: "Do you need a transparent background? (for overlays in video editors)"

### Step 3: Recommend Motion Primitives

Read relevant primitives from `.claude/skills/svg-animator/primitives/`. Present a motion decomposition:

> "This animation breaks down into these motion primitives: **fade-in** + **slide-from-left** + **bounce-settle**. Want to adjust the motion plan?"

If no primitives directory content exists yet, suggest primitives based on the concept and skip the file lookup.

Common motion primitives:

| Primitive | Description | Typical Duration |
|-----------|-------------|-----------------|
| `fade-in` | Opacity 0 to 1 | 0.3-0.8s |
| `fade-out` | Opacity 1 to 0 | 0.3-0.8s |
| `slide-from-left` | Translate from off-screen left | 0.5-1.0s |
| `slide-from-right` | Translate from off-screen right | 0.5-1.0s |
| `slide-from-bottom` | Translate from below | 0.5-1.0s |
| `slide-from-top` | Translate from above | 0.5-1.0s |
| `scale-up` | Scale from 0 to 1 (grow in) | 0.3-0.6s |
| `scale-down` | Scale from 1 to 0 (shrink out) | 0.3-0.6s |
| `bounce-settle` | Overshoot then settle into place | 0.6-1.2s |
| `pulse` | Rhythmic scale oscillation | 1.0-2.0s (loop) |
| `breathe` | Gentle scale + opacity oscillation | 2.0-4.0s (loop) |
| `rotate-continuous` | Endless rotation | 1.0-4.0s per revolution |
| `spin-in` | Rotate + scale from 0 to final | 0.5-1.0s |
| `typewriter` | Characters appear sequentially | 0.05-0.1s per char |
| `draw-path` | Stroke dashoffset reveal | 1.0-3.0s |
| `color-shift` | Animate fill or stroke color | 1.0-3.0s |
| `wobble` | Small rotation oscillation | 0.3-0.8s |
| `float` | Gentle vertical drift up/down | 2.0-4.0s (loop) |
| `shake` | Rapid horizontal jitter | 0.3-0.6s |
| `morph` | Shape path interpolation | 1.0-2.0s |

### Step 4: Check Template Library

Check `.claude/skills/svg-animator/templates/` for relevant saved templates. If a match is found:

> "I have a saved template similar to this — want to start from it, or create from scratch?"

If the templates directory is empty or no match found, skip this step silently.

### Step 5: Choose Animation Technique

Auto-select the best approach based on the animation requirements:

| Technique | Best For | Notes |
|-----------|----------|-------|
| **SMIL** (`<animate>`, `<animateTransform>`, `<animateMotion>`) | Default for standalone .svg files; simple-to-moderate animations; sequenced timing with `begin` attributes | Most portable, works without `<style>` block |
| **CSS** (`@keyframes` embedded in `<style>`) | Complex easing curves, text animations, hover effects, effects SMIL cannot express | Embedded `<style>` within `<svg>` element |
| **Hybrid** (SMIL + CSS combined) | When certain elements need SMIL sequencing and others need CSS flexibility | Use sparingly; test carefully |

Both SMIL and CSS-in-SVG produce valid .svg files that render in all modern browsers and export identically to video.

Decision heuristic:
- Default to **SMIL** unless there is a specific reason for CSS
- Use **CSS** when: complex cubic-bezier easing is needed, staggered class-based animations are cleaner, or the animation involves pseudo-elements
- Use **Hybrid** when: some elements need `begin="[id].end"` sequencing (SMIL) while others need keyframe complexity (CSS)

### Step 6: Set Dimensions

Offer YouTube-optimized presets:

| Preset | Dimensions | Use Case |
|--------|-----------|----------|
| 1080p Landscape | 1920 x 1080 | Standard YouTube video, title cards |
| YouTube Shorts | 1080 x 1920 | Vertical short-form content |
| Square / Social | 1080 x 1080 | Instagram, social media posts |
| Custom | User specifies | Any custom requirement |

Default to **1920 x 1080** if not specified by the user.

### Step 7: Generate SVG

Generate **2 variations**:
- **Variation A (Clean)**: Polished, faithful interpretation of the description. Proven techniques, predictable result.
- **Variation B (Creative)**: Pushes the concept with unexpected motion, color choices, or compositional approach.

Save files to:
- `./output/svg-animations/[descriptive-name]-v1.svg`
- `./output/svg-animations/[descriptive-name]-v2.svg`

#### Generation Rules

1. **Root element**: Always include `xmlns="http://www.w3.org/2000/svg"` and `viewBox` matching dimensions
   ```xml
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
   ```

2. **Comments**: Add XML comments identifying each animated element for easy iteration
   ```xml
   <!-- Main title text - typewriter reveal -->
   <!-- Background particles - float animation -->
   ```

3. **SMIL animations**: Use `fill="freeze"` to hold final state unless the animation should loop
   ```xml
   <animate attributeName="opacity" from="0" to="1" dur="0.5s" fill="freeze" />
   ```

4. **CSS animations**: Embed `<style>` within the `<svg>` element, never in an external file
   ```xml
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
     <style>
       @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
       .fade-in { animation: fadeIn 0.5s ease forwards; }
     </style>
     <!-- elements here -->
   </svg>
   ```

5. **Sequenced timing**: Use `begin` attributes to chain animations
   ```xml
   <animate id="step1" attributeName="opacity" from="0" to="1" dur="0.5s" begin="0s" fill="freeze" />
   <animate id="step2" attributeName="opacity" from="0" to="1" dur="0.5s" begin="step1.end+0.2s" fill="freeze" />
   ```

6. **Groups for transforms**: Wrap elements in `<g>` when applying `<animateTransform>` to avoid conflicting transforms
   ```xml
   <g>
     <animateTransform attributeName="transform" type="translate" from="-100,0" to="0,0" dur="0.8s" fill="freeze" />
     <rect x="100" y="100" width="200" height="200" fill="#3498db" />
   </g>
   ```

7. **Path drawing**: Use `stroke-dasharray` and `stroke-dashoffset` for line-draw effects
   ```xml
   <path d="M10 80 Q 95 10 180 80" stroke="#333" fill="none" stroke-dasharray="300" stroke-dashoffset="300">
     <animate attributeName="stroke-dashoffset" from="300" to="0" dur="2s" fill="freeze" />
   </path>
   ```

### Step 8: Auto-Preview

Open the generated SVGs in the browser for preview:

```bash
open ./output/svg-animations/[filename].svg
```

If the `open` command is not suitable (e.g., remote environment), use the Playwright MCP browser to navigate to the file for preview.

### Step 9: Iterate

Ask the user:
> "Want to adjust timing, colors, motion, elements, or anything else?"

If yes:
1. Make the requested modifications to the SVG
2. Save the updated file (increment version if requested, otherwise overwrite)
3. Re-preview in browser
4. Loop until the user is satisfied

Common iteration requests and how to handle them:
- **"Faster/slower"**: Adjust `dur` attributes or `animation-duration`
- **"More bounce"**: Add overshoot keyframes or elastic easing
- **"Different colors"**: Update `fill`/`stroke` values
- **"Add/remove element"**: Modify SVG structure and add/remove corresponding animations
- **"Make it loop"**: Change `repeatCount="indefinite"` or `animation-iteration-count: infinite`
- **"Stagger the timing"**: Adjust `begin` offsets or `animation-delay`

### Step 10: Export (Optional)

When the user wants video/GIF output:

1. **Ask format**: MP4 / GIF / WebM (transparent) / ProRes MOV (transparent)
2. **Ask transparency**: "Do you need a transparent background? (for compositing in video editors)"
3. **Run the export pipeline** (see Export Pipeline section below)
4. **Save to**: `./output/svg-animations/[name].[format]`

### Step 11: Save Template (Optional)

Offer after a successful generation:
> "Want to save this animation as a reusable template for future use?"

If yes, save to `.claude/skills/svg-animator/templates/[descriptive-name].md` with:

```markdown
# [Template Name]

## Description
[1-2 sentence description of what this template creates]

## Parameters
| Parameter | Default | Description |
|-----------|---------|-------------|
| colors | [defaults] | Primary color palette |
| text | [default] | Text content (if applicable) |
| dimensions | 1920x1080 | Output dimensions |
| duration | [Xs] | Total animation duration |
| loop | yes/no | Whether animation loops |

## SVG Code
```xml
[The complete SVG code with comments marking customizable sections]
```

## Motion Breakdown
[List of primitives used and their timing]
```

## Multi-Scene Sequences

For connected animation sequences (e.g., multi-part title cards, explainer segments):

1. **Ask scene count**: "How many scenes? (2-6)"
2. **Gather descriptions**: Get a description for each scene
3. **Define transitions**: How scenes connect — cut, crossfade, slide, or wipe
4. **Generate each scene** as a separate SVG file:
   - `[name]-scene-01.svg`
   - `[name]-scene-02.svg`
   - etc.
5. **Optionally combine**: Merge into one SVG with sequential timing using `begin="[previous].end"` chains
6. **Export as single video**: Concatenate all scenes into one continuous video file

Transition implementation:

| Transition | Technique |
|------------|-----------|
| Cut | Scene B begins at `begin="sceneA-end.end"` with no overlap |
| Crossfade | Scene A fades out while Scene B fades in, 0.3-0.5s overlap |
| Slide | Scene A translates off-screen while Scene B translates on-screen |
| Wipe | Clip-path animation reveals Scene B over Scene A |

## Color Palette Handling

Accept colors in multiple formats:

| Input Type | Example | Handling |
|------------|---------|----------|
| Hex codes | `#FF5733, #2C3E50, #ECF0F1` | Use directly |
| Mood descriptions | "warm sunset tones", "cool ocean blues" | Translate to specific hex codes |
| Named palettes | "pastel", "earth tones", "monochrome", "neon" | Map to predefined hex sets |
| "Your choice" | "pick something that fits" | Select a harmonious palette matching the concept |

Named palette mappings:

| Palette | Hex Codes |
|---------|-----------|
| Pastel | `#FFB3BA, #BAFFC9, #BAE1FF, #FFFFBA, #E8BAFF` |
| Earth Tones | `#8B4513, #D2691E, #DEB887, #F5DEB3, #556B2F` |
| Monochrome | `#1A1A1A, #4D4D4D, #808080, #B3B3B3, #E6E6E6` |
| Neon | `#FF00FF, #00FFFF, #FF6600, #39FF14, #FF3399` |
| Ocean | `#006994, #0099DB, #40E0D0, #87CEEB, #E0F7FA` |
| Sunset | `#FF6B35, #F7931E, #FFCD00, #C1272D, #8B2252` |

When given a mood description, translate to 4-6 specific hex codes before generating. State the chosen palette in the output so the user can adjust.

## Complexity Guidance

### Complexity Tiers

| Tier | Examples | Reliability | Element Count |
|------|----------|-------------|---------------|
| **Simple** | Pulsing shapes, color transitions, fade-ins, spinners, single icon animations | 95%+ | 1-10 animated elements |
| **Moderate** | Orbit systems, wave animations, text reveals, coordinated multi-element, particle effects (small count) | 80-90% | 10-30 animated elements |
| **Complex** | Shape morphing, large particle fields, intricate path animations, multi-scene with transitions | 60-75% | 30+ animated elements |

### Simplification Strategies

When a request might exceed reliable SVG animation limits, proactively suggest simplification:

- **Element count**: "Let's use 15 particles instead of 100 for reliable rendering"
- **Motion paths**: "A circular orbit will be smoother than a complex Bezier path"
- **Duration**: "Let's break this 30-second animation into a 3-scene sequence at 10s each"
- **Detail level**: "Geometric/stylized shapes will animate more reliably than highly detailed illustrations"
- **Simultaneous animations**: "Staggering these instead of running all at once will be smoother"

**NEVER suggest external tools** for simplification. Always find a way to reduce complexity within SVG capabilities.

For complex requests, aim to land in the **moderate** tier through simplification, then explain what was adjusted and why.

## Export Pipeline

### Prerequisites

| Tool | Purpose | Install |
|------|---------|---------|
| Playwright browser | Frame capture from SVG | Available via MCP or `npm install playwright` |
| ffmpeg | Frame-to-video encoding | `brew install ffmpeg` (macOS) |

### Process

1. **Open SVG** in Playwright headless browser at the correct viewport dimensions
2. **Detect animation duration** by parsing SMIL `dur`/`begin`/`end` attributes or CSS `animation-duration` from the SVG source
3. **Capture frames** using SMIL timeline control:
   ```javascript
   const svg = document.querySelector('svg');
   svg.pauseAnimations();
   for (let t = 0; t <= totalDuration; t += 1/30) {
     svg.setCurrentTime(t);
     // screenshot frame
   }
   ```
4. **For CSS animations**: Use Web Animations API for frame-accurate control:
   ```javascript
   const animations = document.getAnimations();
   animations.forEach(a => a.pause());
   for (let t = 0; t <= totalDuration; t += 1/30) {
     animations.forEach(a => { a.currentTime = t * 1000; });
     // screenshot frame
   }
   ```
5. **Encode with ffmpeg**:

| Format | FFmpeg Command | Use Case |
|--------|---------------|----------|
| MP4 | `ffmpeg -framerate 30 -i frame-%05d.png -c:v libx264 -pix_fmt yuv420p -crf 18 output.mp4` | Standard video import |
| GIF | `ffmpeg -framerate 30 -i frame-%05d.png -vf "fps=15,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" output.gif` | Quick sharing |
| WebM | `ffmpeg -framerate 30 -i frame-%05d.png -c:v libvpx-vp9 -pix_fmt yuva420p output.webm` | Transparent web overlay |
| ProRes MOV | `ffmpeg -framerate 30 -i frame-%05d.png -c:v prores_ks -profile:v 4444 -pix_fmt yuva444p10le output.mov` | Video editor compositing (Final Cut, Premiere, DaVinci) |

6. **Clean up** temporary frame PNG files after encoding

### Transparent Background Export

For transparent exports (WebM, ProRes MOV):
- Set SVG background to transparent (no `<rect>` fill covering the canvas)
- Capture frames as PNG (preserves alpha channel)
- Use alpha-aware pixel formats (`yuva420p` for WebM, `yuva444p10le` for ProRes)

## Animate Mode (Existing SVG)

When the user provides a static SVG file:

1. **Read the SVG file** and parse its structure
2. **Analyze elements**: List all groups, paths, shapes, text elements, and their IDs/classes
3. **Suggest animation ideas** based on content:
   > "I see this SVG has: a circle, 3 text elements, and a rectangle. Here are some animation ideas:"
   > - Circle: pulse or breathe
   > - Text elements: typewriter reveal or staggered fade-in cascade
   > - Rectangle: slide-in from bottom or scale-up
4. **Ask the user** which animations to apply (or suggest a cohesive combination)
5. **Add SMIL/CSS animation** attributes to the existing SVG elements
6. **Save as a new file** — never overwrite the original
   - Original: `logo.svg`
   - Animated: `logo-animated.svg`
7. **Preview** the animated version in browser

## Prompt-Generator Integration Hook

When invoked from the prompt-generator context (e.g., user wants an SVG version of a concept already discussed):

- Accept the concept description already gathered by the prompt-generator
- Skip redundant questions (subject, style, mood already known)
- Focus only on animation-specific questions (motion type, timing, effects, dimensions)
- Return to prompt-generator flow after completion if needed

## Quality Checklist

Before presenting SVG output, verify:

- [ ] Valid SVG with `xmlns` attribute and `viewBox`
- [ ] Animation plays correctly (SMIL `<animate>` or CSS `@keyframes`)
- [ ] Dimensions match user request or YouTube preset
- [ ] Colors match requested palette
- [ ] XML comments identify each animated element
- [ ] 2 variations generated (Clean + Creative)
- [ ] Variations are meaningfully different (not just color swaps)
- [ ] File saved to `./output/svg-animations/`
- [ ] Auto-preview opened in browser
- [ ] Complexity is within reliable tier (simplification suggested if not)
- [ ] No external dependencies (all styles/animations inline within SVG)
- [ ] Looping behavior matches user intent (`repeatCount` or `animation-iteration-count`)

## Reference Files

- Motion primitives: `.claude/skills/svg-animator/primitives/`
- Saved templates: `.claude/skills/svg-animator/templates/`
- Output directory: `./output/svg-animations/`
