# Veo 3.1 Prompt Guide

## Model Info
| Field | Value |
|-------|-------|
| Name | Veo 3.1 |
| Maker | Google DeepMind |
| Type | Video |
| Modes | T2V, I2V |
| Syntax | Natural language (directorial) |
| Negative Prompts | Yes (in-prompt + separate negative prompt field) |
| Higgsfield Available | Yes |
| Approx. Cost | ~8 credits per clip |

## Technical Specifications

| Spec | Value |
|------|-------|
| Resolution | 720p (default), 1080p, 4K (3840x2160) |
| Aspect Ratios | 16:9 (landscape, default), 9:16 (portrait/vertical) |
| Frame Rate | 24 fps (cinematic default) |
| Duration | 4, 6, or 8 seconds per clip |
| Audio | Native synchronized (dialogue, SFX, ambience) |
| 1080p Constraint | 8-second duration only |
| 4K Constraint | 8-second duration only |
| Extension | Up to ~148 seconds via chained clips (720p only for extensions) |
| Reference Images | Up to 3 (Ingredients to Video) |
| Text Input Limit | 1,024 tokens |
| Audio-Video Sync | ~10ms latency |

**Resolution notes:**
- 4K uses AI-based upscaling with deep learning detail reconstruction, not simple interpolation
- 4K and 1080p require 8-second duration
- Extensions (scene continuation) are limited to 720p
- Native vertical (9:16) output eliminates cropping for mobile-first content

## Overview

Veo 3.1 is Google DeepMind's flagship video generation model and the successor to Veo 3. It produces cinematic video with native synchronized audio including dialogue, sound effects, and ambient noise in a single generation pass. The headline upgrades over Veo 3 are 4K output (3840x2160), native vertical video (9:16), the "Ingredients to Video" multi-reference system for character and style consistency, improved prompt adherence, better temporal stability, and higher fidelity text rendering and facial detail. Veo 3.1 excels at cinematic storytelling, product commercials, dialogue-driven scenes, and mobile-first social content, delivering results that require minimal post-production.

## Syntax Format

Veo 3.1 uses natural language prompts written in a directorial style. Think of yourself as a cinematographer giving shot instructions rather than describing a scene passively.

```
[Camera move + lens]: [Subject] [Action & physics], in [Setting + atmosphere], lit by [Light source]. Style: [Texture/finish]. Audio: [Dialogue/SFX/ambience]. No subtitles, no text overlay.
```

**Rules:**
- Write in present tense, active voice ("A woman walks" not "A woman is walking" or "A woman walked")
- Front-load the most important visual elements (subject, action) before style and audio
- Keep prompts between 75-150 words for best results; exceeding 175 words overloads the model
- Specify audio explicitly since Veo 3.1 always generates audio
- Always end with "No subtitles, no text overlay" to prevent unwanted on-screen text
- Use quotation marks for specific dialogue lines
- Separate visual and audio directions clearly
- One dominant action per clip; avoid stacking conflicting movements

## Prompt Structure

### Key Components
| Component | Priority | Description | Example |
|-----------|----------|-------------|---------|
| Camera | 1 | Shot type, lens, movement | "Slow dolly-in on 85mm lens, eye-level" |
| Subject | 2 | Identity, appearance, wardrobe | "A woman in her 30s, short black hair, olive linen jacket" |
| Action | 3 | Motion with force-based verbs | "Leans forward and lifts a ceramic mug, steam rising" |
| Setting | 4 | Location, time, atmosphere | "Quiet cafe at golden hour, dust motes in warm light" |
| Lighting | 5 | Source, direction, quality | "Soft side window light with gentle fill opposite" |
| Style | 6 | Texture, finish, film reference | "Shot on 35mm with natural grain, fine skin pores visible" |
| Audio | 7 | Dialogue, SFX, ambience, music | "She says: 'This changes everything.' Cafe ambience, soft jazz" |
| Exclusions | 8 | Unwanted elements | "No subtitles, no text overlay, no watermarks" |

## Key Parameters

| Parameter | Options | Description |
|-----------|---------|-------------|
| Aspect Ratio | 16:9, 9:16 | Landscape (default) or portrait/vertical |
| Duration | 4s, 6s, 8s | Clip length; 8s required for 1080p/4K |
| Resolution | 720p, 1080p, 4K | Output quality; higher res requires 8s duration |
| Negative Prompt | Free text | Elements to exclude (describe what to avoid) |
| Reference Images | Up to 3 | Character, scene, and/or style references |
| Seed | Integer | For reproducible results across generations |
| Audio | On/Off | Native audio generation (on by default) |

## Mode-Specific Sections

### T2V (Text-to-Video)

T2V is Veo 3.1's primary mode. Since no visual reference exists, the prompt must establish every element: subject, action, setting, camera, lighting, style, and audio.

