# AI Media Prompt Generator

## Purpose
Generate high-quality, model-specific prompts for AI image and video generation through guided conversation. Optimized for Higgsfield workflow with multi-model comparison, 5 generation modes, and style library.

## Supported Models

| Model | Type | Modes | Approx. Credits | Status |
|-------|------|-------|-----------------|--------|
| Midjourney v7 | Image | T2I, I2I | ~2 | Active |
| Flux 2 Max | Image | T2I, I2I | ~1 | Active |
| Flux Kontext | Image | T2I, I2I | ~1.5 | Active |
| GPT-Image 1.5 | Image | T2I, I2I | ~1 | Active |
| Seedream 4.5 | Image | T2I, I2I | ~1 | Active |
| Nano Banana Pro | Image | T2I, I2I | <1 | Active |
| Reve Image 1.0 | Image | T2I, I2I | ~1 | Active |
| Z-Image | Image | T2I, I2I | <1 | Active |
| Higgsfield Soul | Image | T2I, I2I | ~1 | Active |
| Veo 3.1 | Video | T2V, I2V | ~8 | Active |
| WAN 2.6 | Video | T2V, I2V | ~3 | Active |
| Kling 3.0 | Video | T2V, I2V, Storyboard | ~5 | Active |
| Kling O1 | Video | T2V, I2V | ~5 | Active |
| Seedance 2.0 | Video | T2V, I2V, Storyboard | ~5 | Active |
| Sora 2 | Video | T2V, I2V | ~8-10 | Active |
| MiniMax Hailuo | Video | T2V, I2V | ~3-5 | Active |

## Generation Modes

| Mode | Description |
|------|-------------|
| **T2I** (Text-to-Image) | Generate an image from a text description |
| **I2I** (Image-to-Image) | Edit, restyle, or modify an existing image |
| **T2V** (Text-to-Video) | Generate a video clip from a text description |
| **I2V** (Image-to-Video) | Animate an existing image into video |
| **Storyboard** | Create a multi-shot sequence (2-6 shots) |

## Mode-to-Model Mapping

| Mode | Compatible Models |
|------|-------------------|
| T2I | Midjourney v7, Flux 2 Max, Flux Kontext, GPT-Image 1.5, Seedream 4.5, Nano Banana Pro, Reve Image 1.0, Z-Image, Higgsfield Soul |
| I2I | GPT-Image 1.5, Seedream 4.5, Flux 2 Max, Flux Kontext, Nano Banana Pro, Midjourney v7, Reve Image 1.0, Z-Image, Higgsfield Soul |
| T2V | Veo 3.1, WAN 2.6, Kling 3.0, Kling O1, Seedance 2.0, Sora 2, MiniMax Hailuo |
| I2V | Veo 3.1, WAN 2.6, Kling 3.0, Kling O1, Seedance 2.0, Sora 2, MiniMax Hailuo |
| Storyboard | Kling 3.0, Seedance 2.0 |

## Default Behavior

When a user asks to create prompts (image, video, or media prompts):

1. **Use the prompt-generator skill** — automatically invoked for prompt requests
2. **Detect generation mode** — T2I, I2I, T2V, I2V, or Storyboard
3. **Ask mode-specific questions** — tailored to the detected mode
4. **Recommend models** — with reasoning and credit costs
5. **Suggest styles** (optional) — from the style library
6. **Generate 2 variations per model** — Safe + Creative interpretations
7. **Format for Higgsfield** — prompt text separate from UI settings
8. **Include workflow tips** — Soul ID, Popcorn, Cinema Studio, camera presets
9. **Offer refinement** — iterate on any prompt
10. **Offer to save style** — save successful styles to library

## Prompt Request Triggers

Activate prompt generation when user says:
- "Create an image prompt" / "Generate a video prompt"
- "I need a prompt for [model name]"
- "Make me a Midjourney/VEO3/Kling/Seedance/etc. prompt"
- "Edit this image" / "Animate this image"
- "Create a storyboard" / "Multi-shot sequence"
- "Compare models for [concept]"
- Any variation requesting AI media prompts

## Quality Standards

- Detect the correct generation mode before proceeding
- Ask mode-specific clarifying questions
- Recommend compatible models with credit costs
- Use model-specific syntax and parameters from guide files
- Separate prompt text from Higgsfield UI settings (aspect ratio, camera preset)
- Provide 2 variations per model (Safe + Creative)
- Include camera preset suggestions for video modes
- Support consistency mode for multi-prompt workflows
- Offer contextual Higgsfield workflow tips

## Higgsfield Workflow Notes

- **Prompts are text only** — aspect ratio, camera presets, and duration are UI selections in Higgsfield, NOT embedded in prompt text
- **Camera presets** — 65 available presets (see `.claude/skills/higgsfield-reference.md`)
- **Soul ID** — Create for character consistency across generations (10-20 photos, ~5 min)
- **Popcorn** — Storyboard auto mode with key frames
- **Cinema Studio 2.0** — Frame-by-frame cinematic workflow
- **Enhance** — Default OFF; only use if output looks soft

## Style Library

Reusable style presets in `.claude/skills/styles/`:
- `cinematic-kodak-portra.md` — Warm analog film, shallow DOF
- `neon-cyberpunk.md` — High contrast, neon colors, rain-slicked
- `soft-editorial.md` — Clean, minimal, natural light
- `epic-fantasy.md` — Dramatic, volumetric light, painterly
- `documentary-natural.md` — Handheld, available light, candid

Users can create custom styles that are saved to this directory.

## Adding New Models

1. **Use the model-researcher skill**: `/model-researcher [model name]`
2. The skill researches official docs and community guides
3. Creates a model guide from the template at `.claude/skills/models/_template.md`
4. Updates this file with the new model entry

Manual process:
1. Copy `.claude/skills/models/_template.md` to `.claude/skills/models/[model-name].md`
2. Fill in all sections (Model Info, syntax, examples, etc.)
3. Add the model to the tables above
4. Add the file path to Model Files Location below

## Model Files Location

Model-specific syntax, parameters, and examples:
- `.claude/skills/models/midjourney.md`
- `.claude/skills/models/flux.md` (Flux 2 Max)
- `.claude/skills/models/flux-kontext.md` (Flux Kontext)
- `.claude/skills/models/gpt-image.md`
- `.claude/skills/models/seedream.md`
- `.claude/skills/models/nano-banana.md`
- `.claude/skills/models/reve.md`
- `.claude/skills/models/z-image.md`
- `.claude/skills/models/higgsfield-soul.md`
- `.claude/skills/models/veo3.md` (Veo 3.1)
- `.claude/skills/models/wan.md` (WAN 2.6)
- `.claude/skills/models/kling.md` (Kling 3.0)
- `.claude/skills/models/kling-o1.md`
- `.claude/skills/models/seedance.md`
- `.claude/skills/models/sora.md`
- `.claude/skills/models/minimax-hailuo.md`

Template: `.claude/skills/models/_template.md`

## Reference Files

- `.claude/skills/higgsfield-reference.md` — Camera presets, credit costs, Soul ID, Popcorn, Cinema Studio
- `.claude/skills/styles/` — Reusable style library
- `.claude/skills/model-researcher/SKILL.md` — Skill for adding new models
- `.claude/skills/model-updates/SKILL.md` — Monthly Higgsfield model audit skill
- `.claude/skills/model-updates/skipped.json` — Tracking for declined models
