# MiniMax Hailuo Prompt Guide

## Model Info
| Field | Value |
|-------|-------|
| Name | MiniMax Hailuo 2.3 |
| Maker | MiniMax |
| Type | Video |
| Modes | T2V, I2V |
| Syntax | Narrative natural language (action-driven) |
| Negative Prompts | In-prompt only (no dedicated field) |
| Higgsfield Available | Yes (listed as MiniMax Hailuo 02) |
| Approx. Cost | ~3-5 credits per clip |

## Overview

MiniMax Hailuo 2.3 is MiniMax's flagship video generation model and the speed king of quality AI video — delivering the fastest generation times among top-tier models without sacrificing output quality. It excels at complex body movements, anime/illustration stylization, ink wash painting, game CG aesthetics, and character transformations with cinematic fidelity. Hailuo 2.3 features a "style locking" capability that prevents aesthetic drift across frames, making it uniquely reliable for stylized content that stays consistent from first to last frame.

## Key Differentiators

- **Speed**: Fastest quality video output among competing models — ideal for rapid iteration and batch workflows
- **Stylization mastery**: Native support for anime, illustration, ink wash painting, and game CG with frame-consistent line stability and color fidelity
- **Transformation physics**: Morphing, dissolving, and elemental effects follow physically correct depth and inertia mapping
- **Facial micro-expressions**: Enhanced identity preservation and natural character performances at the embedding level
- **Cost efficiency**: Same pricing as predecessor Hailuo 02 with significant quality improvements; Fast mode cuts costs up to 50%

## Syntax Format

**Action-driven narrative** — think in verbs and physical sequences, not keyword lists.

### Basic Formula
```
[Subject + Description] + [Action/Motion] + [Scene/Environment] + [Lighting/Atmosphere] + [Style]
```

### Advanced Formula
```
[Camera Shot] + [Subject + Detailed Description] + [Specific Action with Verbs/Adverbs] + [Scene + Environmental Detail] + [Lighting + Atmosphere] + [Style/Mood]
```

**Rules:**
- Write narratively, not as comma-separated keywords — describe a scene unfolding in time
- Lead with strong, specific action verbs: "sprints", "dissolves", "careens", "drifts"
- Keep prompts concise: 40-60 words is the sweet spot
- Maximum prompt length: 2000 characters
- Prioritize information by importance: subject first, then action, then setting, then style
- Avoid contradictions ("bright sunny day with stormy dramatic clouds")

## Prompt Structure

### Key Components
| Component | Priority | Description | Example |
|-----------|----------|-------------|---------|
| Subject | 1 (highest) | Main focus with distinguishing details | "A 30-year-old woman with auburn hair in a leather jacket" |
| Action | 2 | Physical motion with strong verbs | "sprints desperately through the rain-slicked market" |
| Scene | 3 | Environment and setting | "neon-lit Neo-Tokyo alleyway at midnight" |
| Camera | 4 | Shot type and movement | "tracking shot, rack focus" |
| Lighting | 5 | Light quality and direction | "warm golden hour sidelight" |
| Style/Mood | 6 | Aesthetic and tone | "cinematic, melancholic" |

### Action Verbs Matter
The verbs and adverbs you choose directly control motion intensity:

| Weak (Avoid) | Strong (Prefer) |
|--------------|-----------------|
| "drives fast" | "aggressively accelerates, careening" |
| "walks" | "strides confidently" or "shuffles wearily" |
| "falls" | "plummets through the air, arms flailing" |
| "changes into" | "dissolves into particles of light" |

## Key Parameters

| Parameter | Options | Description |
|-----------|---------|-------------|
| Resolution | 768p, 1080p | Output resolution (1080p limited to 6s) |
| Duration | 6s, 10s | Clip length (10s only at 768p) |
| Quality Mode | Fast 2.3, Standard 2.3 | Speed vs. quality tradeoff |
| Prompt Optimizer | On (default) / Off | Auto-enhances prompts; disable for precise control |

### Quality Modes Explained

