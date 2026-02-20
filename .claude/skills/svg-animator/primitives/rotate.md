# Rotate

## Description
Applies rotational transformation to elements around a specified center point. Rotation creates dynamic, energetic motion — from loading spinners and gear mechanisms to playful entrances and pendulum swings. The center-point specification is critical in SVG rotation and differs significantly between SMIL and CSS approaches.

## Variants
- **continuous-spin**: Element rotates 360 degrees endlessly. Classic loading spinner, gear, or wheel motion.
- **oscillate**: Element swings back and forth like a pendulum, rotating between +angle and -angle. Natural for hanging objects, clock pendulums, or swaying.
- **flip**: Element rotates 180 or 360 degrees for a card-flip or coin-flip effect.
- **rotate-in**: Element starts at a rotated angle and animates to 0 degrees. Entrance animation.

## SMIL Syntax

### Continuous Spin
```xml
<!-- Rotate 360° around point (cx, cy) — repeats forever -->
<animateTransform
  attributeName="transform"
  type="rotate"
  from="0 100 100"
  to="360 100 100"
  dur="2s"
  repeatCount="indefinite" />
```

**SMIL rotate value format:** `"angle centerX centerY"`
- `from="0 100 100"` means: start at 0 degrees, rotating around point (100, 100)
- `to="360 100 100"` means: end at 360 degrees, same center point

### Counter-Clockwise Spin
```xml
<animateTransform
  attributeName="transform"
  type="rotate"
  from="360 100 100"
  to="0 100 100"
  dur="2s"
  repeatCount="indefinite" />
```

### Oscillate (Pendulum)
```xml
<!-- Swing between -30° and +30° around (100, 20) — pivot at top -->
<animateTransform
  attributeName="transform"
  type="rotate"
  values="-30 100 20; 30 100 20; -30 100 20"
  keyTimes="0; 0.5; 1"
  dur="2s"
  repeatCount="indefinite"
  calcMode="spline"
  keySplines="0.45 0.03 0.515 0.955; 0.45 0.03 0.515 0.955" />
```

### Flip (180 degrees)
```xml
<animateTransform
  attributeName="transform"
  type="rotate"
  from="0 100 75"
  to="180 100 75"
  dur="0.6s"
  fill="freeze" />
```

### Rotate-In (from tilted to upright)
```xml
<animateTransform
  attributeName="transform"
  type="rotate"
  from="-90 100 100"
  to="0 100 100"
  dur="0.5s"
  fill="freeze"
  calcMode="spline"
  keySplines="0.25 0.1 0.25 1" />
```

## CSS Syntax

### Continuous Spin
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spin {
  animation: spin 2s linear infinite;
  transform-origin: center center;
}
```

### Counter-Clockwise
```css
@keyframes spinCCW {
  from { transform: rotate(360deg); }
  to   { transform: rotate(0deg); }
}
```

### Oscillate (Pendulum)
```css
@keyframes pendulum {
  0%, 100% { transform: rotate(-30deg); }
  50%      { transform: rotate(30deg); }
}

.pendulum {
  animation: pendulum 2s ease-in-out infinite;
  transform-origin: 50% 0%; /* pivot at top center */
}
```

### Rotate-In
```css
@keyframes rotateIn {
  from { transform: rotate(-90deg); opacity: 0; }
  to   { transform: rotate(0deg); opacity: 1; }
}

.rotate-in {
  animation: rotateIn 0.5s ease-out forwards;
  transform-origin: center center;
}
```

## Parameters

| Parameter | Range | Default | Notes |
|-----------|-------|---------|-------|
| angle | -360 – 360 | 360 (spin), ±30 (oscillate) | Positive = clockwise, negative = counter-clockwise |
| center-x (cx) | any coordinate | Element center | SMIL: specified in the value string; CSS: via `transform-origin` |
| center-y (cy) | any coordinate | Element center | For pendulums, set to the pivot/hang point |
| duration | 0.3s – 5s | 2s (spin), 0.5s (rotate-in) | Slower = stately; faster = energetic |
| direction | cw / ccw | cw | Clockwise or counter-clockwise |
| repeatCount | number or indefinite | indefinite (spin), 1 (flip) | Use `indefinite` for continuous, finite for entrances |
| easing | linear (spin), ease-in-out (oscillate) | varies | Spins should be `linear`; oscillations need easing |
| fill | freeze, remove | freeze (one-shot), N/A (looping) | One-shot rotations should freeze |

## Center-Point Behavior (Important)

### SMIL: Center Point in Value String
In SMIL, the center of rotation is embedded directly in the `from`/`to`/`values` attributes:
```
"angle centerX centerY"
```
This is unique to the `rotate` type. Other transform types (translate, scale) do not include center coordinates.

```xml
<!-- Rotate around the element's center (100, 100) -->
<animateTransform type="rotate" from="0 100 100" to="360 100 100" ... />

