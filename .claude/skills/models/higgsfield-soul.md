# Higgsfield Soul Prompt Guide

## Model Info
| Field | Value |
|-------|-------|
| Name | Higgsfield Soul |
| Maker | Higgsfield |
| Type | Image |
| Modes | T2I, I2I |
| Syntax | Natural language (preset-assisted) |
| Negative Prompts | Yes (add exclusions like "no text, no signage") |
| Higgsfield Available | Yes (platform exclusive) |
| Approx. Cost | ~1 credit per generation (0.25 credits/image on Higgsfield) |

## Overview

Higgsfield Soul is a hyper-realistic, fashion-grade AI photo model built to produce smartphone-like photography with natural lighting, authentic textures, and built-in camera imperfections (dust, flash, grain). Unlike models that optimize for sharpness and contrast, Soul optimizes for authenticity — delivering pore-level skin detail, realistic fabric textures, and natural color grading that avoids the "plastic" look of typical AI-generated images. Its standout feature is a library of 50+ curated aesthetic presets that instantly apply complex style, lighting, and composition choices without prompt engineering, making it the go-to model for fashion, editorial, lifestyle, and UGC content on the Higgsfield platform.

## Syntax Format

Soul uses natural language prompts combined with preset style selection. No special parameter syntax is required.

```
[subject description], [setting/environment], [lighting], [mood/atmosphere], [camera/lens details]
```

**Rules:**
- Write in natural, descriptive language — no special syntax or parameter flags needed
- Select a preset style BEFORE writing the prompt; the preset handles color grading, lens language, and scene framing
- Use photography and fashion terminology for best results (e.g., "shallow depth of field," "rim lighting," "editorial pose")
- Keep prompts focused on intent and aesthetics; Soul's internal enhancement handles composition
- Add "no text" or "no signage" if you want to avoid garbled street text in outputs
- The "Enhance Prompt" feature auto-expands prompts — disable it if you want strict adherence to your original description

## Prompt Structure

Soul responds best to prompts structured like a creative brief for a fashion photographer. Describe what you would tell a photographer on set.

### Key Components
| Component | Priority | Description | Example |
|-----------|----------|-------------|---------|
| Subject | 1 | Person, pose, expression, gaze | "A woman in her mid-20s, facing the camera directly, gaze piercing yet calm" |
| Wardrobe/Styling | 2 | Clothing, accessories, fashion details | "Bold Y2K-inspired styling, oversized vintage sunglasses, distressed indigo denim" |
| Setting/Environment | 3 | Location, background, scene context | "Busy Tokyo street during golden hour, motion-blurred pedestrians" |
| Lighting | 4 | Light quality, direction, color temperature | "Golden midday light, warm natural sunlight, soft shadows" |
| Mood/Atmosphere | 5 | Emotional tone, energy, vibe | "Candid, effortless poise, quiet strength, editorial energy" |
| Camera/Lens | 6 | Focal length, angle, photographic technique | "Shot at eye-level with a 50mm lens, shallow depth of field" |
| Material/Texture | 7 | Fabric quality, surface detail emphasis | "Silk top gleaming as it catches fragments of sunlight" |

## Key Parameters

| Parameter | Options | Description |
|-----------|---------|-------------|
| Aesthetic Preset | 50+ styles (see below) | One-click style, lighting, and composition template |
| Aspect Ratio | 1:1, 2:3, 3:2, 9:16, 16:9, 3:4, 4:3 | Frame shape — set in UI, not in prompt |
| Quality | 720p, 1080p | Output resolution (up to 4K on some endpoints) |
| Batch Size | 1 or 4 | Number of variations generated per prompt |
| Enhance Prompt | ON / OFF | Auto-expands prompt for realism (can add unexpected elements) |
| Soul ID | Character reference | Locks facial identity across generations (10-20 photos to train) |
| Custom Reference Strength | 0.6–1.0 | How strongly a reference image influences the output (I2I mode) |
| Seed | Number | Lock for reproducible outputs |

## Aesthetic Presets (50+)

Soul's defining feature. Each preset applies curated color grading, lens simulation, lighting style, and compositional framing. Select before prompting.

