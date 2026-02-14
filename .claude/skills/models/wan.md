# WAN 2.6 Prompt Guide

## Model Info
| Field | Value |
|-------|-------|
| Name | WAN 2.6 |
| Maker | Alibaba (Tongyi Wanxiang) |
| Type | Video |
| Modes | T2V, I2V |
| Syntax | Natural language (shot-based, component-structured) |
| Negative Prompts | Yes (up to 500 characters) |
| Higgsfield Available | Yes |
| Approx. Cost | ~3 credits per clip |

## Technical Specifications

| Spec | Value |
|------|-------|
| Max Resolution | 1080p |
| Frame Rate | 24 fps |
| Max Duration | 15 seconds |
| Duration Options | 5s, 10s, 15s |
| Aspect Ratios | 16:9, 9:16, 1:1, 4:3, 3:4 |
| Prompt Limit | 800 characters (positive), 500 characters (negative) |
| Export Formats | MP4, MOV, WebM |
| Architecture | Mixture-of-Experts (MoE) |
| Input Image Specs (I2V) | 360px-2000px dimensions, max 100MB, 480p-1080p |
| Language Support | English and Chinese |

## Overview

WAN 2.6 is Alibaba's most advanced open-source video generation model, released December 2025. It is a narrative storytelling engine, not just a clip generator. Where earlier WAN versions produced single continuous shots, WAN 2.6 intelligently splits prompts into multiple camera angles with consistent characters and coherent transitions, supporting up to 15 seconds of cinematic output. Key differentiators include phoneme-level lip-sync for dialogue scenes, reference-to-video generation (upload a reference video to lock character identity, motion style, and voice), multi-shot storytelling with automatic scene transitions, and dramatically improved motion stability and prompt adherence. It excels at character-driven narratives, dialogue-heavy scenes, commercial content, and cinematic multi-shot sequences.

## Syntax Format

### Basic Formula
```
[Subject] + [Action] + [Camera Movement] + [Environment] + [Style]
```

### Advanced Multi-Shot Formula
```
[Global Style Description]

Shot 1 [0-Xs] [Shot size] [Camera movement]: [Scene description with subject action]
Shot 2 [X-Ys] [Shot size] [Camera movement]: [Scene description with subject action]
Shot 3 [Y-Zs] [Shot size] [Camera movement]: [Scene description with subject action]
```

### I2V Formula
```
[Motion Description] + [Camera Movement] + [Atmospheric Changes]
```

**Rules:**
- Maximum 800 characters for positive prompts; keep prompts dense and precise
- Use professional cinematography terminology (dolly, tracking, crane) instead of casual language
- Place the most important visual information at the beginning of each shot description
- Use timing brackets `[0-3s]` for multi-shot sequences to define shot pacing
- For I2V mode, do NOT re-describe elements already visible in the source image
- Maintain visual continuity between shots by referencing consistent elements (clothing, lighting, environment)
- Negative prompts are optional but effective at reducing specific artifacts; limit to 8-20 tokens per problem category
- English prompts work well; Chinese prompts may yield slightly different aesthetic results due to training data

## Prompt Structure

### Key Components
| Component | Priority | Description | Example |
|-----------|----------|-------------|---------|
| Subject | 1 (Highest) | Main character or object with identifying details | "A young woman with short silver hair and a leather jacket" |
| Action | 2 | What the subject is doing, with motion specifics | "walks confidently through the crowd, coat swaying" |
| Camera | 3 | Shot size, angle, and movement | "Medium close-up, slow dolly in, center-framed" |
| Environment | 4 | Setting, time of day, weather | "Rain-slicked Tokyo alley at night, neon reflections" |
| Lighting | 5 | Light source, quality, direction | "Cool rim light from neon signs, warm key light from street lamp" |
| Style | 6 | Aesthetic, genre, mood | "Cinematic, moody color grading, shallow depth of field" |
| Audio Cues | 7 (Optional) | Dialogue hints, ambient sound mood | "Quiet conversation tone, city ambience" |

## Key Parameters

