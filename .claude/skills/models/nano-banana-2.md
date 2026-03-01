# Nano Banana 2 Prompt Guide

## Model Info
| Field | Value |
|-------|-------|
| Name | Nano Banana 2 (Gemini 3.1 Flash Image) |
| Maker | Google DeepMind |
| Type | Image |
| Modes | T2I, I2I |
| Syntax | Natural creative director language |
| Negative Prompts | No (use natural language descriptions) |
| Higgsfield Available | Yes |
| Approx. Cost | ~2 credits per generation |

## Overview

Nano Banana 2 is the community nickname for **Gemini 3.1 Flash Image**, Google DeepMind's latest image generation model released February 26, 2026. Built on the Gemini 3.1 Flash architecture, it delivers approximately 95% of Nano Banana Pro's image quality at 3-5x faster generation speed. Its key differentiator is built-in search grounding — the model retrieves real-world references via Google Search during generation for improved accuracy. This positions NB2 as the speed-optimized option in the Nano Banana family.

**Timeline:**
- Nano Banana (original): August 2025
- Nano Banana Pro (Gemini 3 Pro Image): November 2025
- **Nano Banana 2 (Gemini 3.1 Flash Image): February 2026**

## Syntax Format

**Natural creative director language** — talk to it like briefing a human artist.

```
[Subject + Adjectives] doing [Action] in [Location/Context], [Composition/Camera Angle], [Lighting/Atmosphere], [Style/Media]
```

**Rules:**
- Use proper grammar and descriptive adjectives
- No tag soups (dog, park, 4k, realistic)
- Include 6 factors: subject, composition, action, setting/location, style, and aspect ratio
- Edit existing images instead of re-rolling
- Keep text in quotation marks; specify font, size, and placement
- Iterate one change at a time for cleaner results

## Prompt Structure

### Key Components
| Component | Description | Example |
|-----------|-------------|---------|
| Subject | Who or what is in the scene | "A weathered fisherman in his 60s" |
| Composition | Camera angle and framing | "Medium close-up, rule of thirds" |
| Action | What the subject is doing | "Mending a fishing net" |
| Setting/Location | Where the scene takes place | "On a wooden dock at dawn" |
| Style | Artistic direction and medium | "Documentary photography, natural light" |
| Aspect Ratio | Frame dimensions | "16:9 widescreen" |

### Professional Structure
Include:
- Exact lighting (softbox positioning, rim light angles)
- Camera settings (focal length, aperture, ISO)
- Material control (texture, specular highlights)
- Composition guidance

## Key Parameters

| Parameter | Range/Options | Description |
|-----------|---------------|-------------|
| Resolution | 512px to 4K (default 1K) | Output image resolution |
| Aspect Ratio | 1:1, 1:4, 1:8, 2:3, 3:2, 3:4, 4:1, 4:3, 4:5, 5:4, 8:1, 9:16, 16:9, 21:9 | 14 supported ratios |
| Thinking Level | "minimal" (default), "high" | Minimal for fast generation; High for complex prompts requiring deeper reasoning |
| Search Grounding | Automatic | Retrieves real-world references via Google Search during generation |
| Reference Images | Up to 14 | Multi-reference support for style, subject, and scene composition |
| Character Consistency | Up to 5 characters | Maintains identity across a workflow |

## Core Features

| Feature | Description |
|---------|-------------|
| Speed | 3-5x faster than Nano Banana Pro |
| Search Grounding | Retrieves real-world references via Google Search for accuracy |
| Text Rendering | Best-in-class for legible text in multiple languages |
| Character Consistency | Up to 5 characters maintained across a workflow |
| Multi-Reference | Up to 14 reference objects in a single generation |
| Thinking Level | Adjustable reasoning depth — "minimal" (fast) or "high" (complex) |
| Resolution | Up to 4K output |
| Conversational Edits | Natural language editing of existing generations |

## Mode-Specific Sections

### T2I (Text-to-Image)

