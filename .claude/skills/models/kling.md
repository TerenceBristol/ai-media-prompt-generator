# Kling 3.0 Prompt Guide

## Model Info
| Field | Value |
|-------|-------|
| Name | Kling 3.0 |
| Maker | Kuaishou |
| Type | Video |
| Modes | T2V, I2V, Storyboard |
| Syntax | Cinematic director-style natural language |
| Negative Prompts | Yes |
| Higgsfield Available | Yes |
| Approx. Cost | ~5 credits per clip |

## Overview

Kling 3.0 is Kuaishou's flagship video generation model. Think of it as directing a film — describe shots, not keywords. It excels at dialogue scenes with lip sync, complex camera movements, and multi-shot storyboards up to 15 seconds.

## Syntax Format

**Director-style natural language** — think in shots, not keywords.

### Single Shot
```
[Shot composition], [subject description], [action/performance], [camera movement], [lighting/atmosphere], [audio/dialogue]
```

### Multi-Shot Storyboard
```
Shot 1 (3s): [description]
Shot 2 (2s): [description]
Shot 3 (4s): [description]
...up to 6 shots
```

## Prompt Structure

### Subject & Performance
- Describe characters like casting notes: age, build, wardrobe, expression
- Specify actions as physical performances: "leans forward with intensity", "turns slowly to face camera"
- Include emotional beats: "shifts from confusion to understanding"

### Camera Direction
Kling 3.0 has the strongest camera movement control of any video model:

| Movement | Description |
|----------|-------------|
| Dolly in/out | Smooth forward/backward |
| Pan left/right | Horizontal sweep |
| Tilt up/down | Vertical movement |
| Crane up/down | Vertical with perspective change |
| Orbit | Circular around subject |
| Tracking shot | Following subject movement |
| Steadicam | Smooth handheld feel |
| Whip pan | Fast horizontal snap |
| Crash zoom | Rapid zoom for dramatic effect |
| Static/locked | No camera movement |

**Important:** Use ONE primary camera movement per shot. Compound movements (e.g., "dolly in while panning left and tilting up") confuse the model.

### Dialogue Format
Kling 3.0 supports native dialogue with lip sync:

```
[Speaker: role description, emotional tone]: "Dialogue line here"
```

**Rules:**
- Keep dialogue SHORT: 5-10 words per line for best lip sync
- Specify speaker role and tone for better performance
- One speaker per shot works best
- Two speakers possible but specify clearly who speaks when

**Examples:**
```
[Detective: grizzled veteran, suspicious]: "Where were you last night?"
[Scientist: young woman, excited]: "The results are extraordinary!"
```

### Audio & Atmosphere
- Ambient sounds: "rain on windows, distant thunder"
- Music direction: "tense orchestral underscore"
- Sound effects: "footsteps on marble, door creaking"

## Mode-Specific Guidance

### T2V (Text-to-Video)
Full creative control. Include:
- Shot composition and framing
- Subject description and action
- Camera movement (one per shot)
- Lighting and atmosphere
- Audio direction
- Duration per shot

### I2V (Image-to-Video)
The source image establishes visual identity. Focus prompts on:
- What motion occurs (subject movement, environmental)
- Camera movement
- Emotional arc
- Audio/dialogue
- Keep descriptions consistent with what's visible in the image

### Storyboard Mode
Kling 3.0's standout feature — up to 6 sequential shots:

```
Shot 1 (3s): Wide establishing shot of rain-soaked city street at night, neon signs reflecting on wet pavement, slow dolly forward. [Ambient: rain, distant traffic]

Shot 2 (2s): Medium shot, a woman in a red trench coat steps out of a doorway, looks left and right, tense expression. Static camera. [Sound: door closing, heels on concrete]

Shot 3 (4s): Close-up of her face as she pulls up her collar, determination in her eyes, camera slowly pushes in. [Detective, firm]: "It ends tonight."

Shot 4 (3s): Over-the-shoulder shot revealing a shadowy figure at the end of the alley, dramatic side lighting. Slow dolly in. [Ambient: thunder rumble]

Shot 5 (3s): Wide shot, she walks toward the figure, rain intensifying, crane up revealing the scale of the city. [Music: tense strings building]
```

