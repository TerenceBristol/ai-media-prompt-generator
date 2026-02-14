# Seedance 2.0 Prompt Guide

## Model Info
| Field | Value |
|-------|-------|
| Name | Seedance 2.0 |
| Maker | ByteDance |
| Type | Video |
| Modes | T2V, I2V, Storyboard |
| Syntax | Director-style natural language |
| Negative Prompts | IGNORED (model ignores them — use positive phrasing) |
| Higgsfield Available | Yes |
| Approx. Cost | ~5 credits per clip |

## Overview

Seedance 2.0 is ByteDance's advanced video generation model featuring dual-branch diffusion for native audio-video joint generation. It excels at phoneme-level lip sync in 8+ languages, physics-aware motion, and multi-reference file composition. Key differentiator: it generates synchronized audio and video together, not as separate passes.

## Syntax Format

**Director-style natural language** — Subject + Action + Camera + Scene + Style.

```
[Subject description] [performs action] [in setting/scene], [camera movement], [lighting/atmosphere], [style direction]
```

### @Tag Reference System
Seedance 2.0 uses @Tags to reference uploaded files (up to 12):

| Tag | Purpose |
|-----|---------|
| @Image1, @Image2... | Reference images for subject/scene/style |
| @Video1, @Video2... | Reference videos for motion/style |
| @Audio1 | Audio file for lip sync or soundtrack |

**Example with references:**
```
@Image1 is a portrait of a young woman. She turns to camera and says "Welcome to the future" with a confident smile. Slow dolly in, soft studio lighting, modern tech aesthetic. @Audio1 provides the voice track.
```

## Core Prompt Structure

### Subject + Action
- Describe subjects with casting-note detail
- Use physics-aware vocabulary for motion: "tires smoke as car drifts 90 degrees", "silk fabric billows in updraft", "water splashes on impact"
- Specify motion speed and intensity

### Camera Direction
**Critical rule: ONE camera verb per shot.**

| Movement | Description |
|----------|-------------|
| Dolly in/out | Smooth forward/backward |
| Pan left/right | Horizontal sweep |
| Tilt up/down | Vertical movement |
| Crane up/down | Vertical with arc |
| Orbit | Circular motion |
| Tracking | Following subject |
| Static | No movement |
| Handheld | Natural shake |

**Do NOT combine:** "dolly in while panning left" — pick one.

### Audio & Lip Sync
Seedance 2.0's standout feature — native audio-video joint generation:

- **Lip sync**: Phoneme-level accuracy in 8+ languages
- **Music**: Can generate synchronized musical performances
- **Sound effects**: Physics-aware (footsteps match walking speed, impacts match collisions)
- **Voice acting**: Specify tone, emotion, pacing in the prompt

**CRITICAL: Audio files MUST be MP3 format.** WAV and AAC cause silent lip-sync failure.

### No Negative Prompts
Seedance 2.0 **ignores negative prompts entirely**. Instead:

| Instead of... | Use... |
|---------------|--------|
| "no blur" | "sharp focus throughout" |
| "no watermark" | "clean frame" |
| "no text overlay" | "pristine visual" |
| "no shaky camera" | "smooth steady camera" |
| "avoid dark lighting" | "bright, well-lit scene" |

Use positive phrasing and end-constraints: describe what you WANT, not what to avoid.

## Mode-Specific Guidance

### T2V (Text-to-Video)
Full description with all elements:
```
[Subject] [action with physics detail], [camera movement], [scene/environment], [lighting], [style]. [Audio direction].
```

### I2V (Image-to-Video)
Source image establishes visual identity. Prompt focuses on:
- What motion occurs
- Camera movement
- Audio/lip sync
- Keep consistent with image content

Use @Image1 to reference the source:
```
@Image1 shows a woman at a desk. She looks up from her laptop, pushes her chair back, and stands. Camera follows with a smooth tilt up. Office ambient sounds, keyboard clicks fade. Warm afternoon light from window.
```

### Storyboard (Multi-Shot)
Seedance 2.0 supports multi-shot sequences:

