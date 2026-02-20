# Fade

## Description
Controls the opacity of elements over time. Fade is the most fundamental and widely-used animation primitive — it softens transitions, draws attention, and prevents abrupt visual changes. Use fade-in to introduce elements, fade-out to dismiss them, crossfade to swap content, and pulse-fade to create breathing or attention effects.

## Variants
- **fade-in**: Opacity transitions from 0 to 1. Element appears gradually.
- **fade-out**: Opacity transitions from 1 to 0. Element disappears gradually.
- **crossfade**: One element fades out while another fades in simultaneously. Creates a smooth content swap.
- **pulse-fade**: Opacity oscillates between two values (e.g., 0.3 and 1.0) repeatedly. Creates a breathing/glow effect.

## SMIL Syntax

### Fade In
```xml
<animate
  attributeName="opacity"
  from="0"
  to="1"
  dur="0.5s"
  begin="0s"
  fill="freeze" />
```

### Fade Out
```xml
<animate
  attributeName="opacity"
  from="1"
  to="0"
  dur="0.5s"
  begin="0s"
  fill="freeze" />
```

### Crossfade (applied to two sibling elements)
```xml
<!-- Element A: fading out -->
<animate
  attributeName="opacity"
  from="1"
  to="0"
  dur="0.8s"
  begin="0s"
  fill="freeze" />

<!-- Element B: fading in -->
<animate
  attributeName="opacity"
  from="0"
  to="1"
  dur="0.8s"
  begin="0s"
  fill="freeze" />
```

### Pulse Fade
```xml
<animate
  attributeName="opacity"
  values="1;0.3;1"
  dur="2s"
  begin="0s"
  repeatCount="indefinite" />
```

## CSS Syntax

### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
```

### Fade Out
```css
@keyframes fadeOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}

.fade-out {
  animation: fadeOut 0.5s ease-in forwards;
}
```

### Pulse Fade
```css
@keyframes pulseFade {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.3; }
}

.pulse-fade {
  animation: pulseFade 2s ease-in-out infinite;
}
```

## Parameters

| Parameter | Range | Default | Notes |
|-----------|-------|---------|-------|
| duration | 0.3s – 2s | 0.5s | Shorter for UI feedback, longer for cinematic reveals |
| easing | linear, ease-in, ease-out, ease-in-out, cubic-bezier | ease-out (in), ease-in (out) | ease-out for fade-in feels natural; ease-in for fade-out |
| delay | 0s – 5s | 0s | Use delay for sequencing with other elements |
| fill | freeze, remove | freeze | Use `freeze` to hold final opacity; `remove` to revert |
| from-opacity | 0 – 1 | 0 (in), 1 (out) | Partial fades (e.g., 0.5 → 1) feel subtler |
| to-opacity | 0 – 1 | 1 (in), 0 (out) | Fading to 0.1 instead of 0 keeps element faintly visible |
| repeatCount | number or indefinite | 1 | Use `indefinite` for pulse-fade |

## Composability

| Combination | Effect | Technique |
|-------------|--------|-----------|
| **fade + slide** | Slide-in/out with opacity | Apply both `<animate>` (opacity) and `<animateTransform>` (translate) to same element |
| **fade + scale** | Pop-in effect | Combine opacity 0→1 with scale 0→1 for a satisfying entrance |
| **fade + stagger** | Sequential reveal | Apply fade-in to multiple elements with incremental `begin` delays |
| **fade + color** | Ghost-in with color shift | Fade in while shifting from muted to vibrant color |
| **fade + draw** | Draw then fill | Stroke draws in first, then fill fades in after stroke completes |

### Composition Example (SMIL — fade + slide)
```xml
<g opacity="0" transform="translate(-50, 0)">
  <!-- Fade in -->
  <animate attributeName="opacity" from="0" to="1" dur="0.6s" fill="freeze" />
  <!-- Slide from left -->
  <animateTransform attributeName="transform" type="translate"
    from="-50 0" to="0 0" dur="0.6s" fill="freeze" />
</g>
```

## Examples

### Example 1: Simple Fade-In Circle
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- A circle that fades in over 1 second -->
  <circle cx="100" cy="100" r="60" fill="#4A90D9" opacity="0">
    <animate
      attributeName="opacity"
      from="0"
      to="1"
      dur="1s"
      begin="0.5s"
      fill="freeze" />
  </circle>
</svg>
```

### Example 2: Crossfade Between Two Shapes
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Red circle fades out -->
  <circle cx="100" cy="100" r="60" fill="#E74C3C" opacity="1">
    <animate
      attributeName="opacity"
      from="1"
      to="0"
      dur="1s"
      begin="1s"
      fill="freeze" />
  </circle>

  <!-- Blue square fades in simultaneously -->
  <rect x="40" y="40" width="120" height="120" rx="10" fill="#3498DB" opacity="0">
    <animate
      attributeName="opacity"
      from="0"
      to="1"
      dur="1s"
      begin="1s"
      fill="freeze" />
  </rect>
</svg>
```

### Example 3: Pulsing Glow Effect
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Outer glow circle that pulses -->
  <circle cx="100" cy="100" r="70" fill="none" stroke="#F39C12" stroke-width="3" opacity="0.3">
    <animate
      attributeName="opacity"
      values="0.3;0.8;0.3"
      dur="2s"
      repeatCount="indefinite" />
  </circle>

  <!-- Inner solid circle, static -->
  <circle cx="100" cy="100" r="40" fill="#F39C12" />
</svg>
```
