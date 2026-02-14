# Sora 2 Prompt Guide

## Model Info
| Field | Value |
|-------|-------|
| Name | Sora 2 (also: Sora 2 MAX) |
| Maker | OpenAI |
| Type | Video |
| Modes | T2V, I2V |
| Syntax | Structured natural language (scene prose + labeled sections) |
| Negative Prompts | No (use positive phrasing and end-constraints) |
| Higgsfield Available | Yes (Sora 2 and Sora 2 MAX variants) |
| Approx. Cost | ~8-10 credits per clip |

## Technical Specifications

| Spec | Value |
|------|-------|
| Resolution | 720p (1280x720) or 1080p (1920x1080) |
| Aspect Ratios | 16:9, 9:16 |
| Duration | 4s, 8s, or 12s (default: 4s) |
| Frame Rate | 24 or 30 fps |
| Audio | Native synchronized (dialogue, SFX, ambience) |
| Model Variants | sora-2 (fast/flexible), sora-2-pro (higher fidelity) |

## Overview

Sora 2 is OpenAI's flagship video generation model, released September 30, 2025, and the first OpenAI model with native synchronized audio-video generation. It excels at physically accurate motion (gravity, buoyancy, fluid dynamics, complex human movement), cinematic camera direction, and synchronized dialogue with natural lip movements. Its audio engine generates character speech, ambient soundscapes, and context-aware sound effects as a unified output with the video -- not as a separate pass.

## Syntax Format

Sora 2 responds best to structured prompts organized into clear labeled sections. Think of the prompt as a creative brief, not a keyword list.

```
[Scene prose: subject, costumes, setting, weather, atmosphere]

Cinematography:
Camera shot: [framing and angle]
Mood: [overall tone]

Actions:
- [Beat 1: specific visible action]
- [Beat 2: distinct movement or gesture]
- [Beat 3: culminating action or dialogue]

Dialogue:
- [Speaker A]: "[Short, natural line]"
- [Speaker B]: "[Response]"

Background Sound: [ambient audio, SFX description]
```

**Rules:**
- Treat prompts as creative briefs, not contracts -- Sora 2 interprets, it does not execute literally
- One clear camera move and one clear subject action per shot
- Use concrete, visible nouns and verbs -- not abstract adjectives
- Establish style early (first sentence) to frame all other choices
- Shorter clips (4s) follow instructions more reliably than longer ones
- Same prompt generates different results each time -- this is intentional
- Balance specificity with creative freedom -- over-constraining reduces quality

## Prompt Structure

### Key Components
| Component | Description | Example |
|-----------|-------------|---------|
| Scene Prose | Subject, setting, wardrobe, weather, atmosphere in natural language | "A bearded chef in white uniform standing in a professional kitchen, warm overhead lighting, steam rising" |
| Cinematography | Camera framing, angle, motion, depth of field, lens | "Camera shot: Medium close-up, slight low angle. Slow dolly-in with parallax." |
| Actions | Specific beats of motion described in sequence | "Chef tosses vegetables in a wok, flames lick upward, he plates the dish with precision" |
| Dialogue | Labeled speaker lines, concise and natural | `- Chef: "The secret is always fresh ingredients."` |
| Background Sound | Ambient audio, SFX, music direction | "Sizzling oil, kitchen clatter, faint radio music" |
| Style | Film era, format, lens, color palette (set early) | "1970s documentary, 16mm film grain, warm desaturated tones" |

## Key Parameters

| Parameter | Range/Options | Description |
|-----------|---------------|-------------|
| Duration | 4s, 8s, 12s | Clip length; shorter = more reliable |
| Resolution | 720p, 1080p | Higher = more detail, fewer artifacts |
| Aspect Ratio | 16:9, 9:16 | Landscape or portrait |
| Model | sora-2, sora-2-pro | Standard (fast) vs Pro (higher fidelity) |

## Mode-Specific Sections

### T2V (Text-to-Video)

Full creative control from text alone. Structure your prompt with all relevant sections.

**Formula:**
```
[Scene prose with subject, setting, style] + [Cinematography block] + [Actions block] + [Dialogue block if needed] + [Background Sound]
```

