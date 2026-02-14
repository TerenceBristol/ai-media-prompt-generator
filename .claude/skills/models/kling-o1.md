# Kling O1 Prompt Guide

## Model Info
| Field | Value |
|-------|-------|
| Name | Kling Video O1 |
| Maker | Kuaishou |
| Type | Video |
| Modes | T2V, I2V, Video Editing, Restyle, Extend |
| Syntax | Director-style natural language with @Element/@Image/@Video references |
| Negative Prompts | No |
| Higgsfield Available | Yes |
| Approx. Cost | ~5 credits per clip |

## Overview

Kling O1 is the world's first unified multimodal video model, released December 2025. Unlike traditional video generators that separate creation from editing, O1 handles text-to-video, image-to-video, video editing, restyling, extension, and motion transfer within a single architecture built on the Multi-modal Visual Language (MVL) framework. Its standout capabilities include an Element Library for locking character/prop identity across shots (up to 7 reference images), conversational video editing via natural language commands, and Chain-of-Thought reasoning that breaks complex prompts into logical steps before rendering. Think of it as a director, cinematographer, and editor in one engine.

**Key differentiator from Kling 3.0:** Kling 3.0 focuses on structured storytelling with storyboard mode and native dialogue/lip sync. Kling O1 focuses on unified generation-plus-editing with reference consistency, motion transfer, and conversational post-production. They complement each other rather than replace one another.

## Syntax Format

**Director-style natural language** with reference syntax for elements, images, and videos.

### Generation (T2V / I2V)
```
[Subject description] + [Interactions/Actions] + [Environment/Background] + [Visual directions: lighting, style, camera]
```

### Editing / Transformation
```
[Action verb] + [target element] + in [@Video] + [to/with/from] + [desired change or @Image/@Element reference]
```

### Reference Syntax
```
@Element1, @Element2  — Element Library references (multi-angle character/prop packages)
@Image1, @Image2      — Single uploaded reference images
@Video                 — Source video reference
```

**Rules:**
- Prompt length sweet spot: 50-150 words. Longer prompts create conflicts.
- One clear goal per prompt. State the objective and visual style in the first sentence.
- Reference elements by their exact syntax (@Element1, @Image1, @Video).
- Specify motion precisely ("leans forward slowly") rather than generically ("moves").
- Describe lighting explicitly ("golden hour sunlight from camera left") rather than vaguely ("nice lighting").
- Change one variable at a time when iterating.

## Prompt Structure

### Key Components
| Component | Description | Example |
|-----------|-------------|---------|
| Subject | Character/object with specific details (age, clothing, pose, expression) | "A young woman in a red trench coat, determined expression" |
| Action/Motion | Physical performance with direction and speed | "walks confidently through the crowd, coat billowing" |
| Environment | Setting, weather, time of day, atmospheric elements | "rain-soaked Tokyo street at night, neon reflections on wet pavement" |
| Visual Direction | Lighting, camera angle, style, color palette | "dramatic side lighting, low angle, cinematic 2.39:1 framing" |
| References | @Element, @Image, or @Video callouts woven into the description | "@Element1 stands at the edge of the rooftop, wind in her hair" |

### Priority Order
1. Subject identity and action (most weight)
2. Camera/composition direction
3. Environment and atmosphere
4. Lighting and color
5. Style references

## Key Parameters

| Parameter | Range/Options | Description |
|-----------|---------------|-------------|
| Duration | 5 or 10 seconds | Clip length per generation |
| Resolution | 1080p native, up to 2K/4K upscale | Output quality |
| Reference Images | 1-7 (generation), 1-4 (editing) | Number of image inputs accepted |
| Video Input | 3-10 seconds | Source video for editing/reference modes |
| Elements | Up to 4 per prompt | Multi-angle reference packages for consistency |
| Aspect Ratio | 16:9, 9:16, 1:1 | Output framing |
| Audio Toggle | On/Off | Preserve source audio in editing mode |

