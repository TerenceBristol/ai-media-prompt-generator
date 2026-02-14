---
name: prompt-generator
description: Generate AI image and video prompts. Use when user asks for prompts for any AI media generation model. Supports 5 modes (T2I, I2I, T2V, I2V, Storyboard), 9 models, multi-model comparison, Higgsfield-optimized output, style library, and consistency mode.
---

# AI Media Prompt Generator

## When to Use This Skill
Activate when the user:
- Asks to create/generate/write a prompt for AI image or video generation
- Mentions image, video, or media generation
- References specific models (Midjourney, VEO3, GPT-Image, Flux, Seedream, Nano Banana, Wan, Kling, Seedance, etc.)
- Wants help crafting AI art, video, or storyboard prompts
- Asks for multi-model comparison prompts
- Mentions Higgsfield workflow

## Conversation Flow

### Step 1: Detect Generation Mode

From the user's message, identify the generation mode:

| Mode | Description | Trigger Phrases |
|------|-------------|-----------------|
| **T2I** | Text-to-Image | "image prompt", "create an image", "photo of" |
| **I2I** | Image-to-Image | "edit this image", "modify this photo", "change the style", reference image provided |
| **T2V** | Text-to-Video | "video prompt", "create a video", "animate", "cinematic scene" |
| **I2V** | Image-to-Video | "animate this image", "bring this to life", "make this move", image + motion request |
| **Storyboard** | Multi-shot sequence | "storyboard", "multi-shot", "sequence", "series of shots" |

If mode is unclear, ask:
> "What type of generation are you looking for?"
>
> 1. **Text-to-Image (T2I)** — Generate an image from a description
> 2. **Image-to-Image (I2I)** — Edit or restyle an existing image
> 3. **Text-to-Video (T2V)** — Generate a video from a description
> 4. **Image-to-Video (I2V)** — Animate an existing image
> 5. **Storyboard** — Create a multi-shot sequence (2-6 shots)

### Step 2: Mode-Specific Clarifying Questions

Ask questions sequentially, waiting for each answer. Adapt based on mode:

#### T2I Questions
1. **Subject & Action**: "What's the main subject? What are they doing or what's happening?"
2. **Style & Mood**: "What visual style are you going for? (photorealistic, cinematic, illustrated, fantasy, editorial, etc.)"
3. **Setting & Environment**: "Where does this take place? Time of day, weather, atmosphere?"
4. **Technical Preferences**: "Any specific aspect ratio, composition, or camera angle preferences?"
5. **Reference/Inspiration** (optional): "Any reference images, artists, films, or styles to emulate? (Skip if none)"

#### I2I Questions
1. **Reference Image**: "Please paste, attach, or provide the path/URL to your reference image."
2. **What to Change**: "What do you want to modify? (style, elements, background, lighting, etc.)"
3. **What to Keep**: "What should remain unchanged? (subject, composition, colors, etc.)"
4. **Style Direction** (optional): "Any specific style direction for the edit?"

#### T2V Questions
1. **Subject & Action**: "What's the main subject? What happens in the video?"
2. **Style & Mood**: "What visual style? (cinematic, documentary, commercial, animated, etc.)"
3. **Camera Movement**: "Any specific camera movement? (static, dolly, pan, orbit, tracking, handheld, etc.)"
4. **Setting & Environment**: "Where does this take place? Time of day, atmosphere?"
5. **Audio Direction**: "Any audio needs? (dialogue, ambient sounds, music direction, silent)"
6. **Duration**: "Preferred duration? (5s, 8s, 10s, 15s)"
7. **Reference/Inspiration** (optional): "Any reference films, videos, or styles?"

#### I2V Questions
1. **Reference Image**: "Please paste, attach, or provide the path/URL to your source image."
2. **Desired Motion**: "What motion should happen? (subject movement, camera movement, environmental motion)"
3. **Camera Movement**: "Camera behavior? (static, dolly in, pan, orbit, etc.)"
4. **Audio Direction**: "Any audio needs? (ambient, dialogue, music, silent)"
5. **Duration**: "Preferred duration? (5s, 8s, 10s, 15s)"

#### Storyboard Questions
1. **Story/Scene Overview**: "Describe the overall story or scene you want to tell."
2. **Number of Shots**: "How many shots? (2-6, default: 4)"
3. **Style & Mood**: "What visual style for the whole sequence?"
4. **Character Descriptions**: "Describe key characters (appearance, wardrobe, distinguishing features)."
5. **Audio/Dialogue Per Shot**: "Any dialogue or specific audio for each shot?"

### Step 3: Check for Consistency Mode

If the user:
- Says "consistency mode" or "keep character consistent"
- Is generating multiple prompts with the same characters
- Is building a storyboard or multi-shot sequence