| Parameter | Range/Options | Description |
|-----------|---------------|-------------|
| Duration | 5s, 10s, 15s | Clip length; 15s allows three-act micro-narratives |
| Aspect Ratio | 16:9, 9:16, 1:1, 4:3, 3:4 | Match to delivery platform (16:9 landscape, 9:16 vertical) |
| Resolution | 720p, 1080p | Output quality; 1080p recommended for final renders |
| Negative Prompt | Up to 500 chars | Artifacts and qualities to suppress |
| Seed | Integer | Lock for reproducibility; vary for exploration |
| Multi-Shot | Enable/Disable | Allows automatic scene transitions within a single clip |
| Prompt Expansion | On (default) / Off | Model auto-enriches prompt details; disable for precise control |

## Mode-Specific Sections

### T2V (Text-to-Video)

WAN 2.6 T2V is the primary mode for generating video from text descriptions. It supports single-shot and multi-shot generation up to 15 seconds at 1080p.

**Single-Shot Approach (5s clips):**
Write a focused prompt describing one continuous scene with one camera movement. Best for social media snippets, product reveals, and simple animations.

```
A cyberpunk cat running through a neon-lit back alley, running toward the camera, low angle, puddle reflections, rain, cinematic style
```

**Multi-Shot Approach (10-15s clips):**
Structure as a global style line followed by individual shot descriptions with timing brackets. This enables a Setup-Action-Resolution narrative arc within a single generation.

```
Cinematic narrative, warm golden hour lighting, shallow depth of field, film grain.

Shot 1 [0-5s] Wide establishing shot: A lone figure stands at the edge of a desert highway, wind blowing dust across the road, camera slowly pushes in.
Shot 2 [5-10s] Medium close-up: The figure adjusts their hat and turns to face the camera, revealing weathered features and a slight smile, static shot.
Shot 3 [10-15s] Over-shoulder tracking shot: The figure walks toward a distant town silhouette, heat haze rising from asphalt, slow dolly following from behind.
```

**T2V Tips:**
- For 15s clips, plan a three-act structure: establish (wide), develop (medium), resolve (close or reveal)
- Specify shot size for each segment (wide, medium, close-up)
- Include at least one camera movement verb per shot (push, pull, pan, orbit, track, crane)
- Add atmosphere descriptors to unify the visual tone across shots
- Use speed adverbs to control pacing: "slowly", "rapidly", "gently", "suddenly"

### I2V (Image-to-Video)

WAN 2.6 I2V animates a source image into video. The source image establishes subject appearance, scene composition, and visual style, so the prompt should focus exclusively on motion, camera behavior, and temporal changes.

**I2V Prompt Formula:**
```
[What moves and how] + [Camera behavior] + [Speed/intensity] + [Atmospheric changes]
```

**Optimal Source Images:**
- Resolution: 1080p minimum for best results
- Composition: Clear subject with defined depth of field
- Content: Atmospheric elements (clouds, water, smoke, fabric) animate well
- Avoid: Busy compositions with competing focal points; extreme close-ups of faces

**I2V Duration Selection:**
- 5s: Simple motion (hair blowing, water rippling, subtle camera drift)
- 10s: Moderate action (walking, turning, environment changes)
- 15s: Complex sequences (multiple actions, camera transitions, narrative progression)

**I2V Tips:**
- Never contradict what is visible in the source image (wrong lighting direction, absent elements)
- Motion descriptions must be physically plausible from the starting pose
- Camera movement adds significant production value; always include at least one camera directive
- Specify the intensity of motion: "gentle breeze" vs "violent storm"
- For portraits, focus on subtle movements: eye direction shifts, micro-expressions, hair and fabric motion

## Best Practices

1. **Use professional cinematography language** — WAN 2.6 responds dramatically better to terms like "slow dolly in, center-framed, steady" than casual descriptions like "camera moves closer." Precise terminology yields precise results.

2. **Structure multi-shot prompts with timing brackets** — Use `[0-5s]`, `[5-10s]`, `[10-15s]` to define shot boundaries. This gives the model clear pacing guidance and prevents scene elements from blending together.

3. **Front-load critical details** — Place the most important visual information at the start of each shot description. The model prioritizes early prompt tokens, so subject identity and key actions should come first.

