# Morph

## Description
Interpolates between two or more SVG path shapes, smoothly transitioning one form into another. Morph is the most visually striking primitive — it creates magical transformations like a circle becoming a star, a square melting into a blob, or an icon transitioning between states. The key constraint is that source and target paths must have compatible structures for smooth interpolation.

## Variants
- **shape-morph**: One distinct shape transforms into another (circle to star, square to triangle). Uses `<animate>` on the `d` attribute.
- **path-morph**: Arbitrary path data interpolation. The `d` attribute transitions between two path strings.
- **smooth-morph**: Multi-step morph with intermediate shapes defined via `values`. Creates controlled transitions through specific forms.

## SMIL Syntax

### Basic Shape Morph
```xml
<!-- Morph from one path to another -->
<animate
  attributeName="d"
  from="M 50,100 L 100,20 L 150,100 Z"
  to="M 30,80 L 100,10 L 170,80 L 130,140 L 70,140 Z"
  dur="1s"
  begin="0s"
  fill="freeze" />
```

### Multi-Step Morph (via `values`)
```xml
<!-- Morph through multiple shapes -->
<animate
  attributeName="d"
  values="
    M 50,100 L 100,20 L 150,100 Z;
    M 30,80 L 100,10 L 170,80 L 130,140 L 70,140 Z;
    M 50,100 L 100,20 L 150,100 Z
  "
  keyTimes="0; 0.5; 1"
  dur="3s"
  begin="0s"
  fill="freeze"
  repeatCount="indefinite" />
```

### Eased Morph
```xml
<animate
  attributeName="d"
  from="M ..."
  to="M ..."
  dur="1.5s"
  fill="freeze"
  calcMode="spline"
  keySplines="0.42 0 0.58 1" />
```

## CSS Syntax

CSS cannot directly animate the SVG `d` attribute in older browsers. However, modern CSS (Chrome 89+, Firefox 97+, Safari 17.4+) supports animating `d` as a CSS property:

### CSS `d` Animation (modern browsers)
```css
@keyframes morph {
  from { d: path("M 50,100 L 100,20 L 150,100 Z"); }
  to   { d: path("M 30,80 L 100,10 L 170,80 L 130,140 L 70,140 Z"); }
}

.morphing-shape {
  animation: morph 1s ease-in-out forwards;
}
```

### Fallback: Morph via CSS clip-path
```css
@keyframes clipMorph {
  from { clip-path: circle(50% at 50% 50%); }
  to   { clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%); }
}

.clip-morph {
  animation: clipMorph 1s ease-in-out forwards;
}
```

Note: `clip-path` morphing works reliably across browsers but only affects the clipping shape, not the actual SVG path geometry.

## Parameters

| Parameter | Range | Default | Notes |
|-----------|-------|---------|-------|
| from-path | SVG path data | (required) | Starting shape as `d` attribute value |
| to-path | SVG path data | (required) | Ending shape as `d` attribute value |
| duration | 0.5s – 3s | 1s | Longer for dramatic reveals; shorter for state changes |
| easing | linear, ease-in-out, cubic-bezier | ease-in-out | ease-in-out feels most natural for morphs |
| fill | freeze, remove | freeze | `freeze` holds the final shape |
| intermediate-shapes | SVG path data | (none) | Use `values` for multi-step morphing |

## Path Compatibility (Critical)

For smooth morphing, the source and target paths **MUST** have the same structure:

### Rule 1: Same Number of Commands
```
GOOD:  M L L L Z  -->  M L L L Z      (4 commands each)
BAD:   M L L Z    -->  M L L L L Z    (3 vs 5 commands)
```

### Rule 2: Same Command Types
```
GOOD:  M C C C Z  -->  M C C C Z      (same types)
BAD:   M L L L Z  -->  M C C C Z      (line vs curve mismatch)
```

### Rule 3: Same Number of Points
Each command must use the same number of coordinate pairs.

### Techniques for Matching Paths

**Adding extra points to simpler shapes:**
```xml
<!-- Circle approximated as 4 cubic beziers (common pattern) -->
<!-- Star with matching 4 cubic bezier segments -->
```

**Collapsing extra points:**
If one shape has more points, duplicate points in the simpler shape at the same position:
```xml
<!-- Triangle with 3 points → add duplicate points to match pentagon's 5 -->
<!-- M 100,20 L 100,20 L 180,150 L 20,150 L 20,150 Z  (point 1 and 5 duplicated) -->
```

**Use a morph-compatible path generator:**
Tools like Flubber.js, GSAP MorphSVG, or SVG Shape Morph can automatically match path complexity. For pure SMIL/CSS, you must manually ensure compatibility.

### Common Compatible Shape Pairs

| Shape A | Shape B | Compatible? | Notes |
|---------|---------|-------------|-------|
| Circle (4 arcs) | Rounded square (4 arcs) | Yes | Both use 4 arc segments |
| Triangle (3 lines) | Triangle (3 lines) | Yes | Same structure |
| Pentagon (5 lines) | Star (5 lines + 5 lines) | No | Different point count — need to add points to pentagon |
| Rectangle (4 lines) | Diamond (4 lines) | Yes | Same 4-line structure |

