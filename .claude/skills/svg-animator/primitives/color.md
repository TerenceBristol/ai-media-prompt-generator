# Color

## Description
Animates the color properties of SVG elements — fill, stroke, gradient stops, and filters. Color animation adds emotional depth and visual richness to motion graphics. Use color shifts for state changes, gradient animations for backgrounds and atmospheres, flash for attention/alerts, and rainbow cycles for playful or psychedelic effects.

## Variants
- **color-shift**: Smooth transition between two specific colors. Used for state changes (hover, active, success/error) and mood transitions.
- **gradient-animation**: Animated gradient stops that create flowing, shifting backgrounds. The gradient itself moves or its colors change.
- **flash**: Quick pulse to a highlight color and back. Draws immediate attention — notification, error, heartbeat.
- **rainbow-cycle**: Continuous hue rotation through the full color spectrum. Playful, festive, or loading indicator.
- **color-sweep**: Color change propagates across an element or group of elements like a wave. Achieved through staggered color animations.

## SMIL Syntax

### Color Shift (fill)
```xml
<animate
  attributeName="fill"
  from="#3498DB"
  to="#E74C3C"
  dur="1s"
  begin="0s"
  fill="freeze" />
```

### Color Shift (stroke)
```xml
<animate
  attributeName="stroke"
  from="#2ECC71"
  to="#E67E22"
  dur="1.5s"
  begin="0s"
  fill="freeze" />
```

### Multi-Color Transition
```xml
<animate
  attributeName="fill"
  values="#3498DB; #9B59B6; #E74C3C; #F39C12; #3498DB"
  keyTimes="0; 0.25; 0.5; 0.75; 1"
  dur="4s"
  repeatCount="indefinite" />
```

### Flash (quick pulse)
```xml
<animate
  attributeName="fill"
  values="#3498DB; #FFFFFF; #3498DB"
  keyTimes="0; 0.3; 1"
  dur="0.4s"
  begin="0s"
  fill="freeze" />
```

### Gradient Stop Animation
```xml
<defs>
  <linearGradient id="animGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#3498DB">
      <animate attributeName="stop-color"
        values="#3498DB; #E74C3C; #3498DB"
        dur="3s" repeatCount="indefinite" />
    </stop>
    <stop offset="100%" stop-color="#E74C3C">
      <animate attributeName="stop-color"
        values="#E74C3C; #3498DB; #E74C3C"
        dur="3s" repeatCount="indefinite" />
    </stop>
  </linearGradient>
</defs>
```

### Gradient Position Animation (sliding gradient)
```xml
<defs>
  <linearGradient id="slideGrad" x1="0%" y1="0%" x2="100%" y2="0%"
    gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="#6C5CE7" />
    <stop offset="50%" stop-color="#FD79A8" />
    <stop offset="100%" stop-color="#6C5CE7" />
    <!-- Slide the gradient by animating x1 and x2 -->
    <animate attributeName="x1" values="-100%; 0%; 100%" dur="3s"
      repeatCount="indefinite" />
    <animate attributeName="x2" values="0%; 100%; 200%" dur="3s"
      repeatCount="indefinite" />
  </linearGradient>
</defs>
```

## CSS Syntax

### Color Shift
```css
@keyframes colorShift {
  from { fill: #3498DB; }
  to   { fill: #E74C3C; }
}

.color-shift {
  animation: colorShift 1s ease-in-out forwards;
}
```

### Rainbow Cycle (via hue-rotate filter)
```css
@keyframes rainbow {
  from { filter: hue-rotate(0deg); }
  to   { filter: hue-rotate(360deg); }
}

.rainbow {
  animation: rainbow 3s linear infinite;
}
```

### Flash
```css
@keyframes flash {
  0%, 100% { fill: #3498DB; }
  30%      { fill: #FFFFFF; }
}

.flash {
  animation: flash 0.4s ease-out;
}
```

### Multi-Color Cycle
```css
@keyframes multiColor {
  0%   { fill: #3498DB; }
  25%  { fill: #9B59B6; }
  50%  { fill: #E74C3C; }
  75%  { fill: #F39C12; }
  100% { fill: #3498DB; }
}

.multi-color {
  animation: multiColor 4s ease-in-out infinite;
}
```

### CSS Gradient Animation (background shimmer)
```css
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position: 200% 0; }
}

/* Note: This works on HTML elements; for SVG, animate gradient attributes via SMIL */
```

## Parameters

