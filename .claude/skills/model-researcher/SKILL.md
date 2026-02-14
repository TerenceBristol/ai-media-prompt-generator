---
name: model-researcher
description: Research and create a new AI model guide. Use when adding support for a new image or video generation model. Researches official docs and community practices, then creates a standardized model guide file.
---

# Model Researcher

## When to Use This Skill
Activate when:
- User says `/model-researcher [model name]`
- User asks to "add a new model" or "create a guide for [model]"
- User wants to add support for a model not yet in the models directory

## Research Workflow

### Step 1: Gather Information

Research the target model using web search. Gather:

1. **Official documentation**: Model's official prompting guide, API docs, parameter reference
2. **Community guides**: Reddit, Discord, YouTube tutorials for prompting best practices
3. **Example prompts**: Community-shared prompts with verified good results
4. **Technical specs**: Resolution, duration (video), aspect ratios, frame rates
5. **Key parameters**: All configurable settings and their ranges
6. **Limitations**: Known issues, failure modes, content restrictions

Search queries to try:
- `"[model name]" prompting guide 2025 2026`
- `"[model name]" best practices prompt tips`
- `"[model name]" parameters settings reference`
- `"[model name]" examples community`

### Step 2: Classify the Model

Determine:
- **Type**: Image or Video
- **Supported modes**: T2I, I2I, T2V, I2V, Storyboard
- **Syntax style**: Natural language, parameters, structured, or mixed
- **Negative prompt support**: Yes, No, In-prompt only, or Ignored
- **Higgsfield availability**: Check if model is available on Higgsfield
- **Approximate credit cost**: Estimate based on Higgsfield pricing

### Step 3: Create the Guide File

1. Read the template from `.claude/skills/models/_template.md`
2. Create a new file at `.claude/skills/models/[model-name].md`
3. Fill in ALL sections from the template:
   - Model Info table (complete every field)
   - Overview (2-3 sentences)
   - Syntax Format with rules
   - Prompt Structure with components
   - Key Parameters table
   - Mode-specific sections (only applicable modes)
   - Best Practices (5+ items)
   - Example Prompts (4+ examples covering different use cases)
   - Common Mistakes (5+ items)
   - Higgsfield Notes

### Step 4: Update CLAUDE.md

Open `.claude/CLAUDE.md` and:
1. Add the new model to the Supported Models table
2. Add the model to the relevant mode-to-model mapping rows
3. Add the model file path to the Model Files Location section

### Step 5: Present Summary

Show the user:
- Model name and type
- Key capabilities discovered
- Modes supported
- Number of example prompts created
- Any notable limitations or quirks found
- File path of the created guide

Ask: "Would you like me to adjust anything in the guide, or add more example prompts?"

## Quality Checklist

Before finishing, verify:
- [ ] Model Info table is complete (all fields filled)
- [ ] Overview accurately describes the model's strengths
- [ ] Syntax format matches the model's actual requirements
- [ ] All applicable modes have dedicated sections
- [ ] At least 4 diverse example prompts included
- [ ] Common mistakes are model-specific (not generic)
- [ ] Higgsfield notes include credit cost estimate
- [ ] CLAUDE.md has been updated with the new model
- [ ] File follows the `_template.md` structure exactly
