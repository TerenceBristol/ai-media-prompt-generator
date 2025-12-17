---
name: prompt-generator
description: Generate AI image and video prompts. Use when user asks for prompts for Midjourney, VEO3, GPT-Image, or any AI media generation. Asks clarifying questions about subject, style, and technical specs, then provides 3 model-specific variations (conservative, moderate, creative).
---

# AI Media Prompt Generator

## When to Use This Skill
Activate when the user:
- Asks to create/generate/write a prompt
- Mentions image, video, or media generation
- References specific models (Midjourney, VEO3, GPT-Image, etc.)
- Wants help crafting AI art or video prompts

## Conversation Flow

### Step 1: Detect Request Type

Identify from the user's message:
- **Media type**: Image, Video, or Image-to-Video
- **Target model**: Midjourney, VEO3, GPT-Image, or unspecified

If model is unspecified, ask:
> "Which AI model are you targeting? Options: Midjourney (image), VEO3 (video), GPT-Image (image), or other?"

### Step 2: Ask Clarifying Questions (One at a Time)

Ask these questions sequentially, waiting for each answer:

**Question 1: Subject & Action**
> "What's the main subject of your [image/video]? What are they doing or what's happening?"

**Question 2: Style & Mood**
> "What visual style are you going for?"
>
> Options to suggest:
> - Photorealistic / Hyperrealistic
> - Cinematic / Film-like
> - Animated / Stylized
> - Abstract / Artistic
> - Vintage / Retro
> - Minimalist / Clean
> - Fantasy / Surreal
> - Documentary / Natural

**Question 3: Technical Specifications**

For **Midjourney**:
> "What aspect ratio? (16:9 widescreen, 1:1 square, 9:16 vertical, 3:2 photo, or custom)"

For **VEO3**:
> "Any specific requirements? Consider:
> - Include dialogue/spoken words?
> - Specific camera movements? (dolly, pan, static)
> - Duration preference? (default: 8 seconds)"

For **GPT-Image**:
> "Any specific style or editing requirements? (e.g., add/remove elements, specific lighting)"

**Question 4: Setting & Environment**
> "Where does this take place? Consider: location, time of day, weather, atmosphere."

**Question 5: Reference or Inspiration (Optional)**
> "Any reference images, artists, films, or specific styles you want to emulate? (Skip if none)"

### Step 3: Load Model-Specific Knowledge

Based on the target model, reference:
- **Midjourney**: See `.claude/skills/models/midjourney.md`
- **VEO3**: See `.claude/skills/models/veo3.md`
- **GPT-Image**: See `.claude/skills/models/gpt-image.md`

### Step 4: Generate 3 Variations

Create three prompts with different interpretations:

**Variation A: Conservative**
- Stays close to the user's exact description
- Minimal creative additions
- Safe, predictable result

**Variation B: Moderate**
- Adds complementary details and atmosphere
- Enhances with proven techniques
- Balanced creativity

**Variation C: Creative**
- Pushes boundaries while staying on-brief
- Unexpected angles or interpretations
- More artistic license

### Step 5: Present Output

Format the output as:

```
## Your [Model Name] Prompts

### Variation A: Conservative
[Full prompt with model-specific syntax]

**Why this works**: [1-2 sentence explanation]

---

### Variation B: Moderate
[Full prompt with model-specific syntax]

**Why this works**: [1-2 sentence explanation]

---

### Variation C: Creative
[Full prompt with model-specific syntax]

**Why this works**: [1-2 sentence explanation]

---

## Quick Copy Reference
- **A**: `[prompt]`
- **B**: `[prompt]`
- **C**: `[prompt]`

Would you like me to adjust any of these or generate more variations?
```

### Step 6: Refinement (If Requested)

If the user wants changes:
- Ask what specific aspect to modify
- Generate refined versions
- Explain what changed and why

## Model-Specific Formatting

### Midjourney Format
```
[descriptive prompt] --ar [ratio] --s [stylize] --v 7 [other params]
```

### VEO3 Format
```
[Subject] + [Action] + [Setting] + [Style] + [Camera] + [Lighting] + [Audio notes]. No subtitles, no text overlay.
```

### GPT-Image Format
```
[Detailed natural language description with style, lighting, composition, and mood]
```

## Quality Checklist

Before presenting prompts, verify:
- [ ] Model-specific syntax is correct
- [ ] Key parameters are included
- [ ] Each variation is meaningfully different
- [ ] Explanations are helpful
- [ ] Easy-copy versions are provided
