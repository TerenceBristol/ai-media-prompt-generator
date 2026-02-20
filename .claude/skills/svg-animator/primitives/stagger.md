# Stagger

## Description
Stagger is a timing modifier that applies sequential delays to a group of elements, causing them to animate one after another rather than all at once. Unlike the other primitives, stagger does not define what motion occurs — it defines when each element's motion begins. Stagger turns any single-element animation into a group choreography: cascade reveals, wave effects, domino sequences, and synchronized dances.

## Variants
- **sequential**: Elements animate one after another with no overlap. Element N+1 starts only after element N finishes. Clean and orderly.
- **cascade**: Elements animate with overlapping timing — each starts before the previous one finishes. Creates a fluid wave-like flow.
- **random-stagger**: Elements have randomized delays rather than sequential ones. Creates organic, natural-feeling reveals.
- **wave**: Delays follow a sinusoidal pattern, creating a wave that can propagate across rows/columns of elements.
- **reverse-stagger**: Last element animates first, progressing backward to the first element. Good for exit animations or "sucking in" effects.

## SMIL Syntax

### Sequential Stagger (using `begin` attribute)
```xml
<!-- Element 0 -->
<rect ...>
  <animate ... begin="0s" dur="0.5s" fill="freeze" />
</rect>

<!-- Element 1 -->
<rect ...>
  <animate ... begin="0.5s" dur="0.5s" fill="freeze" />
</rect>

<!-- Element 2 -->
<rect ...>
  <animate ... begin="1.0s" dur="0.5s" fill="freeze" />
</rect>

<!-- Element 3 -->
<rect ...>
  <animate ... begin="1.5s" dur="0.5s" fill="freeze" />
</rect>
```

### Cascade Stagger (overlapping timing)
```xml
<!-- Element 0 -->
<rect ...>
  <animate ... begin="0s" dur="0.5s" fill="freeze" />
</rect>

<!-- Element 1: starts at 0.15s (before element 0 finishes at 0.5s) -->
<rect ...>
  <animate ... begin="0.15s" dur="0.5s" fill="freeze" />
</rect>

<!-- Element 2 -->
<rect ...>
  <animate ... begin="0.3s" dur="0.5s" fill="freeze" />
</rect>

<!-- Element 3 -->
<rect ...>
  <animate ... begin="0.45s" dur="0.5s" fill="freeze" />
</rect>
```

### Event-Based Sequential (SMIL `begin` referencing previous element)
```xml
<!-- Element A starts at 0s -->
<rect id="elemA" ...>
  <animate id="animA" ... begin="0s" dur="0.5s" fill="freeze" />
</rect>

<!-- Element B starts 0.1s after A begins -->
<rect id="elemB" ...>
  <animate id="animB" ... begin="animA.begin+0.1s" dur="0.5s" fill="freeze" />
</rect>

<!-- Element C starts 0.1s after B begins -->
<rect id="elemC" ...>
  <animate ... begin="animB.begin+0.1s" dur="0.5s" fill="freeze" />
</rect>
```

### Reverse Stagger
```xml
<!-- 5 elements, last one starts first -->
<!-- Element 4 (starts first) -->
<rect ...>
  <animate ... begin="0s" dur="0.4s" fill="freeze" />
</rect>
<!-- Element 3 -->
<rect ...>
  <animate ... begin="0.1s" dur="0.4s" fill="freeze" />
</rect>
<!-- Element 2 -->
<rect ...>
  <animate ... begin="0.2s" dur="0.4s" fill="freeze" />
</rect>
<!-- Element 1 -->
<rect ...>
  <animate ... begin="0.3s" dur="0.4s" fill="freeze" />
</rect>
<!-- Element 0 (starts last) -->
<rect ...>
  <animate ... begin="0.4s" dur="0.4s" fill="freeze" />
</rect>
```

## CSS Syntax

### Cascade Stagger (using `animation-delay`)
```css
.stagger-item {
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
}

.stagger-item:nth-child(1) { animation-delay: 0s; }
.stagger-item:nth-child(2) { animation-delay: 0.1s; }
.stagger-item:nth-child(3) { animation-delay: 0.2s; }
.stagger-item:nth-child(4) { animation-delay: 0.3s; }
.stagger-item:nth-child(5) { animation-delay: 0.4s; }
```

