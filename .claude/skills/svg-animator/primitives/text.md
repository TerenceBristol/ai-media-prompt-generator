# Text

## Description
Animates text content through character-by-character reveals, word-by-word appearances, counting effects, and stroke-based drawing. Text animation requires special techniques because SVG text elements cannot be partially shown using simple attribute animations — individual characters or words must be wrapped in separate `<tspan>` elements or animated using clip/stroke techniques.

## Variants
- **typewriter**: Characters appear one by one from left to right, simulating typing. Each character has a staggered visibility start time.
- **letter-cascade**: Letters drop, slide, or fade in sequentially from different positions. More dynamic than typewriter.
- **word-reveal**: Entire words appear one at a time. Simpler to implement than per-character animation.
- **text-scramble-settle**: Characters display as random glyphs that cycle through options before settling on the final character. Matrix/hacker aesthetic.
- **counter**: A number counts up or down from one value to another. Used for statistics, scores, and countdowns.

## SMIL Syntax

### Typewriter (per-character visibility)
Each character is a `<tspan>` with staggered `visibility` animation:
```xml
<text x="50" y="100" font-family="monospace" font-size="24" fill="#333">
  <tspan visibility="hidden">H
    <set attributeName="visibility" to="visible" begin="0.0s" fill="freeze" />
  </tspan>
  <tspan visibility="hidden">e
    <set attributeName="visibility" to="visible" begin="0.1s" fill="freeze" />
  </tspan>
  <tspan visibility="hidden">l
    <set attributeName="visibility" to="visible" begin="0.2s" fill="freeze" />
  </tspan>
  <tspan visibility="hidden">l
    <set attributeName="visibility" to="visible" begin="0.3s" fill="freeze" />
  </tspan>
  <tspan visibility="hidden">o
    <set attributeName="visibility" to="visible" begin="0.4s" fill="freeze" />
  </tspan>
</text>
```

### Word Reveal (per-word opacity)
```xml
<text font-family="Arial, sans-serif" font-size="20" fill="#2C3E50">
  <tspan x="50" y="80" opacity="0">Welcome
    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="0s" fill="freeze" />
  </tspan>
  <tspan dx="8" opacity="0">to
    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="0.4s" fill="freeze" />
  </tspan>
  <tspan dx="8" opacity="0">SVG
    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="0.8s" fill="freeze" />
  </tspan>
</text>
```

### Text Stroke Drawing (stroke-dashoffset technique)
```xml
<!-- Text drawn by its stroke, then filled -->
<text x="50" y="120" font-family="Arial, sans-serif" font-size="48" font-weight="bold"
  fill="none" stroke="#E74C3C" stroke-width="2"
  stroke-dasharray="500" stroke-dashoffset="500">
  DRAW

  <!-- Animate stroke drawing -->
  <animate
    attributeName="stroke-dashoffset"
    from="500"
    to="0"
    dur="2s"
    begin="0.5s"
    fill="freeze" />
</text>
```

### Cursor Blink (optional companion for typewriter)
```xml
<!-- Blinking cursor that follows text -->
<rect x="50" y="82" width="2" height="22" fill="#333">
  <!-- Move cursor rightward as characters appear -->
  <animate attributeName="x" values="50;62;74;86;98;110"
    keyTimes="0;0.2;0.4;0.6;0.8;1" dur="0.5s" fill="freeze" />
  <!-- Blink effect -->
  <animate attributeName="opacity" values="1;0;1" dur="1s"
    repeatCount="indefinite" />
</rect>
```

## CSS Syntax

### Typewriter via Clip-Path
```css
/* Reveal text by expanding a clip from left to right */
@keyframes typewriter {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0 0 0); }
}

.typewriter {
  animation: typewriter 2s steps(20, end) forwards;
}
```

### Per-Character Fade (CSS on tspan)
```css
@keyframes charFadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Apply to each tspan with staggered delays */
.letter-cascade tspan:nth-child(1) { animation: charFadeIn 0.3s ease-out 0.0s forwards; }
.letter-cascade tspan:nth-child(2) { animation: charFadeIn 0.3s ease-out 0.05s forwards; }
.letter-cascade tspan:nth-child(3) { animation: charFadeIn 0.3s ease-out 0.10s forwards; }
/* ... etc */
```

### Text Stroke Drawing (CSS)
```css
@keyframes drawText {
  from { stroke-dashoffset: 500; }
  to   { stroke-dashoffset: 0; }
}

@keyframes fillIn {
  from { fill-opacity: 0; }
  to   { fill-opacity: 1; }
}

.draw-text {
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
  animation:
    drawText 2s ease-out forwards,
    fillIn 0.5s ease-out 2s forwards;
}
```

## Parameters

