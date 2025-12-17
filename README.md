# AI Media Prompt Generator

A Claude Code assistant that generates high-quality, model-specific prompts for AI image and video generation.

## Features

- **Guided conversation** - Asks 3-5 targeted questions before generating
- **3 variations** - Conservative, Moderate, and Creative interpretations
- **Model-specific syntax** - Proper formatting for each AI model
- **Easy to extend** - Add new models by creating one file

## Supported Models

| Model | Type | File |
|-------|------|------|
| Midjourney v7 | Image | `models/midjourney.md` |
| VEO3 | Video | `models/veo3.md` |
| GPT-Image 1.5 | Image | `models/gpt-image.md` |

## Usage

Start a conversation with Claude Code in this project directory and ask for prompts:

```
"Create an image prompt for Midjourney"
"Generate a video prompt for VEO3"
"I need a GPT-Image prompt for a product shot"
"Help me write a cinematic video prompt"
```

The assistant will:
1. Ask clarifying questions about your vision
2. Generate 3 variations with different creative approaches
3. Provide easy-copy versions and explanations

## Adding New Models

To add support for a new AI model:

1. Create a new file: `.claude/skills/models/[model-name].md`
2. Follow this template:

```markdown
# [Model Name] Prompt Guide

## Syntax Format
[How prompts should be structured]

## Key Parameters
[Model-specific settings]

## Best Practices
[What works, what to avoid]

## Example Prompts
[3-5 real examples]
```

3. The assistant will automatically discover and use the new model

## Project Structure

```
.claude/
├── CLAUDE.md                    # Project context
├── skills/
│   ├── prompt-generator/
│   │   └── SKILL.md             # Main conversation flow
│   └── models/
│       ├── midjourney.md        # Midjourney v7 guide
│       ├── veo3.md              # VEO3 guide
│       └── gpt-image.md         # GPT-Image guide
└── settings.local.json
```

## Sources

- [Midjourney Parameter List](https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List)
- [VEO3 Prompting Guide](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1)
- [Midjourney V7 Tutorial](https://www.datacamp.com/tutorial/midjourney-v7)
- [VEO3 Best Practices](https://superprompt.com/blog/veo3-prompting-best-practices)

## License

Personal use.
