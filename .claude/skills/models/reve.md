# Reve Image 1.0 Prompt Guide

## Model Info
| Field | Value |
|-------|-------|
| Name | Reve Image 1.0 (codename "Halfmoon") |
| Maker | Reve AI, Inc. (Palo Alto, CA) |
| Type | Image |
| Modes | T2I, I2I |
| Syntax | Natural language (detailed, descriptive) |
| Negative Prompts | No (not supported — describe what you want) |
| Higgsfield Available | Yes |
| Approx. Cost | ~1 credit per generation (unlimited on some plans) |

## Overview

Reve Image 1.0 is a next-generation text-to-image model built from scratch to excel at prompt adherence, aesthetic quality, and typography. It ranked #1 on Artificial Analysis's Image Arena (ELO 1167), surpassing Midjourney v6.1, Recraft V3, and FLUX 1.1 Pro. Its standout capability is best-in-class text rendering powered by a proprietary typography engine trained on 50 million font samples, achieving 98% text accuracy in generated images — making it the go-to model for any prompt that requires readable text, logos, signs, or typographic design.

## Syntax Format

```
[Subject and scene description with rich detail, including lighting, mood, composition, camera, and style]
```

**Rules:**
- Use natural language — no special parameter syntax or flags
- The more detail you provide, the more precise and unique the output
- Reve treats descriptive cues like light direction, tone, environment, and camera angle as physical attributes, not abstract requests
- Put text you want rendered in quotation marks within the prompt
- Avoid vague or minimal prompts — Reve rewards specificity
- Maximum prompt length: 2,560 characters

## Prompt Structure

Reve's three-stage "Halfmoon" engine processes prompts through a Semantic Parsing Layer (breaks down prompt components), a Composition Engine (spatial scene construction), and a Style Transfer Module (aesthetic application). This means well-structured prompts with clear components produce dramatically better results.

### Key Components
| Component | Description | Example |
|-----------|-------------|---------|
| Subject | Main focus — person, object, scene | "A weathered fisherman mending nets" |
| Setting/Environment | Where the scene takes place | "on a wooden dock at a misty harbor" |
| Lighting | Specific light direction and quality | "warm side light, foggy dusk atmosphere" |
| Camera/Lens | Photography-specific framing | "close-up portrait, 85mm lens, shallow DOF" |
| Style/Medium | Artistic approach or photographic look | "cinematic still, shot on Arri Alexa" |
| Mood/Atmosphere | Emotional tone of the image | "serene, contemplative, nostalgic" |
| Color Palette | Dominant tones and color direction | "warm golden hues, soft matte pastel tones" |
| Typography (if needed) | Text to render within the image | 'the sign reads "OPEN 24 HOURS"' |

### Priority Order
1. **Subject** — lead with the main focus
2. **Setting** — establish context
3. **Lighting and Camera** — Reve interprets these as physical attributes
4. **Style and Mood** — artistic direction
5. **Typography** — text rendering instructions last

## Key Parameters

Reve Image 1.0 is controlled through descriptive prompts and platform UI settings rather than in-prompt parameters.

| Parameter | Range/Options | Description |
|-----------|---------------|-------------|
| Aspect Ratio | 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3 | Set in UI; default is 3:2 |
| Enhance Mode | ON / OFF | Automatically expands prompts with additional detail |
| Seed | Number | Reproducible results; same seed + same prompt = same image |
| Batch Size | 1, 2, 4, 8 | Number of images generated simultaneously |
| Resolution | Up to 2048x2048 native, optional 4K upscale | Output resolution |

## Mode-Specific Sections

### T2I (Text-to-Image) — Primary Mode

Reve's core strength. Write detailed, descriptive prompts and let the model's three-stage engine handle interpretation. Reve is designed so "the human creator gets exactly what they ask for, no more and no less."

**T2I Formula:**
```
[Camera setup] + [Subject with detail] + [Outfit/Appearance] + [Setting/Background] + [Lighting] + [Mood/Style]
```