## Mode-Specific Sections

### T2V (Text-to-Video)

Pure text-based generation. O1 uses Chain-of-Thought reasoning to decompose your prompt before rendering, leading to better motion accuracy and physics simulation.

**Formula:**
```
[Subject description + action] + [environment + atmosphere] + [camera direction + lighting] + [style cues]
```

**Tips:**
- Front-load the subject and action in the first sentence
- Specify camera movement explicitly: "slow dolly in," "tracking shot from left," "static wide shot"
- Reference real cinematography styles or directors for tonal guidance
- Include physics cues: "hair blowing in wind," "fabric rippling," "steam rising"

### I2V (Image-to-Video)

Animates static images. Upload 1-7 reference images. The first image acts as the primary visual anchor.

**Formula:**
```
[@Element1 or uploaded image context] + [what motion occurs] + [camera movement] + [atmosphere/mood]
```

**Start & End Frame Mode:**
```
Take @Image1 as start frame, @Image2 as end frame. [Describe the transition: subject movement, environmental change, camera arc]
```

**Tips:**
- Clean, well-lit reference images with simple backgrounds produce the best results
- The model inherits composition, color palette, and lighting from the source image
- Focus your prompt on motion and change, not on re-describing what's already visible
- Multi-reference mode: upload multiple angles of the same subject for stronger identity lock

### Video Editing (O1's Signature Feature)

Edit existing footage through natural language commands. No masking, rotoscoping, or frame-by-frame work required. Upload a 3-10 second source video and describe changes conversationally.

**Editing Command Patterns:**

| Operation | Syntax Pattern | Example |
|-----------|---------------|---------|
| Add content | "Add [description] to [@Video]" | "Add fireworks going off in the background" |
| Remove content | "Remove [target] from [@Video]" | "Remove all the people around him" |
| Replace subject | "Change [subject] in [@Video] to [target] from [@Image]" | "Replace the character with @Element1" |
| Swap background | "Change the background in [@Video] with [@Image]" | "Change the background to a modern city with glass buildings" |
| Change weather | "Change [@Video] to [weather]" | "Change the weather to a heavy blizzard with strong snowfall" |
| Adjust lighting | "Change [lighting condition] in [@Video]" | "Change daytime to golden hour sunset" |
| Recolor | "Change the [item] in [@Video] to [color]" | "Change the red car to blue" |
| Restyle | "Change [@Video] to [style] style" | "Change @Video to cyberpunk style" |
| Camera angle | "Generate [angle] in [@Video]" | "Generate a close-up shot in @Video" |
| Green screen | "Change background to green screen, keep [subject]" | "Change background to green screen, keep the dancer" |

**Multi-Reference Editing:**
Combine up to 4 elements and reference images in a single transformation:
```
Replace the character with @Element1 while transforming the environment to match @Image1
```

### Video Extension

Extend clips forward or backward while maintaining visual coherence. Individual generations are 5-10 seconds, but extensions can reach up to 2 minutes.

**Syntax:**
```
Based on @Video, generate the next shot: [description of what happens next]
Based on @Video, generate the previous shot: [description of what came before]
```

### Motion Transfer

Extract camera movement or character motion from a reference video and apply it to new content.

**Syntax:**
```
Using camera motion from @Video, create shot featuring @Element1 [in described environment]
Animate @Element1 with the same motion as @Video
```

## Restyle Presets

O1 includes 11 built-in artistic style presets for quick transformations:

| Style | Description |
|-------|-------------|
| American Cartoon | Bold outlines, saturated colors, Western animation |
| Japanese Anime | Anime aesthetic with characteristic shading |
| Cyberpunk | Neon-lit, high-tech, dystopian |
| Pixel Art | Retro 8/16-bit game aesthetic |
| Ink Wash Painting | Traditional East Asian brush painting |
| Watercolor | Soft, flowing watercolor texture |
| Clay Style | Claymation/stop-motion look |
| Wool Felt | Soft textile handcraft aesthetic |
| Monet-inspired | Impressionist painting style |
| Oil Painting | Rich, textured oil painting |
| Figure Style | Figurine/toy-like rendering |