**Storyboard tips:**
- Assign time to each shot (total max 15s)
- Vary shot sizes (wide → medium → close-up → wide)
- Maintain character descriptions across shots
- Keep one camera move per shot
- Plan audio continuity

## Technical Specs

| Spec | Value |
|------|-------|
| Max Duration | 15 seconds |
| Resolution | Up to 1080p+ |
| Frame Rate | Up to 60fps |
| Aspect Ratios | 16:9, 9:16, 1:1, 4:3, 3:4 |
| Storyboard | Up to 6 cuts |
| Lip Sync | Native, high quality |

## Example Prompts

### Example 1: Single Cinematic Shot
```
Medium close-up of a bearded blacksmith in a leather apron, hammering a glowing orange blade on an anvil, sparks flying in slow motion. Warm firelight from the forge illuminates his focused expression. Camera slowly orbits left. Ambient sounds: rhythmic hammering, crackling fire, bellows breathing.
```

### Example 2: Dialogue Scene
```
Two-shot in a dimly lit jazz bar, warm amber lighting, saxophone playing softly in background. A man in a tailored suit sits across from a woman in a black dress.

[Man: confident, charming]: "I've been waiting for this."
[Woman: amused, skeptical]: "Have you now?"

Camera holds static on the two-shot, shallow depth of field. Ambient: clinking glasses, muted conversation.
```

### Example 3: Storyboard — Product Reveal
```
Shot 1 (2s): Extreme close-up of textured leather surface, warm directional lighting, camera slowly pulls back. [Sound: subtle whoosh]

Shot 2 (3s): Medium shot reveals a luxury watch on the leather surface, golden hour light catching the crystal face, slow orbit right. [Sound: soft ticking]

Shot 3 (2s): Close-up of watch face, second hand sweeping smoothly, light refractions dancing. Static shot. [Music: elegant piano note]

Shot 4 (3s): Wide shot, watch on wrist of a man in a suit adjusting his cuff, walking through a modern lobby, tracking shot following. [Sound: footsteps on marble, ambient lobby]
```

### Example 4: Action Sequence
```
Low angle shot of a parkour athlete launching off a concrete wall, mid-air twist with arms extended, urban rooftop at sunset. Fast tracking shot following the movement. Dynamic motion blur, golden hour backlighting creating silhouette effect. [Sound: wind rush, impact of landing, heavy breathing]
```

### Example 5: Macro/Detail Shot
```
Extreme macro of a drop of honey falling in slow motion onto a stack of golden pancakes. Warm morning light from the side, steam rising. Camera static, shallow depth of field. [Sound: soft drip, sizzle from nearby pan]
```

## Higgsfield Settings

| Setting | Recommendation |
|---------|---------------|
| Aspect Ratio | 16:9 for cinematic, 9:16 for social/vertical |
| Duration | 5-15s depending on complexity |
| Enhance | OFF (Kling handles detail well natively) |
| Camera Presets | Match to your prompt's camera direction |

**Best camera presets for Kling:**
- Dialogue scenes: Static, Dolly In (subtle)
- Action: Tracking, Crash Zoom, Whip Pan
- Product: Orbit, Super Dolly In
- Establishing: Crane Up, Aerial Pullback
- Dramatic: Crash Zoom In, Dutch Angle

## Common Mistakes to Avoid

1. **Compound camera moves** — "dolly in while panning left and tilting up" confuses the model. Use ONE camera movement per shot.
2. **Speaker confusion** — In dialogue, always specify who speaks with role and tone: `[Speaker: role, tone]: "line"`
3. **Too much dialogue** — Keep to 5-10 words per line. Long sentences break lip sync.
4. **Exceeding 15s** — Total storyboard duration must stay under 15 seconds.
5. **Inconsistent characters** — In storyboards, re-describe characters in each shot (same wardrobe, features).
6. **Vague camera** — "cinematic camera" is too vague. Specify: "slow dolly in" or "static medium shot."
7. **Ignoring audio** — Kling generates audio. Direct it or you'll get random ambient.
