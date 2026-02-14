# FLUX.1 Kontext Prompt Guide

## Model Info
| Field | Value |
|-------|-------|
| Name | Flux Kontext (Max) |
| Maker | Black Forest Labs |
| Type | Image |
| Modes | T2I, I2I |
| Syntax | Natural language (action verbs + preservation clauses) |
| Negative Prompts | No (describe what you want, not what to avoid) |
| Higgsfield Available | Yes |
| Approx. Cost | ~1.5 credits per generation |

## Overview

FLUX.1 Kontext is Black Forest Labs' context-aware image generation and editing model (released May 2025), purpose-built for in-context editing where you modify existing images through natural language instructions. Unlike Flux 2 Max which excels at pure generation from scratch, Kontext's strength is understanding what's already in an image and making precise, targeted changes while preserving everything else. It supports both text-to-image generation and image-to-image editing with industry-leading character consistency, typography manipulation, and style transfer. The Max variant delivers maximum quality, superior prompt adherence, and premium typography rendering.

## How Kontext Differs from Flux 2 Max

| Aspect | Flux Kontext | Flux 2 Max |
|--------|-------------|------------|
| **Primary strength** | Context-aware editing of existing images | Pure text-to-image generation |
| **Best for** | Modifying, restyling, editing images | Creating images from scratch |
| **Reference images** | Core feature; understands and preserves context | Supported but not primary focus |
| **Character consistency** | Industry-leading preservation across edits | Good but not editing-optimized |
| **Typography editing** | Replace text in images natively | Generate text in new images |
| **Prompt style** | Action verbs + preservation clauses | Descriptive scene building |
| **Max prompt tokens** | 512 | No hard limit documented |
| **Output resolution** | ~1MP (dimensions adjust by ratio) | Up to 4MP |

**When to use Kontext:** You have an existing image and want to edit it -- change backgrounds, swap outfits, replace text, transfer styles, maintain character across scenes, or make targeted modifications.

**When to use Flux 2 Max:** You are generating a brand-new image from a text description with no reference image, or you need higher resolution output (up to 4MP).

## Syntax Format

Kontext uses a unique three-layer prompt structure optimized for editing:

```
[Action: what to change] + [Context: how to change it] + [Preservation: what to keep]
```

**Rules:**
- Maximum 512 tokens per prompt -- plan your prompt length accordingly
- Use specific action verbs: "change," "add," "remove," "replace," "transform," "convert"
- Always include a preservation clause for elements you want unchanged
- Use direct subject naming ("the woman with short black hair"), never pronouns ("she," "her")
- Put quotation marks around text when editing typography
- No negative prompts -- describe desired outcomes only
- Word order matters -- most important instruction first

## Prompt Structure

### Key Components
| Component | Description | Example |
|-----------|-------------|---------|
| Action Layer | What to change and how | "Change the background to a beach" |
| Preservation Layer | What must stay the same | "while keeping the person in the exact same position, scale, and pose" |
| Detail Layer | Specific qualities of the change | "warm golden hour lighting, soft waves in the distance" |

### Priority Order
1. **Main modification** -- the primary edit instruction
2. **Preservation requirements** -- explicit protection of unchanged elements
3. **Detail description** -- specifics about the desired change

## Key Parameters

| Parameter | Options | Description |
|-----------|---------|-------------|
| Aspect Ratio | 3:7 to 7:3 (default 1:1) | Output proportions; total output is always ~1MP |
| Prompt Upsampling | true / false (default false) | Auto-enhances prompt interpretation; results become non-reproducible |
| Seed | Any integer (default null) | For reproducible results |
| Output Format | jpeg / png (default jpeg) | Image file format |
| Safety Tolerance | 0-6 (default 2) | Content filtering strictness |

## Mode-Specific Sections

### T2I (Text-to-Image)

Kontext can generate images from text alone, with competitive quality across aesthetics, prompt following, typography, and realism. Use the same descriptive approach as Flux 2 Max for T2I:

```
[Subject] + [Action/Scene] + [Style] + [Mood/Atmosphere]
```

**T2I Example:**
```
A weathered lighthouse keeper with a salt-and-pepper beard, standing at the top of a spiral staircase, dramatic chiaroscuro lighting, oil painting style with visible brushstrokes, moody Atlantic storm atmosphere
```

Kontext T2I is most useful when you plan to iterate on the result with follow-up edits, since the same model handles both generation and editing seamlessly.

### I2I (Image-to-Image) -- Primary Strength