Then activate **Consistency Mode**:
1. Ask user to define characters: "Describe each character with specific, unchanging details (name, age, hair, clothing, distinguishing features)"
2. Ask user to define scenes (if applicable): "Describe recurring settings with fixed details"
3. These identity anchors will be embedded verbatim in every prompt generated
4. Suggest: "For persistent character identity across many generations, consider creating a **Higgsfield Soul ID** (10-20 reference photos, ~5 min setup). This locks facial features across all clips."

### Step 4: Model Recommendation Engine

Based on the mode and concept details, recommend compatible models with reasoning and credit costs:

#### Mode-to-Model Compatibility

| Mode | Compatible Models |
|------|-------------------|
| T2I | Midjourney v7, Flux 2 Max, GPT-Image 1.5, Seedream 4.5, Nano Banana Pro |
| I2I | GPT-Image 1.5, Seedream 4.5, Flux 2 Max, Nano Banana Pro, Midjourney v7 (--oref/--sref) |
| T2V | VEO3, Wan 2.2, Kling 3.0, Seedance 2.0 |
| I2V | VEO3, Wan 2.2, Kling 3.0, Seedance 2.0 |
| Storyboard | Kling 3.0 (6-cut storyboard), Seedance 2.0 (multi-shot) |

Present recommendations like:
> **Recommended models for your [mode] concept:**
>
> | Model | Why | Approx. Credits |
> |-------|-----|-----------------|
> | [Model 1] | [1-line reasoning] | ~X credits |
> | [Model 2] | [1-line reasoning] | ~X credits |
> | [Model 3] | [1-line reasoning] | ~X credits |
>
> Which models would you like prompts for? (Pick one or more, or say "all")

#### Credit Cost Reference

| Model | Approx. Cost per Generation |
|-------|----------------------------|
| Midjourney v7 | ~2 credits |
| Flux 2 Max | ~1 credit |
| GPT-Image 1.5 | ~1 credit |
| Seedream 4.5 | ~1 credit |
| Nano Banana Pro | <1 credit |
| VEO3 | ~8 credits |
| Wan 2.2 | ~3 credits |
| Kling 3.0 | ~5 credits |
| Seedance 2.0 | ~5 credits |

### Step 5: Style Suggestion (Optional)

After gathering concept details, optionally suggest relevant styles from the style library:

1. Check `.claude/skills/styles/` for available style files
2. If 2-3 styles match the concept, suggest them:
   > "Based on your concept, these styles might work well:"
   > - **Cinematic Kodak Portra** — Warm film tones, shallow DOF, 85mm feel
   > - **Neon Cyberpunk** — High contrast, neon colors, rain-slicked surfaces
   >
   > "Want to use one of these, mix elements, or go completely freestyle? (Default: freestyle)"
3. If user picks a style, load the style file and adapt its descriptors for each target model
4. If user says freestyle or skips, proceed without style constraints

### Step 6: Load Model Guides & Generate Prompts

For each selected model:
1. Read the model-specific guide from `.claude/skills/models/[model-name].md`
2. Read the Higgsfield reference from `.claude/skills/higgsfield-reference.md` (for camera presets and settings)
3. Generate **2 prompt variations** per model:
   - **Safe Interpretation**: Stays close to user's description, proven techniques, predictable result
   - **Creative Interpretation**: Pushes boundaries, unexpected angles, more artistic license

### Step 7: Present Higgsfield-Ready Output

Format output for each model using this structure:

```
## [Model Name] — [Mode]

### Safe Interpretation
**Prompt** (paste into Higgsfield):
> [prompt text only — no camera/aspect ratio embedded in prompt text]

**Higgsfield Settings:**
| Setting | Value |
|---------|-------|
| Model | [model name as shown in Higgsfield] |
| Aspect Ratio | [ratio] |
| Motion Preset | [specific preset from 65 options, or "N/A" for images] |
| Duration | [seconds, or "N/A" for images] |
| Enhance | OFF |
| Approx. Credits | [cost] |

### Creative Interpretation
**Prompt** (paste into Higgsfield):
> [prompt text only]

**Higgsfield Settings:**
| Setting | Value |
|---------|-------|
| Model | [model name] |
| Aspect Ratio | [ratio] |
| Motion Preset | [preset] |
| Duration | [seconds] |
| Enhance | OFF |
| Approx. Credits | [cost] |

**Key choices:** [1 line explaining model-specific decisions made]
```

After all models, include:

```
---

## Quick Copy

### [Model 1]
- **Safe**: `[prompt]`
- **Creative**: `[prompt]`

### [Model 2]
- **Safe**: `[prompt]`
- **Creative**: `[prompt]`

[...repeat for each model...]
```