| Parameter | Range | Default | Notes |
|-----------|-------|---------|-------|
| speed | 5–30 chars/sec | 10 chars/sec | Translates to delay = 1/speed per character |
| char-delay | 0.03s – 0.2s | 0.1s | Time between each character reveal |
| word-delay | 0.2s – 1s | 0.4s | Time between each word reveal |
| start-delay | 0s – 5s | 0s | Delay before animation begins |
| duration (stroke) | 1s – 4s | 2s | For stroke-based drawing |
| font-size | any | 24px | Affects dash-array calculations for stroke drawing |
| dasharray-length | estimated total path length | 500 | For stroke drawing; overestimate to ensure full coverage |

## Breaking Text into Animatable Elements

### Per-Character `<tspan>` Structure
```xml
<text x="50" y="100" font-family="monospace" font-size="20">
  <!-- Each character is a separate tspan -->
  <tspan>H</tspan>
  <tspan>e</tspan>
  <tspan>l</tspan>
  <tspan>l</tspan>
  <tspan>o</tspan>
  <!-- Space is handled by an empty tspan with dx -->
  <tspan dx="0.5em"> </tspan>
  <tspan>W</tspan>
  <tspan>o</tspan>
  <tspan>r</tspan>
  <tspan>l</tspan>
  <tspan>d</tspan>
</text>
```

**Note on spacing:** When breaking into `<tspan>` elements, SVG collapses whitespace. Use `dx` attributes for explicit spacing, or use `xml:space="preserve"` on the `<text>` element.

### Per-Word `<tspan>` Structure
```xml
<text font-family="Arial, sans-serif" font-size="20">
  <tspan x="50" y="80">Welcome</tspan>
  <tspan x="50" y="110">to the</tspan>
  <tspan x="50" y="140">animation</tspan>
</text>
```

### Stagger Delay Calculation
For a typewriter effect at 10 chars/sec with the word "Hello":
```
H: begin = 0.0s
e: begin = 0.1s
l: begin = 0.2s
l: begin = 0.3s
o: begin = 0.4s

Formula: begin = charIndex × charDelay
```

## Stroke Drawing Technique (Detailed)

The stroke-dashoffset technique creates a "drawing" effect for text:

1. **Set `stroke-dasharray`** to a value >= the total path length of the text stroke. This creates a single dash as long as the entire stroke.
2. **Set `stroke-dashoffset`** to the same value. This shifts the dash so none of it is visible — the text stroke is completely hidden.
3. **Animate `stroke-dashoffset` to 0**. As the offset decreases, the dash slides into view, creating the illusion of the text being drawn.

```xml
<text fill="none" stroke="#000" stroke-width="1.5"
  stroke-dasharray="1000" stroke-dashoffset="1000">
  Text Here
  <animate attributeName="stroke-dashoffset" from="1000" to="0"
    dur="3s" fill="freeze" />
</text>
```

**Estimating dash-array length:** For SMIL (no JS), overestimate the length. A good heuristic is `fontSize × numberOfCharacters × 3`. For precise values, use `getTotalLength()` in JavaScript.

**Draw then fill:** Chain a fill-opacity animation after the stroke completes:
```xml
<text fill="#E74C3C" fill-opacity="0" stroke="#E74C3C" stroke-width="1.5"
  stroke-dasharray="1000" stroke-dashoffset="1000">
  HELLO
  <!-- Draw stroke -->
  <animate attributeName="stroke-dashoffset" from="1000" to="0"
    dur="2s" fill="freeze" />
  <!-- Then fill -->
  <animate attributeName="fill-opacity" from="0" to="1"
    dur="0.5s" begin="2s" fill="freeze" />
</text>
```

## Composability

| Combination | Effect | Technique |
|-------------|--------|-----------|
| **text + fade** | Per-character fade-in | Animate opacity on each `<tspan>` with staggered delays |
| **text + slide** | Letters slide into position | Each `<tspan>` translates from an offset to final position |
| **text + color** | Color sweep across text | Stagger color animation across characters |
| **text + scale** | Characters pop in | Scale each `<tspan>` from 0 to 1 with stagger |
| **text + draw** | Stroke reveal then fill | Use stroke-dashoffset for drawing, then fade in fill |
| **text + stagger** | Sequential word/char reveal | Apply stagger timing to any text animation variant |

## Examples