**Tips for T2I:**
- Start with camera setup for photorealistic work (e.g., "close-up portrait, 85mm lens, studio lighting")
- Include physical descriptors: skin texture, material properties, surface reflections
- Specify lighting direction and quality — Reve treats these as physical parameters
- For typography, wrap the desired text in quotation marks and describe placement
- Use iterative refinement: generate, then adjust with instructions like "more dramatic lighting" or "sharper details"

### I2I (Image-to-Image)

Reve supports conversational image editing with natural language commands. Upload a reference image and describe changes using plain language. The model maintains context throughout the editing workflow.

**I2I Capabilities:**
- Adjust colors, modify text, alter perspectives
- Style transfer from reference images
- In-image editing (change specific elements)
- Multi-reference input (up to 4 reference images on Higgsfield)
- Blend between reference styles

**I2I Prompt Structure:**
```
[Describe the changes you want applied to the reference image, maintaining context of the original]
```

**Example I2I Instructions:**
- "Change the background to a sunset beach scene while keeping the subject unchanged"
- "Replace the text on the sign with 'GRAND OPENING' in bold red letters"
- "Apply a warm vintage film look with soft grain and faded shadows"

## Text Rendering — Key Differentiator

Reve's proprietary typography engine is its strongest competitive advantage. Unlike other image models that treat text as visual patterns, Reve analyzes semantic meaning and applies typographic rules for correct character placement and styling.

### How to Prompt for Text

1. **Wrap text in quotation marks**: `A poster that reads "SUMMER SALE 50% OFF"`
2. **Specify font style if needed**: "bold sans-serif", "elegant script", "handwritten"
3. **Describe placement**: "centered at the top", "on the storefront window", "embossed on the leather cover"
4. **Specify context**: Signs, posters, logos, product labels, book covers, storefronts

### Text Rendering Results
- 98% text accuracy (industry-leading)
- Clean, readable text at high resolution
- Correct spelling and character placement
- Multiple text elements in a single image
- Works across fonts, sizes, and visual contexts

### Text Rendering Examples
```
A neon sign reading "COCKTAILS & DREAMS" glowing in pink and blue against a dark brick wall, rain-slicked street reflections, cinematic night photography
```

```
A minimalist book cover design with the title "THE LAST GARDEN" in elegant serif typography, botanical illustration of climbing roses, muted sage green and cream color palette
```

```
A vintage-style movie poster for a film called "MIDNIGHT EXPRESS", bold retro typography, noir aesthetic, city skyline silhouette, dramatic lighting, 1970s graphic design style
```

## Best Practices

1. **Be richly descriptive** — Reve rewards detail. Include subject, setting, lighting, camera angle, mood, and style. A sparse prompt will produce underwhelming results.
2. **Treat lighting as physical** — Specify light direction, quality, and color temperature. "Warm side light at 45 degrees" works better than "nice lighting."
3. **Use photography language for realism** — Reference camera models (Arri Alexa, Hasselblad), lens lengths (85mm, 35mm wide), film stocks (Kodak Portra 400), and aperture settings for photorealistic results.
4. **Quote text exactly** — Any text you want rendered in the image must be in quotation marks within your prompt. Be explicit about font style and placement.
5. **Iterate with simple refinements** — After generating, refine with targeted instructions: "more dramatic lighting", "cleaner skin texture", "sharper product details", "warmer color palette."
6. **Use specific color and texture language** — "Soft matte pastel tone" and "rain-slicked asphalt reflecting neon" outperform generic "colorful" or "detailed."
7. **Avoid vague or abstract terms** — Words like "abstract" cause chaotic results; "simple" reduces detail. Be concrete and specific.

## Example Prompts

### Example 1: Cinematic Portrait
```
Cinematic still of a laughing little girl wrapped in an inflatable red ring in a swimming pool outside with palm trees and plants, shot on an Arri Alexa, photorealistic, golden hour sunlight filtering through the palms, shallow depth of field, warm summer atmosphere
```

### Example 2: Typography / Branding
```
A sleek coffee shop storefront with a hand-painted sign reading "THE ROASTERY" in vintage gold lettering on dark green wood, potted plants flanking the entrance, warm interior light glowing through large windows, street photography, morning light, urban setting
```