### Fashion & Editorial
| Preset | Aesthetic |
|--------|-----------|
| Tokyo Streetstyle | Japanese urban fashion, clean minimalism, street candid |
| Y2K | Retro 2000s cyber candy colors, glossy textures |
| Quiet Luxury | Understated elegance, muted tones, premium materials |
| Gorpcore | Outdoor technical wear, trail-to-city aesthetic |
| Coquette Core | Feminine, soft pink, ribbons, romantic details |
| Indie Sleaze | Raw, grungy, party-girl aesthetic, flash photography |
| FashionShow | Runway lighting, editorial framing, designer focus |
| 90s Editorial | Vintage magazine feel, high contrast, iconic poses |
| Avant-garde | Experimental, deconstructed fashion, artistic framing |
| Bimbocore | Bold, exaggerated, hyper-feminine Y2K maximalism |

### Photography Style
| Preset | Aesthetic |
|--------|-----------|
| iPhone | Smartphone-authentic look, casual, candid |
| DigitalCam | Early 2000s digital camera aesthetic, slight noise |
| 0.5 Selfie | Ultra-wide distorted selfie angle |
| Fisheye | Barrel distortion, skate/action photography feel |
| CCTV | Surveillance camera look, grainy, low-angle |
| Vintage Photo Booth | Strip-style portraits, flash, nostalgic |

### Mood & Atmosphere
| Preset | Aesthetic |
|--------|-----------|
| Grunge | Dark, textured, raw, desaturated |
| Fairycore | Ethereal, soft, pastel, nature-magical |
| Tumblr | Curated indie aesthetic, soft grading, moody |
| Night Beach | Dark blue tones, moonlit, atmospheric |
| Rainy Day | Wet surfaces, diffused light, reflective |
| Amalfi Summer | Mediterranean golden hour, warm coastal light |

### Concept & Experimental
| Preset | Aesthetic |
|--------|-----------|
| Creatures | Fantasy/surreal character design |
| Medieval | Historical period styling and lighting |
| Dune-core | Desert sci-fi aesthetic, muted earth tones |
| Glazed Doll Skin Makeup | Glass-skin beauty, luminous close-ups |
| Giant Hands | Surreal oversized prop concept |
| Masked | Face-obscured styling, mystery aesthetic |
| Mixed Media | Collage of photo and illustration elements |
| Artwork | Painterly treatment of photographic subjects |

### Lifestyle & Social
| Preset | Aesthetic |
|--------|-----------|
| Eating Food | Food content framing, warm tones |
| Selfcare | Spa/wellness aesthetic, soft and clean |
| Shoe Check | Sneaker/shoe focus framing |
| Nail Check | Manicure close-up styling |
| Escalator | Mall/urban transit aesthetic |
| Flight Mode | Airport/travel lifestyle |
| Movie | Cinematic color grading, widescreen feel |
| 505room | Interior aesthetic, curated room setting |
| Spotlight | Dramatic single-source lighting |
| Mt. Fuji | Japanese landscape backdrop |

### Special / Niche
| Preset | Aesthetic |
|--------|-----------|
| Japandi | Japanese-Scandinavian minimalist interior |
| Invertethereal | Inverted color ethereal look |
| HairClips | Y2K hair accessory focus |
| Object Makeup | Creative face paint / object-as-makeup concept |
| Graffiti | Urban street art backdrop |
| 2000s Fashion | Early millennium trends and color palette |
| Long Legs | Elongated perspective, fashion model framing |
| Y2K Posters | Retro poster graphic aesthetic |
| General | Neutral preset, no strong style applied |

## Mode-Specific Sections

### T2I (Text-to-Image) — Primary Mode

Soul's core workflow. Write a descriptive prompt, select a preset, generate 4 variations.

**Formula:**
```
[Preset Selection] + [Natural language prompt describing subject, setting, lighting, mood, camera]
```

**Tips:**
- Let the preset do the heavy lifting for style — focus your prompt on subject and scenario
- Use fashion-specific language: "editorial," "lookbook," "street style," "campaign"
- Describe the feel of materials: "linen catches the breeze," "leather jacket worn soft at the elbows"
- Reference real camera behavior: "flash photography," "available light," "overexposed highlights"
- Soul auto-generates 4 shots per prompt — pick the strongest, iterate from there

### I2I (Image-to-Image) — Reference Mode

Transform existing images while maintaining structural integrity. Supports restyling, mood shifts, wardrobe swaps, and background replacement.

**Workflow:**
1. Upload a clean, well-lit reference image (max 50MB)
2. Optionally attach a trained Soul ID for character consistency
3. Write a detailed prompt describing the desired transformation
4. Select a preset to define the target aesthetic
5. Set aspect ratio (4:5 for feeds, 9:16 for stories, 16:9 for widescreen)
6. Adjust reference strength (higher = closer to original, lower = more creative freedom)
7. Generate and iterate

