# Scale

## Description
Resizes elements by applying a scale transform, making them grow, shrink, pulse, or pop into view. Scale animations convey importance, create emphasis, and produce satisfying entrance effects. The pop-in variant (scale past 1.0, then settle back) is especially effective for UI elements and badges.

## Variants
- **grow**: Element scales from 0 (or small) to 1. Classic entrance animation.
- **shrink**: Element scales from 1 to 0 (or small). Dismissal animation.
- **pulse**: Element oscillates between two scale values (e.g., 1.0 and 1.15) repeatedly. Draws attention.
- **bounce-scale**: Element grows past target scale and springs back. Elastic, playful feel.
- **pop-in**: Element scales from 0 to 1.1 to 1. Quick, punchy entrance.

## SMIL Syntax

### Grow (0 to 1)
```xml
<animateTransform
  attributeName="transform"
  type="scale"
  from="0"
  to="1"
  dur="0.5s"
  begin="0s"
  fill="freeze" />
```

### Pop-In (0 → 1.1 → 1)
```xml
<animateTransform
  attributeName="transform"
  type="scale"
  values="0; 1.1; 1"
  keyTimes="0; 0.7; 1"
  dur="0.5s"
  begin="0s"
  fill="freeze" />
```

### Pulse (oscillating)
```xml
<animateTransform
  attributeName="transform"
  type="scale"
  values="1; 1.15; 1"
  keyTimes="0; 0.5; 1"
  dur="1.5s"
  begin="0s"
  repeatCount="indefinite" />
```

### Bounce Scale (elastic overshoot)
```xml
<animateTransform
  attributeName="transform"
  type="scale"
  values="0; 1.2; 0.95; 1.05; 1"
  keyTimes="0; 0.4; 0.6; 0.8; 1"
  dur="0.8s"
  begin="0s"
  fill="freeze" />
```

## CSS Syntax

### Grow
```css
@keyframes grow {
  from { transform: scale(0); }
  to   { transform: scale(1); }
}

.grow {
  animation: grow 0.5s ease-out forwards;
  transform-origin: center center;
}
```

### Pop-In
```css
@keyframes popIn {
  0%   { transform: scale(0); }
  70%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.pop-in {
  animation: popIn 0.5s ease-out forwards;
  transform-origin: center center;
}
```

### Pulse
```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.15); }
}

.pulse {
  animation: pulse 1.5s ease-in-out infinite;
  transform-origin: center center;
}
```

## Parameters

| Parameter | Range | Default | Notes |
|-----------|-------|---------|-------|
| from-scale | 0 – 2 | 0 (grow), 1 (shrink) | Use 0.8 instead of 0 for subtler grow |
| to-scale | 0 – 2 | 1 (grow), 0 (shrink) | Values > 1 create emphasis |
| duration | 0.2s – 1s | 0.5s | Pop-in works best at 0.3s–0.5s; pulse at 1s–2s |
| easing | ease-out, ease-in-out, cubic-bezier | ease-out | ease-out for entrances; ease-in for exits |
| overshoot | 1.05 – 1.3 | 1.1 | How far past 1.0 for pop-in/bounce |
| delay | 0s – 5s | 0s | Stagger delays for sequential pop-ins |
| fill | freeze, remove | freeze | `freeze` holds final scale |
| repeatCount | number or indefinite | 1 | Use `indefinite` for pulse |

## Transform-Origin Gotcha (Important)

**SVG `transform-origin` behaves differently from HTML.** In SVG, transforms default to the SVG viewport origin (0, 0), not the element's center. This means a naive scale animation will scale from the top-left corner of the SVG, not the element's center.

### The Problem
```xml
<!-- BAD: This scales from (0,0) of the SVG, not the circle's center -->
<circle cx="150" cy="100" r="40" fill="red">
  <animateTransform attributeName="transform" type="scale"
    from="0" to="1" dur="0.5s" fill="freeze" />
</circle>
```

### Solution 1: Wrap in `<g>` with translate (recommended for SMIL)
```xml
<!-- GOOD: Translate group to element center, then scale from that origin -->
<g transform="translate(150, 100)">
  <circle cx="0" cy="0" r="40" fill="red">
    <animateTransform attributeName="transform" type="scale"
      from="0" to="1" dur="0.5s" fill="freeze" />
  </circle>
</g>
```

### Solution 2: Use CSS `transform-origin` (works for CSS animations)
```xml
<!-- GOOD for CSS: Set transform-origin explicitly -->
<circle cx="150" cy="100" r="40" fill="red"
  style="transform-origin: 150px 100px; animation: grow 0.5s ease-out forwards;" />
```