**Tips for T2V:**
- Start with the style cue to anchor the entire generation: "1970s romantic drama, 35mm film" or "Modern commercial, clean and bright"
- Describe actions in beats or counts for temporal precision: "Four steps to the window, pauses, pulls curtain in final second"
- Encode materials and physics explicitly: "wet nylon jacket," "8-10 mph crosswind from camera left," "footfalls splashing in shallow puddles"
- For best results, generate two 4-second clips and stitch them rather than one 8-second clip
- Specify 3-5 anchor colors for palette consistency: "palette: amber, cream, walnut brown, deep teal"

### I2V (Image-to-Video)

Provide a reference image as the visual anchor for the first frame. The prompt then describes what motion, camera movement, and audio to add.

**I2V Prompt Structure:**
```
[Brief context of what's in the image]. [Describe the motion that occurs]. [Camera movement]. [Audio direction].
```

**I2V Rules:**
- Image establishes subject appearance, setting, and color palette -- do not re-describe static elements extensively
- Focus the prompt on MOTION, CAMERA, and AUDIO
- Do not contradict what is visible in the source image
- Source image quality matters -- 720p+ recommended
- Image must match target video resolution (size parameter)
- Supported formats: JPEG, PNG, WebP

**I2V Examples:**

Bringing a portrait to life:
```
The woman in the portrait slowly turns her head toward camera, a gentle smile forming. A breeze catches her hair. Camera holds static, medium close-up. Background Sound: soft wind, distant birdsong.
```

Animating a landscape:
```
The mountain lake scene comes alive with gentle ripples on the water surface, clouds drifting across the sky, trees swaying in a light breeze. Slow dolly forward toward the lake. Background Sound: water lapping against rocks, wind through pines.
```

Product animation:
```
The sneaker on the display begins rotating slowly on the turntable. Studio lights catch different angles and textures of the fabric and sole. Camera orbits right, matching the rotation speed. Background Sound: clean studio ambient, subtle mechanical whir.
```

## Best Practices

1. **Set the style first** -- The opening phrase frames everything: "Handheld 16mm documentary" or "IMAX-scale fantasy" tells the model what visual language to use before any content is described. Style is the single most powerful lever.

2. **Use specific visual language, not vague adjectives** -- Replace "a beautiful street at night" with "Wet asphalt, zebra crosswalk, neon signs reflecting in puddles." Replace "cinematic look" with "Anamorphic 2.0x lens, shallow DOF, volumetric light."

3. **Encode physics explicitly** -- Sora 2 has strong physics grounding but benefits from explicit cues. Specify materials ("wet nylon," "brushed aluminum"), forces ("8 mph crosswind from camera left"), and expected interactions ("ball bounces off hardwood, rolls to a stop against the wall").

4. **Keep dialogue short and labeled** -- Place dialogue in a dedicated block below the scene prose. Label speakers consistently. Limit to 1-2 exchanges for 4-second clips, a handful for 8-second clips. Match pacing to clip length.

5. **One camera move, one subject action** -- Each shot should have exactly one primary camera movement and one primary subject action. Compound movements ("dolly in while panning left and tilting up") produce unpredictable results.

6. **Describe both light quality and color anchors** -- "Soft window light with warm lamp fill, cool rim from hallway; palette: amber, cream, walnut brown" gives the model precise lighting and color targets. Include shadow behavior for realism.

7. **Iterate with remix, not reinvention** -- When refining, change one element at a time: "same shot, switch to 85mm" or "same lighting, new palette: teal, sand, rust." Pin successful references and describe only tweaks. Avoid making multiple simultaneous changes.

8. **Prefer shorter clips** -- The model follows instructions more reliably in shorter clips. Stitch two 4-second clips in editing rather than generating a single 8-second clip for complex scenes.

9. **Direct the audio or it directs itself** -- Sora 2 generates audio by default. If you do not describe the soundscape, the model will invent one. Always include a Background Sound line to control ambient noise, SFX, and dialogue.

## Example Prompts

