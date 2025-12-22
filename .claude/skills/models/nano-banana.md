# Nano Banana Pro Prompt Guide

## Overview

Nano Banana Pro is the community nickname for **Gemini 3 Pro Image**, Google DeepMind's state-of-the-art image generation model released November 2025. It features a "Thinking" process that reasons through prompts before generating.

## Key Difference: It's a Thinking Model

Unlike traditional image models, Nano Banana Pro:
- Understands intent, physics, and composition
- Reasons through your prompt before generating
- Accepts conversational edits
- Doesn't need "tag soups" - use natural language

## Syntax Format

**Natural creative director language** - talk to it like briefing a human artist.

```
[Subject + Adjectives] doing [Action] in [Location/Context], [Composition/Camera Angle], [Lighting/Atmosphere], [Style/Media]
```

**Rules:**
- Use proper grammar and descriptive adjectives
- No tag soups (dog, park, 4k, realistic)
- Edit existing images instead of re-rolling
- Keep text under 3 words for best results

## Core Features

| Feature | Description |
|---------|-------------|
| Thinking Process | Reasons through prompts before generating |
| Text Rendering | Best-in-class for legible text |
| Resolution | Up to 4K (2K recommended) |
| Search Grounding | Connected to Google Search for accuracy |
| Few-Shot Design | Up to 14 reference images |
| Conversational Edits | "Change the lighting to sunset" |

## Prompt Structure

### Basic Structure
```
I need [describe what you want]. The [subject] should be [key details]. Style: [artistic direction]. [Technical requirements].
```

### Professional Structure
Include:
- Exact lighting (softbox positioning, rim light angles)
- Camera settings (focal length, aperture, ISO)
- Material control (texture, specular highlights)
- Composition guidance

## Best Practices

### 1. Stop Using Tag Soups
**Bad:** `dog, park, 4k, realistic, masterpiece, trending`
**Good:** `A golden retriever playing fetch in Central Park on a sunny autumn afternoon, fallen leaves scattered on the grass, warm afternoon light filtering through the trees, candid pet photography style`

### 2. Brief Like a Creative Director
Talk to the model as if briefing a professional photographer or illustrator. Be specific about the vision, not just keywords.

### 3. Edit, Don't Re-roll
If an image is 80% correct, don't regenerate from scratch:
```
That's great, but change the lighting to sunset and make the text neon blue.
```

### 4. Variable-Based Prompting
Define key elements as variables to reduce drift:
```
OBJECT_A = "vintage brass telescope"
TEXTURE_B = "weathered patina with green oxidation"
LIGHTING_C = "warm candlelight from the left"

Create OBJECT_A with TEXTURE_B under LIGHTING_C on an antique mahogany desk.
```

### 5. Add Imperfections for Realism
For photorealistic images, add subtle flaws:
- Tiny lens smear
- Subtle motion blur
- Faint light leak
- Uneven exposure
- Film grain

## Text Rendering Tips

| Word Count | Success Rate | Recommendation |
|------------|--------------|----------------|
| 1-3 words | ~75% | Best results |
| 4-8 words | ~40% | May need retries |
| 9+ words | ~15% | Add text in Photoshop |

For text, specify:
```
Large bold sans-serif typography, centered, maximum legibility
```

## Example Prompts

### Example 1: Product Photography
```
I need a hero shot for a coffee brand launch. A steaming ceramic mug of black coffee on a rustic wooden table, morning light streaming through a kitchen window creating soft shadows, a few scattered coffee beans nearby. Shot on medium format camera, shallow depth of field focusing on the steam wisps, warm and inviting atmosphere, editorial food photography style.
```

### Example 2: Portrait
```
Create a professional headshot of a confident tech executive. Woman in her 40s with silver-streaked black hair, wearing a tailored charcoal blazer. Neutral gray background, soft studio lighting with a subtle rim light on the right. Expression: approachable but authoritative. Shot at 85mm, f/2.8, slight grain for warmth.
```

### Example 3: Graphic Design
```
Design a minimalist poster for a jazz festival. The text "BLUE NOTE" in elegant serif typography, deep midnight blue background with abstract gold brushstroke accents. Art deco influences, sophisticated and timeless, suitable for high-end venue marketing.
```

### Example 4: Fantasy Illustration
```
I want an epic fantasy book cover scene. A lone knight standing at the edge of a cliff, looking out at a massive dragon silhouette against a blood-red sunset. The knight's cape billowing in the wind, ancient ruins visible in the valley below. Dramatic cinematic lighting, painterly digital art style with visible brushwork, sense of impending confrontation.
```

## Conversational Edit Examples

After initial generation:
- "Make the background slightly blurrier"
- "Change her expression to more serious"
- "Add a warm orange glow to the lighting"
- "Remove the person in the background"
- "Make the text larger and bolder"

## How to Access

| Platform | How |
|----------|-----|
| Gemini App | Select "Thinking" model |
| Google AI Studio | Model ID: `gemini-3-pro-image-preview` |
| Vertex AI | Same model ID |
| Adobe Firefly | Integrated as option |

## Pricing Reference

- ~$0.13 per 1K standard image
- ~$0.24 per 4K image
- Original Nano Banana: $0.039 per 1024px image

## Common Mistakes to Avoid

- Using tag soup syntax from other models
- Re-generating instead of editing
- Expecting perfect text over 3 words
- Being too brief - detail helps
- Ignoring the conversational edit capability
- Not specifying lighting clearly

## Known Limitations

- Small faces may lack detail
- Long text can have spelling errors
- Complex data visualizations may be inaccurate
- Always verify factual content in generated infographics