### Solution 3: Use `transform-box: fill-box` (modern browsers)
```xml
<!-- GOOD: transform-box makes transform-origin relative to element's bounding box -->
<circle cx="150" cy="100" r="40" fill="red"
  style="transform-box: fill-box; transform-origin: center; animation: grow 0.5s ease-out forwards;" />
```

**Recommendation:** For SMIL animations, always use Solution 1 (translate wrapper). For CSS animations, use Solution 3 when browser support allows, otherwise Solution 2.

## Composability

| Combination | Effect | Technique |
|-------------|--------|-----------|
| **scale + fade** | Pop-in with opacity | Combine scale 0→1 with opacity 0→1. Most common scale composition. |
| **scale + rotate** | Spin-scale | Element spins while growing. Use nested `<g>` elements with separate transforms. |
| **scale + slide** | Zoom-slide | Element scales up while sliding into position. |
| **scale + stagger** | Sequential pop-ins | Multiple elements pop in with incremental delays. Great for grid/list reveals. |
| **scale + color** | Scale with color emphasis | Element grows while shifting to a highlight color. |

### Composition Example (scale + fade pop-in)
```xml
<g transform="translate(100, 100)">
  <circle cx="0" cy="0" r="40" fill="#E74C3C" opacity="0">
    <!-- Scale pop-in -->
    <animateTransform attributeName="transform" type="scale"
      values="0; 1.1; 1" keyTimes="0; 0.7; 1"
      dur="0.5s" fill="freeze" />
    <!-- Fade in -->
    <animate attributeName="opacity"
      from="0" to="1" dur="0.3s" fill="freeze" />
  </circle>
</g>
```

## Examples

### Example 1: Circle Pop-In
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
  <!-- Background -->
  <rect width="300" height="300" fill="#F0F4F8" />

  <!-- Circle pops in from center -->
  <g transform="translate(150, 150)">
    <circle cx="0" cy="0" r="50" fill="#6C5CE7" opacity="0">
      <!-- Pop-in scale: 0 → 1.15 → 1 -->
      <animateTransform
        attributeName="transform"
        type="scale"
        values="0; 1.15; 1"
        keyTimes="0; 0.65; 1"
        dur="0.5s"
        begin="0.3s"
        fill="freeze" />

      <!-- Fade in slightly faster than scale -->
      <animate
        attributeName="opacity"
        from="0"
        to="1"
        dur="0.3s"
        begin="0.3s"
        fill="freeze" />
    </circle>
  </g>
</svg>
```

### Example 2: Pulsing Notification Badge
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Background card -->
  <rect x="30" y="50" width="140" height="100" rx="12" fill="#DFE6E9" />

  <!-- Notification badge that pulses -->
  <g transform="translate(155, 55)">
    <!-- Pulse ring (scales larger) -->
    <circle cx="0" cy="0" r="16" fill="none" stroke="#E17055" stroke-width="2" opacity="0.5">
      <animateTransform
        attributeName="transform"
        type="scale"
        values="1; 1.5; 1"
        keyTimes="0; 0.5; 1"
        dur="2s"
        repeatCount="indefinite" />
      <animate
        attributeName="opacity"
        values="0.5; 0; 0.5"
        dur="2s"
        repeatCount="indefinite" />
    </circle>

    <!-- Solid badge -->
    <circle cx="0" cy="0" r="12" fill="#E17055" />
    <text x="0" y="5" text-anchor="middle"
      font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#FFF">3</text>
  </g>
</svg>
```

### Example 3: Bounce-Scale Button
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" width="300" height="150">
  <!-- Background -->
  <rect width="300" height="150" fill="#2D3436" />

  <!-- Button with elastic bounce entrance -->
  <g transform="translate(150, 75)">
    <g>
      <!-- Button background -->
      <rect x="-70" y="-25" width="140" height="50" rx="25" fill="#00B894" />
      <!-- Button text -->
      <text x="0" y="7" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#FFF">
        Click Me
      </text>

      <!-- Elastic bounce scale -->
      <animateTransform
        attributeName="transform"
        type="scale"
        values="0; 1.2; 0.92; 1.06; 0.98; 1"
        keyTimes="0; 0.3; 0.5; 0.7; 0.85; 1"
        dur="1s"
        begin="0.5s"
        fill="freeze" />
    </g>
  </g>
</svg>
```
