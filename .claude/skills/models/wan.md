# Wan 2.2 Prompt Guide

## Overview

Wan 2.2 (Tongyi Wanxiang 2.2) is Alibaba's advanced AI video generator featuring a Mixture-of-Experts architecture. Compared to Wan 2.1, it's trained on 65% more images and 83% more videos, enhancing motion, semantics, and aesthetics.

## Syntax Format

### Basic Formula (Beginners)
```
[Subject] + [Scene] + [Movement]
```

### Advanced Formula
```
[Subject Description] + [Scene Description] + [Movement Description] + [Aesthetic Control] + [Stylization]
```

### Image-to-Video Formula
```
[Motion Description] + [Camera Movement]
```

Since the source image establishes subject/scene/style, focus on describing desired motion and camera movement.

## Prompt Components

| Component | Description | Example |
|-----------|-------------|---------|
| Subject | Main focus of video | "a black-haired Miao girl" |
| Subject Description | Detailed appearance | "in ethnic minority clothing" |
| Scene Description | Environment features | "misty mountain village at dawn" |
| Movement Description | Motion characteristics | "swaying violently", "moving slowly" |
| Aesthetic Control | Lighting, shots, camera | "golden hour, medium close-up, dolly in" |

## Camera Movement Controls

### Basic Movements
| Movement | Description |
|----------|-------------|
| Camera Push | Wide angle to close-up |
| Camera Pull | Revealing broader context |
| Camera Tilt Up/Down | Vertical perspective shifts |
| Pan Left/Right | Horizontal sweep |
| Static Shot | No camera movement |
| Fixed Shot | Locked camera position |

### Advanced Movements
| Movement | Description |
|----------|-------------|
| Handheld Shot | Documentary-style motion blur |
| Following Shot | Tracking subject through environment |
| Orbiting Shot | Circular motion around subject |
| Compound Movement | Multiple simultaneous techniques |
| Dolly In/Out | Smooth forward/backward motion |

### Speed Control
Use adverbs to control pace:
- "quickly", "rapidly", "swiftly"
- "slowly", "gently", "gradually"

## Seven Dimensions of Control

### 1. Shot Size
- Close-up
- Close shot
- Medium close-up
- Wide-angle
- Panorama

### 2. Angle
- Eye level
- Low angle
- High angle
- Bird's eye
- Worm's eye

### 3. Lens Types
- Medium focal length
- Wide-angle
- Telephoto
- Ultra-wide-angle/Fisheye

### 4. Camera Movements
- Push, Pull, Pan, Tilt
- Dolly, Tracking, Crane
- Handheld, Steadicam

### 5. Speed Effects
- Normal speed
- Slow motion
- Time-lapse
- Speed ramp

### 6. Atmosphere
- Warm, Cold tones
- High/Low saturation
- Mixed tones
- Moody, Bright

### 7. Style
- Cinematic
- Documentary
- 3D animation
- 2D animation
- Pixel style

## Light Sources

- Daylight, Sunlight, Overcast light
- Artificial light, Fluorescent light
- Moonlight, Firelight
- Practical light (lamps in scene)
- Mixed light

## Light Types

- Soft light, Hard light
- Side light, Bottom light
- Edge light, Rim light
- High contrast, Low contrast
- Silhouette

## Time Periods

- Daytime, Night
- Sunrise, Sunset
- Dawn, Dusk
- Golden hour, Blue hour

## Example Prompts

### Example 1: Portrait Video
```
Young woman with flowing dark hair, elegant white dress, standing in a sunlit meadow with wildflowers, gentle breeze causing hair and dress to sway softly, golden hour lighting, medium shot, slow dolly in, warm color tones, cinematic style
```

### Example 2: Product Showcase
```
Sleek smartphone rotating slowly on reflective black surface, dramatic rim lighting highlighting edges, subtle light reflections moving across screen, orbiting shot, studio lighting, premium commercial aesthetic, slow smooth rotation
```

### Example 3: Nature Scene
```
Majestic waterfall cascading into crystal pool, mist rising and catching rainbow light, lush green foliage framing the scene, wide establishing shot, slow pan right to reveal hidden cave behind falls, soft diffused daylight, documentary style
```

### Example 4: Action Sequence
```
Martial artist performing spinning kick, dynamic motion blur, flowing traditional robes, ancient temple courtyard, dust particles in air, following shot tracking the movement, dramatic side lighting, speed ramp from slow to fast, cinematic action style
```

## Best Practices

1. **Be detailed and vivid** - Richer prompts = better quality
2. **Specify motion clearly** - Amplitude, speed, effects
3. **Include camera verbs** - Dolly, pan, push, orbit
4. **Add lighting adjectives** - The MoE backbone handles the rest
5. **Control pace with adverbs** - "slowly", "quickly", "gently"

## Special Notes

- **Chinese prompts may work better** - Model trained primarily on Chinese text-video pairs
- **For static images** - Emphasize "static shot" or "fixed camera, no movement"
- **Prompt extension** - Uses Qwen model (7B/14B) for text-to-video enhancement

## Common Mistakes to Avoid

- Vague movement descriptions
- Forgetting to specify camera behavior
- Conflicting motion instructions
- Overloading with too many movements
- Not specifying static shot when needed

## Comparison to Wan 2.1

| Aspect | Wan 2.1 | Wan 2.2 |
|--------|---------|---------|
| Training data | Baseline | +65% images, +83% videos |
| Architecture | Standard | Mixture-of-Experts (MoE) |
| Resolution | 480p | 720p @ 24fps on 4090 |
| Motion quality | Good | Enhanced |