This is where Kontext excels. Provide a reference image and describe your edits in natural language.

#### Object & Property Modification
```
Change the car to bright red while maintaining the exact same lighting, composition, and background details
```

#### Background Replacement
```
Change the background to a tropical beach while keeping the person in the exact same position, scale, and pose. Maintain identical subject placement, camera angle, framing, and perspective. Only replace the environment around them
```

#### Style Transfer
Four methods, from simplest to most controlled:

**Method 1 -- Name the style:**
```
Transform to a Bauhaus art style while maintaining the original composition and object placement
```

**Method 2 -- Reference a movement or artist:**
```
Convert to the style of a 1960s pop art poster while preserving all subject details
```

**Method 3 -- Describe visual characteristics:**
```
Transform to an oil painting with visible brushstrokes, thick paint texture, and rich color depth while keeping the scene composition identical
```

**Method 4 -- Use a reference image as style guide:**
```
Using this style, a bunny, a dog, and a cat are having a tea party seated around a small white table
```

#### Character Consistency (Across Multiple Edits)
Three-step framework:
1. **Establish reference clearly:** Use specific descriptors, not pronouns
2. **Specify the transformation:** What changes (environment, clothing, activity)
3. **Preserve identity markers:** State what remains constant

```
The woman with short black hair is now in a tropical beach setting, wearing a flowing sundress, while maintaining the same facial features, hairstyle, and expression
```

#### Typography / Text Editing
Use quotation marks around the text to find and replace:

```
Replace 'GALACTIC ODYSSEY' with 'FLUX KONTEXT' while maintaining the same font style, color, and size
```

**Tips for text editing:**
- Keep replacement text similar in length to the original for best layout preservation
- Specify font and color preservation explicitly if they matter
- Clear, readable fonts edit more reliably than highly stylized ones

#### Iterative Multi-Turn Editing
Kontext supports building edits incrementally. Each edit uses the previous output as the new input:

1. First edit: `Remove the object from her face`
2. Second edit: `She is now taking a selfie in the streets of Freiburg, it's a lovely day out`
3. Third edit: `It's now snowing, everything is covered in snow`

**Limit editing chains** -- excessive multi-turn editing can introduce visual artifacts.

## Best Practices

1. **Be explicit about preservation** -- Always tell Kontext what to keep, not just what to change. Use phrases like "while maintaining," "keeping identical," "preserving the exact same"
2. **One major change at a time** -- For complex transformations, break them into sequential edits rather than overloading a single prompt
3. **Name subjects directly** -- "The man with the gray beard" instead of "he" or "him." Pronouns lack specificity and cause identity drift
4. **Choose verbs deliberately** -- "Change the clothes to" (targeted) vs. "Transform into" (complete overhaul). Your verb choice controls the scope of the edit
5. **Quote text exactly** -- When editing typography, always put the original and replacement text in quotation marks: `Replace 'old' with 'new'`
6. **Lock composition when editing backgrounds** -- Add "keeping the person in the exact same position, scale, and pose" to prevent subject repositioning
7. **Use specific style names** -- "Bauhaus art style" or "Kodak Portra 400 film grain" instead of "artistic" or "vintage"
8. **Stay within 512 tokens** -- Kontext has a hard token limit; keep prompts focused and efficient
9. **Start simple, then refine** -- Test a basic edit first, then add complexity in follow-up iterations
10. **Use iterative workflows** -- Kontext handles multi-turn editing well; use this to your advantage for complex projects

## Example Prompts

### Example 1: Background Replacement with Position Lock
```
Change the background to a cozy coffee shop interior with warm ambient lighting while keeping the person in the exact same position, scale, and pose. Maintain identical camera angle, framing, and perspective. Only replace the environment around them
```

### Example 2: Style Transfer with Detail Preservation
```
Convert this photograph to a detailed pencil sketch with natural graphite lines, cross-hatching for shadows, and visible paper texture while preserving all architectural details and the original composition
```

### Example 3: Character Outfit Change with Identity Preservation
```
Change the woman's casual outfit to a tailored navy business suit with a white blouse, while maintaining her exact facial features, hairstyle, expression, and body position
```

### Example 4: Typography Replacement
```
Replace 'OPEN DAILY' with 'CLOSED TODAY' while maintaining the same font style, letter spacing, color, and sign placement
```

### Example 5: Object Color Change
```
Change the motorcycle from black to deep metallic red while maintaining the exact same lighting, reflections, background, and overall composition
```