## Composability

| Combination | Effect | Technique |
|-------------|--------|-----------|
| **morph + color** | Shape change + color shift | Animate both `d` and `fill` simultaneously |
| **morph + fade** | Crossfade morph | Fade out shape A while fading in shape B (alternative to path morph when paths are incompatible) |
| **morph + scale** | Morph while growing | Combine `<animate attributeName="d">` with `<animateTransform type="scale">` |
| **morph + rotate** | Morph while spinning | Shape transforms during rotation |
| **morph + draw** | Draw then morph | Stroke draws in a shape, then the shape morphs to another form |

### Crossfade as Morph Fallback
When paths are incompatible and cannot be made compatible, use a crossfade instead:
```xml
<!-- Shape A fades out -->
<path d="M ..." fill="#E74C3C" opacity="1">
  <animate attributeName="opacity" from="1" to="0" dur="0.8s" fill="freeze" />
</path>
<!-- Shape B fades in -->
<path d="M ..." fill="#3498DB" opacity="0">
  <animate attributeName="opacity" from="0" to="1" dur="0.8s" fill="freeze" />
</path>
```

## Examples

### Example 1: Circle to Rounded Square Morph
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Background -->
  <rect width="200" height="200" fill="#2C3E50" />

  <!-- Shape that morphs from circle to rounded square -->
  <!-- Both shapes use 4 cubic bezier curves for compatibility -->
  <path fill="#1ABC9C">
    <!-- Circle as 4 cubic bezier arcs -->
    <animate
      attributeName="d"
      values="
        M 100,40 C 133,40 160,67 160,100 C 160,133 133,160 100,160 C 67,160 40,133 40,100 C 40,67 67,40 100,40 Z;
        M 100,45 C 145,45 155,45 155,100 C 155,155 155,155 100,155 C 45,155 45,155 45,100 C 45,45 45,45 100,45 Z;
        M 100,40 C 133,40 160,67 160,100 C 160,133 133,160 100,160 C 67,160 40,133 40,100 C 40,67 67,40 100,40 Z
      "
      dur="3s"
      repeatCount="indefinite"
      calcMode="spline"
      keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
      keyTimes="0; 0.5; 1" />
  </path>
</svg>
```

### Example 2: Wave Shape Animation
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" height="200">
  <!-- Background -->
  <rect width="400" height="200" fill="#E8F8F5" />

  <!-- Animated wave that shifts between two wave states -->
  <path fill="#3498DB" opacity="0.6">
    <animate
      attributeName="d"
      values="
        M 0,120 C 50,80 100,80 150,120 C 200,160 250,160 300,120 C 350,80 380,80 400,120 L 400,200 L 0,200 Z;
        M 0,120 C 50,160 100,160 150,120 C 200,80 250,80 300,120 C 350,160 380,160 400,120 L 400,200 L 0,200 Z;
        M 0,120 C 50,80 100,80 150,120 C 200,160 250,160 300,120 C 350,80 380,80 400,120 L 400,200 L 0,200 Z
      "
      dur="4s"
      repeatCount="indefinite"
      calcMode="spline"
      keySplines="0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95"
      keyTimes="0; 0.5; 1" />
  </path>

  <!-- Second wave layer, offset timing -->
  <path fill="#2980B9" opacity="0.4">
    <animate
      attributeName="d"
      values="
        M 0,140 C 60,100 120,100 180,140 C 240,180 300,180 360,140 L 360,200 L 0,200 Z;
        M 0,140 C 60,180 120,180 180,140 C 240,100 300,100 360,140 L 360,200 L 0,200 Z;
        M 0,140 C 60,100 120,100 180,140 C 240,180 300,180 360,140 L 360,200 L 0,200 Z
      "
      dur="3.5s"
      begin="0.5s"
      repeatCount="indefinite"
      calcMode="spline"
      keySplines="0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95"
      keyTimes="0; 0.5; 1" />
  </path>
</svg>
```

### Example 3: Morph with Color Shift
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Background -->
  <rect width="200" height="200" fill="#1A1A2E" />

  <!-- Diamond morphs to circle while changing color -->
  <!-- Both use 4 cubic bezier segments for compatibility -->
  <path>
    <!-- Shape morph: diamond → circle -->
    <animate
      attributeName="d"
      values="
        M 100,30 C 100,30 170,100 170,100 C 170,100 100,170 100,170 C 100,170 30,100 30,100 C 30,100 100,30 100,30 Z;
        M 100,30 C 138,30 170,62 170,100 C 170,138 138,170 100,170 C 62,170 30,138 30,100 C 30,62 62,30 100,30 Z
      "
      dur="2s"
      begin="0.5s"
      fill="freeze"
      calcMode="spline"
      keySplines="0.42 0 0.58 1" />

    <!-- Color shift: orange → teal -->
    <animate
      attributeName="fill"
      from="#E17055"
      to="#00CEC9"
      dur="2s"
      begin="0.5s"
      fill="freeze" />
  </path>
</svg>
```