### Using CSS Custom Properties for Dynamic Stagger
```css
.stagger-item {
  opacity: 0;
  animation: fadeSlideIn 0.5s ease-out forwards;
  animation-delay: calc(var(--i) * 0.1s);
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```
```xml
<!-- In SVG, set custom property per element -->
<rect style="--i: 0" class="stagger-item" ... />
<rect style="--i: 1" class="stagger-item" ... />
<rect style="--i: 2" class="stagger-item" ... />
<rect style="--i: 3" class="stagger-item" ... />
<rect style="--i: 4" class="stagger-item" ... />
```

### Wave Stagger (sinusoidal delays via custom properties)
```css
.wave-item {
  animation: waveMove 1s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.15s);
}

@keyframes waveMove {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-20px); }
}
```

## Parameters

| Parameter | Range | Default | Notes |
|-----------|-------|---------|-------|
| base-delay | 0s – 2s | 0s | Initial delay before the first element starts |
| increment | 0.05s – 0.5s | 0.1s | Time between each element's start |
| overlap | 0 – 1 (proportion) | 0.3 | For cascade: how much each animation overlaps the previous |
| direction | forward, reverse, center-out, edges-in | forward | Direction of the stagger sequence |
| total-elements | 2+ | (required) | Number of elements in the stagger group |
| animation-duration | 0.2s – 2s | 0.5s | Duration of each individual element's animation |
| easing | any | ease-out | Applied to each individual animation |

## Delay Calculation Formulas

### Sequential (no overlap)
```
delay(i) = baseDelay + i * (duration + gap)

Example (5 elements, 0.5s duration, 0.1s gap):
  Element 0: 0s
  Element 1: 0.6s
  Element 2: 1.2s
  Element 3: 1.8s
  Element 4: 2.4s
  Total: 2.9s (last element starts at 2.4s + 0.5s duration)
```

### Cascade (overlapping)
```
delay(i) = baseDelay + i * increment

Example (5 elements, 0.5s duration, 0.1s increment):
  Element 0: 0s
  Element 1: 0.1s
  Element 2: 0.2s
  Element 3: 0.3s
  Element 4: 0.4s
  Total: 0.9s (last element finishes at 0.4s + 0.5s)
```

### Wave (sinusoidal)
```
delay(i) = baseDelay + i * (period / totalElements)

Example (8 elements, 2s period):
  Element 0: 0.00s
  Element 1: 0.25s
  Element 2: 0.50s
  Element 3: 0.75s
  Element 4: 1.00s
  Element 5: 1.25s
  Element 6: 1.50s
  Element 7: 1.75s
```

### Center-Out
```
middleIndex = floor(totalElements / 2)
delay(i) = baseDelay + abs(i - middleIndex) * increment

Example (5 elements, 0.15s increment):
  Element 0: 0.30s  (|0-2| * 0.15)
  Element 1: 0.15s  (|1-2| * 0.15)
  Element 2: 0.00s  (center, starts first)
  Element 3: 0.15s  (|3-2| * 0.15)
  Element 4: 0.30s  (|4-2| * 0.15)
```

### Reverse
```
delay(i) = baseDelay + (totalElements - 1 - i) * increment

Example (5 elements, 0.1s increment):
  Element 0: 0.4s
  Element 1: 0.3s
  Element 2: 0.2s
  Element 3: 0.1s
  Element 4: 0.0s  (last element starts first)
```

## Composability

Stagger is a **universal timing modifier**. It applies to ANY other primitive:

| Combination | Effect | How |
|-------------|--------|-----|
| **stagger + fade** | Sequential reveal | Apply fade-in to each element with staggered `begin` times |
| **stagger + slide** | Cascade slide-in | Elements slide in from the same direction with incremental delays |
| **stagger + scale** | Sequential pop-in | Elements pop in one after another — great for grids, lists |
| **stagger + rotate** | Sequential spins | Elements rotate in with stagger — fan-open, gear train |
| **stagger + draw** | Multi-path draw | Illustration paths draw in sequence |
| **stagger + color** | Color wave/sweep | Color change propagates across elements |
| **stagger + morph** | Sequential shape changes | Elements morph one after another |
| **stagger + path-motion** | Multiple followers | Elements follow same path with staggered starts |
| **stagger + text** | Typewriter / letter cascade | Characters/words appear sequentially (text primitive uses stagger internally) |

### The Meta-Pattern
Stagger is applied by calculating the `begin` time for each element's existing animation. The animation itself (fade, slide, scale, etc.) stays the same — only the timing changes:

