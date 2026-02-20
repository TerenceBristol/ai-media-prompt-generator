# Path Motion

## Description
Moves elements along a defined path — straight lines, bezier curves, circles, or arbitrary shapes. Path motion is the most flexible movement primitive, enabling orbits, figure-eights, custom trajectories, and any motion that cannot be expressed as simple translation. Use `<animateMotion>` in SMIL or `offset-path` in CSS.

## Variants
- **linear-path**: Element moves along a straight line defined by a path. Useful when the line is angled or has specific start/end coordinates.
- **curve-path**: Element follows a bezier curve. Creates graceful, sweeping arcs.
- **orbit**: Element follows a circular or elliptical path around a center point. Planetary/satellite motion.
- **figure-eight**: Element traces a figure-eight (lemniscate). Eye-catching continuous motion.
- **follow-custom-path**: Element follows any arbitrary SVG path. The path can be defined inline or referenced from a `<path>` element.

## SMIL Syntax

### `<animateMotion>` with Inline Path
```xml
<!-- Move element along a cubic bezier curve -->
<animateMotion
  path="M 0,0 C 100,-50 200,50 300,0"
  dur="2s"
  begin="0s"
  fill="freeze"
  rotate="auto" />
```

### `<animateMotion>` with Referenced Path
```xml
<!-- Define the path separately, then reference it -->
<defs>
  <path id="motionPath" d="M 50,150 Q 150,20 250,150" fill="none" />
</defs>

<circle cx="0" cy="0" r="8" fill="#E74C3C">
  <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
    <mpath href="#motionPath" />
  </animateMotion>
</circle>
```

### Orbit (Circular Path)
```xml
<!-- Circular orbit centered at (150, 150) with radius 80 -->
<animateMotion
  path="M 80,0 A 80,80 0 1,1 -80,0 A 80,80 0 1,1 80,0"
  dur="4s"
  repeatCount="indefinite"
  rotate="auto" />
```

Note: The orbit path is a full circle using two arc commands. The element should be positioned at the orbit center, and the path moves relative to that position.

### Figure-Eight
```xml
<!-- Figure-eight using two opposing arcs -->
<animateMotion
  path="M 0,0 C 60,-80 60,80 0,0 C -60,-80 -60,80 0,0"
  dur="4s"
  repeatCount="indefinite"
  rotate="auto" />
```

### Key `<animateMotion>` Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `path` | SVG path data | The motion path (M, L, C, Q, A commands) |
| `rotate` | `auto`, `auto-reverse`, angle | `auto` orients element along path tangent; `auto-reverse` adds 180deg; angle is fixed rotation |
| `keyPoints` | semicolon-separated 0-1 values | Controls position along path at each keyTime |
| `keyTimes` | semicolon-separated 0-1 values | Timing of each keyPoint |
| `calcMode` | paced, linear, spline, discrete | `paced` gives constant speed regardless of path complexity |

## CSS Syntax

### Using `offset-path` (modern CSS)
```css
@keyframes followPath {
  from { offset-distance: 0%; }
  to   { offset-distance: 100%; }
}

.path-follower {
  offset-path: path("M 0,0 C 100,-50 200,50 300,0");
  offset-rotate: auto;
  animation: followPath 2s ease-in-out forwards;
}
```

### Orbit via CSS
```css
@keyframes orbit {
  from { offset-distance: 0%; }
  to   { offset-distance: 100%; }
}

.orbiter {
  offset-path: path("M 80,0 A 80,80 0 1,1 -80,0 A 80,80 0 1,1 80,0");
  offset-rotate: auto;
  animation: orbit 4s linear infinite;
}
```

### CSS `offset-path` Properties

| Property | Values | Description |
|----------|--------|-------------|
| `offset-path` | `path("...")`, `circle(...)`, `ellipse(...)` | The path to follow |
| `offset-distance` | 0% – 100% | Position along the path (animate this) |
| `offset-rotate` | `auto`, `auto Xdeg`, `reverse`, angle | Rotation behavior along path |
| `offset-anchor` | position | Which point of the element sits on the path |

**Browser Support Note:** `offset-path` is supported in all modern browsers (Chrome 55+, Firefox 72+, Safari 16+). For older browsers, use SMIL `<animateMotion>`.

## Parameters

| Parameter | Range | Default | Notes |
|-----------|-------|---------|-------|
| path | SVG path data | (required) | M, L, C, Q, A commands. Relative (lowercase) or absolute (uppercase). |
| duration | 0.5s – 10s | 2s | Longer paths need longer durations for smooth motion |
| rotate | auto, auto-reverse, fixed angle | auto | `auto` rotates element to face direction of travel |
| repeatCount | number or indefinite | 1 | `indefinite` for orbits and continuous paths |
| calcMode | paced, linear, spline | paced | `paced` maintains constant velocity along the path |
| fill | freeze, remove | freeze | `freeze` for one-shot paths; N/A for looping |
| keyPoints | 0-1 values | (none) | Fine control over speed along path segments |

## Path Data Quick Reference

| Command | Syntax | Description |
|---------|--------|-------------|
| M | `M x,y` | Move to (start point) |
| L | `L x,y` | Line to |
| C | `C x1,y1 x2,y2 x,y` | Cubic bezier (two control points) |
| Q | `Q x1,y1 x,y` | Quadratic bezier (one control point) |
| A | `A rx,ry rotation large-arc sweep x,y` | Arc |
| Z | `Z` | Close path (return to M) |