**T2V prompt formula:**
```
[Camera move + lens]: [Subject with specific details] [performs action with physics], in [setting with atmosphere and time of day], lit by [specific light source and direction]. Style: [texture, finish, film stock]. Audio: [dialogue in quotes] [SFX] [ambience]. No subtitles, no text overlay.
```

**T2V tips:**
- Be maximally specific about the subject: age, build, clothing material and color, distinctive features
- Use force-based action verbs (push, pull, slam, sway, ripple) for realistic motion
- Name specific light sources (neon sign, cracked doorway, overcast sky) rather than vague brightness
- Specify lens focal length to control depth: 16mm expands space, 35mm gives natural perspective, 85mm compresses and isolates
- Add micro-texture details to counter the "AI-plastic look": "fine skin pores, visible fabric weave, subtle contrast"
- Keep one dominant action per clip for clean results

### I2V (Image-to-Video)

I2V animates a reference image into a video clip. The image establishes the visual foundation; the prompt adds motion, camera movement, and audio.

**I2V prompt formula:**
```
[Describe the motion that occurs]. [Camera movement]. [Audio direction]. No subtitles, no text overlay.
```

**I2V rules:**
- Do NOT re-describe what is already visible in the reference image
- Focus the prompt entirely on motion, camera movement, and audio
- Source image quality matters: use 720p+ resolution images for best results
- Do not contradict visible elements in the image (wrong wardrobe color, different setting)
- Camera movement works exceptionally well: the model adds parallax and depth from static images
- Veo 3.1 has improved I2V fidelity over Veo 3, with better reference adherence and character consistency

**I2V examples:**

Bringing a portrait to life:
```
The woman slowly turns her head to face the camera, a gentle smile forming. Soft breeze moves her hair. Camera holds static, medium close-up. Ambient: soft wind, distant birds. No subtitles, no text overlay.
```

Animating a landscape:
```
Gentle ripples spread across the lake surface, clouds drift slowly across the sky, trees sway in a light breeze. Slow dolly forward toward the water. Ambient: water lapping softly, wind through pines. No subtitles, no text overlay.
```

### Ingredients to Video (Multi-Reference)

Veo 3.1 introduces "Ingredients to Video," accepting up to 3 reference images that each control a different aspect of the final output:

| Ingredient Slot | Controls | Example |
|----------------|----------|---------|
| Character/Subject | Subject appearance and identity | Photo of specific person or character |
| Background/Scene | Setting and environment | Landscape or interior photo |
| Style | Visual aesthetic and mood | Artwork, film still, or color reference |

**How it works:**
- Upload 1-3 reference images as "ingredients"
- Write a text prompt describing action, camera, and audio
- The model composites the ingredients into a cohesive scene
- Character identity is maintained even as settings change, enabling multi-scene narratives

**Ingredients tips:**
- Use clear, well-lit reference images for each ingredient
- The text prompt should focus on what happens (action, motion, audio) rather than re-describing the ingredients
- Requires 8-second duration
- Ideal for maintaining character consistency across a multi-shot project

## Best Practices

1. **Direct like a cinematographer** — Write prompts as shot instructions, not passive scene descriptions. "Slow dolly-in reveals a woman standing at the window" beats "There is a woman standing at a window."

2. **Anchor your subject immediately** — Lock subject identity at the start of the prompt with specific visual traits: age, build, attire material and color, distinctive features. Vague subjects cause faces to drift and clothing to shift between frames.

3. **Use force-based motion verbs** — Describe how energy moves through the scene. "Slams the door" and "ripples spread across the surface" create realistic weight and physics. "Moves toward the door" produces floaty, weightless animation.

4. **Specify light sources, not brightness** — Name the actual source: "warm light from a desk lamp," "neon glow from a storefront sign," "overcast sky through floor-to-ceiling windows." Vague lighting like "well-lit" causes visual warping and unstable shadows.

5. **Add micro-texture for realism** — Counter the default smooth AI rendering with physical details: "fine skin pores visible, natural fabric weave, subtle film grain, no gloss or sharpening."

6. **Keep dialogue short** — With 8 seconds maximum, limit spoken lines to 6-12 words. Use the format: `Character says: "Short line here."` Always add "(no subtitles)" after dialogue.

7. **Layer your audio** — Combine dialogue, one or two SFX, and ambient background. Structure clearly: `She says: "We need to go." SFX: keys jangling. Ambient: distant traffic, evening crickets.`

8. **Always exclude unwanted text** — End every prompt with "No subtitles, no text overlay, no watermarks" to prevent Veo 3.1 from rendering on-screen text.

9. **Use negative prompts for artifacts** — In the negative prompt field, add: "blurry, extra limbs, glitch morphs, object warping, jump cuts, text overlays, low quality."