### Example 1: Typewriter Effect
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="400" height="100">
  <!-- Background -->
  <rect width="400" height="100" fill="#1E272E" />

  <!-- Typewriter text: each character appears sequentially -->
  <text x="30" y="60" font-family="'Courier New', monospace" font-size="24" fill="#0BE881">
    <tspan visibility="hidden">H<set attributeName="visibility" to="visible" begin="0.3s" fill="freeze" /></tspan>
    <tspan visibility="hidden">e<set attributeName="visibility" to="visible" begin="0.4s" fill="freeze" /></tspan>
    <tspan visibility="hidden">l<set attributeName="visibility" to="visible" begin="0.5s" fill="freeze" /></tspan>
    <tspan visibility="hidden">l<set attributeName="visibility" to="visible" begin="0.6s" fill="freeze" /></tspan>
    <tspan visibility="hidden">o<set attributeName="visibility" to="visible" begin="0.7s" fill="freeze" /></tspan>
    <tspan visibility="hidden" dx="0.3em"> <set attributeName="visibility" to="visible" begin="0.8s" fill="freeze" /></tspan>
    <tspan visibility="hidden">W<set attributeName="visibility" to="visible" begin="0.9s" fill="freeze" /></tspan>
    <tspan visibility="hidden">o<set attributeName="visibility" to="visible" begin="1.0s" fill="freeze" /></tspan>
    <tspan visibility="hidden">r<set attributeName="visibility" to="visible" begin="1.1s" fill="freeze" /></tspan>
    <tspan visibility="hidden">l<set attributeName="visibility" to="visible" begin="1.2s" fill="freeze" /></tspan>
    <tspan visibility="hidden">d<set attributeName="visibility" to="visible" begin="1.3s" fill="freeze" /></tspan>
  </text>

  <!-- Blinking cursor -->
  <rect x="30" y="40" width="14" height="26" fill="#0BE881">
    <!-- Move cursor to the right as characters appear -->
    <animate attributeName="x"
      values="30;44;58;72;86;100;122;136;150;164;178;192"
      keyTimes="0;0.077;0.154;0.231;0.308;0.385;0.462;0.538;0.615;0.692;0.769;1"
      dur="1.3s"
      begin="0.3s"
      fill="freeze" />
    <!-- Blink on/off -->
    <animate attributeName="opacity" values="1;0;1" dur="0.8s"
      repeatCount="indefinite" />
  </rect>
</svg>
```

### Example 2: Word-by-Word Reveal with Slide-Up
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 150" width="400" height="150">
  <!-- Background -->
  <rect width="400" height="150" fill="#FAFAFA" />

  <!-- Word 1: "Design" -->
  <g opacity="0">
    <text x="30" y="80" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#2C3E50">
      Design
    </text>
    <animateTransform attributeName="transform" type="translate"
      from="0 30" to="0 0" dur="0.5s" begin="0.2s" fill="freeze" />
    <animate attributeName="opacity" from="0" to="1"
      dur="0.5s" begin="0.2s" fill="freeze" />
  </g>

  <!-- Word 2: "with" -->
  <g opacity="0">
    <text x="160" y="80" font-family="Arial, sans-serif" font-size="32" fill="#7F8C8D">
      with
    </text>
    <animateTransform attributeName="transform" type="translate"
      from="0 30" to="0 0" dur="0.5s" begin="0.6s" fill="freeze" />
    <animate attributeName="opacity" from="0" to="1"
      dur="0.5s" begin="0.6s" fill="freeze" />
  </g>

  <!-- Word 3: "Motion" -->
  <g opacity="0">
    <text x="237" y="80" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#E74C3C">
      Motion
    </text>
    <animateTransform attributeName="transform" type="translate"
      from="0 30" to="0 0" dur="0.5s" begin="1.0s" fill="freeze" />
    <animate attributeName="opacity" from="0" to="1"
      dur="0.5s" begin="1.0s" fill="freeze" />
  </g>
</svg>
```

### Example 3: Text Stroke Drawing with Fill
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" width="400" height="120">
  <!-- Background -->
  <rect width="400" height="120" fill="#FFF" />

  <!-- Text drawn by stroke, then filled -->
  <text x="50" y="80" font-family="Arial, sans-serif" font-size="56" font-weight="bold"
    fill="#3498DB" fill-opacity="0"
    stroke="#3498DB" stroke-width="1.5"
    stroke-dasharray="800" stroke-dashoffset="800">
    HELLO

    <!-- Phase 1: Draw the stroke (0s to 2.5s) -->
    <animate
      attributeName="stroke-dashoffset"
      from="800"
      to="0"
      dur="2.5s"
      begin="0.5s"
      fill="freeze" />

    <!-- Phase 2: Fill in the color (starts after stroke completes) -->
    <animate
      attributeName="fill-opacity"
      from="0"
      to="1"
      dur="0.6s"
      begin="3s"
      fill="freeze" />

    <!-- Phase 3: Fade out stroke (optional — leaves just the fill) -->
    <animate
      attributeName="stroke-opacity"
      from="1"
      to="0"
      dur="0.4s"
      begin="3.2s"
      fill="freeze" />
  </text>
</svg>
```
