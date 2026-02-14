# Z-Image Prompt Guide

## Model Info
| Field | Value |
|-------|-------|
| Name | Z-Image Turbo |
| Maker | Alibaba (Tongyi-MAI) |
| Type | Image |
| Modes | T2I, I2I |
| Syntax | Camera-direction natural language |
| Negative Prompts | No (distilled model — all constraints must be positive) |
| Higgsfield Available | Yes |
| Approx. Cost | <1 credit per generation |

## Overview

Z-Image Turbo is Alibaba's open-source 6B-parameter text-to-image model released November 2025, built on the Scalable Single-Stream DiT (S3-DiT) architecture. Its defining trait is speed: 8-step inference with sub-second latency on H800 GPUs, generating images in 1-3 seconds on Higgsfield. It ranked #1 among open-source models on the Artificial Analysis Text-to-Image Leaderboard in December 2025.

**Speed vs. quality trade-off:** Z-Image is purpose-built for rapid iteration and prototyping. Image quality approaches but does not consistently match top-tier models like Midjourney v7 or Nano Banana Pro for highly detailed or photorealistic work. Where Z-Image excels is volume — you can generate 10-20 variations in the time other models produce one, making it ideal for concept exploration, quick mockups, and style experimentation before committing to a higher-fidelity model.

## Syntax Format

**Camera-direction natural language** — treat prompts like camera direction, not creative writing. Think in terms of angles, lighting, composition, and technical specifications.

```
[Subject + key details], [environment/setting], [lighting], [composition/camera], [style/mood], [technical details]
```

**Rules:**
- Keep prompts between 80-250 words for best results (over 300 words may truncate or lose coherence)
- Limit to 3-5 key visual concepts per prompt
- No negative prompts — the distilled model does not support them; instead, state what you want positively (use "sharp focus" instead of "no blur")
- Keep clothing/material descriptions to 3-5 words — over-describing fabrics causes confusion
- Avoid long, poetic, or narrative-driven language — direct and technical works best
- Avoid contradictions (e.g., "photorealistic cartoon style")

## Prompt Structure

Structure prompts like camera direction, broken into clear sections:

### Key Components
| Component | Description | Example |
|-----------|-------------|---------|
| Subject | Primary content with specific details | "A 65-year-old Asian woman with silver hair and gentle wrinkles" |
| Environment | Setting and context | "Victorian garden at morning, dappled sunlight" |
| Lighting | Direction, quality, and style | "Soft diffused daylight from the left" |
| Composition | Framing, angle, camera | "Close-up, 85mm lens, shallow depth of field" |
| Style/Mood | Aesthetic treatment | "Cinematic warm tones, editorial photography" |
| Details | Textures, materials (keep brief) | "Weathered leather jacket, muted earth tones" |

### Priority Order
1. Subject and action (most influential)
2. Lighting (Z-Image responds strongly to lighting keywords)
3. Composition/camera angle
4. Style and mood
5. Environment (keep simple — complex backgrounds can degrade quality)
6. Fine details (keep minimal)

## Key Parameters

| Parameter | Range/Options | Description |
|-----------|---------------|-------------|
| Inference Steps | 1-30 (default: 8) | 4 for maximum speed, 8 balanced, 12+ for maximum quality |
| Image Size | 1024x1024, 768x1344, 864x1152, 1344x768, others | Width/height between 1024-2048px, divisible by 32 |
| CFG Scale | 2.5-5.0 (sweet spot: 3.0) | Classifier-free guidance — note: Turbo variant has internalized CFG, so this may be ignored |
| Seed | Any integer | Fixed seed for reproducible results |
| Num Images | 1-4 | Generate multiple variations simultaneously |
| Prompt Expansion | On/Off | Auto-enhances short prompts; best for prompts under 50 words |

**Note on CFG:** The Turbo variant is a distilled model that has internalized classifier-free guidance effects. On most platforms, the guidance scale is effectively set to 0.0 internally. When using the foundation model (non-Turbo), CFG 3.0 is the recommended sweet spot.

## Mode-Specific Sections

### T2I (Primary Mode)

Z-Image's core strength. Optimized for speed-first workflows.