10. **One action per clip** — Avoid stacking conflicting movements (running + opening a bag + looking at a watch). Generate separate clips for different actions and sequence them in post.

11. **Maintain consistency across shots** — For multi-shot sequences, re-state key identity cues (wardrobe color, hairstyle, props), keep palette descriptors identical, maintain time-of-day consistency, and reuse seed values.

12. **Use timestamp prompting for internal cuts** — Break an 8-second clip into timed segments: "[00:00-00:03] Wide establishing shot of the city skyline at dusk. [00:03-00:06] Medium shot, a man in a dark coat walks toward camera. [00:06-00:08] Close-up of his face as he looks up."

## Example Prompts

### Example 1: Product Commercial (Close-Up)
```
Extreme close-up, slow-motion pour of iced coffee into a clear glass, 85mm macro lens. Amber liquid cascades over ice cubes, micro-bubbles forming on the glass surface, condensation beading on the exterior. Backlit golden highlights with soft side fill. Modern cafe tabletop, shallow depth of field, background a warm bokeh blur. Style: crisp commercial finish, fine detail on liquid physics, no sharpening artifacts. Audio: ice clinking, liquid pouring, subtle cafe ambience. No subtitles, no text overlay.
```

### Example 2: Cinematic Dialogue Scene
```
Medium shot on 35mm lens, eye-level. A bearded chef in his 40s, white double-breasted jacket with visible flour dust, stands in a professional kitchen. Warm overhead pendant lights, steam rising from pots on the range behind him. He wipes his hands on a towel, looks directly at camera. Chef says: "The secret is patience." (no subtitles). SFX: sizzling pans, knife on cutting board. Ambient: kitchen exhaust hum, distant plate clatter. Static tripod, shallow DOF with soft background bokeh. Style: documentary realism, natural skin texture, no gloss. No text overlay.
```

### Example 3: Vertical Social Content (9:16)
```
Handheld tracking shot, 24mm wide lens. A young woman in a cream knit sweater walks through an autumn forest path, leaves crunching underfoot. Camera follows slightly behind and to the right at shoulder height. Golden hour backlighting through the canopy, warm amber tones, lens flares through branches. She pauses, turns back to camera with a relaxed smile. Style: warm editorial, soft contrast, natural grain. Audio: footsteps on dry leaves, gentle breeze, distant birdsong. No subtitles, no text overlay.
```

### Example 4: Sci-Fi Atmospheric (4K Showcase)
```
Slow crane down from 16mm wide lens. A lone astronaut in a weathered white spacesuit stands on the edge of a vast alien canyon, rust-red rock formations stretching to the horizon under a pale violet sky. Two small moons hang low. Dust drifts in thin atmosphere. Dramatic side lighting from the setting alien sun casting long shadows across the terrain. Style: Ridley Scott cinematic, anamorphic lens distortion, muted desaturated palette with orange-teal split toning, fine suit texture detail. Audio: deep low-frequency wind drone, suit breathing apparatus hiss, distant geological rumble. No subtitles, no text overlay, no watermarks.
```

### Example 5: Action Sequence with Physics
```
Tracking shot on 50mm lens, slightly low angle. A parkour runner in dark athletic wear sprints across a rain-slicked rooftop at twilight. He plants his left foot on the ledge and launches into a precise gap jump to the adjacent building, arms driving forward. Camera tracks laterally, matching his speed. City lights glitter below, wet surfaces reflecting neon signage. Hard backlight from a rooftop LED panel, rain streaks visible in the light cone. Style: gritty urban realism, high contrast, visible rain texture on clothing. Audio: rapid footsteps on wet concrete, heavy breathing, wind rush during the jump, distant city traffic. No subtitles, no text overlay.
```

### Example 6: Emotional Narrative (Dialogue + Ambience)
```
Close-up on 85mm lens, shallow depth of field. An elderly man in his 70s, silver hair, deep laugh lines, wearing a faded denim shirt, sits on a wooden porch bench at golden hour. He holds a worn photograph, thumb gently tracing the edge. Warm directional sunlight from camera left, soft fill from the white porch railing. He looks up with glistening eyes. Man says: "She would have loved this view." (no subtitles). Ambient: evening crickets, gentle wind chime, distant meadow birds. Style: Kodak Portra warmth, natural skin detail, no digital sharpening. No text overlay.
```

### Example 7: I2V — Animating a Product Shot
```
The sneaker on the display begins to rotate slowly on the turntable, studio key light sweeping across the textured upper, revealing stitching detail and sole tread pattern. Camera orbits gently to the right, matching the rotation. Clean white cyclorama background with soft gradient shadow beneath. SFX: subtle mechanical turntable hum. Ambient: quiet studio room tone. No subtitles, no text overlay.
```

