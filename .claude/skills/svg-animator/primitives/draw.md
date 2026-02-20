# Draw

## Description
Creates the illusion of a path being drawn progressively by animating `stroke-dasharray` and `stroke-dashoffset`. This technique makes lines, shapes, and illustrations appear as if they are being drawn by an invisible pen. Draw is the foundation of line-art reveal animations, logo reveals, signature animations, and sketch effects.

## Variants
- **draw-in**: Stroke appears progressively from the path's start point to its end. The classic "drawing" effect.
- **draw-out**: Stroke disappears progressively, as if being erased. Reverse of draw-in.
- **draw-and-fill**: Stroke draws in first, then the shape's fill fades in. Two-phase reveal commonly used for logos and icons.
- **sketch-effect**: Stroke draws in with slight wobble or roughness, simulating a hand-drawn appearance. Uses jittered dasharray values.

## The Stroke-Dashoffset Technique (Core Concept)

This is the fundamental mechanism behind all draw animations:

### How It Works
1. **`stroke-dasharray`**: Defines a pattern of dashes and gaps. Setting it to the path's total length creates a single dash that spans the entire stroke.
2. **`stroke-dashoffset`**: Shifts the dash pattern along the path. When offset equals the dash length, the dash is shifted entirely out of view — the stroke is invisible.
3. **Animating `stroke-dashoffset` from total-length to 0**: The dash slides into view progressively, creating the drawing illusion.

### Visual Explanation
```
stroke-dasharray: 300 (one dash of length 300)
stroke-dashoffset: 300 → stroke is invisible (dash shifted off-screen)
stroke-dashoffset: 150 → stroke is 50% drawn
stroke-dashoffset: 0   → stroke is fully visible
```

### Determining Path Length
- **JavaScript (precise)**: `document.querySelector('path').getTotalLength()`
- **Estimation (for pure SMIL)**: Overestimate is safe. For simple shapes:
  - Circle: `2 * PI * radius` (e.g., r=50 → ~314)
  - Rectangle: `2 * (width + height)`
  - Line: distance between points
  - Complex paths: estimate generously (500–2000) — overestimating just means the animation starts with extra invisible offset
- **Tip**: When unsure, use a large value like 1000 or 2000. The only downside is the animation won't start drawing until the offset reaches the actual path length, which may cause a slight initial delay.

## SMIL Syntax

### Draw In
```xml
<path d="M 50,150 C 50,50 150,50 150,150 S 250,250 250,150"
  fill="none" stroke="#E74C3C" stroke-width="3"
  stroke-dasharray="400" stroke-dashoffset="400">
  <animate
    attributeName="stroke-dashoffset"
    from="400"
    to="0"
    dur="2s"
    begin="0s"
    fill="freeze" />
</path>
```

### Draw Out (erase)
```xml
<path d="M 50,150 L 350,150"
  fill="none" stroke="#3498DB" stroke-width="3"
  stroke-dasharray="300" stroke-dashoffset="0">
  <animate
    attributeName="stroke-dashoffset"
    from="0"
    to="300"
    dur="1.5s"
    begin="0s"
    fill="freeze" />
</path>
```

### Draw and Fill (two-phase)
```xml
<path d="M ..."
  fill="#E74C3C" fill-opacity="0"
  stroke="#E74C3C" stroke-width="2"
  stroke-dasharray="500" stroke-dashoffset="500">

  <!-- Phase 1: Draw the stroke -->
  <animate
    attributeName="stroke-dashoffset"
    from="500"
    to="0"
    dur="2s"
    begin="0s"
    fill="freeze" />

  <!-- Phase 2: Fade in the fill after stroke completes -->
  <animate
    attributeName="fill-opacity"
    from="0"
    to="1"
    dur="0.5s"
    begin="2s"
    fill="freeze" />
</path>
```

### Draw from End to Start (reverse direction)
```xml
<!-- Use negative dashoffset to draw from end -->
<path d="..."
  fill="none" stroke="#333" stroke-width="2"
  stroke-dasharray="400" stroke-dashoffset="-400">
  <animate
    attributeName="stroke-dashoffset"
    from="-400"
    to="0"
    dur="2s"
    fill="freeze" />
</path>
```