4. **Maintain character consistency across shots** — Repeat key identifying details (hair color, clothing, distinguishing features) in each shot description. Do not assume the model will remember details from a previous shot.

5. **Control motion intensity with adverbs** — Use "slowly", "gently", "subtly" for calm scenes; "rapidly", "suddenly", "explosively" for action. Motion intensity words have a direct measurable effect on output.

6. **Specify one camera movement per shot** — Combining multiple camera movements in a single shot (e.g., "dolly in while panning left and craning up") causes confusion. Keep it to one primary movement per shot segment.

7. **Use negative prompts strategically** — Rather than overloading negative prompts, target the specific artifacts you encounter. Start with the universal baseline: `low quality, blurry, distorted faces, unnatural movement, watermarks` and add specifics as needed.

8. **Match aspect ratio to content** — Use 16:9 for landscape and cinematic scenes, 9:16 for vertical social media (TikTok, Reels, Shorts), 1:1 for product showcases, and 4:3 for a classic film feel. Tailor prompt composition to the selected ratio.

9. **Leverage the 15-second format for narrative arcs** — The 15s duration supports a complete three-act micro-story: Setup (establish location/character, 0-5s), Action (event or transformation, 5-10s), Resolution (reaction or reveal, 10-15s).

10. **Iterate one variable at a time** — When refining output, change only one element per generation (camera angle, lighting, motion speed). This makes it clear which change produced the improvement.

## Example Prompts

### Example 1: Cinematic Character Introduction (T2V, 15s, Multi-Shot)
```
Cinematic, shallow depth of field, warm golden hour lighting, anamorphic lens flare, film grain.

Shot 1 [0-5s] Wide establishing shot: A woman in a red trench coat stands at the edge of a rain-soaked rooftop overlooking a sprawling city at sunset, camera slowly cranes up to reveal the skyline.
Shot 2 [5-10s] Medium close-up, static: She turns her head slightly, wind catching her dark hair, expression shifting from contemplation to quiet resolve, warm rim light outlining her profile.
Shot 3 [10-15s] Over-shoulder tracking shot: She walks toward the rooftop door, coat flowing behind her, camera follows at a measured pace, city lights twinkling in the bokeh background.
```

### Example 2: Product Commercial (T2V, 10s, Multi-Shot)
```
Premium commercial aesthetic, studio lighting, reflective black surface, sleek minimalism.

Shot 1 [0-4s] Extreme close-up: A luxury watch rests on polished obsidian, dramatic rim lighting catches the sapphire crystal, subtle light sweep moves across the dial, slow orbit right.
Shot 2 [4-7s] Medium shot: A hand reaches into frame and lifts the watch with precision, metal bracelet catching light as it rises, smooth dolly out revealing the brand environment.
Shot 3 [7-10s] Wide shot: The watch now on a wrist, arm resting casually on a dark marble surface, shallow focus pull from watch face to the wearer's confident smile.
```

### Example 3: Nature Documentary (T2V, 15s, Single-Shot)
```
A massive humpback whale breaches the ocean surface in slow motion, water cascading off its body in crystalline sheets, golden sunset light refracting through the spray, wide establishing shot from a low water-level angle, camera holds steady then slowly tilts up to follow the whale's arc against a dramatic cloud-streaked sky, documentary style, photorealistic, 4K detail, David Attenborough aesthetic
```

### Example 4: Dialogue Scene with Lip-Sync (T2V, 10s)
```
Cinematic drama, warm interior lighting, shallow depth of field, 35mm film look.

Shot 1 [0-5s] Medium close-up: A middle-aged man in a dimly lit cafe leans forward, speaking earnestly with visible lip movement and expressive gestures, warm key light from a window, gentle camera drift left.
Shot 2 [5-10s] Reverse angle medium shot: A young woman across the table listens, her expression shifting from skepticism to understanding, she nods slowly and begins to respond, soft fill light, static shot with subtle focus pull.
```

### Example 5: Portrait Animation (I2V, 10s)
```
Subject slowly turns head to the right, a warm smile gradually forming, eyes catching the light, hair swaying gently as if in a soft breeze. Slow dolly in from medium shot to close-up, subtle focus transition to shallow depth of field, ambient light shifts from cool to warm.
```