| Mode | Best For | Notes |
|------|----------|-------|
| **Fast 2.3** | Concept development, rapid iteration, batch creation | Up to 50% cheaper; optimized for speed |
| **Standard 2.3** | Final production, hero shots, client deliverables | Higher sampling depth; best quality |

### Prompt Optimizer
- **ON (default)**: Auto-refines your prompt for better visual quality. Good for simple/casual prompts.
- **OFF**: Model follows your exact words. Use when you have precise creative intent or need reproducibility with a fixed seed.
- When prompt optimizer is ON, results are NOT reproducible even with the same seed.

## Mode-Specific Guidance

### T2V (Text-to-Video)
Full creative control from text description. Include:
- Subject with physical details (appearance, clothing, distinguishing features)
- Specific action with strong verbs and adverbs
- Environment and atmosphere
- Camera direction (shot type, movement)
- Lighting and mood
- Style (cinematic, anime, documentary, etc.)

**T2V Formula:**
```
[Camera/Shot] [Subject Description] [Action with Strong Verbs] [Environment] [Lighting] [Style/Mood]
```

**T2V Tips:**
- Front-load the most important elements (subject + action)
- Use one primary camera movement per prompt
- Specify time of day and light quality for consistency
- For character consistency across clips, copy exact physical descriptions

### I2V (Image-to-Video)
The source image establishes visual identity — your prompt drives the motion.

**I2V Formula:**
```
[Motion Description] + [Camera Movement]
```

**What to include:**
- What moves and how (subject motion, environmental motion)
- Camera behavior (movement type and speed)
- Speed and intensity adverbs
- Atmospheric changes (if any — e.g., wind picks up, light shifts)

**What to omit:**
- Static visual elements already visible in the image
- Subject appearance details (the image provides this)
- Scene description (already established by the image)

**I2V Tips:**
- High-resolution, clear source images produce the best results
- Match lighting direction between your prompt intent and the source image
- Motion should be physically plausible from the starting pose in the image
- Simpler motion prompts produce more reliable I2V results
- Hailuo "builds motion based on the image's light, geometry, and textures"

**Note:** Hailuo 2.3 Fast mode is I2V only (no T2V support in Fast mode).

## Camera Control

Hailuo understands professional cinematography terminology. Use natural language camera descriptions in your prompts.

### Shot Types
| Shot | Use Case |
|------|----------|
| Extreme close-up | Texture, emotion, detail |
| Close-up | Facial expression, product detail |
| Medium shot | Character interaction, upper body action |
| Wide shot | Environment context, full body motion |
| Establishing shot | Scene setting, scale |

### Camera Movements (Natural Language)
| Movement | Example Usage |
|----------|---------------|
| Tracking shot | "tracking shot follows the runner through the forest" |
| Dolly in/out | "camera slowly dollies in toward the subject" |
| Pan left/right | "slow pan right revealing the cityscape" |
| Crane up/down | "crane shot rises above the rooftops" |
| Drone shot | "aerial drone circles the mountain peak" |
| Rack focus | "rack focusing from the leaves to her expression" |
| Dutch angle | "Dutch angle captures the disorientation" |
| Handheld | "shaky handheld footage, documentary style" |
| Static | "locked static camera, no movement" |

### Director Mode Bracket Syntax (API/Direct)
For precise camera control, Hailuo supports bracket commands (from the Director model T2V-01-Director):

```
[Truck left] [Pan right] [Push in] [Zoom out] [Static shot]
[Pedestal up] [Pedestal down] [Tilt up] [Tilt down]
```

**Bracket rules:**
- Enclose in square brackets: `[Pan left]`
- Max 3 movements per bracket: `[Truck left, Pan right, Zoom in]`
- Sequential placement: `Subject walks [Pan left], then stops [Push in]`
- No space between `]` and the following text

**Note:** On Higgsfield, use the platform's camera presets instead of bracket syntax.

## Stylization Capabilities

Hailuo 2.3's standout feature is native multi-style support with frame consistency.