### Example 1: Animated Workshop Scene (Stylized)
```
Hand-painted 2D/3D hybrid with soft brush textures, warm tungsten lighting, stop-motion aesthetic evoking mid-2000s storybook animation. Cluttered workshop: shelves overflow with gears, bolts, blueprints. A small round robot sits on a wooden bench, dented body, mismatched plates, large glowing pale-blue eyes.

Cinematography:
Camera shot: Medium close-up, slow push-in with parallax from hanging tools.
Lens: 35mm virtual lens, shallow DOF softening background clutter.
Lighting: Warm key from overhead practical, cool spill from rain-streaked window.
Mood: Gentle, whimsical, touch of suspense.

Actions:
- Robot taps a humming light bulb; sparks crackle.
- It flinches, drops the bulb, eyes widen.
- Bulb tumbles in slow motion; robot catches it just in time.
- Steam puffs from its chest — relief and pride.

Dialogue:
- Robot: "Almost lost it... but I got it!"

Background Sound: Rain pattering on window, ticking clock, soft mechanical hum, faint bulb sizzle.
```

### Example 2: 1970s Rooftop Romance (Cinematic)
```
1970s romantic drama, 35mm film with natural flares, soft focus, warm halation. Slight gate weave and handheld micro-shake evoke vintage intimacy. Golden hour on a brick tenement rooftop. Laundry lines with white sheets sway in wind. Mismatched fairy bulbs hum overhead. A young woman in a flowing red silk dress dances barefoot, curls glowing in backlight. Her partner: sleeves rolled, suspenders loose, clapping with a wide smile.

Cinematography:
Camera shot: Medium-wide, slow dolly-in from eye level.
Lens: 40mm spherical, shallow focus isolates couple from skyline.
Lighting: Golden natural key with tungsten bounce, edge from fairy bulbs.
Mood: Nostalgic, tender, cinematic.

Actions:
- She spins; dress flares, catching sunlight.
- He steps in, catches her hand, dips her into shadow.
- Sheets drift across frame, briefly veil the skyline, then part again.

Dialogue:
- Woman (laughing): "See? Even the city dances with us tonight."
- Man (smiling): "Only because you lead."

Background Sound: Wind, fabric flutter, muffled street noise below, distant record player music.
```

### Example 3: Product Commercial (Clean / Modern)
```
Modern commercial aesthetic, clean and bright. A calm sunrise over a small coastal town, warm golden light washing over terracotta roofs. A freshly brewed espresso sits on a wrought-iron balcony table, steam curling upward.

Cinematography:
Camera shot: Close-up on espresso cup, gentle camera pan right revealing the harbor view.
Lighting: Warm golden hour, soft and directional.
Mood: Peaceful, premium, aspirational.

Actions:
- Steam rises from the cup in a slow curl.
- Condensation bead traces down the ceramic surface.
- Light shifts subtly as a cloud passes, then returns.

Background Sound: Distant seagulls, gentle waves, soft clink of the cup on the saucer.
```

### Example 4: Action / Physics Scene
```
Photorealistic sports footage, dynamic and crisp. Indoor gymnasium with overhead fluorescent lighting. A basketball player takes a three-point shot from the corner.

Cinematography:
Camera shot: Medium-wide tracking shot following the ball trajectory.
Lens: Telephoto compression, shallow DOF on the ball.
Mood: Tense, anticipatory.

Actions:
- Player releases the ball with a smooth follow-through.
- Ball arcs through the air, spinning with backspin visible.
- Ball strikes the front of the rim, bounces up, hits the backboard, rolls around the rim.
- Ball drops through the net. Net snaps.

Background Sound: Sneaker squeaks on hardwood, ball striking rim with metallic clang, net swish, echo in empty gym.
```

### Example 5: Dialogue Scene (Two Characters)
```
A rainy neon alley in Tokyo at night. Medium close-up on two figures under a shared umbrella. The man wears a dark trench coat; the woman wears a red scarf over a black jacket. Puddles reflect neon kanji signs. Light rain.

Cinematography:
Camera shot: Medium two-shot, static on tripod.
Lens: 50mm, shallow DOF, neon bokeh in background.
Lighting: Cool blue ambient with warm neon accents, side-lit from a ramen shop sign.
Mood: Moody, intimate, noir-inflected.

Dialogue:
- Woman (quietly, resolute): "This is where it ends."
- Man (pause, looking away): "I know."

Background Sound: Rain on umbrella fabric, distant traffic hum, sizzle from the ramen shop, faint city drone.
```