### Example 6: Landscape Animation (I2V, 15s)
```
Clouds drift steadily across the sky casting moving shadows over the valley, river water ripples and catches shifting sunlight, trees sway gently in the breeze with leaves occasionally detaching, birds fly across the middle distance. Slow pan right revealing more of the mountain range, time-lapse cloud movement, golden hour light gradually intensifying.
```

### Example 7: Action Sequence (T2V, 10s)
```
Cinematic action, dynamic lighting, high contrast, adrenaline pacing.

Shot 1 [0-4s] Low angle tracking shot: A parkour runner sprints across a concrete rooftop, leaps over a gap between buildings, coat billowing mid-air, dust particles caught in hard side light, camera tracks the movement at full speed.
Shot 2 [4-7s] Wide shot from below: The runner lands on the opposite rooftop in a roll, momentum carrying forward, pigeon flock scatters, crash zoom follows the landing impact.
Shot 3 [7-10s] Medium close-up, handheld: The runner pauses at the edge, breathing hard, city sprawling below, wind tousling hair, camera settles into a steady hold, golden hour backlighting.
```

### Example 8: Fantasy/VFX Scene (T2V, 15s)
```
Epic fantasy, volumetric god rays, dramatic orchestral mood, painterly color grading, high detail.

Shot 1 [0-5s] Wide crane shot rising: An ancient stone temple emerges from mist-covered jungle canopy, vines reclaiming crumbling pillars, birds circling above, camera cranes up from ground level through the foliage.
Shot 2 [5-10s] Medium shot, slow dolly in: A robed figure stands at the temple entrance, hands raised as glowing runes illuminate the doorway with ethereal blue light, dust motes swirl in the light beams.
Shot 3 [10-15s] Interior wide shot: The massive temple chamber reveals itself, golden light pouring through cracks in the ceiling onto a central altar, the figure walks forward in silhouette, camera holds wide and static to absorb the scale.
```

## Common Mistakes to Avoid

1. **Vague motion descriptions** — "Things move around" gives the model nothing to work with. Instead specify exactly what moves, how, and at what speed: "Hair sways gently in a breeze from the left, dress fabric ripples at the hem."

2. **Omitting camera direction entirely** — Without explicit camera instructions, WAN 2.6 defaults to an unpredictable camera. Always include at least one camera verb (dolly, pan, track, crane, orbit, static, hold).

3. **Contradicting the source image in I2V** — Describing "bright sunny day" when the source image shows a dark interior causes incoherent output. The prompt should describe changes FROM the image's existing state, not contradict it.

4. **Overloading shots with multiple simultaneous camera movements** — "Dolly in while panning right, craning up, and zooming" produces chaotic, unstable footage. Assign one primary camera movement per shot.

5. **Not repeating character details across shots** — In multi-shot prompts, the model does not automatically carry character appearance from Shot 1 to Shot 3. Repeat key identifiers: "the woman in the red trench coat with dark hair" in each shot.

6. **Using 15-second duration for simple scenes** — If the scene has one subject doing one thing, 5 seconds is sufficient. Stretching thin content to 15 seconds produces slow, repetitive footage. Reserve 15s for multi-shot narratives.

7. **Neglecting aspect ratio alignment** — Composing a horizontal landscape scene but generating in 9:16 vertical crops out the sides. Choose aspect ratio BEFORE writing the prompt, then compose for that frame.

8. **Overloading negative prompts** — Using 30+ negative tokens simultaneously can degrade overall quality. Stick to 8-20 targeted tokens per problem category. If a specific artifact persists after two attempts, consider adjusting the positive prompt instead.

9. **Describing static images instead of motion** — Writing "a beautiful sunset over the ocean" without any motion or camera verbs yields a near-still frame. Always include temporal elements: what changes over time.

10. **Ignoring the prompt expansion feature** — Prompt expansion is ON by default and enriches simple prompts. For precise creative control, disable it. For quick generation, leave it on and write shorter prompts.

## Negative Prompt Reference

### Universal Baseline
```
low quality, blurry, distorted faces, unnatural movement, text, watermarks, shaky camera
```