### Supported Styles
| Style | Prompt Keywords | Strengths |
|-------|----------------|-----------|
| **Photorealistic** | "cinematic, photorealistic, natural lighting" | Default mode; strong physics and skin rendering |
| **Anime** | "anime style, cel-shaded, Japanese animation" | Line stability, temporal coherence, consistent character design |
| **Illustration** | "illustrated, painted, digital art" | Color stability and style recognition across frames |
| **Ink Wash Painting** | "ink wash painting, sumi-e, traditional Chinese brush" | Authentic brushstroke dynamics, ink diffusion |
| **Game CG** | "game CG, rendered, 3D cinematic" | Polished game-engine aesthetic |

### Style Locking
Hailuo 2.3 prevents "style drift" — the common problem where a video starts in one aesthetic but gradually shifts toward photorealism. The model maintains consistent line weight, shading technique, and color palette throughout the entire clip regardless of motion complexity.

## Best Practices

1. **Write narratively, not as keywords** — "A cyberpunk samurai sprints through a rain-soaked Neo-Tokyo market, knocking over stalls as neon lights reflect off the wet pavement" beats "cyberpunk, samurai, rain, neon, city, running, 4k"
2. **Use strong, specific action verbs** — Verbs and adverbs directly control motion intensity. "Aggressively accelerates, careening around the corner" produces far more dynamic motion than "drives fast around the corner"
3. **Keep I2V prompts focused on motion only** — The image already provides visual identity. Describing static elements wastes prompt space and can confuse the motion generator
4. **Iterate with small motion changes** — Small prompt tweaks to motion cues often produce better results than rewriting everything. Adjust verbs and adverbs first.
5. **Use one primary camera movement** — Compound camera moves in a single prompt can compete with each other. Pick the most important movement.
6. **Specify anchor features for character consistency** — When creating multiple clips of the same character, copy exact physical descriptions: "A 40-year-old woman with shoulder-length auburn hair, small mole above left eyebrow, worn brown leather jacket"
7. **Leverage stylization keywords early** — Place style direction near the beginning of your prompt for strongest effect: "Anime style, cel-shaded — a warrior leaps..."
8. **Disable prompt optimizer for precise control** — If your prompt is carefully crafted, set prompt_optimizer to OFF to prevent the model from altering your intent

## Example Prompts

### Example 1: Cinematic Action (T2V)
```
Tracking shot follows a parkour athlete as she vaults over a concrete barrier and launches into a spinning leap between rooftops at golden hour. Wind catches her jacket mid-flight. Warm backlighting creates a silhouette against the amber sky, cinematic slow motion.
```

### Example 2: Character Transformation (T2V)
```
Close-up of a woman's face as she slowly transforms into a crystalline ice sculpture. Frost spreads from her jawline upward, her breath visible in the cold air. Skin becomes translucent, catching prismatic light refractions. Camera slowly pushes in, dramatic rim lighting.
```

### Example 3: Anime Style (T2V)
```
Anime style, cel-shaded — a lone samurai stands at the edge of a cliff as cherry blossoms swirl violently around him. His hand reaches for his katana. Wind whips his robes. Camera slowly orbits right, dramatic volumetric light cutting through the blossoms.
```

### Example 4: Ink Wash Painting (T2V)
```
Ink wash painting style, sumi-e brushwork — misty mountains emerge as a crane takes flight from a still lake. Ink bleeds and diffuses as the bird's wings unfold. Gentle upward crane shot, minimalist composition, traditional Chinese aesthetic, meditative atmosphere.
```

### Example 5: Product Morph (T2V)
```
A luxury perfume bottle sits on a marble surface, then slowly melts into liquid gold that pools and ripples outward. Light catches the metallic surface, prismatic reflections dance across the frame. Macro lens, static shot, studio lighting, premium commercial aesthetic.
```

### Example 6: Portrait Animation (I2V)
```
Subject slowly turns head to the left, a warm smile forming gradually. Hair sways gently as if caught in a soft breeze. Subtle camera dolly in, shallow depth of field.
```