### Step 8: Higgsfield Workflow Tips

Include contextual tips when relevant:

- **Character consistency needed?** → "Create a Soul ID first (10-20 photos, ~5 min setup). Attach to all generations for consistent facial features."
- **Multi-shot sequence?** → "Use Popcorn Auto Mode with 6-8 frames. Lead with visual style, then subject."
- **Cinematic quality?** → "Use Cinema Studio 2.0: perfect the Hero Frame first, then add motion."
- **Camera movement?** → Suggest 2-3 specific presets from the 65 available. Reference `.claude/skills/higgsfield-reference.md` for the full list.

Example camera suggestions:
> **Suggested camera presets for this scene:**
> - **Dramatic reveal**: Crash Zoom In or Super Dolly In
> - **Smooth exploration**: Dolly In + Pan Right
> - **Documentary feel**: Handheld or Steadicam

### Step 9: Refinement (If Requested)

If the user wants changes:
1. Ask what specific aspect to modify (prompt text, model selection, style, settings)
2. Generate refined versions
3. Explain what changed and why

### Step 10: Offer to Save Style

After a successful generation the user is happy with:
> "Would you like me to save this style as a reusable preset? I'll create a style file you can reference in future prompts."

If yes:
1. Extract the key style elements (descriptors, camera, lighting, mood)
2. Create a new file in `.claude/skills/styles/[style-name].md` using the style format:
```markdown
# [Style Name]
## Description
[1-2 sentence description]
## Descriptors
[Model-agnostic style descriptors]
## Camera
[Camera/lens suggestions]
## Lighting
[Lighting direction]
```

## Reference Image Handling (I2I / I2V)

When the user provides a reference image:
- Accept pasted images, file paths, or URLs
- For I2I: The image establishes the base — prompts focus on what to change
- For I2V: The image establishes subject/scene/style — prompts focus on motion and camera
- Include reference instructions in model-specific syntax (e.g., MJ uses `--oref`, Wan uses image-to-video formula)

## Model-Specific Formatting Reference

### Midjourney v7
```
[descriptive prompt] --ar [ratio] --s [stylize] --v 7 [other params]
```
- I2I: Use `--oref [url]` for object reference, `--sref [url]` for style reference, `--iw [0-3]` for image weight

### VEO3
```
[Subject] + [Action] + [Setting] + [Style] + [Camera] + [Lighting] + [Audio]. No subtitles, no text overlay.
```
- I2V: Reference image as first/last frame, 720p+ recommended

### GPT-Image 1.5
```
[Detailed natural language description with style, lighting, composition, and mood]
```
- I2I: "Add/Remove/Modify [element] while preserving [what to keep]"

### Flux 2 Max
```
[Subject] + [Action] + [Style] + [Context]
```
- No negative prompts — describe what you want, not what to avoid
- I2I: Reference images (2-3 max), positive-only reframing

### Seedream 4.5
```
[Subject], [style], [composition], [lighting/atmosphere], [technical]
```
- I2I: Editing endpoint, inpainting/outpainting, multi-image blend (up to 6)

### Nano Banana Pro
```
[Subject + Adjectives] doing [Action] in [Location], [Composition], [Lighting], [Style]
```
- Natural creative director language — no tag soups
- I2I: Reference image with weight values, conversational edits

### Wan 2.2
```
[Subject] + [Scene] + [Movement] + [Aesthetic] + [Style]
```
- I2V: [Motion Description] + [Camera Movement] — source image establishes subject/scene

### Kling 3.0
```
[Cinematic director-style description with shot composition, action, dialogue, camera]
```
- Dialogue: `[Speaker: role, tone]: "line"`
- Storyboard: `Shot 1 (3s): ... Shot 2 (2s): ...`

### Seedance 2.0
```
[Subject + Action + Camera + Scene + Style]
```
- @Tag references: @Image1, @Video1, @Audio1 (up to 12 files)
- NO negative prompts (model ignores them — use positive phrasing)
- Audio must be MP3 format

## Quality Checklist

Before presenting prompts, verify:
- [ ] Correct generation mode identified
- [ ] Mode-specific questions asked and answered
- [ ] Model-specific syntax is correct for each selected model
- [ ] Prompts do NOT embed camera presets or aspect ratios in text (these are Higgsfield UI settings)
- [ ] Higgsfield settings table is complete for each prompt
- [ ] Camera preset suggestions are relevant to the scene (for video modes)
- [ ] 2 variations per model (Safe + Creative)
- [ ] Each variation is meaningfully different
- [ ] Quick Copy section provided
- [ ] Consistency mode anchors embedded (if active)
- [ ] Relevant Higgsfield workflow tips included
- [ ] Style library reference offered (if applicable)
- [ ] Credit costs included in recommendations
