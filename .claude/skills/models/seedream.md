# Seedream 4.5 Prompt Guide

## Overview

Seedream 4.5 is ByteDance's advanced text-to-image model with strong prompt understanding and image editing capabilities. It excels at photorealistic renders and precise text generation.

## Syntax Format

**Natural language description** - concise and precise prompts work best.

```
[Subject description], [style specification], [compositional details], [lighting/atmosphere], [technical parameters]
```

**Rules:**
- Aim for 30-100 words that precisely capture your vision
- First 5-8 words receive the most weight
- Pick 3-5 powerful descriptors instead of stacking 20 weak ones
- Put text in quotation marks for text generation

## Prompt Hierarchy

Seedream follows this understanding order:
1. **Subject** - Main focus (gets highest priority)
2. **Style** - Artistic or photographic approach
3. **Composition** - Element arrangement
4. **Lighting** - Mood-setting elements

## Key Features

| Feature | Description |
|---------|-------------|
| Text Generation | Use quotation marks: `"Seedream 4.5"` |
| Image Editing | Clear goals, concise instructions |
| Multi-Image | Trigger with "a series of" or "a set of" |
| Reference Images | Extract style, character, product features |

## Style Modifiers

**Artistic:**
- oil painting, watercolor, pencil sketch, digital art

**Photographic:**
- portrait photography, macro photography, aerial view

**Aesthetic:**
- cinematic, photorealistic, stylized, minimalist

## Lighting Directives

Seedream is particularly responsive to lighting cues:
- golden hour lighting
- dramatic side lighting
- soft diffused light
- moody low-key lighting
- bright and airy high-key lighting

## Technical Parameters

Include camera specs for precise control:
- shot on 85mm lens
- shallow depth of field
- high resolution
- 4K detail

## Compositional Control

- symmetrical composition
- rule of thirds
- foreground detail with blurred background
- wide-angle view
- overhead perspective
- centered in frame

## Example Prompts

### Example 1: Professional Portrait
```
Professional headshot of a female CEO with short blonde hair, confident expression, wearing a navy blue suit, neutral office background, studio lighting, shallow depth of field, high-end corporate photography style
```

### Example 2: Product Shot
```
Modern smartphone floating in space, dark background with subtle blue gradient, product photography, studio lighting highlighting the glossy screen, ultra-detailed, commercial quality, photorealistic rendering
```

### Example 3: Text Poster
```
Generate a motivational poster with the title "DREAM BIG" in bold white letters, sunset gradient background in orange and purple, minimalist design, inspirational aesthetic
```

### Example 4: Fantasy Scene
```
Ancient dragon perched on a mountain peak, dramatic storm clouds, lightning illuminating scales, epic fantasy illustration, cinematic composition, golden hour rim lighting, highly detailed, 4K
```

## Image Editing Tips

When editing existing images:
- Clearly define editing goals AND fixed elements
- Use concise, unambiguous instructions
- Avoid vague pronouns
- Specify what should remain unchanged

**Good:** "Change the background to a beach sunset while keeping the person unchanged"
**Bad:** "Make it look better"

## Common Mistakes to Avoid

- Stacking too many adjectives (pick 3-5 strong ones)
- Burying the subject deep in the prompt
- Using vague descriptions
- Forgetting quotation marks for text
- Overly complex vocabulary when simple words work

## Troubleshooting

**Subject not as expected?**
- Be more specific about defining characteristics
- Place subject description at the beginning
- Break complex subjects into clearer components

**Compositional issues?**
- Specify spatial relationships explicitly
- Use photography terminology (medium shot, close-up)
- Simplify scenes with too many elements

## Comparison Notes

| Aspect | Seedream 4.5 | Midjourney |
|--------|--------------|------------|
| Syntax | Natural language | Parameters (--ar, --s) |
| Prompt length | 30-100 words ideal | Flexible |
| Text rendering | Excellent with quotes | Good |
| Editing | Built-in support | Limited |