Write prompts like a creative director brief. Cover all 6 factors (subject, composition, action, setting, style, aspect ratio) for best results.

**When to use `thinking_level: "high"`:**
- Prompts with multiple interacting subjects
- Complex spatial relationships
- Scenes requiring factual accuracy (search grounding + reasoning)
- Detailed typography or multi-language text

**When to stay with `thinking_level: "minimal"` (default):**
- Single-subject images
- Straightforward compositions
- Speed-priority workflows
- Batch generation runs

### I2I (Image-to-Image)

Nano Banana 2 excels at semantic editing — describe changes conversationally without masks or inpainting tools.

**Capabilities:**
- Semantic editing via natural language ("change the jacket to a beige trench coat")
- No mask-based editing required — describe changes conversationally
- Preserves composition, lighting, and identity during edits
- Multi-reference support: up to 14 reference images
- Style matching, subject transfer, and scene composition

**I2I Prompt Structure:**
```
Starting from the reference image: [describe what to change]. Keep [what to preserve]. Style direction: [style notes]. Technical: [camera/lighting adjustments].
```

**Multi-Reference Usage:**
Label purposes clearly when using multiple references:
```
Image 1 is the subject reference. Image 2 is the style reference. Image 3 is the background reference. Combine: place the subject from Image 1 in the scene from Image 3, rendered in the artistic style of Image 2.
```

## Best Practices

1. **Brief Like a Creative Director** — Write as if briefing a professional photographer or illustrator. Be specific about the vision, mood, and technical details rather than listing keywords.

2. **Edit, Don't Re-roll** — If an image is 80% correct, describe the specific change rather than regenerating from scratch. NB2's conversational editing preserves what works.

3. **Use Search Grounding to Your Advantage** — Reference real brands, landmarks, historical figures, or specific products. NB2's built-in search retrieves accurate visual references automatically.

4. **One Change at a Time** — When iterating, make a single change per edit pass. This produces cleaner results than stacking multiple modifications.

5. **Match Thinking Level to Complexity** — Use "minimal" (default) for straightforward subjects and speed. Switch to "high" for multi-character scenes, complex spatial layouts, or prompts requiring factual reasoning.

6. **Specify Typography Precisely** — Put exact text in quotation marks. Specify font family, weight, size, color, and placement for best text rendering.

7. **Add Imperfections for Realism** — For photorealistic images, include subtle flaws: lens smear, motion blur, light leak, uneven exposure, or film grain.

## Example Prompts

### Example 1: Product Photography
```
I need a hero shot for a premium wireless headphone launch. Matte black over-ear headphones resting on a brushed concrete surface, a single beam of warm spotlight from upper left creating a dramatic shadow. The ear cups angled to show the textured leather padding and brushed aluminum hinge detail. Shallow depth of field at f/1.8, 90mm macro lens perspective. One subtle lens flare catching the metal edge. Minimal, editorial product photography style, dark moody background with a hint of warm amber tone.
```

### Example 2: Portrait
```
Create a professional headshot of a confident architect in her late 30s. Short natural hair with subtle highlights, wearing a structured navy blazer over a white crew-neck tee. Clean white studio background with soft overhead lighting and a gentle fill light from below to eliminate harsh shadows. Expression: thoughtful and self-assured, slight closed-mouth smile. Shot at 85mm, f/2.0, subtle skin texture visible, minimal retouching feel. Color grading: neutral with slightly warm skin tones.
```

### Example 3: Typography/Design
```
Design a bold event poster with the headline "FUTURE FORWARD" in condensed sans-serif uppercase, white text on a deep gradient background shifting from midnight blue at the top to electric violet at the bottom. Below the headline, smaller text reads "March 2026 — Austin, TX" in a light geometric typeface. Abstract holographic light streaks cut diagonally across the background behind the text. Modern tech conference aesthetic, clean and high-contrast, suitable for social media and large-format print.
```