### Flicker and Temporal Issues
```
flicker, temporal flicker, exposure flicker, strobe, shimmer, frame hopping, micro-jitter
```

### Identity/Character Drift
```
identity drift, face morphing, off-model, expression drift, hair length change, outfit change
```

### Motion Artifacts
```
soft focus, motion smear, ghosting, gaussian blur, out of focus, smudged detail, lens haze
```

### Anatomy Issues
```
extra fingers, deformed hands, mangled hands, duplicate limbs, bad anatomy, distorted wrists
```

### Close-Up Face Issues
```
face distortion, asymmetry, extra teeth, deformed ears, warped nose, waxy skin, plastic sheen
```

### Product/Commercial Shots
```
wrong label, warped logo, reflection clutter, perspective distortion, moire pattern
```

## Higgsfield Notes

| Setting | Recommendation |
|---------|---------------|
| Aspect Ratio | 16:9 (landscape/cinematic), 9:16 (social vertical), 1:1 (product/square) |
| Duration | 5s (simple), 10s (standard), 15s (narrative multi-shot) |
| Resolution | 1080p for final output, 720p for quick drafts |
| Enhance | OFF (default); only enable if output appears soft or low-detail |
| Camera Presets | Match to prompt camera direction; do NOT embed camera in prompt if using preset |
| Credits | ~3 per clip |
| Prompt Expansion | Leave ON for quick generation; disable for precise control |

**Important:** In Higgsfield, aspect ratio, camera presets, and duration are UI selections, NOT embedded in prompt text. Write prompts as pure scene/motion descriptions.

**Best camera presets for WAN 2.6:**
- Cinematic establishing shots: Crane Up, Dolly Out, Push In
- Character portraits/dialogue: Dolly In, Static, Gentle Drift
- Action sequences: Tracking, Whip Pan, Crash Zoom, Handheld
- Product showcases: Orbit, Lazy Susan, Slow Dolly
- Nature/landscape: Pan Left/Right, Crane Up, Timelapse Hold
- Documentary/interview: Static, Handheld, Steadicam

**Workflow Tips:**
- Use **Soul ID** for character consistency across multiple WAN 2.6 generations (upload 10-20 reference photos, creation takes ~5 min)
- Use **Popcorn** for storyboard auto-mode with keyframes when planning multi-shot sequences
- Use **Cinema Studio 2.0** for frame-by-frame cinematic control when fine-tuning transitions
- Generate a 5s test clip first to validate composition before committing to a 15s render
- WAN 2.6 pairs well with Kling 3.0 or Seedance 2.0 for comparison; test the same prompt across models

## Version Comparison

| Feature | WAN 2.2 | WAN 2.5 | WAN 2.6 |
|---------|---------|---------|---------|
| Release | Mid 2025 | Late 2025 | December 2025 |
| Max Duration | 5-10s | 10s | 15s |
| Max Resolution | 720p | 1080p | 1080p |
| Frame Rate | 24 fps | 24 fps | 24 fps |
| Architecture | MoE (initial) | MoE (refined) | MoE (advanced) |
| Audio Output | No | Yes (native) | Yes (improved sync) |
| Lip-Sync | No | Basic | Phoneme-level precision |
| Multi-Shot | No | No (single-shot only) | Yes (intelligent scene transitions) |
| Reference-to-Video | No | No | Yes (upload 2-30s reference video) |
| Voice Cloning | No | No | Yes (from reference video) |
| Multi-Character Dialogue | No | No | Yes (up to 2 characters) |
| Input Types | Text, Image | Text, Image | Text, Image, Video Reference |
| Aspect Ratios | 16:9, 9:16 | 16:9, 9:16, 1:1 | 16:9, 9:16, 1:1, 4:3, 3:4 |
| Motion Quality | Good | Better (~30% improvement) | Best (reduced jitter, precise tracking) |
| Prompt Adherence | Moderate | Strong | Strongest |
| Character Consistency | Limited | Improved | Strong (via reference video + identity lock) |
| Best For | Quick prototypes | Polished single clips | Cinematic narratives, dialogue, multi-shot |
| Higgsfield Credits | ~3 | ~3 | ~3 |
