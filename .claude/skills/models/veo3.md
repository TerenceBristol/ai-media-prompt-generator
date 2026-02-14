# VEO3 Prompt Guide

## Model Info
| Field | Value |
|-------|-------|
| Name | VEO3 |
| Maker | Google DeepMind |
| Type | Video |
| Modes | T2V, I2V |
| Syntax | Natural language (slot-based) |
| Negative Prompts | Yes (in-prompt + negative prompt field) |
| Higgsfield Available | Yes |
| Approx. Cost | ~8 credits per clip |

## Technical Specifications

| Spec | Value |
|------|-------|
| Aspect Ratio | 16:9 (default), 9:16 vertical |
| Frame Rate | 24 fps |
| Duration | ~8 seconds typical |
| Resolution | 720p or 1080p |
| Audio | Native (ambience, SFX, dialogue) |

## Prompt Structure

**Recommended format:**
```
[Subject] + [Action] + [Setting] + [Style] + [Camera] + [Lighting] + [Motion] + [Audio]. No subtitles, no text overlay.
```

**Alternative slot structure:**
```
Subject/Action/Scene/Style/Dialogue/Sounds/Technical
```

## Key Best Practices

### Camera Control
VEO3 responds well to explicit camera directions:

| Instruction | Effect |
|-------------|--------|
| "slow dolly-in" | Gradual forward movement |
| "static on tripod" | Stable, no movement |
| "handheld tracking" | Following motion with natural shake |
| "slow push-in" | Subtle forward zoom |
| "aerial establishing shot" | Drone-like overview |
| "close-up" | Tight framing on subject |

### Dialogue & Audio

**Rules for dialogue:**
- Keep lines SHORT: 6-12 words per 8-second clip
- Use explicit format: `Character says: "[line]"`
- Add "(no subtitles)" to prevent text overlay
- Mix ambience + one spoken line (not multiple)

**Audio specification:**
```
Ambient sounds: [describe]. Character says: "[short dialogue]" (no subtitles).
```

### Consistency Across Shots

For multi-shot sequences:
- Re-state key identity cues (wardrobe color, hairstyle, props)
- Keep palette descriptors identical
- Maintain time-of-day consistency
- Reuse seed values when possible

### Avoiding Unwanted Elements

Always end prompts with:
```
No subtitles, no text overlay, no watermarks.
```

Negative prompt additions:
```
negative prompt: no hands in frame, no brand labels, no text overlays
```

## Prompt Components

### Subject Description
Be specific about:
- Age, gender, ethnicity (if relevant)
- Clothing colors and style
- Distinguishing features
- Current emotional state

### Action/Motion
Describe the movement:
- What is happening
- Speed (slow-motion, real-time, time-lapse)
- Direction of movement

### Environment/Setting
Include:
- Location type
- Time of day
- Weather conditions
- Background elements

### Style/Mood
Specify:
- Cinematic style (documentary, noir, commercial)
- Color palette
- Emotional tone
- Reference films/directors (optional)

### Technical Details
- Lens type (wide, telephoto, macro)
- Depth of field (shallow, deep)
- Lighting setup (backlit, side-lit, natural)

## Example Prompts

### Example 1: Product Commercial
```
Close-up slow-motion pour of iced coffee into a clear glass, macro bubbles and condensation visible, backlit amber highlights, modern cafe tabletop setting, shallow depth of field, tasteful lens flares. Cafe ambience with ice clinking sounds. No subtitles, no text overlay.
```

### Example 2: Cinematic Scene
```
A young woman in a red coat walks alone through a foggy forest at dawn, camera tracking slowly behind her, mysterious atmosphere, muted color palette with red accent, soft diffused natural lighting, handheld subtle movement. Ambient forest sounds with distant birds. No subtitles, no text overlay.
```

### Example 3: Dialogue Scene
```
Medium shot of a bearded chef in white uniform standing in a professional kitchen, warm overhead lighting, steam rising from pots behind him. Chef says: "The secret is patience." (no subtitles). Kitchen ambient sounds, sizzling pans. Static tripod shot, shallow DOF. No text overlay.
```

## Image-to-Video (I2V)

VEO3 can animate a reference image into a video clip.

### How It Works
- Provide a reference image as the first or last frame
- The prompt describes what motion, camera movement, and audio to add
- The image establishes subject appearance, setting, and color palette
- Recommended: use 720p+ resolution source images for best quality

### I2V Prompt Structure
```
[Reference image context]. [Describe the motion that occurs]. [Camera movement]. [Audio direction]. No subtitles, no text overlay.
```

### I2V Examples

**Bringing a portrait to life:**
```
The woman in the portrait slowly turns her head to face the camera, a gentle smile forming. Soft breeze moves her hair. Camera holds static, medium close-up. Ambient: soft wind, distant birds. No subtitles, no text overlay.
```

**Animating a landscape:**
```
The mountain lake scene comes alive with gentle ripples on the water surface, clouds drifting slowly across the sky, and trees swaying in a light breeze. Slow dolly forward toward the lake. Ambient: water lapping, wind through pines. No subtitles, no text overlay.
```

**Product animation:**
```
The sneaker on the display rotates slowly on a turntable, studio lights catching different angles and textures. Camera orbits right, matching rotation. Clean studio ambient, subtle mechanical rotation sound. No subtitles, no text overlay.
```

### I2V Tips
- Source image quality matters — 720p+ recommended
- Don't contradict what's visible in the image
- Focus prompt on MOTION and AUDIO, not re-describing the static elements
- Camera movement works well — the model adds parallax and depth

## Advanced: JSON Prompting

For maximum control, use structured JSON format:
```json
{
  "subject": "description",
  "action": "what happens",
  "camera": {
    "movement": "dolly-in",
    "angle": "eye-level",
    "lens": "50mm"
  },
  "lighting": "golden hour backlit",
  "audio": {
    "ambience": "city traffic",
    "dialogue": "Hello there"
  },
  "negative": ["subtitles", "text", "watermarks"]
}
```

## Common Mistakes to Avoid

- Don't write multi-sentence dialogue (too long for 8 seconds)
- Don't change lighting mid-prompt
- Don't forget "no subtitles" instruction
- Don't use conflicting camera directions
- Don't omit audio specifications (VEO3 generates audio by default)

## Higgsfield Notes

| Setting | Recommendation |
|---------|---------------|
| Aspect Ratio | 16:9 (default), 9:16 for vertical |
| Duration | ~8 seconds typical |
| Enhance | OFF |
| Camera Presets | Match to prompt camera direction |
| Credits | ~8 per clip |

**Best camera presets for VEO3:**
- Dialogue scenes: Static, Dolly In (subtle)
- Atmospheric: Crane Up, Dolly Out
- Product: Orbit, Lazy Susan
- Documentary: Handheld, Pan Left/Right
- Dramatic: Crash Zoom, Super Dolly In
