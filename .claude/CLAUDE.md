# AI Media Prompt Generator

## Purpose
Generate high-quality, model-specific prompts for AI image and video generation through guided conversation.

## Supported Models

| Model | Type | Status |
|-------|------|--------|
| Midjourney v7 | Image | Active |
| VEO3 | Video | Active |
| GPT-Image 1.5 | Image | Active |

**To add new models**: Create `.claude/skills/models/[model-name].md`

## Default Behavior

When a user asks to create prompts (image, video, or media prompts):

1. **Use the prompt-generator skill** - automatically invoked for prompt requests
2. **Ask clarifying questions** - 3-5 targeted questions before generating
3. **Provide 3 variations** - Conservative, Moderate, Creative interpretations
4. **Format for target model** - Use model-specific syntax and parameters

## Prompt Request Triggers

Activate prompt generation when user says:
- "Create an image prompt"
- "Generate a video prompt"
- "I need a prompt for [model name]"
- "Make me a Midjourney/VEO3/GPT prompt"
- Any variation requesting AI media prompts

## Quality Standards

- Always confirm the target model before generating
- Include model-specific parameters (aspect ratio, style, etc.)
- Provide reasoning for each variation's approach
- Offer refinement after initial generation

## Model Files Location

Model-specific syntax, parameters, and examples are in:
- `.claude/skills/models/midjourney.md`
- `.claude/skills/models/veo3.md`
- `.claude/skills/models/gpt-image.md`