**Tips:**
- Use high-quality source images for best structure preservation
- The prompt should describe the DESIRED output, not the input image
- Combine Soul ID + preset for maximum consistency in series work
- Reference strength 0.7–0.8 is a good starting point for restyle while keeping composition
- Lower reference strength (0.6) for dramatic transformations

## Best Practices

1. **Lead with the preset** — Choose your aesthetic preset first, then write a prompt that complements it. The preset handles color, grading, and lens simulation; your prompt handles subject and scenario. Fighting the preset with conflicting style language produces muddled results.

2. **Write like a creative director, not a coder** — Describe what you would tell a photographer on set: "She stands at the edge of the rooftop, wind catching her coat, golden backlight outlining her silhouette." Soul thrives on evocative, specific language.

3. **Specify materials and textures** — Soul excels at rendering fabric weight, stitching, skin pores, and surface detail. Mention specific materials: "raw silk," "distressed leather," "cable-knit wool," "patent vinyl." This plays to the model's core strength.

4. **Use camera and lens language** — Reference focal lengths (50mm, 85mm, 35mm wide), depth of field, shooting angle, and lighting techniques. Soul understands professional photography vocabulary deeply: "shot on 85mm, f/1.8, shallow DOF with bokeh" produces distinctly different results than a generic "portrait."

5. **Leverage Soul ID for series work** — When generating multiple images of the same character across scenes or outfits, train a Soul ID first (10-20 photos, ~5 minutes). This eliminates face drift and is essential for lookbooks, campaigns, and narrative series.

6. **Disable "Enhance Prompt" for precision** — The auto-enhance feature can add geographic locations, compositional changes, or mood shifts you did not request. Turn it OFF when you need strict prompt adherence; leave it ON for exploratory creative sessions.

7. **Add "no text" for street scenes** — Soul occasionally renders garbled text on signage. Append "no text, no signage, no visible lettering" for clean street and urban shots.

8. **Use negative exclusions sparingly** — Unlike Midjourney's `--no` flag, Soul accepts exclusions inline: "no text, no watermark, no distorted hands." Keep these minimal; Soul handles anatomy and realism well natively.

## Example Prompts

### Example 1: Street-Style Editorial (Preset: Tokyo Streetstyle)
```
A woman in her mid-20s stands on a busy Tokyo intersection at golden hour, wearing an oversized vintage denim jacket over a white cropped tank top, high-waisted cargo pants, and chunky platform sneakers. Her hair is wind-swept, expression confident and unbothered. Motion-blurred pedestrians cross behind her. Shot at eye-level with a 50mm lens, shallow depth of field, warm natural light casting long shadows. The image feels candid, like a street photographer caught the perfect moment.
```

### Example 2: Quiet Luxury Campaign (Preset: Quiet Luxury)
```
A man in his early 30s sits in a minimalist Milanese cafe, wearing a perfectly fitted navy cashmere sweater over a white linen collar, no visible logos. One hand rests on a ceramic espresso cup. Soft diffused window light illuminates one side of his face, the other in gentle shadow. Muted earth tones throughout. Shot on 85mm, f/2.0, the background dissolves into creamy bokeh. The mood is understated confidence, old money ease.
```

### Example 3: Grunge Magazine Cover (Preset: Grunge)
```
Close-up portrait of a young woman with smudged dark eyeliner, damp hair clinging to her face, wearing a ripped band t-shirt. She stares directly into the lens with raw intensity. Harsh on-camera flash against a dark backdrop, high contrast, visible film grain. The texture of her skin is real — pores, slight imperfections, nothing smoothed. It could be a 1993 magazine cover pulled from the archive.
```

### Example 4: Fantasy Concept (Preset: Creatures)
```
A dragonborn warrior in ornate bronze armor stands at the edge of a volcanic ridge, molten lava glowing below. Intricate scales cover exposed forearms, catching firelight with metallic reflections. Battle-worn scratches on the breastplate. Cinematic rim lighting from the lava, volumetric smoke rising around their silhouette. Shot on a long lens, dramatic compression, the background erupting with soft focus. Epic fantasy with grounded realism in every texture.
```

### Example 5: Lifestyle UGC (Preset: iPhone)
```
A college student lounging on a dorm bed, laptop open, wearing an oversized hoodie and socks, surrounded by textbooks and empty coffee cups. Warm tungsten overhead light mixed with blue screen glow on their face. They are mid-laugh, looking at their phone. The composition is slightly off-center, like a friend took the photo. Nothing posed, nothing perfect — just a real moment.
```

