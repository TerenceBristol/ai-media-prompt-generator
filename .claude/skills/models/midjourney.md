# Midjourney v7 Prompt Guide

## Syntax Format

```
[descriptive prompt] --param1 value --param2 value
```

**Rules:**
- Parameters go at the END of the prompt
- Add a space before each `--`
- No commas or periods in parameters
- Version 7 is default, use `--v 7` explicitly if needed

## Key Parameters

| Parameter | Range | Description |
|-----------|-------|-------------|
| `--ar` | ratio | Aspect ratio (e.g., 16:9, 1:1, 9:16, 3:2) |
| `--s` | 0-1000 | Stylize - higher = more artistic, lower = literal |
| `--chaos` | 0-100 | Variation between the 4 images generated |
| `--v` | 5.2-7 | Model version |
| `--exp` | 0-100 | Experimental aesthetics (new in v7) |
| `--no` | text | Negative prompt - elements to exclude |
| `--q` | 0.5-2 | Quality - affects detail and credits |
| `--seed` | number | Reproducibility (0-4294967295) |
| `--stop` | 10-100 | Stop early for sketch-like results |

## The 80/20 Rule

**Master these 3 parameters first** (covers 80% of use cases):
1. `--ar` - Get the right shape
2. `--s` - Control artistic interpretation
3. `--chaos` - Control variation

## Stylize Guidelines

| Value | Effect |
|-------|--------|
| 0-100 | Very literal, close to prompt |
| 100-300 | Balanced (recommended starting point) |
| 300-600 | More artistic freedom |
| 600-1000 | Highly stylized, abstract |

## Special Modes

**Draft Mode**: `--draft`
- 10x faster generation
- Lower resolution
- Great for rapid iteration

**Raw Mode**: `--style raw`
- More photorealistic
- Less Midjourney "house style"
- Better for cinematic/documentary looks

## V7 New Features

- **Omni Reference** (`--oref`): Precise reference image control
- **Experimental Aesthetics** (`--exp`): Boosts detail and creativity
- **Better text rendering**: More legible text in images
- **Improved hands/bodies**: More anatomically correct

## Prompt Structure Tips

**Good structure:**
```
[subject], [action/pose], [environment], [lighting], [style], [mood] --ar 16:9 --s 250
```

**Effective modifiers:**
- Lighting: golden hour, backlit, rim lighting, soft diffused
- Style: cinematic, editorial, documentary, fine art
- Camera: 85mm portrait, wide angle, macro, aerial view
- Quality: highly detailed, 8k, photorealistic, masterpiece

## Example Prompts

### Example 1: Cinematic Portrait
```
A weathered fisherman mending nets at dawn, golden hour lighting streaming through morning mist, documentary photography style, shallow depth of field, Kodak Portra 400 film grain --ar 3:2 --s 200 --v 7
```

### Example 2: Fantasy Scene
```
Ancient library floating among clouds, endless bookshelves spiraling into infinity, shafts of ethereal light, magical particles in the air, studio ghibli inspired, dreamy atmosphere --ar 16:9 --s 450 --chaos 30 --v 7
```

### Example 3: Product Shot
```
Luxury perfume bottle on black marble surface, dramatic side lighting, water droplets and rose petals, high-end cosmetics photography, clean minimalist composition --ar 1:1 --s 100 --style raw --v 7
```

## Common Mistakes to Avoid

- Don't overload with conflicting style details
- Don't use punctuation in parameters
- Don't forget the space before `--`
- Don't set both `--s` and `--chaos` too high (unpredictable)

## Negative Prompts (`--no`)

Common exclusions:
```
--no text, watermark, signature, blurry, distorted, ugly, deformed hands
```