**Formula:**
```
[Subject + 2-3 distinguishing traits], [action/pose], [environment in 5-10 words], [lighting style], [camera/lens], [mood/style]
```

**Tips:**
- Start with the subject — Z-Image prioritizes early tokens
- Lighting keywords have outsized impact: "cinematic warm key light," "rim lighting," "high-contrast noir lighting" all produce distinct results
- Face angles respond well to geometric terms: "front view," "45-degree angle," "left-side profile," "looking slightly up"
- Camera/lens references improve realism: "Shot on Canon R5, 85mm lens, f/1.4"
- Color palette keywords work well: "warm palette," "muted tones," "monochrome," "neon palette"

### I2I (Image-to-Image)

Z-Image-Edit is a fine-tuned variant specifically for instruction-following image edits. On Higgsfield, I2I mode allows you to provide a reference image and describe modifications.

**Formula:**
```
[Describe the change you want]. Keep [what to preserve]. Style: [any style shift]. Lighting: [adjusted lighting if needed].
```

**Tips:**
- Use direct, instruction-style language: "Change the background to a rainy city street"
- Specify what to keep: "Maintain the subject's pose and expression"
- Supports bilingual instructions (English and Chinese)
- Best for style transfers, lighting changes, and background swaps
- For detailed edits, be specific about placement and scale

## Text Rendering

Z-Image has notably strong bilingual text rendering for both English and Chinese, making it useful for:
- Poster mockups and title cards
- Simple UI mockups
- Product labels and packaging concepts
- Social media graphics

**Tips for text rendering:**
- Wrap desired text in quotes within the prompt
- Describe the text style and position explicitly
- Keep text short (1-5 words) for best accuracy
- Specify font style: "bold sans-serif typography," "elegant script lettering"

## Best Practices

1. **Think camera direction, not creative writing** — Z-Image responds to technical, cinematic language. Instead of "a magical twilight scene," use "cool ambient light, blue-purple color temperature, low angle shot."

2. **Keep prompts lean and direct** — Shorter inputs often work better than long descriptions. Describe clothes in 3-5 words, backgrounds in 5-10 words. Over-explaining causes confusion and quality loss.

3. **Lead with lighting** — Lighting keywords have the strongest impact on output quality. Pair lighting with a face angle for clean edges, smooth shading, and believable texture. Examples: "soft diffused daylight," "cinematic warm key light," "split lighting from the right."

4. **Use Z-Image for volume, not perfection** — Generate 4 variations at once, select the best, then either refine in Z-Image or pass to a higher-fidelity model (Midjourney, Nano Banana Pro) for the final version.

5. **State constraints positively** — Since negative prompts are not supported, express all constraints as positive statements. Instead of "no watermarks, no blur," say "clean composition, sharp focus, crisp details."

6. **Enable Prompt Expansion for short prompts** — If your prompt is under 50 words, enabling prompt expansion can significantly improve output quality by adding relevant detail automatically.

7. **Stick to standard aspect ratios** — Unusual ratios tend to warp faces and distort compositions. Use 1:1, 4:3, 3:4, 16:9, or 9:16.

## Example Prompts

### Example 1: Photorealistic Portrait
```
A 65-year-old Asian woman with silver hair and gentle wrinkles wearing a hand-knitted cardigan, contemplative expression, reading by a window. Soft natural afternoon light from the left. Shot on Canon 5D with 85mm lens in a cozy library, golden hour. Warm muted tones, shallow depth of field, editorial portrait photography.
```

### Example 2: Stylized Character Concept
```
Cyberpunk street samurai, neon-lit alleyway, rain-slicked pavement reflecting pink and blue neon signs. Black tactical jacket, glowing visor. High-contrast noir lighting with rim light from behind. Front view, medium shot, cinematic composition. Moody, atmospheric, concept art style.
```

### Example 3: Product Photography
```
A professional product photo of a luxury watch on a dark slate surface. Brushed steel case, midnight blue dial clearly visible. Lit with a single softbox from the upper left, subtle reflections on the surface. Clean minimal background, studio photography, commercial advertising style.
```