### Example 3: Product Photography
```
Luxury skincare bottle on a marble surface with fresh dew drops, the label reads "BOTANICAL GLOW" in minimal sans-serif type, soft diffused natural light from the left, eucalyptus leaves and white flowers in the background, premium beauty product photography, clean composition
```

### Example 4: Fantasy / Concept Art
```
An oil painting of an elderly fisherman sitting on a wooden dock at dusk, his weathered hands mending a net, the sky a warm blend of orange and pink reflecting on the calm sea, a single seagull perches on a post nearby, soft brushstrokes evoking a sense of quiet resilience
```

### Example 5: Urban / Lifestyle
```
A young man with short blonde hair, wearing modern streetwear: a loose white t-shirt, oversized jacket, and sneakers, sitting on a concrete ledge in a bustling city, graffiti and neon signs surrounding him, relaxed mood with a cool urban aesthetic, warm sunset glow adding contrast to the cool tones, street photography style
```

### Example 6: Text-Heavy Design
```
A vintage travel poster for Tokyo with the heading "VISIT TOKYO" in bold retro typography at the top, cherry blossom branches framing a view of Tokyo Tower at sunset, Mount Fuji visible in the distance, 1960s Japanese tourism poster aesthetic, warm color palette with soft pinks, oranges, and deep blues
```

## Common Mistakes to Avoid

1. **Vague or minimal prompts** — Reve is built for precision. "A cat" will produce a generic result. "A tabby cat curled on a sunlit windowsill, warm afternoon light streaming through lace curtains, soft focus background of a cozy apartment, shot on 50mm lens" will produce something remarkable.
2. **Using negative prompt syntax** — Reve does not support negative prompts. Instead of "no blur" or "without people", describe what you want: "sharp focus throughout", "empty scene."
3. **Generic lighting descriptions** — "Good lighting" tells Reve nothing. Be specific: "soft diffused daylight from a large window on the left, warm color temperature."
4. **Forgetting quotation marks for text** — If you want readable text in the image, always wrap it in quotes within the prompt. Unquoted text may be interpreted as scene description rather than rendered typography.
5. **Overloading with conflicting styles** — Asking for "photorealistic anime cyberpunk oil painting" confuses the style transfer module. Pick one primary style and add supporting details.
6. **Expecting dynamic motion rendering** — Reve excels at still compositions but can struggle with motion-heavy scenes. For action shots, describe the frozen moment rather than ongoing motion.
7. **Relying on Enhance Mode blindly** — Enhance Mode auto-expands your prompt. If your prompt is already highly detailed, Enhance may add unwanted elements. Turn it OFF when you want precise control.

## Higgsfield Notes

| Setting | Recommendation |
|---------|---------------|
| Aspect Ratio | 3:2 (default), 16:9, 1:1, 9:16 all work well |
| Enhance | OFF (for precise prompt control; ON for quick explorations) |
| Credits | ~1 per generation (unlimited on eligible plans) |
| Multi-Reference | Up to 4 reference images supported |
| Best For | Typography, branding, product shots, photorealistic portraits |

**Reve on Higgsfield — Key Details:**
- Supports prompt-based generation, in-image editing, and multi-reference input
- Described as sitting between Seedream (ultra-realistic) and Nano Banana (creative editing) — balanced prompt accuracy with style flexibility
- Outputs HD-ready images suitable for digital, web, and concept use
- Use Soul ID for character consistency across multiple Reve generations
- Pair with Kling 3.0 or Seedance 2.0 to animate Reve-generated images via I2V

**When to choose Reve over other image models:**
- Text/typography in image: Reve (best-in-class text rendering)
- Strict prompt adherence: Reve (designed for "exactly what you ask for")
- Maximum photorealism: Seedream 4.5 or Reve (both strong)
- Artistic/stylized: Midjourney v7 (stronger house style)
- Creative editing/pose manipulation: Nano Banana Pro (8 references)
- Brand color precision: Flux 2 Max (hex code support)