## Element Library Guide

The Element Library is O1's system for maintaining character and object consistency across multiple generations. Each Element is a multi-angle reference package.

### Creating an Element
1. Upload a primary image of the subject
2. Add 1-4 additional images from different angles (front, 3/4, profile, back)
3. The system builds a multi-angle understanding of the subject
4. Reference in prompts as @Element1, @Element2, etc.

### Element Image Best Practices
- Use clean, well-lit photos with minimal background clutter
- Include varied angles for 3D-like understanding
- Consistent lighting across reference images
- High resolution with clear subject isolation
- Each Element requires a minimum of 2 images (primary + at least one additional)

### Single-Image Workarounds
If you only have one image of a subject:
- Duplicate the file as a second input
- Generate AI variations from different angles
- Crop different sections of the same image
- Reuse existing media at different scales

### Consistency Performance
- With Element Library: 90-95% feature retention across shots
- Without Element Library: 60-70% consistency
- Best for: recurring characters, branded props, product showcases, multi-shot sequences

## Best Practices

1. **Lead with clarity** — Start your prompt with a single clear sentence stating the goal and visual style. This orients the model and reduces ambiguous outputs.
2. **Use the Element Library for recurring subjects** — Any character or object appearing in more than one shot should be set up as an Element. The consistency improvement (90-95% vs. 60-70%) is dramatic.
3. **Edit iteratively, one change at a time** — When using video editing mode, change one variable per pass. Stacking too many edits in a single prompt causes conflicts.
4. **Match lighting between frames** — In start/end frame mode, mismatched lighting between your input frames causes transition artifacts. Keep lighting conditions consistent.
5. **Describe motion, not just appearance** — O1 excels at physics-based movement. Give it specific motion cues: "slowly tilts head," "fabric ripples in wind," "steam curls upward."
6. **Use reference videos for camera work** — Rather than describing complex camera movements in text, upload a reference video with the motion you want and let O1 transfer it.
7. **Keep prompts 50-150 words** — Under 50 words lacks specificity. Over 150 words creates conflicting instructions. The sweet spot delivers the best prompt adherence.
8. **Leverage built-in restyle presets** — For artistic transformations, the 11 built-in presets (Cyberpunk, Anime, Oil Painting, etc.) are more reliable than describing styles from scratch.

## Example Prompts

### Example 1: T2V — Cinematic Character Shot
```
A young woman in a red dress stands at the edge of a cliff overlooking a stormy ocean at dusk. Wind whips her hair and dress to the left. She slowly raises her hand to shield her eyes, looking toward the horizon. Low angle camera, slow dolly in. Dramatic side lighting from the setting sun, deep orange and purple sky, crashing waves below. Cinematic, anamorphic lens flare.
```

### Example 2: I2V — Element-Based Animation
```
@Element1 walks through a bustling Tokyo fish market at dawn, examining the displays with curiosity. Warm overhead fluorescent lights mix with cool morning light from the entrance. Handheld tracking shot follows from behind, gradually circling to a 3/4 front angle. Steam rises from nearby stalls, vendors arrange fresh catches in the background.
```

### Example 3: Video Editing — Atmosphere Transformation
```
Change the location to a rainy night street, with wet reflections, moody neon lights, and a cinematic atmosphere. Add subtle fog rolling through the scene. Preserve the original character's movement and timing.
```

### Example 4: Video Editing — Subject Replacement with Element
```
Replace the original character with @Element1 while preserving the scene's action flow, maintaining their dynamic movements, energy, and emotional intensity. Keep the original background and lighting intact.
```