| Parameter | Range | Default | Notes |
|-----------|-------|---------|-------|
| from-color | any valid color | (required) | Hex (#RGB, #RRGGBB), named colors, rgb(), hsl() |
| to-color | any valid color | (required) | Target color |
| duration | 0.2s – 5s | 1s | Flash: 0.2–0.5s; shift: 0.5–2s; cycle: 2–5s |
| easing | linear, ease-in-out | ease-in-out | Use `linear` for continuous cycles |
| repeatCount | number or indefinite | 1 (shift), indefinite (cycle) | Flash: 1; rainbow/gradient: indefinite |
| fill | freeze, remove | freeze (one-shot) | `freeze` for state-change transitions |
| attribute | fill, stroke, stop-color, flood-color | fill | Which color attribute to animate |

### Color Format Notes
- SMIL accepts: `#RGB`, `#RRGGBB`, named colors (`red`, `blue`), `rgb(r,g,b)`
- SMIL does **not** accept: `rgba()`, `hsl()`, `hsla()` in `from`/`to`/`values`
- CSS accepts all formats including `hsl()` and `rgba()`
- For transparency, animate `opacity` or `fill-opacity` separately

## Composability

| Combination | Effect | Technique |
|-------------|--------|-----------|
| **color + morph** | Shape change with color shift | Animate both `d` and `fill` simultaneously |
| **color + scale** | Grow with color emphasis | Element scales up while shifting to highlight color |
| **color + fade** | Ghost-in with color | Fade in while transitioning from gray/muted to vibrant |
| **color + text** | Color sweep across text | Stagger color animations on individual `<tspan>` elements |
| **color + stagger** | Sequential color wave | Apply color shift to multiple elements with incremental delays |
| **color + draw** | Draw in one color, settle to another | Stroke draws in highlight color, then fill appears in final color |

### Composition Example (color sweep across elements)
```xml
<!-- 5 circles with staggered color change -->
<circle cx="50" cy="100" r="15" fill="#BDC3C7">
  <animate attributeName="fill" from="#BDC3C7" to="#E74C3C"
    dur="0.3s" begin="0.0s" fill="freeze" />
</circle>
<circle cx="100" cy="100" r="15" fill="#BDC3C7">
  <animate attributeName="fill" from="#BDC3C7" to="#E74C3C"
    dur="0.3s" begin="0.1s" fill="freeze" />
</circle>
<!-- ... etc with begin="0.2s", "0.3s", "0.4s" -->
```

## Examples

### Example 1: Smooth Color Shift on Hover-Like Trigger
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Background -->
  <rect width="200" height="200" fill="#F5F6FA" />

  <!-- Circle that shifts through colors -->
  <circle cx="100" cy="100" r="60" fill="#3498DB">
    <!-- 4-color cycle -->
    <animate
      attributeName="fill"
      values="#3498DB; #9B59B6; #E74C3C; #1ABC9C; #3498DB"
      keyTimes="0; 0.25; 0.5; 0.75; 1"
      dur="6s"
      repeatCount="indefinite" />
  </circle>
</svg>
```

### Example 2: Animated Gradient Background
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" height="200">
  <defs>
    <!-- Linear gradient with animated stop colors -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%">
        <animate attributeName="stop-color"
          values="#667eea; #764ba2; #f093fb; #667eea"
          dur="5s" repeatCount="indefinite" />
      </stop>
      <stop offset="50%">
        <animate attributeName="stop-color"
          values="#764ba2; #f093fb; #667eea; #764ba2"
          dur="5s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%">
        <animate attributeName="stop-color"
          values="#f093fb; #667eea; #764ba2; #f093fb"
          dur="5s" repeatCount="indefinite" />
      </stop>
    </linearGradient>
  </defs>

  <!-- Full-bleed rectangle with animated gradient -->
  <rect width="400" height="200" rx="12" fill="url(#bgGradient)" />

  <!-- Overlay text -->
  <text x="200" y="108" text-anchor="middle"
    font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#FFF">
    Gradient Animation
  </text>
</svg>
```

### Example 3: Flash Alert Effect
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
  <!-- Background -->
  <rect width="300" height="100" fill="#2C3E50" />

  <!-- Alert badge that flashes -->
  <g>
    <!-- Badge background -->
    <rect x="50" y="20" width="200" height="60" rx="30" fill="#E74C3C">
      <!-- Flash white then return -->
      <animate
        attributeName="fill"
        values="#E74C3C; #FFF; #E74C3C; #FFF; #E74C3C"
        keyTimes="0; 0.15; 0.3; 0.45; 0.6"
        dur="1s"
        begin="0.5s"
        fill="freeze" />
    </rect>

    <!-- Alert text -->
    <text x="150" y="58" text-anchor="middle"
      font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#FFF">
      ! ALERT
      <!-- Text inverts during flash -->
      <animate
        attributeName="fill"
        values="#FFF; #E74C3C; #FFF; #E74C3C; #FFF"
        keyTimes="0; 0.15; 0.3; 0.45; 0.6"
        dur="1s"
        begin="0.5s"
        fill="freeze" />
    </text>
  </g>
</svg>
```
