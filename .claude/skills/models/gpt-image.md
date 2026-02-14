# GPT-Image (1.5 / Hazelnut) Prompt Guide

## Model Info
| Field | Value |
|-------|-------|
| Name | GPT-Image 1.5 |
| Maker | OpenAI |
| Type | Image |
| Modes | T2I, I2I |
| Syntax | Natural language |
| Negative Prompts | In-prompt only (natural language exclusions) |
| Higgsfield Available | Yes |
| Approx. Cost | ~1 credit per generation |

## Overview

GPT-Image 1.5 (December 2025) is OpenAI's latest image generation model, with "Hazelnut" being the codename for the upcoming GPT-Image-2.

## Key Capabilities

| Feature | Description |
|---------|-------------|
| Speed | 4x faster than previous versions |
| Text Rendering | Significantly improved legibility |
| Editing | Add/remove objects, change styles, refine areas |
| Precision | Better instruction following |

## Syntax Format

**Natural language description** - no special parameters required.

```
[Detailed description of the image including subject, setting, style, lighting, composition, and mood]
```

## Prompt Structure

**Recommended elements:**
1. **Subject**: Main focus of the image
2. **Setting/Environment**: Where it takes place
3. **Style**: Artistic style or reference
4. **Lighting**: Light quality and direction
5. **Composition**: Framing and arrangement
6. **Mood/Atmosphere**: Emotional tone
7. **Technical details**: Camera angle, depth of field (optional)

## Best Practices

### Be Specific and Detailed
GPT-Image responds well to detailed descriptions:

**Too vague:**
```
A cat sitting on a chair
```

**Better:**
```
A fluffy orange tabby cat sitting regally on a vintage green velvet armchair, warm afternoon sunlight streaming through a window, cozy living room setting, shallow depth of field, photorealistic style
```

### Use Clear Style References

Effective style descriptors:
- "photorealistic, 8k quality"
- "digital illustration style"
- "oil painting texture"
- "watercolor aesthetic"
- "3D rendered, Pixar-style"
- "vintage film photography, grain effect"
- "minimalist vector art"
- "hyperrealistic CGI"

### Lighting Specifications

| Lighting Type | Effect |
|---------------|--------|
| Golden hour | Warm, soft, flattering |
| Blue hour | Cool, moody, atmospheric |
| Studio lighting | Clean, professional |
| Dramatic side lighting | High contrast, cinematic |
| Soft diffused | Even, gentle shadows |
| Backlit/rim lighting | Silhouette, glow effect |
| Neon/artificial | Urban, cyberpunk feel |

### Negative Instructions

Use clear exclusion language:
```
...without any text or watermarks
...no people in the background
...exclude any brand logos
```

## Example Prompts

### Example 1: Product Photography
```
A sleek wireless earbuds case on a marble surface, minimalist product photography style, soft studio lighting from the left, subtle reflection on the surface, clean white background with gentle shadows, premium tech aesthetic, hyperrealistic 8k quality
```

### Example 2: Portrait Illustration
```
Portrait of a young woman with curly auburn hair, wearing a denim jacket, warm golden hour lighting on her face, urban rooftop setting with blurred city skyline in background, contemporary digital illustration style reminiscent of Loish, vibrant but naturalistic colors, gentle confident expression
```

### Example 3: Fantasy Scene
```
An ancient treehouse library built into a massive oak tree, spiral staircase of weathered wood wrapping around the trunk, warm candlelight glowing from windows, fireflies floating in the twilight air, fantasy illustration style, rich atmospheric perspective, magical cozy atmosphere, highly detailed architectural elements
```

### Example 4: Food Photography
```
Artisan sourdough bread fresh from the oven, steam rising, rustic wooden cutting board, scattered flour dust, warm morning light from a nearby window, shallow depth of field focusing on the crust texture, editorial food photography style, appetizing and inviting mood
```

## Image-to-Image (I2I)

GPT-Image excels at editing existing images with natural language instructions.

### Editing Modes

| Mode | Description | Example |
|------|-------------|---------|
| Add elements | Insert new objects/elements | "Add a small white butterfly landing on the flower" |
| Remove elements | Clean removal with inpainting | "Remove the person in the background" |
| Style transfer | Change artistic style | "Transform this into a watercolor painting" |
| Modify attributes | Change colors, lighting, mood | "Make the lighting more dramatic with stronger shadows" |
| Preserve + change | Edit while keeping specific elements | "Change the background to a beach sunset while keeping the person unchanged" |

### I2I Best Practices
- **Be specific about what to change**: "Change the wall color to navy blue" not "change the color"
- **Be explicit about what to preserve**: "Keep the person, lighting, and composition unchanged"
- **Use clear action verbs**: Add, remove, change, transform, enhance, replace
- **Avoid vague instructions**: "Make it better" gives unpredictable results
- **Layer edits**: Make one change at a time for precision

### Adding Elements
```
Add a small white butterfly landing on the flower in the foreground, maintaining the same lighting and style
```

### Removing Elements
```
Remove the person in the background while maintaining the natural scenery and lighting continuity
```

### Style Changes
```
Transform this photo into a watercolor painting style while preserving the composition and subject placement
```

### Refinements
```
Enhance the lighting to be more dramatic with stronger shadows on the left side, keeping everything else unchanged
```

## Quality Enhancers

Add these for higher quality outputs:
- "highly detailed"
- "professional quality"
- "8k resolution"
- "sharp focus"
- "masterfully composed"
- "award-winning photography" (for photo styles)

## Common Mistakes to Avoid

- Don't be too brief (detail helps)
- Don't use conflicting style instructions
- Don't forget lighting specification
- Don't overload with too many subjects
- Don't use MJ-style parameters (--ar, --s) - use natural language

## Comparison to Other Models

| Aspect | GPT-Image | Midjourney |
|--------|-----------|------------|
| Syntax | Natural language | Parameters |
| Text in images | Excellent | Good |
| Editing | Built-in | Limited |
| Style control | Description-based | Parameter-based |
| Speed | Very fast | Fast |

## Higgsfield Notes

| Setting | Recommendation |
|---------|---------------|
| Aspect Ratio | 1:1, 16:9, 9:16 |
| Enhance | OFF |
| Credits | ~1 per generation |
