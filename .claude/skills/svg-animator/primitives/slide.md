# Slide

## Description
Moves elements along the X and/or Y axis to create entrance, exit, and repositioning animations. Slide is the primary motion primitive for introducing content into a scene or moving elements between positions. Combine with fade for polished entrances, or add overshoot easing for playful, bouncy arrivals.

## Variants
- **slide-in-left**: Element enters from the left side, moving rightward to its final position.
- **slide-in-right**: Element enters from the right side, moving leftward to its final position.
- **slide-in-top**: Element enters from above, moving downward to its final position.
- **slide-in-bottom**: Element enters from below, moving upward to its final position.
- **slide-out-left / right / top / bottom**: Element exits in the specified direction.
- **slide-and-settle**: Element slides in with overshoot — moves past the target, then springs back to settle. Creates a bouncy, energetic feel.

## SMIL Syntax

### Using `<animateTransform>` (recommended for most cases)
```xml
<!-- Slide in from the left (translate X from -200 to 0) -->
<animateTransform
  attributeName="transform"
  type="translate"
  from="-200 0"
  to="0 0"
  dur="0.6s"
  begin="0s"
  fill="freeze" />
```

### Using `<animate>` on positional attributes (for simple shapes)
```xml
<!-- Slide a rect's x position -->
<animate
  attributeName="x"
  from="-100"
  to="50"
  dur="0.6s"
  begin="0s"
  fill="freeze" />
```

### Slide and Settle (overshoot with `values` + `keyTimes`)
```xml
<!-- Slide in from left with overshoot: -200 → 10 → -3 → 0 -->
<animateTransform
  attributeName="transform"
  type="translate"
  values="-200 0; 10 0; -3 0; 0 0"
  keyTimes="0; 0.6; 0.8; 1"
  dur="0.8s"
  begin="0s"
  fill="freeze" />
```

### Direction Reference (SMIL translate values)
| Direction | from | to |
|-----------|------|----|
| slide-in-left | `-[distance] 0` | `0 0` |
| slide-in-right | `[distance] 0` | `0 0` |
| slide-in-top | `0 -[distance]` | `0 0` |
| slide-in-bottom | `0 [distance]` | `0 0` |
| slide-out-left | `0 0` | `-[distance] 0` |
| slide-out-right | `0 0` | `[distance] 0` |
| slide-out-top | `0 0` | `0 -[distance]` |
| slide-out-bottom | `0 0` | `0 [distance]` |

## CSS Syntax

### Slide In from Left
```css
@keyframes slideInLeft {
  from { transform: translateX(-100%); }
  to   { transform: translateX(0); }
}

.slide-in-left {
  animation: slideInLeft 0.6s ease-out forwards;
}
```

### Slide In from Bottom
```css
@keyframes slideInBottom {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}

.slide-in-bottom {
  animation: slideInBottom 0.6s ease-out forwards;
}
```

### Slide and Settle (overshoot)
```css
@keyframes slideAndSettle {
  0%   { transform: translateX(-200px); }
  60%  { transform: translateX(10px); }
  80%  { transform: translateX(-3px); }
  100% { transform: translateX(0); }
}

.slide-and-settle {
  animation: slideAndSettle 0.8s ease-out forwards;
}
```

## Parameters

| Parameter | Range | Default | Notes |
|-----------|-------|---------|-------|
| distance | 50px – 200% | 100% of element width/height | Use absolute px for precise control; use % for responsive slides |
| direction | left, right, top, bottom | left | Determines axis and sign of translation |
| duration | 0.3s – 1.5s | 0.6s | Shorter for snappy UI; longer for dramatic entrances |
| easing | ease-out (recommended), ease-in-out, cubic-bezier | ease-out | ease-out for entrances; ease-in for exits |
| overshoot | 5px – 30px | 10px | Only for slide-and-settle variant; how far past target |
| delay | 0s – 5s | 0s | Use for sequencing multiple slides |
| fill | freeze, remove | freeze | `freeze` holds the final position |

## Composability

| Combination | Effect | Technique |
|-------------|--------|-----------|
| **slide + fade** | Smooth entrance/exit | Add `<animate attributeName="opacity">` alongside the translate. This is the most common composition. |
| **slide + scale** | Zoom-slide | Element grows as it slides into position. Apply both translate and scale transforms. |
| **slide + stagger** | Cascade slide | Multiple elements slide in with incremental delays. Creates a "waterfall" of content. |
| **slide + rotate** | Tumble-in | Element rotates while sliding. Use two `<animateTransform>` with `additive="sum"`. |
| **slide + bounce** | Bouncy entrance | Use `values` with multiple keyframes to create bounce at the end of a slide. |

### Transform Stacking Note
When combining slide with other `<animateTransform>` primitives (rotate, scale), you must use `additive="sum"` on each transform animation, and wrap the element in a `<g>` for each independent transform:

```xml
<!-- Outer group handles slide, inner group handles scale -->
<g>
  <animateTransform attributeName="transform" type="translate"
    from="-200 0" to="0 0" dur="0.6s" fill="freeze" />
  <g>
    <animateTransform attributeName="transform" type="scale"
      from="0.5" to="1" dur="0.6s" fill="freeze" />
    <rect x="-25" y="-25" width="50" height="50" fill="#4A90D9" />
  </g>
</g>
```

## Examples

### Example 1: Element Sliding In from the Left
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" height="200">
  <!-- Background -->
  <rect width="400" height="200" fill="#F5F5F5" />

  <!-- Blue rectangle slides in from the left -->
  <rect x="150" y="60" width="100" height="80" rx="8" fill="#3498DB">
    <animateTransform
      attributeName="transform"
      type="translate"
      from="-300 0"
      to="0 0"
      dur="0.7s"
      begin="0.3s"
      fill="freeze"
      calcMode="spline"
      keySplines="0.25 0.1 0.25 1" />
  </rect>
</svg>
```

### Example 2: Text Sliding Up from Bottom with Fade
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" height="200">
  <!-- Background -->
  <rect width="400" height="200" fill="#2C3E50" />

  <!-- Text slides up from bottom and fades in -->
  <text x="200" y="110" text-anchor="middle"
    font-family="Arial, sans-serif" font-size="28" font-weight="bold"
    fill="#ECF0F1" opacity="0">
    Hello World

    <!-- Slide up -->
    <animateTransform
      attributeName="transform"
      type="translate"
      from="0 60"
      to="0 0"
      dur="0.8s"
      begin="0.5s"
      fill="freeze"
      calcMode="spline"
      keySplines="0.25 0.1 0.25 1" />

    <!-- Fade in -->
    <animate
      attributeName="opacity"
      from="0"
      to="1"
      dur="0.8s"
      begin="0.5s"
      fill="freeze" />
  </text>
</svg>
```

### Example 3: Slide and Settle with Overshoot
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" height="200">
  <!-- Background -->
  <rect width="400" height="200" fill="#1A1A2E" />

  <!-- Card slides in from left with bounce settle -->
  <g>
    <rect x="120" y="40" width="160" height="120" rx="12" fill="#E94560" />
    <text x="200" y="108" text-anchor="middle"
      font-family="Arial, sans-serif" font-size="18" fill="#FFF">
      Bouncy Card
    </text>

    <!-- Slide with overshoot -->
    <animateTransform
      attributeName="transform"
      type="translate"
      values="-400 0; 15 0; -5 0; 0 0"
      keyTimes="0; 0.55; 0.78; 1"
      dur="1s"
      begin="0.3s"
      fill="freeze" />
  </g>
</svg>
```