### Example 7: Landscape Animation (I2V)
```
Clouds drift across the sky in accelerated motion, their shadows sweeping across the valley below. Water in the foreground ripples gently. Slow pan right, golden hour light intensifying.
```

### Example 8: Anime Character Animation (I2V)
```
Character's cape billows dramatically in a sudden gust of wind. Eyes narrow with determination, hand clenches into a fist. Energy particles begin swirling around the figure. Static camera, anime action style.
```

## Common Mistakes to Avoid

1. **Comma-separated keyword spam** — "cyberpunk, city, rain, neon, 4k, running" produces generic results. Write a narrative sentence describing the scene unfolding over time.
2. **Re-describing the image in I2V** — In image-to-video mode, the model already sees your input image. Describing static visual elements wastes tokens and confuses the motion generator. Focus only on motion and camera.
3. **Vague action descriptions** — "A person walks in a park" gives the model nothing to work with. Specify how: "A woman jogs briskly through a sun-dappled park, ponytail swinging, as leaves scatter in her wake."
4. **Contradictory style and lighting** — "Bright sunny day with dark moody atmosphere" forces the model to choose. Pick one coherent visual direction.
5. **Overloading with multiple complex actions** — Asking for too many simultaneous actions (transformation + camera move + environmental change + character interaction) reduces quality. Simplify to 1-2 key motions per clip.
6. **Ignoring the prompt optimizer setting** — If you craft a precise prompt but leave the optimizer ON, the model may alter your intent. Disable it for exact control. Conversely, simple prompts benefit from having it ON.
7. **Mismatched lighting in I2V** — If your source image has left-side window light but your prompt describes "dramatic backlight from behind," the result will conflict. Match lighting direction to the source.

## Higgsfield Notes

| Setting | Recommendation |
|---------|---------------|
| Aspect Ratio | 16:9 for cinematic, 9:16 for social/vertical, 1:1 for product |
| Duration | 6s (supports 1080p); 10s (768p only) |
| Enhance | OFF (Hailuo handles detail well natively) |
| Camera Presets | Use Higgsfield presets instead of bracket syntax |
| Credits | ~3-5 per clip |

**Quality mode selection:**
- Use **Fast 2.3** for concept exploration and rapid iteration (cheaper, still high quality)
- Use **Standard 2.3** for final production clips and hero shots

**Best camera presets for MiniMax Hailuo:**
- Transformations/VFX: Static, Super Dolly In, Focus Change
- Anime action: Tracking, Whip Pan, Crash Zoom In
- Character portraits: Dolly In, Arc Left/Right, Static
- Product showcase: 360 Orbit, Lazy Susan, Dolly Zoom In
- Cinematic establishing: Crane Up, Aerial Pullback, Pan Left/Right
- Ink wash / artistic: Crane Up, Dolly Out, Static
- Dynamic action: FPV Drone, Bullet Time, Hero Cam

## Version Comparison

| Feature | Hailuo 02 | Hailuo 2.3 |
|---------|-----------|-------------|
| Body movement | Good | Enhanced — complex choreography |
| Facial expressions | Basic | Micro-expression modeling |
| Physics simulation | Standard | Physically correct depth + inertia |
| Anime/stylization | Limited | Native anime, ink wash, game CG |
| Style consistency | Some drift | Style locking — no aesthetic drift |
| Prompt adherence | Good | Significantly improved |
| Speed | Fast | Same speed, better quality |
| Pricing | Baseline | Same as 02 (Fast mode 50% cheaper) |
| Last-frame conditioning | Yes (768p) | Not supported |
| T2V + I2V | Both | Both (Fast mode: I2V only) |

**When to use Hailuo 02 vs 2.3:**
- Use **Hailuo 02** when you need last-frame conditioning or are working with an established 02 workflow
- Use **Hailuo 2.3 Standard** for production-quality clips, stylized content, or complex motion
- Use **Hailuo 2.3 Fast** for rapid I2V iteration and batch processing at lower cost