### Example 5: Video Editing — Multi-Reference Style Transfer
```
Transform the video's visual appearance into a bold Japanese anime art style with sharp linework, high-contrast shading, dynamic character expressions, and vibrant color palette. Maintain the original motion and camera work.
```

### Example 6: Start & End Frame Transition
```
Take @Image1 as start frame, @Image2 as end frame. The camera slowly pushes in as the subject's expression shifts from contemplation to quiet resolve. Morning light gradually intensifies, filling the room with warm golden tones. Subtle dust particles drift through the light beams.
```

### Example 7: Motion Transfer
```
Using camera motion from @Video, create a cinematic tracking shot of @Element1 walking through a futuristic city corridor. Neon strips line the walls, casting blue and pink light. Style inspired by Blade Runner 2049 — atmospheric haze, shallow depth of field, muted color grade.
```

### Example 8: Video Extension
```
Based on @Video, generate the next shot: the character pushes through the heavy wooden door and steps into a vast cathedral interior. Shafts of colored light stream through stained glass windows. Camera continues the forward movement from the previous shot, transitioning to a slow crane up revealing the vaulted ceiling.
```

## Common Mistakes to Avoid

1. **Overloading edit prompts** — Trying to change subject, background, lighting, and style in a single editing pass. Edit one or two variables at a time for reliable results.
2. **Ignoring Element Library for multi-shot work** — Generating multiple clips of the same character without setting up an Element drops consistency from 90%+ to 60-70%. Always create Elements for recurring subjects.
3. **Vague motion descriptions** — "The person moves around" gives the model nothing to work with. Be specific: "slowly walks forward, turns head to the right, pauses and looks up."
4. **Mismatched reference lighting** — Uploading a brightly lit daytime reference image for a scene described as "dark moody nighttime" creates visual conflicts. Match your references to your prompt's lighting.
5. **Prompts over 150 words** — Long, dense prompts cause the model to prioritize some instructions and ignore others. Stay in the 50-150 word range and be concise.
6. **Expecting storyboard mode** — Unlike Kling 3.0, O1 does not have a multi-shot storyboard mode. For multi-shot sequences, generate individual clips and use the extend feature to chain them, or use Kling 3.0's storyboard mode instead.
7. **Forgetting the @ syntax** — Writing "use my uploaded image" instead of @Image1 or @Element1. The model needs the explicit reference syntax to link inputs correctly.
8. **Re-describing visible content in I2V** — When animating a reference image, don't re-describe everything already visible. Focus your prompt on what should change: motion, camera, atmosphere.

## Higgsfield Notes

| Setting | Recommendation |
|---------|---------------|
| Aspect Ratio | 16:9 for cinematic, 9:16 for social/vertical, 1:1 for product |
| Duration | 5s for quick clips, 10s for narrative shots |
| Enhance | OFF (O1 produces native 2K quality; enhance can over-sharpen) |
| Camera Presets | Use for generation mode; for editing, camera is inherited from source |
| Credits | ~5 per generation |

**Best camera presets for Kling O1:**
- Character animation: Dolly In, Tracking, Arc Left/Right
- Product showcase: 360 Orbit, Lazy Susan, Super Dolly In
- Cinematic establishing: Crane Up, Aerial Pullback, FPV Drone
- Dramatic/emotional: Dolly Zoom In, Super Dolly In, Eyes In
- Documentary/natural: Handheld, Pan Left/Right, Head Tracking
- Motion transfer: Skip presets entirely — upload a reference video instead

**Workflow tips:**
- Use O1 for generation + editing in a unified pipeline: generate with T2V or I2V, then refine with editing commands
- Chain O1 with Kling 3.0: use O1 for individual shots with element consistency, then assemble using Kling 3.0's storyboard mode or Higgsfield's Popcorn
- Soul ID + Element Library: combine Higgsfield's Soul ID for face locking with O1's Element Library for full-body/outfit consistency
- Extend strategically: generate a strong 5-10s foundation clip first, then extend forward/backward rather than generating long clips from scratch