### Example 6: Y2K Throwback (Preset: Y2K)
```
Two best friends at a house party, early 2000s aesthetic, matching low-rise jeans and butterfly clip hairstyles, holding disposable cameras. One is mid-laugh, the other making a peace sign. Red-eye flash, slightly blown-out highlights, that unmistakable compact camera look. Background is a messy living room with fairy lights and a boombox. Pure nostalgia, zero filter.
```

## Common Mistakes to Avoid

1. **Overriding the preset with conflicting style language** — If you select "Grunge" preset but write "clean, bright, airy, pastel" in the prompt, the results will be confused. Let the preset define the visual style and use your prompt for subject/scenario.

2. **Writing prompts that are too short or vague** — "A woman on a street" gives Soul nothing to work with. Be specific about subject details, wardrobe, lighting, and mood. Soul rewards descriptive, evocative prompts even though it does not require complex engineering.

3. **Leaving "Enhance Prompt" on for precise work** — The auto-enhance can add locations, change composition, or shift mood beyond your intent. Disable it for commercial work or when prompt fidelity matters.

4. **Expecting accurate text rendering** — Soul occasionally generates garbled signage and lettering. Do not rely on it for images that need readable text. Add "no text" to prompts or plan for post-processing.

5. **Ignoring preset selection** — Using the "General" preset when a specific aesthetic exists wastes Soul's greatest advantage. Browse the 50+ presets first; there is almost certainly one that matches your vision.

6. **Using non-photographic style terms** — Prompts like "vector art," "flat illustration," "3D render," or "pixel art" push against Soul's core strength. Soul is a photography model — it excels at photorealistic, camera-captured aesthetics. Use other models for non-photographic styles.

7. **Skipping material and texture details** — Soul's texture rendering is its technical differentiator. Prompts that omit material descriptions ("wearing a jacket" vs. "wearing a worn-in waxed cotton field jacket") miss the model's strongest capability.

## Higgsfield Notes

| Setting | Recommendation |
|---------|---------------|
| Aspect Ratio | 2:3 (portrait/editorial), 9:16 (stories/reels), 3:2 (landscape/campaign), 1:1 (social feed) |
| Quality | 1080p for final output, 720p for rapid iteration |
| Enhance Prompt | OFF for precision, ON for exploration |
| Enhance (post-gen) | OFF — Soul's native output is already detail-rich |
| Soul ID | Recommended for any multi-image character work |
| Batch Size | 4 (review all variations, pick the strongest) |
| Credits | ~1 per generation (~0.25 per individual image in batch of 4) |

**Best aspect ratios for Soul:**
- Fashion editorial / lookbook: 2:3 or 3:4 (portrait)
- Social media stories / reels: 9:16 (vertical)
- Campaign / hero image: 3:2 or 16:9 (landscape)
- Instagram feed / profile: 1:1 (square)

**Soul + Higgsfield ecosystem workflow:**
- **Soul ID** — Train once, use across Soul T2I, I2I, and video models for character consistency
- **Soul Inpaint** — Pixel-level precision editing on Soul outputs (fix details, swap elements)
- **Upscale** — Increase resolution for print or large-format display
- **Video pipeline** — Use Soul T2I to generate hero frames, then animate with Kling 3.0, Seedance 2.0, or VEO3
- **Popcorn** — Use Soul outputs as key frames for storyboard sequences
- **Cinema Studio 2.0** — Use Soul frames as starting points for cinematic video generation

**Comparison with other Higgsfield image models:**
| Factor | Higgsfield Soul | Midjourney v7 | Flux 2 Max | GPT-Image 1.5 |
|--------|----------------|---------------|------------|----------------|
| Realism | Ultra-realistic, smartphone-authentic | Artistic-realistic, stylized | Photo-realistic, versatile | Balanced, good all-rounder |
| Fashion/Editorial | Exceptional (core strength) | Very good | Good | Good |
| Preset System | 50+ curated aesthetics | None (prompt-driven) | None | None |
| Prompt Complexity | Low (preset-assisted) | Medium (parameters) | Low | Low |
| Text Rendering | Weak (garbled signage) | Good (improved in v7) | Moderate | Good |
| Best For | Fashion, UGC, lifestyle, editorial | Art, fantasy, versatile | General photo, creative | Editing, versatile |
| Credits | ~1 | ~2 | ~1 | ~1 |