### Partial Draw (draw then pause at percentage)
```xml
<!-- Draw to 60% of path, then stop -->
<path d="..."
  fill="none" stroke="#333" stroke-width="2"
  stroke-dasharray="400" stroke-dashoffset="400">
  <animate
    attributeName="stroke-dashoffset"
    from="400"
    to="160"
    dur="1.5s"
    fill="freeze" />
  <!-- 400 - 160 = 240 visible out of 400 total = 60% drawn -->
</path>
```

## CSS Syntax

### Draw In
```css
@keyframes drawIn {
  from { stroke-dashoffset: 400; }
  to   { stroke-dashoffset: 0; }
}

.draw-in {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: drawIn 2s ease-out forwards;
}
```

### Draw and Fill
```css
@keyframes drawStroke {
  to { stroke-dashoffset: 0; }
}

@keyframes fillIn {
  to { fill-opacity: 1; }
}

.draw-and-fill {
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
  fill-opacity: 0;
  animation:
    drawStroke 2s ease-out forwards,
    fillIn 0.5s ease-out 2s forwards;
}
```

### Continuous Draw Loop
```css
@keyframes drawLoop {
  0%   { stroke-dashoffset: 400; }
  50%  { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -400; }
}

.draw-loop {
  stroke-dasharray: 400;
  animation: drawLoop 3s linear infinite;
}
```

## Parameters

| Parameter | Range | Default | Notes |
|-----------|-------|---------|-------|
| path-length | any positive number | (calculated) | Total length of the stroke path |
| duration | 0.5s – 5s | 2s | Longer for complex paths; shorter for simple lines |
| direction | start-to-end, end-to-start | start-to-end | Use negative dashoffset for end-to-start |
| delay | 0s – 5s | 0s | For sequencing multi-path draws |
| easing | ease-out, linear, ease-in-out | ease-out | ease-out gives natural deceleration |
| fill-delay | 0s – duration | duration | When to start fill fade-in (for draw-and-fill) |
| stroke-width | 1 – 10 | 2 | Thicker strokes are more visible but less precise |
| stroke-linecap | butt, round, square | round | `round` looks best for most drawings |
| fill (animation) | freeze, remove | freeze | `freeze` holds the drawn state |

## Multi-Path Drawing (Sequenced)

For illustrations with multiple paths, stagger the `begin` times:

```xml
<!-- Path 1: draws from 0s to 1s -->
<path d="M ..." stroke-dasharray="200" stroke-dashoffset="200"
  fill="none" stroke="#333" stroke-width="2">
  <animate attributeName="stroke-dashoffset" from="200" to="0"
    dur="1s" begin="0s" fill="freeze" />
</path>

<!-- Path 2: draws from 0.8s to 1.8s (overlapping for flow) -->
<path d="M ..." stroke-dasharray="300" stroke-dashoffset="300"
  fill="none" stroke="#333" stroke-width="2">
  <animate attributeName="stroke-dashoffset" from="300" to="0"
    dur="1s" begin="0.8s" fill="freeze" />
</path>

<!-- Path 3: draws from 1.6s to 2.6s -->
<path d="M ..." stroke-dasharray="250" stroke-dashoffset="250"
  fill="none" stroke="#333" stroke-width="2">
  <animate attributeName="stroke-dashoffset" from="250" to="0"
    dur="1s" begin="1.6s" fill="freeze" />
</path>
```

**Overlap tip:** Start each path slightly before the previous one finishes (e.g., 80% through) for a fluid, connected drawing feel.

## Composability

| Combination | Effect | Technique |
|-------------|--------|-----------|
| **draw + fade** | Draw then fill | Stroke draws in, then fill-opacity fades to 1 |
| **draw + color** | Color change during draw | Animate `stroke` color while drawing, or draw in one color and settle to another |
| **draw + text** | Text stroke reveal | Apply draw technique to text elements (see text.md) |
| **draw + stagger** | Multi-path sequential draw | Stagger begin times for paths in an illustration |
| **draw + scale** | Draw while growing | Wrap path in `<g>` that scales up during draw |
| **draw + slide** | Draw while entering | Path draws in while the group slides into the viewport |

## Examples