### Example 6: Scene Time-of-Day Shift
```
Change the scene to golden hour with warm sunset lighting, long shadows, and an orange-pink sky while maintaining the same style, composition, and all subject details
```

### Example 7: Style Reference from Input Image (T2I with reference)
```
Using this style, a lone astronaut standing on the surface of Mars, looking up at a pale blue dot in the sky, vast red desert landscape stretching to the horizon
```

### Example 8: Multi-Element Edit
```
Change the man's shirt to a denim jacket, add round vintage sunglasses, and place a coffee cup in his right hand while preserving his facial features, hair, and the background setting
```

## Common Mistakes to Avoid

1. **Using pronouns instead of descriptions** -- "Change her outfit" loses specificity. Say "Change the woman with the red hair's outfit to..." instead. Pronouns cause identity drift and inconsistent edits
2. **Forgetting the preservation clause** -- "Put him on a beach" will shift position, scale, and pose. Always add "while keeping the person in the exact same position, scale, and pose"
3. **Overloading a single prompt** -- Trying to change background, outfit, lighting, and add objects all at once degrades quality. Break complex edits into 2-3 sequential steps
4. **Using "transform" without constraints** -- "Transform the person into a Viking" replaces the entire appearance including face. Use "Change the clothes to Viking armor while preserving exact facial features" for identity retention
5. **Vague style descriptions** -- "Make it artistic" or "make it better" gives unpredictable results. Use specific style names, art movements, or detailed visual characteristics
6. **Exceeding the 512-token limit** -- Long, rambling prompts get truncated. Keep instructions focused and efficient
7. **Using negative language** -- "Remove the blur" or "no background noise" does not work. Say "sharp focus throughout" or "clean background"
8. **Not specifying font preservation for text edits** -- "Replace 'Hello' with 'World'" may change the font. Add "while maintaining the same font style and color"
9. **Too many iterative edits** -- Excessive chained edits (5+) introduce cumulative artifacts. If quality degrades, start fresh from the original image
10. **Treating it like Flux 2 Max** -- Kontext prompts should lead with action verbs and preservation clauses, not pure scene descriptions. "Change X while keeping Y" outperforms long descriptive paragraphs

## Higgsfield Notes

| Setting | Recommendation |
|---------|---------------|
| Aspect Ratio | Any from 3:7 to 7:3 (default 1:1; output is always ~1MP) |
| Enhance | OFF (Kontext already optimizes output quality) |
| Credits | ~1.5 per generation |

**Workflow tips for Kontext on Higgsfield:**
- **Generate then edit:** Use Kontext T2I to create a base image, then switch to I2I mode to refine it iteratively
- **Soul ID integration:** Create a Soul ID from your Kontext-generated character, then use it for video generation with VEO3, Kling 3.0, or Seedance 2.0
- **Style consistency pipeline:** Generate one image with a specific style, then use Kontext's style reference method to apply that style across a series of images
- **Text overlay workflow:** Generate your base image with any model, then use Kontext I2I to add or edit typography with precise control
- **Pair with video models:** Generate and refine your perfect still with Kontext, then animate it using I2V with Kling 3.0 or Seedance 2.0

## Kontext Pro vs Max Quick Reference

| Aspect | Pro | Max |
|--------|-----|-----|
| Speed | ~5-6 seconds | Slower |
| Quality | Balanced / production-ready | Industry-leading |
| Typography | High quality | Premium rendering |
| Prompt adherence | Excellent | Maximum |
| Style transfer | Good | Superior |
| Character consistency | Reliable across many edits | Premium consistency |
| BFL API cost | $0.04/image (4 credits) | $0.08/image (8 credits) |
| Best for | High-volume iteration, client feedback loops | Premium campaigns, final deliverables |

**Note:** Higgsfield uses Kontext Max by default. The credit cost (~1.5) is Higgsfield's platform pricing, separate from BFL's direct API pricing.

## Official Resources

- Model page: https://bfl.ai/models/flux-kontext
- Announcement: https://bfl.ai/announcements/flux-1-kontext
- I2I Prompting Guide: https://docs.bfl.ai/guides/prompting_guide_kontext_i2i
- T2I API Docs: https://docs.bfl.ai/kontext/kontext_text_to_image
- I2I API Docs: https://docs.bfl.ai/kontext/kontext_image_editing
- Overview: https://docs.bfl.ai/kontext/kontext_overview
- Playground: https://playground.bfl.ai