```
Shot 1 (3s): Wide shot of a bustling Tokyo street at night, neon signs reflecting on wet pavement. Slow dolly forward through the crowd. [Ambient: city sounds, J-pop from a shop]

Shot 2 (3s): Medium shot, a street musician plays guitar under an awning. Camera holds static. [Audio: acoustic guitar, rain on awning]

Shot 3 (4s): Close-up of musician's hands on guitar strings, raindrops hitting the guitar body. Subtle crane down. [Audio: guitar melody continues, rain intensifies]

Shot 4 (5s): Wide pullback revealing the growing crowd watching, umbrellas creating a colorful mosaic. Slow crane up. [Audio: guitar swells, crowd murmurs appreciatively]
```

## Technical Specs

| Spec | Value |
|------|-------|
| Max Duration | 15 seconds |
| Resolution | Up to 2K |
| Frame Rate | 24-60fps |
| Audio | Native joint generation (MP3 input only) |
| Lip Sync | Phoneme-level, 8+ languages |
| References | Up to 12 files via @Tags |
| Aspect Ratios | 16:9, 9:16, 1:1 |

## Example Prompts

### Example 1: Cinematic Dialogue
```
Medium shot of a woman in her 30s, dark curly hair, leather jacket, sitting at a rain-streaked diner window at night. She cradles a coffee mug, steam rising. She looks at camera with a wry smile and says "Some stories don't have happy endings." Slow dolly in, warm interior lighting contrasting cold blue exterior. Ambient: rain on glass, soft diner music, coffee cup clink.
```

### Example 2: Product Commercial
```
Extreme close-up of a luxury watch crystal catching light, rotating slowly on a dark reflective surface. Camera orbits right, dramatic rim lighting creating golden edge highlights. Clockwork precision visible through transparent case back. Sound: crisp mechanical ticking, subtle whoosh as watch rotates. Clean frame, premium commercial aesthetic.
```

### Example 3: Physics-Driven Action
```
Low angle shot of a sports car drifting around a wet mountain hairpin turn, tires smoking on rain-slicked asphalt, water spray arcing behind the car. Camera tracks the drift from roadside position. Dramatic overcast lighting, mountain fog in background. Sound: engine roar, tire screech, gravel spray, rain hitting camera lens.
```

### Example 4: Multi-Reference Composition
```
@Image1 is a headshot of a young man. @Audio1 is his voice recording. The young man from @Image1 stands at a podium in a modern conference hall, spotlight on him, audience silhouetted. He speaks confidently with @Audio1 as the voice track. Camera holds medium shot, subtle push in. Bright stage lighting, dark auditorium. Ambient: audience silence, then applause.
```

## Higgsfield Settings

| Setting | Recommendation |
|---------|---------------|
| Aspect Ratio | 16:9 for cinematic, 9:16 for social |
| Duration | 5-15s (audio sync works best at 8-12s) |
| Enhance | OFF |
| Camera Presets | Match ONE movement to your prompt |

**Best camera presets for Seedance:**
- Lip sync dialogue: Static, Dolly In (subtle)
- Music performance: Orbit, Handheld
- Product: Super Dolly In, Orbit
- Action: Tracking, Crash Zoom
- Atmospheric: Crane Up, Dolly Out

## Known Limitations

1. **Hands** — Complex hand interactions (playing piano, sign language) may have artifacts
2. **Identity drift** — In long sequences (>10s), character features may subtly shift. Use @Image references to anchor.
3. **15s maximum** — Cannot exceed 15 seconds per generation
4. **Audio format** — MUST use MP3. WAV/AAC cause silent lip-sync failure (no error, just silent)
5. **Face-to-voice** — Direct face-to-voice generation is suspended. Use @Audio reference instead.
6. **One camera per shot** — Compound camera moves produce unpredictable results
7. **Negative prompts** — Completely ignored. Always phrase positively.

## Common Mistakes to Avoid

1. **Using negative prompts** — They're ignored. Use positive phrasing: "clean frame" not "no watermark"
2. **WAV/AAC audio** — Only MP3 works for lip sync. Other formats silently fail.
3. **Compound camera moves** — ONE camera verb per shot. "Dolly in while panning" fails.
4. **Long dialogue** — Keep speech to 5-10 words per 5s segment for clean lip sync.
5. **Missing @Tags** — When referencing uploaded files, always use @Image1/@Audio1 syntax.
6. **Vague physics** — "The ball bounces" is weak. "Tennis ball strikes the clay court, bouncing high with a puff of red dust" gives physics context.
7. **Forgetting audio direction** — Seedance generates audio natively. If you don't direct it, you'll get random ambient.