```xml
<!-- Same animation applied to 5 elements with stagger -->
<g id="elem0">
  <animate ... begin="0.0s" ... />  <!-- stagger delay: 0 * 0.1s -->
</g>
<g id="elem1">
  <animate ... begin="0.1s" ... />  <!-- stagger delay: 1 * 0.1s -->
</g>
<g id="elem2">
  <animate ... begin="0.2s" ... />  <!-- stagger delay: 2 * 0.1s -->
</g>
<g id="elem3">
  <animate ... begin="0.3s" ... />  <!-- stagger delay: 3 * 0.1s -->
</g>
<g id="elem4">
  <animate ... begin="0.4s" ... />  <!-- stagger delay: 4 * 0.1s -->
</g>
```

## Examples

### Example 1: Staggered Fade-In (5 Bars)
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="400" height="200">
  <!-- Background -->
  <rect width="400" height="200" fill="#2C3E50" />

  <!-- 5 bars that fade in sequentially -->
  <rect x="40" y="150" width="50" height="0" rx="4" fill="#1ABC9C" opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="0.2s" fill="freeze" />
    <animate attributeName="height" from="0" to="120" dur="0.4s" begin="0.2s" fill="freeze" />
    <animate attributeName="y" from="150" to="30" dur="0.4s" begin="0.2s" fill="freeze" />
  </rect>

  <rect x="110" y="150" width="50" height="0" rx="4" fill="#3498DB" opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="0.35s" fill="freeze" />
    <animate attributeName="height" from="0" to="90" dur="0.4s" begin="0.35s" fill="freeze" />
    <animate attributeName="y" from="150" to="60" dur="0.4s" begin="0.35s" fill="freeze" />
  </rect>

  <rect x="180" y="150" width="50" height="0" rx="4" fill="#9B59B6" opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="0.5s" fill="freeze" />
    <animate attributeName="height" from="0" to="140" dur="0.4s" begin="0.5s" fill="freeze" />
    <animate attributeName="y" from="150" to="10" dur="0.4s" begin="0.5s" fill="freeze" />
  </rect>

  <rect x="250" y="150" width="50" height="0" rx="4" fill="#E74C3C" opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="0.65s" fill="freeze" />
    <animate attributeName="height" from="0" to="70" dur="0.4s" begin="0.65s" fill="freeze" />
    <animate attributeName="y" from="150" to="80" dur="0.4s" begin="0.65s" fill="freeze" />
  </rect>

  <rect x="320" y="150" width="50" height="0" rx="4" fill="#F39C12" opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="0.8s" fill="freeze" />
    <animate attributeName="height" from="0" to="100" dur="0.4s" begin="0.8s" fill="freeze" />
    <animate attributeName="y" from="150" to="50" dur="0.4s" begin="0.8s" fill="freeze" />
  </rect>