### Example 8: Timestamp Multi-Shot (8 seconds)
```
[00:00-00:03] Wide establishing shot, 24mm: A quiet Japanese street at dawn, paper lanterns still glowing, steam rising from a ramen shop entrance. Ambient: distant temple bell, morning birds. [00:03-00:06] Medium shot, 50mm: A young woman in an indigo linen coat pushes aside the noren curtain and steps inside. SFX: fabric rustling, wooden step creak. [00:06-00:08] Close-up, 85mm: Her hands wrap around a steaming bowl, fingers curling into the warmth. Steam rises past her face. SFX: ceramic on wood, soft slurp. Style: Ozu-inspired framing, warm tungsten tones, natural grain. No subtitles, no text overlay.
```

## Common Mistakes to Avoid

1. **Vague subject descriptions** — "A person standing in a room" gives the model nothing to anchor. Always specify age, gender presentation, build, clothing material and color, and at least one distinguishing feature. Faces drift and wardrobe shifts when the subject is underspecified.

2. **Stacking multiple conflicting actions** — "She runs across the street, opens her bag, pulls out her phone, and waves at a taxi" in 8 seconds produces floaty, rushed motion. One dominant action per clip. Generate separate clips for different movements.

3. **Writing long dialogue** — An 8-second clip supports roughly 6-12 spoken words. Multi-sentence monologues get compressed into rushed, unintelligible speech. Keep it to one short, impactful line.

4. **Omitting audio direction** — Veo 3.1 always generates audio. If you do not specify what you want, it will invent generic sounds that may not match your vision. Always include explicit dialogue, SFX, and/or ambience instructions.

5. **Forgetting "no subtitles"** — Veo 3.1 often adds on-screen text by default, especially when dialogue is present. Always include "No subtitles, no text overlay" at the end of every prompt.

6. **Using vague lighting descriptions** — "Well-lit" or "bright" causes inconsistent shadows and visual warping. Name the specific light source and its direction: "warm desk lamp from camera left" or "overcast daylight through floor-to-ceiling windows."

7. **Re-describing the reference image in I2V** — In Image-to-Video mode, the image already establishes the visual foundation. Do not re-state what is visible. Focus exclusively on motion, camera movement, and audio.

8. **Contradicting reference images** — In I2V or Ingredients mode, prompting for elements that conflict with what is visible in the reference (different outfit, different setting) confuses the model and degrades output quality.

9. **Requesting exact object counts** — "Five birds fly across the sky" often yields the wrong number. Use approximate ranges: "a small flock of birds" or "a few" for geometric stability.

10. **Exceeding 175 words** — Overlong prompts dilute the model's attention. The sweet spot is 75-150 words. If your prompt exceeds 175 words, cut the least important details.

11. **Conflicting camera directions** — "Dolly in while panning left and craning up" fights itself. Choose one primary camera movement and commit to it. Use timestamp prompting if you need multiple movements within a single clip.

12. **Changing lighting mid-prompt** — "Starts in golden hour, transitions to blue moonlight" within a single 8-second clip creates jarring inconsistency. Maintain a single lighting setup per clip.

## Higgsfield Notes

| Setting | Recommendation |
|---------|---------------|
| Aspect Ratio | 16:9 (cinematic default), 9:16 (vertical/social media) |
| Duration | 8 seconds (required for 1080p/4K; recommended for all use) |
| Resolution | 720p for drafts, 1080p for production, 4K for hero shots |
| Enhance | OFF (Veo 3.1 output is already high fidelity; Enhance can over-sharpen) |
| Camera Presets | Match to prompt camera direction for consistency |
| Credits | ~8 per clip |

**Best camera presets for Veo 3.1:**
- Dialogue / interview scenes: Static, Dolly In (subtle)
- Atmospheric / establishing: Crane Up, Crane Down, Dolly Out
- Product showcase: Orbit, Lazy Susan, Turntable
- Documentary / vlog: Handheld, Pan Left, Pan Right
- Dramatic reveal: Crash Zoom, Super Dolly In
- Vertical / social content: Static, Slow Push In
- Action / tracking: Tracking Left, Tracking Right

**Higgsfield workflow tips for Veo 3.1:**
- Prompts are text only in Higgsfield. Aspect ratio, camera presets, and duration are UI selections, NOT embedded in prompt text.
- Use Soul ID for character consistency across multiple Veo 3.1 generations: create a Soul ID with 10-20 reference photos for your character.
- For multi-shot narratives, use Popcorn (storyboard auto mode) to maintain visual continuity between clips.
- Cinema Studio 2.0 enables frame-by-frame cinematic editing after generation.
- Chain clips using Scene Extension for longer sequences; each extension continues from the final second of the previous clip for visual continuity.
- Veo 3.1 generates native audio; if you need silent output for post-production audio work, mute in the Higgsfield timeline rather than trying to prompt for silence.