### Example 4: I2I Semantic Edit
```
Starting from the reference image: change the subject's outfit from the casual t-shirt to a tailored charcoal wool overcoat with a burgundy scarf. Keep the pose, facial expression, background street scene, and existing afternoon lighting direction exactly the same. Adjust the color grading slightly cooler to match the winter wardrobe change. Maintain the shallow depth of field and bokeh in the background.
```

## Conversational Edit Examples

After initial generation:
- "Make the background slightly blurrier to increase subject separation"
- "Change her expression to more serious and contemplative"
- "Shift the color palette warmer — more golden hour tones"
- "Remove the person walking in the background"
- "Make the headline text 30% larger and add a subtle drop shadow"
- "Change the jacket to a beige trench coat, keep everything else"

## Text Rendering Tips

| Word Count | Success Rate | Recommendation |
|------------|--------------|----------------|
| 1-3 words | ~80% | Best results, multi-language supported |
| 4-8 words | ~50% | May need retries |
| 9+ words | ~20% | Add text in post-production |

For text, specify:
```
Large bold sans-serif typography, centered, maximum legibility. The text "YOUR TEXT" in [font style], [color], [placement].
```

## Common Mistakes to Avoid

1. **Using tag soup syntax** — NB2 is a reasoning model. Write "a golden retriever playing fetch in Central Park" not "dog, park, 4k, realistic, masterpiece."
2. **Re-generating instead of editing** — If the image is mostly right, use conversational editing to fix the specific issue.
3. **Ignoring thinking level** — Leaving "minimal" on for complex multi-character scenes wastes NB2's reasoning capability. Switch to "high" when the prompt demands it.
4. **Expecting Pro-level maximum fidelity** — NB2 is optimized for speed at ~95% of Pro quality. For absolute maximum fidelity, use Nano Banana Pro instead.
5. **Not leveraging search grounding** — NB2 can look up real-world references. Use specific names, places, and products rather than vague descriptions.
6. **Stacking multiple edits at once** — Iterate one change at a time for cleaner, more predictable results.

## How to Access

| Platform | How |
|----------|-----|
| Higgsfield | higgsfield.ai/image/nano_banana_flash |
| Google AI Studio | Model ID: `gemini-3.1-flash-image-preview` |
| Vertex AI | Model ID: `gemini-3.1-flash-image-preview` |

## Pricing Reference

- ~$0.101 per standard image (~$0.05 in batch mode)
- Compare: Nano Banana Pro ~$0.134 per image
- Compare: Original Nano Banana ~$0.039 per image

## Higgsfield Notes

| Setting | Recommendation |
|---------|---------------|
| Aspect Ratio | Any of the 14 supported ratios, 4K capable |
| Enhance | OFF |
| Credits | ~2 per generation |

## Nano Banana 2 vs Nano Banana Pro

| Aspect | Nano Banana 2 (Flash) | Nano Banana Pro |
|--------|----------------------|-----------------|
| Speed | 3-5x faster | Baseline |
| Quality | ~95% of Pro | Maximum fidelity |
| Thinking | Good (speed-optimized) | Deep reasoning |
| Search Grounding | Built-in | Available |
| Aspect Ratios | 14 (incl. 1:4, 4:1, 1:8, 8:1) | Standard set |
| Cost (API) | ~$0.101/image | ~$0.134/image |
| Cost (Higgsfield) | ~2 credits | <1 credit |
| Best For | Speed workflows, batch generation, real-time iteration | Maximum quality, complex reasoning |

**When to choose NB2:** Fast iteration, batch workflows, search-grounded subjects, real-time creative exploration.
**When to choose Pro:** Final hero images, complex multi-element compositions requiring deep reasoning, maximum fidelity output.

## Known Limitations

- Still in preview status (model ID ends in `-preview`)
- Clock faces may render inaccurate times
- Full wine glasses sometimes render incorrectly
- Consistent finger positioning can be inconsistent across generations
- Knowledge cutoff January 2025 (search grounding compensates for recent subjects)
- ~95% of Pro quality — not the maximum fidelity option