<!-- Rotate around top-left corner (0, 0) -->
<animateTransform type="rotate" from="0 0 0" to="360 0 0" ... />

<!-- Rotate around a custom pivot (50, 20) — e.g., a pendulum hinge -->
<animateTransform type="rotate" from="-30 50 20" to="30 50 20" ... />
```

### CSS: Use `transform-origin`
```css
/* Rotate around element center */
.spin { transform-origin: center center; }

/* Rotate around top-center (pendulum pivot) */
.pendulum { transform-origin: 50% 0%; }

/* Rotate around specific SVG coordinate */
.custom-pivot { transform-origin: 50px 20px; }
```

### SVG CSS `transform-origin` Gotcha
In SVG, `transform-origin` defaults to the SVG viewport origin (0, 0), not the element center. Use `transform-box: fill-box` to make `transform-origin: center` work relative to the element:

```css
.element {
  transform-box: fill-box;
  transform-origin: center;
  animation: spin 2s linear infinite;
}
```

## Composability

| Combination | Effect | Technique |
|-------------|--------|-----------|
| **rotate + scale** | Spin-grow | Element spins while scaling up. Nest in two `<g>` groups with separate transforms. |
| **rotate + fade** | Spin-in / spin-out | Rotate while fading in for a swirl entrance. |
| **rotate + path-motion** | Orbit with rotation | Element follows orbital path while also spinning on its own axis (planet effect). |
| **rotate + slide** | Tumble | Element rotates while translating. Simulates rolling or falling. |
| **rotate + stagger** | Sequential spins | Multiple elements spin in with staggered delays (gear train, fan). |

### Nested Transform Groups for Composition
When combining rotate with other transforms, use separate `<g>` wrappers:
```xml
<!-- Outer: handles slide | Inner: handles rotate -->
<g>
  <animateTransform attributeName="transform" type="translate"
    from="-200 0" to="0 0" dur="0.8s" fill="freeze" />
  <g>
    <animateTransform attributeName="transform" type="rotate"
      from="-360 0 0" to="0 0 0" dur="0.8s" fill="freeze" />
    <rect x="-20" y="-20" width="40" height="40" fill="#E74C3C" />
  </g>
</g>
```

## Examples

### Example 1: Loading Spinner
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Background -->
  <rect width="200" height="200" fill="#2C3E50" />

  <!-- Spinner ring: partial arc that rotates continuously -->
  <circle cx="100" cy="100" r="35" fill="none"
    stroke="#3498DB" stroke-width="6"
    stroke-dasharray="165" stroke-dashoffset="50"
    stroke-linecap="round">
    <!-- Continuous clockwise rotation around center -->
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 100 100"
      to="360 100 100"
      dur="1s"
      repeatCount="indefinite" />
  </circle>
</svg>
```

### Example 2: Pendulum Swing
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="200" height="300">
  <!-- Background -->
  <rect width="200" height="300" fill="#FDF2E9" />

  <!-- Pivot point -->
  <circle cx="100" cy="30" r="5" fill="#7F8C8D" />

  <!-- Pendulum arm + bob, pivoting from (100, 30) -->
  <g>
    <!-- Arm -->
    <line x1="100" y1="30" x2="100" y2="200" stroke="#5D6D7E" stroke-width="3" />
    <!-- Bob -->
    <circle cx="100" cy="210" r="20" fill="#E74C3C" />

    <!-- Oscillate ±25° around pivot point (100, 30) -->
    <animateTransform
      attributeName="transform"
      type="rotate"
      values="-25 100 30; 25 100 30; -25 100 30"
      keyTimes="0; 0.5; 1"
      dur="2.5s"
      repeatCount="indefinite"
      calcMode="spline"
      keySplines="0.45 0.03 0.515 0.955; 0.45 0.03 0.515 0.955" />
  </g>
</svg>
```

### Example 3: Interlocking Gears
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="300" height="200">
  <!-- Background -->
  <rect width="300" height="200" fill="#1A1A2E" />

  <!-- Gear 1: rotates clockwise -->
  <g>
    <circle cx="110" cy="100" r="40" fill="none" stroke="#00B894" stroke-width="8"
      stroke-dasharray="20 10" />
    <circle cx="110" cy="100" r="15" fill="#00B894" />
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 110 100"
      to="360 110 100"
      dur="4s"
      repeatCount="indefinite" />
  </g>

  <!-- Gear 2: rotates counter-clockwise (meshing) -->
  <g>
    <circle cx="190" cy="100" r="30" fill="none" stroke="#E17055" stroke-width="8"
      stroke-dasharray="15 8" />
    <circle cx="190" cy="100" r="12" fill="#E17055" />
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="360 190 100"
      to="0 190 100"
      dur="3s"
      repeatCount="indefinite" />
  </g>
</svg>
```