</svg>
```

### Example 2: Staggered Slide + Fade (List Items)
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 280" width="350" height="280">
  <!-- Background -->
  <rect width="350" height="280" fill="#F8F9FA" />

  <!-- Title -->
  <text x="30" y="35" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#2C3E50">
    Feature List
  </text>

  <!-- Item 1: slides in from left + fades -->
  <g opacity="0">
    <rect x="20" y="50" width="310" height="40" rx="8" fill="#EBF5FB" />
    <text x="40" y="76" font-family="Arial, sans-serif" font-size="14" fill="#2C3E50">Responsive Design</text>
    <animateTransform attributeName="transform" type="translate"
      from="-40 0" to="0 0" dur="0.4s" begin="0.3s" fill="freeze" />
    <animate attributeName="opacity" from="0" to="1"
      dur="0.4s" begin="0.3s" fill="freeze" />
  </g>

  <!-- Item 2 -->
  <g opacity="0">
    <rect x="20" y="100" width="310" height="40" rx="8" fill="#EBF5FB" />
    <text x="40" y="126" font-family="Arial, sans-serif" font-size="14" fill="#2C3E50">Dark Mode Support</text>
    <animateTransform attributeName="transform" type="translate"
      from="-40 0" to="0 0" dur="0.4s" begin="0.45s" fill="freeze" />
    <animate attributeName="opacity" from="0" to="1"
      dur="0.4s" begin="0.45s" fill="freeze" />
  </g>

  <!-- Item 3 -->
  <g opacity="0">
    <rect x="20" y="150" width="310" height="40" rx="8" fill="#EBF5FB" />
    <text x="40" y="176" font-family="Arial, sans-serif" font-size="14" fill="#2C3E50">Real-time Sync</text>
    <animateTransform attributeName="transform" type="translate"
      from="-40 0" to="0 0" dur="0.4s" begin="0.6s" fill="freeze" />
    <animate attributeName="opacity" from="0" to="1"
      dur="0.4s" begin="0.6s" fill="freeze" />
  </g>

  <!-- Item 4 -->
  <g opacity="0">
    <rect x="20" y="200" width="310" height="40" rx="8" fill="#EBF5FB" />
    <text x="40" y="226" font-family="Arial, sans-serif" font-size="14" fill="#2C3E50">Export to PDF</text>
    <animateTransform attributeName="transform" type="translate"
      from="-40 0" to="0 0" dur="0.4s" begin="0.75s" fill="freeze" />
    <animate attributeName="opacity" from="0" to="1"
      dur="0.4s" begin="0.75s" fill="freeze" />
  </g>

  <!-- Item 5 -->
  <g opacity="0">
    <rect x="20" y="250" width="310" height="40" rx="8" fill="#EBF5FB" />
    <text x="40" y="276" font-family="Arial, sans-serif" font-size="14" fill="#2C3E50">Team Collaboration</text>
    <animateTransform attributeName="transform" type="translate"
      from="-40 0" to="0 0" dur="0.4s" begin="0.9s" fill="freeze" />
    <animate attributeName="opacity" from="0" to="1"
      dur="0.4s" begin="0.9s" fill="freeze" />
  </g>
</svg>
```

### Example 3: Wave Stagger (Bouncing Dots)
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="300" height="100">
  <!-- Background -->
  <rect width="300" height="100" fill="#1A1A2E" />

  <!-- 7 dots with wave-staggered bounce animation -->
  <!-- Each dot bounces up and down, offset in time to create a wave -->

  <!-- Dot 0 -->
  <circle cx="60" cy="60" r="10" fill="#FF6B6B">
    <animateTransform attributeName="transform" type="translate"
      values="0 0; 0 -25; 0 0"
      keyTimes="0; 0.4; 1"
      dur="1s" begin="0s" repeatCount="indefinite"
      calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
  </circle>

  <!-- Dot 1 -->
  <circle cx="90" cy="60" r="10" fill="#FECA57">
    <animateTransform attributeName="transform" type="translate"
      values="0 0; 0 -25; 0 0"
      keyTimes="0; 0.4; 1"
      dur="1s" begin="0.1s" repeatCount="indefinite"
      calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
  </circle>

  <!-- Dot 2 -->
  <circle cx="120" cy="60" r="10" fill="#48DBFB">
    <animateTransform attributeName="transform" type="translate"
      values="0 0; 0 -25; 0 0"
      keyTimes="0; 0.4; 1"
      dur="1s" begin="0.2s" repeatCount="indefinite"
      calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
  </circle>

  <!-- Dot 3 -->
  <circle cx="150" cy="60" r="10" fill="#FF9FF3">
    <animateTransform attributeName="transform" type="translate"
      values="0 0; 0 -25; 0 0"
      keyTimes="0; 0.4; 1"
      dur="1s" begin="0.3s" repeatCount="indefinite"
      calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
  </circle>

  <!-- Dot 4 -->
  <circle cx="180" cy="60" r="10" fill="#54A0FF">
    <animateTransform attributeName="transform" type="translate"
      values="0 0; 0 -25; 0 0"
      keyTimes="0; 0.4; 1"
      dur="1s" begin="0.4s" repeatCount="indefinite"
      calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
  </circle>

  <!-- Dot 5 -->
  <circle cx="210" cy="60" r="10" fill="#5F27CD">
    <animateTransform attributeName="transform" type="translate"
      values="0 0; 0 -25; 0 0"
      keyTimes="0; 0.4; 1"
      dur="1s" begin="0.5s" repeatCount="indefinite"
      calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
  </circle>

  <!-- Dot 6 -->
  <circle cx="240" cy="60" r="10" fill="#01A3A4">
    <animateTransform attributeName="transform" type="translate"
      values="0 0; 0 -25; 0 0"
      keyTimes="0; 0.4; 1"
      dur="1s" begin="0.6s" repeatCount="indefinite"
      calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
  </circle>
</svg>
```