### Example 4: Fantasy Illustration
```
An ancient dragon perched on a crumbling stone tower, massive wings spread against a stormy sky. Lightning illuminating the scene from behind. Low angle shot looking up, dramatic scale. Epic fantasy illustration, painterly digital art, volumetric fog, dark moody atmosphere.
```

### Example 5: Quick Concept Sketch (Short Prompt with Expansion)
```
Cinematic portrait of warrior girl, silver-blue lighting, battle-worn armor
```
*Enable Prompt Expansion for best results with short prompts like this.*

### Example 6: Text Rendering
```
Minimalist poster design with the text "OPEN LATE" in bold neon sans-serif typography, centered on a dark navy background. Subtle glow effect around the letters, clean composition, graphic design style.
```

## Common Mistakes to Avoid

1. **Writing poetic or narrative prompts** — Z-Image is not a thinking model. Flowery language like "gazing outward toward the horizon with a sense of longing" confuses it. Use direct, technical descriptions: "looking left, 45-degree profile, contemplative expression."

2. **Over-describing materials and fabrics** — Saying "a luxurious hand-woven silk kimono with intricate gold embroidery depicting cherry blossoms along the sleeves and hem" overwhelms the model. Say "red silk kimono with gold embroidery" instead.

3. **Attempting negative prompts** — Z-Image Turbo is a distilled model that ignores negative prompts entirely. Writing "no watermark, no extra fingers" has no effect. Rephrase positively: "clean image, anatomically correct hands."

4. **Using unusual aspect ratios** — Non-standard ratios (e.g., 5:3, 7:4) cause face warping and composition distortion. Stick to 1:1, 4:3, 3:4, 16:9, or 9:16.

5. **Expecting Midjourney-level detail on first pass** — Z-Image trades some fine detail for speed. Use it for rapid ideation (generate 4+ variants quickly), then take the best concept to a higher-fidelity model for final polish if maximum quality is needed.

6. **Prompts over 300 words** — Long prompts get truncated or lose coherence. The sweet spot is 80-250 words. If you need more detail, enable Prompt Expansion and let the model fill in gaps.

7. **Ignoring lighting keywords** — Lighting is Z-Image's strongest lever. A mediocre prompt with great lighting direction will outperform a detailed prompt with vague lighting.

## Higgsfield Notes

| Setting | Recommendation |
|---------|---------------|
| Aspect Ratio | 1:1 (default), 4:3, 3:4, 16:9, 9:16 — avoid non-standard ratios |
| Enhance | OFF (Z-Image is already optimized for speed; enhance adds latency) |
| Credits | <1 per generation |

**Workflow tips for Z-Image on Higgsfield:**
- **Rapid ideation pipeline**: Use Z-Image to generate 10-20 concept variations quickly, then pass favorites to Midjourney v7 or Nano Banana Pro for final quality
- **Feed into video**: Z-Image outputs can go directly into VEO3, Kling 3.0, Wan 2.2, or Seedance 2.0 for I2V animation
- **Soul ID compatible**: Use Z-Image for quick character concept iterations, then create a Soul ID from the best result for consistency across models
- **Popcorn storyboards**: Generate key frames rapidly with Z-Image, then use Popcorn to build storyboard sequences

## Strengths and Limitations Summary

| Strengths | Limitations |
|-----------|-------------|
| Ultra-fast generation (1-3 seconds) | Fine detail may not match top-tier models |
| Excellent for rapid prototyping | No negative prompt support |
| Strong text rendering (English + Chinese) | Long prompts lose coherence |
| Open-source and lightweight | Complex backgrounds can degrade quality |
| Very low credit cost | Unusual aspect ratios cause distortion |
| Strong lighting responsiveness | Poetic/narrative prompts cause confusion |
| Multiple variations quickly | Not ideal as final-output model for premium work |

## Version Notes

| Variant | Parameters | Steps | Best For |
|---------|-----------|-------|----------|
| Z-Image Turbo | 6B | 8 | Speed, rapid iteration, Higgsfield default |
| Z-Image Foundation | 6B | 50 | Higher quality, more control, local deployment |
| Z-Image-Edit | 6B | Varies | Instruction-following image edits |

The Turbo variant is what runs on Higgsfield and is the focus of this guide.