### Example 6: Stylized / Anime
```
In the style of Japanese anime, a melancholy scene under festival fireworks at night. A small town with paper lanterns strung between wooden buildings. Two teenagers sit on a stone bridge over a slow river, not looking at each other. Film-caliber sakuga animation, rich hand-drawn textures.

Cinematography:
Camera shot: Wide establishing shot, slow gentle push-in toward the bridge.
Mood: Bittersweet, nostalgic.

Actions:
- Fireworks bloom overhead, colors reflecting in the river surface.
- The girl turns her head slightly toward the boy, then looks back up.
- A paper lantern drifts downstream beneath the bridge.

Background Sound: Distant fireworks booms and crackles, festival crowd murmur, gentle water flow, cicadas.
```

## Common Mistakes to Avoid

1. **Vague style descriptions** -- "Cinematic" or "beautiful" tells the model nothing. Specify the actual look: "Anamorphic 2.0x lens, shallow DOF, warm tungsten key light, desaturated teal shadows, slight film grain." The style cue is the most powerful control you have.

2. **Multiple simultaneous actions per shot** -- Assigning three different things happening at once confuses the model. Give each shot one primary subject action and one primary camera move. Break complex sequences into multiple shorter clips.

3. **Long or overlapping dialogue** -- Keep dialogue to a handful of natural words per exchange. For 4-second clips, one short line. For 8-second clips, a brief exchange. Long sentences break lip sync timing and produce garbled speech.

4. **Omitting audio direction** -- Sora 2 generates audio by default. If you leave out sound descriptions, the model invents ambient audio that may not match your vision. Always specify what you want to hear, even if it is "near silence with a single ticking clock."

5. **Contradicting physics without explanation** -- Sora 2 has strong physics grounding. If you describe water flowing upward or objects floating without cause, the model may produce confused results. When you want non-physical behavior, frame it with context: "in zero gravity" or "in a surreal dreamscape where objects float."

6. **Mixing conflicting lighting cues** -- "Bright sunny day with moody noir shadows" sends contradictory signals. Choose one lighting setup per shot and describe it precisely: source angle, quality (hard/soft), fill, color temperature.

7. **Compound camera movements** -- "Dolly in while panning left and craning up" rarely works. Pick one camera move per shot: "Slow dolly in" or "Pan left." Compound moves produce unpredictable or jittery results.

8. **Not specifying material properties for physics** -- "A ball bounces" is weak. "A rubber basketball bounces off polished hardwood, the impact deforming the ball slightly before it springs back" encodes the physics the model needs for realistic motion.

9. **Changing too many variables when iterating** -- When a generation is close but not right, adjust one element at a time (camera, palette, action timing). Changing everything at once is gambling, not iterating.

10. **Ignoring the power of shorter clips** -- Generating a 12-second clip with complex choreography often underperforms. Two well-crafted 4-second clips stitched together produce more reliable, higher-quality results.

## Higgsfield Notes

| Setting | Recommendation |
|---------|---------------|
| Aspect Ratio | 16:9 for cinematic/YouTube, 9:16 for vertical/social |
| Duration | 4-8s recommended; 12s for simple scenes only |
| Enhance | OFF (Sora 2 handles detail well natively) |
| Camera Presets | Match to your prompt's single camera direction |
| Credits | ~8-10 per clip (Sora 2 MAX may cost more) |
| Variants | Sora 2 (fast/flexible) and Sora 2 MAX (deeper realism, complex scenes) |

**Sora 2 vs Sora 2 MAX on Higgsfield:**
- **Sora 2** — Best for exploration, rapid iteration, testing tone and structure. Faster generation.
- **Sora 2 MAX** — Tuned for deeper realism and narrative understanding. Better for final renders, complex action, cinematic scenes. Reads prompts as full visual ideas rather than isolated frames.

**Best camera presets for Sora 2:**
- Dialogue scenes: Static, Dolly In (subtle), Head Tracking
- Atmospheric/mood: Crane Up, Dolly Out, Pan Left/Right
- Product: Orbit, Lazy Susan, Super Dolly In
- Action/physics: Tracking, Crash Zoom In, Whip Pan
- Establishing: Aerial Pullback, Crane Up, Overhead
- Intimate/emotional: Dolly In, Arc Left/Right, Focus Change, Eyes In
- Documentary/realism: Handheld, Pan Left/Right, Dolly In
