# FLUX.2 Max Prompt Guide

## Overview

FLUX.2 Max is Black Forest Labs' top-tier image generation model (released November 2025), offering exceptional image quality, prompt understanding, and editing consistency. Designed for professional creative and marketing workflows.

## Syntax Format

```
[Subject] + [Action] + [Style] + [Context]
```

**Rules:**
- Word order matters - FLUX.2 pays more attention to what comes first
- No negative prompts - describe what you want, not what to avoid
- Use hex color codes for precise color matching
- Text in quotation marks for typography

## Core Prompt Structure

| Element | Description | Example |
|---------|-------------|---------|
| Subject | Main focus | "Black cat" |
| Action | What it's doing | "hiding behind" |
| Style | Artistic approach | "professional studio shot" |
| Context | Setting, mood, atmosphere | "summer mystery vibe" |

## Prompt Length Guidelines

| Length | Words | Use Case |
|--------|-------|----------|
| Short | 10-30 | Quick concepts, style exploration |
| Medium | 30-80 | Most projects (recommended) |
| Long | 80+ | Complex scenes, detailed specs |

## Key Features

### No Negative Prompts
Instead of exclusions, describe desired outcomes:
- Instead of "no blur" → "sharp focus throughout"
- Instead of "no people" → "empty scene"
- Instead of "no text" → "clean surface without writing"

### Hex Color Codes
Associate colors with specific objects:
```
Logo in brand orange color #F48120, background in deep navy #1A2B4C
```

### Text Rendering
Use quotation marks for readable text:
```
The text "OPEN" appears in red neon letters above the door
```

### Prompt Upsampling
Add `prompt_upsampling: true` to automatically enhance your prompt while preserving intent.

## Advanced Techniques

### Photorealistic Shots
Specify camera models, lenses, and film stocks:
```
Shot on Hasselblad X2D, 80mm lens, f/2.8, natural lighting, Kodak Portra 400 film grain
```

### JSON Structured Prompts
For complex scenes with precise control:
```json
{
  "scene": "modern office lobby",
  "subject": "reception desk with orchid",
  "lighting": "soft diffused daylight from floor-to-ceiling windows",
  "style": "architectural photography",
  "mood": "calm, professional"
}
```

### Multi-Reference Images
Combine up to 8 reference images:
- Start with 2-3 references
- Assign clear roles to each
- Too many can create conflicting signals

## Resolution Guidelines

| Spec | Value |
|------|-------|
| Minimum | 64 x 64 |
| Maximum | 4MP (e.g., 2048 x 2048) |
| Recommended | Up to 2MP |
| Dimension rule | Must be multiples of 16 |

## Example Prompts

### Example 1: Product Marketing
```
Luxury wireless earbuds on marble surface, color #2C2C2C matte black case, soft studio lighting from above, minimal shadows, clean white background, premium tech product photography, sharp focus, commercial quality
```

### Example 2: Cinematic Portrait
```
Young woman with curly red hair, looking over shoulder, golden hour sunlight streaming through window, shallow depth of field, shot on 85mm lens f/1.4, warm color grading, intimate documentary style
```

### Example 3: Brand Typography
```
The text "LAUNCH DAY" in bold sans-serif letters, color #FF6B35 orange gradient, floating above abstract geometric shapes in navy and white, modern tech startup aesthetic, clean minimalist design
```

### Example 4: Fantasy Scene
```
Ancient library carved into a cliff face, warm candlelight glowing from arched windows, misty forest valley below, aerial perspective, fantasy illustration style, atmospheric perspective, rich earth tones
```

## Best Practices

1. **Lead with the subject** - Most important element first
2. **Be specific about colors** - Use hex codes for precision
3. **Describe, don't exclude** - Say what you want, not what to avoid
4. **Reference real cameras** - For photorealistic results
5. **Use native languages** - For culturally authentic results
6. **Layer references clearly** - Assign roles when using multiple images

## Common Mistakes to Avoid

- Using negative prompts (--no, "without", "no")
- Vague color descriptions when precision matters
- Overloading with conflicting style instructions
- Forgetting quotation marks for text elements
- Starting with secondary details instead of the subject

## Official Resources

- Prompting Guide: https://bfl.mintlify.app/guides/prompting_guide_flux2
- Discord: discord.gg/blackforestlabs (#prompting channel)
- Model page: https://bfl.ai/models/flux-2