### Example 1: Line-Art Shape Reveal
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
  <!-- Background -->
  <rect width="300" height="300" fill="#FFF" />

  <!-- Triangle drawn progressively -->
  <polygon points="150,40 260,240 40,240"
    fill="none" stroke="#2C3E50" stroke-width="3" stroke-linejoin="round"
    stroke-dasharray="700" stroke-dashoffset="700">
    <animate
      attributeName="stroke-dashoffset"
      from="700"
      to="0"
      dur="2s"
      begin="0.5s"
      fill="freeze"
      calcMode="spline"
      keySplines="0.42 0 0.58 1" />
  </polygon>

  <!-- Inner circle drawn after triangle -->
  <circle cx="150" cy="175" r="55"
    fill="none" stroke="#E74C3C" stroke-width="2"
    stroke-dasharray="346" stroke-dashoffset="346">
    <animate
      attributeName="stroke-dashoffset"
      from="346"
      to="0"
      dur="1.5s"
      begin="2s"
      fill="freeze"
      calcMode="spline"
      keySplines="0.42 0 0.58 1" />
  </circle>
</svg>
```

### Example 2: Draw and Fill Logo
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="300" height="200">
  <!-- Background -->
  <rect width="300" height="200" fill="#1A1A2E" />

  <!-- Star shape: draw stroke then fill -->
  <path d="M 150,30 L 170,90 L 235,90 L 182,130 L 200,190 L 150,155
           L 100,190 L 118,130 L 65,90 L 130,90 Z"
    fill="#F39C12" fill-opacity="0"
    stroke="#F39C12" stroke-width="2" stroke-linejoin="round"
    stroke-dasharray="600" stroke-dashoffset="600">

    <!-- Phase 1: Draw the outline (0s to 2.5s) -->
    <animate
      attributeName="stroke-dashoffset"
      from="600"
      to="0"
      dur="2.5s"
      begin="0.3s"
      fill="freeze"
      calcMode="spline"
      keySplines="0.25 0.1 0.25 1" />

    <!-- Phase 2: Fill fades in (starts at 2.5s) -->
    <animate
      attributeName="fill-opacity"
      from="0"
      to="1"
      dur="0.8s"
      begin="2.8s"
      fill="freeze" />

    <!-- Phase 3: Stroke fades out (optional, leaves clean fill) -->
    <animate
      attributeName="stroke-opacity"
      from="1"
      to="0"
      dur="0.5s"
      begin="3.2s"
      fill="freeze" />
  </path>
</svg>
```

### Example 3: Multi-Path Illustration Reveal
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <!-- Background -->
  <rect width="400" height="300" fill="#FAFAFA" />

  <!-- House illustration drawn piece by piece -->

  <!-- Foundation/ground line -->
  <line x1="80" y1="220" x2="320" y2="220"
    stroke="#5D6D7E" stroke-width="3" stroke-linecap="round"
    stroke-dasharray="240" stroke-dashoffset="240">
    <animate attributeName="stroke-dashoffset" from="240" to="0"
      dur="0.6s" begin="0.2s" fill="freeze" />
  </line>

  <!-- House body (rectangle) -->
  <rect x="120" y="130" width="160" height="90"
    fill="none" stroke="#2C3E50" stroke-width="3" stroke-linejoin="round"
    stroke-dasharray="500" stroke-dashoffset="500">
    <animate attributeName="stroke-dashoffset" from="500" to="0"
      dur="1s" begin="0.6s" fill="freeze" />
  </rect>

  <!-- Roof (triangle) -->
  <polyline points="100,130 200,60 300,130"
    fill="none" stroke="#E74C3C" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"
    stroke-dasharray="350" stroke-dashoffset="350">
    <animate attributeName="stroke-dashoffset" from="350" to="0"
      dur="0.8s" begin="1.4s" fill="freeze" />
  </polyline>

  <!-- Door -->
  <rect x="175" y="170" width="50" height="50"
    fill="none" stroke="#8E44AD" stroke-width="2"
    stroke-dasharray="200" stroke-dashoffset="200">
    <animate attributeName="stroke-dashoffset" from="200" to="0"
      dur="0.5s" begin="2.0s" fill="freeze" />
  </rect>

  <!-- Window (left) -->
  <rect x="135" y="150" width="30" height="25"
    fill="none" stroke="#3498DB" stroke-width="2"
    stroke-dasharray="110" stroke-dashoffset="110">
    <animate attributeName="stroke-dashoffset" from="110" to="0"
      dur="0.4s" begin="2.3s" fill="freeze" />
  </rect>

  <!-- Window (right) -->
  <rect x="235" y="150" width="30" height="25"
    fill="none" stroke="#3498DB" stroke-width="2"
    stroke-dasharray="110" stroke-dashoffset="110">
    <animate attributeName="stroke-dashoffset" from="110" to="0"
      dur="0.4s" begin="2.5s" fill="freeze" />
  </rect>
</svg>
```