Lowercase versions (m, l, c, q, a) use relative coordinates.

## Inline vs. Referenced Paths

### Inline Path (simpler, self-contained)
```xml
<circle r="10" fill="red">
  <animateMotion path="M0,0 L200,0 L200,200 L0,200 Z" dur="4s"
    repeatCount="indefinite" />
</circle>
```

### Referenced Path (reusable, visible if desired)
```xml
<defs>
  <path id="track" d="M50,150 C50,50 250,50 250,150" fill="none" />
</defs>

<!-- Optionally show the path -->
<use href="#track" stroke="#CCC" stroke-width="1" stroke-dasharray="4" />

<!-- Element follows the path -->
<circle r="8" fill="blue">
  <animateMotion dur="3s" repeatCount="indefinite">
    <mpath href="#track" />
  </animateMotion>
</circle>
```

Advantages of referenced paths:
- Path can be visually rendered (as a track/rail)
- Multiple elements can share the same path
- Path can be styled independently

## Composability

| Combination | Effect | Technique |
|-------------|--------|-----------|
| **path-motion + rotate** | Orient along path + extra spin | Use `rotate="auto"` for path orientation, add `<animateTransform type="rotate">` for additional spin |
| **path-motion + scale** | Grow while moving | Add `<animateTransform type="scale">` alongside `<animateMotion>` |
| **path-motion + fade** | Appear while traveling | Combine `<animate attributeName="opacity">` with `<animateMotion>` |
| **path-motion + draw** | Trail effect | Animate a `<path>` using draw primitive along the same path |
| **path-motion + stagger** | Multiple followers | Several elements follow same path with staggered `begin` times |

### Composition Example (orbit + spin)
```xml
<g transform="translate(150, 150)">
  <rect x="-10" y="-10" width="20" height="20" fill="#F39C12">
    <!-- Follow circular orbit -->
    <animateMotion
      path="M 60,0 A 60,60 0 1,1 -60,0 A 60,60 0 1,1 60,0"
      dur="4s" repeatCount="indefinite" rotate="auto" />
    <!-- Also spin on own axis -->
    <animateTransform
      attributeName="transform" type="rotate"
      from="0" to="360" dur="1s" repeatCount="indefinite" />
  </rect>
</g>
```

## Examples

### Example 1: Element Following a Curved Path
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <!-- Background -->
  <rect width="400" height="300" fill="#F8F9FA" />

  <!-- Define and display the motion path -->
  <path id="curvePath" d="M 50,250 Q 100,50 200,150 T 350,50"
    fill="none" stroke="#BDC3C7" stroke-width="2" stroke-dasharray="6 4" />

  <!-- Moving circle that follows the path -->
  <circle r="12" fill="#9B59B6">
    <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
      <mpath href="#curvePath" />
    </animateMotion>
  </circle>

  <!-- Trail dots along the path (static) -->
  <circle cx="50" cy="250" r="3" fill="#D5D8DC" />
  <circle cx="200" cy="150" r="3" fill="#D5D8DC" />
  <circle cx="350" cy="50" r="3" fill="#D5D8DC" />
</svg>
```

### Example 2: Orbiting Satellite
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
  <!-- Background: space -->
  <rect width="300" height="300" fill="#0C0C1E" />

  <!-- Central planet -->
  <circle cx="150" cy="150" r="30" fill="#3498DB" />
  <!-- Planet highlight -->
  <circle cx="140" cy="140" r="25" fill="#5DADE2" opacity="0.3" />

  <!-- Orbit ring (visual guide) -->
  <circle cx="150" cy="150" r="80" fill="none" stroke="#1A5276" stroke-width="1"
    stroke-dasharray="4 6" opacity="0.5" />

  <!-- Orbiting satellite -->
  <g transform="translate(150, 150)">
    <circle r="6" fill="#E74C3C">
      <!-- Circular orbit path (radius 80) -->
      <animateMotion
        path="M 80,0 A 80,80 0 1,1 -80,0 A 80,80 0 1,1 80,0"
        dur="5s"
        repeatCount="indefinite"
        calcMode="linear" />
    </circle>
  </g>

  <!-- Second satellite, staggered -->
  <g transform="translate(150, 150)">
    <circle r="4" fill="#F39C12">
      <animateMotion
        path="M 80,0 A 80,80 0 1,1 -80,0 A 80,80 0 1,1 80,0"
        dur="5s"
        begin="2.5s"
        repeatCount="indefinite"
        calcMode="linear" />
    </circle>
  </g>
</svg>
```

### Example 3: Figure-Eight Flight Path
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <!-- Background -->
  <rect width="400" height="300" fill="#FDFEFE" />

  <!-- Figure-eight path (visible) -->
  <path d="M 200,150 C 280,50 320,50 280,150 C 240,250 200,250 200,150
           C 200,50 160,50 120,150 C 80,250 120,250 200,150"
    fill="none" stroke="#E8DAEF" stroke-width="2" />

  <!-- Moving element following figure-eight -->
  <g transform="translate(200, 150)">
    <!-- Small airplane/arrow shape -->
    <polygon points="-8,-5 8,0 -8,5" fill="#8E44AD">
      <animateMotion
        path="M 0,0 C 80,-100 120,-100 80,0 C 40,100 0,100 0,0
               C 0,-100 -40,-100 -80,0 C -120,100 -80,100 0,0"
        dur="6s"
        repeatCount="indefinite"
        rotate="auto"
        calcMode="paced" />
    </polygon>
  </g>
</svg>
```
