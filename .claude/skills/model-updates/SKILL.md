---
name: model-updates
description: Monthly audit of Higgsfield models against our guide library. Researches new/updated models, walks through each with recommendations, and auto-chains to model-researcher for approved additions.
---

# Model Updates Audit

## When to Use This Skill
Activate when the user:
- Says `/model-updates` or asks to "check for new models"
- Asks "what's new on Higgsfield?" or "any model updates?"
- Requests an "audit" or "sync" of model guides
- Wants to know if any models need updating or adding
- Mentions it's time for a monthly model review

## Audit Workflow

### Step 1: Load Current State

1. **List existing model guides** by reading filenames from `.claude/skills/models/` (exclude `_template.md`)
2. **Read skip list** from `.claude/skills/model-updates/skipped.json`
3. **Read current CLAUDE.md** tables for the Supported Models list

Build an internal inventory of:
- Every model we currently have a guide for (name, version, type)
- Every model on the skip list (name, reason, date skipped)

Present a brief status:
> **Current inventory:** X model guides, Y skipped models
> Starting Higgsfield audit...

### Step 2: Research Higgsfield Platform

Spawn **2 research-agent sub-agents in parallel** to keep raw results out of main context:

**Agent A — Platform Scan:**
```
Research what AI models are currently available on Higgsfield (higgsfield.ai).
Scan these pages:
- higgsfield.ai homepage (look for model selector, model names)
- higgsfield.ai/blog/Fresh-Releases (latest model additions)
- higgsfield.ai/blog (recent announcements)

For each model found, capture:
- Model name and version
- Type (image or video)
- Key capability / what it's known for
- Whether it appears to be a major model or a variant

Return a comprehensive list of ALL models currently on Higgsfield.
```

**Agent B — Market Context:**
```
Search for new AI image and video generation models in [current year].
Queries:
- "Higgsfield new models [current year]"
- "Higgsfield AI models [current year]"
- "best AI image generation models [current year]"
- "best AI video generation models [current year]"

For each model found on Higgsfield, capture:
- Quality ranking / community reception
- Key strengths and differentiators
- Approximate release date
- Credit cost on Higgsfield (if available)

Return findings organized by image models and video models.
```

### Step 3: Compare & Classify

Cross-reference research results against our current inventory. For each model found on Higgsfield, classify as:

| Classification | Criteria | Action |
|---------------|----------|--------|
| **NEW** | No guide exists for this model | Present in walk-through |
| **UPDATE** | Guide exists but a newer version is available | Present in walk-through |
| **VARIANT** | Related to an existing model (e.g., Turbo variant) | Present in walk-through |
| **KNOWN** | Current guide already covers this model/version | Skip (already covered) |
| **SKIPPED** | In `skipped.json` | Show in summary, skip walk-through |

### Step 4: Present Findings

Display **3 tables**:

**Table 1: New & Updated Models (requires decisions)**

| Model | Type | Classification | Key Strength | Priority |
|-------|------|---------------|-------------|----------|
| ... | Image/Video | NEW/UPDATE/VARIANT | ... | High/Medium/Low |

Priority tiers:
- **High**: Top-ranked model, in Higgsfield's featured models, widely praised
- **Medium**: Interesting capabilities, growing community, on Higgsfield
- **Low**: Niche, unproven, or minor variant of existing model

**Table 2: Previously Skipped Models (awareness only)**

| Model | Date Skipped | Reason | Changed? |
|-------|-------------|--------|----------|
| ... | ... | ... | Yes/No/Unknown |

Note any skipped models where the situation may have changed (e.g., model matured, new version released).

**Table 3: Already Covered (confirmation)**

> Models with current guides: [list of model names and versions]

### Step 5: One-by-One Walk-Through

For each model in Table 1, present:

```
**Model [N] of [total]: [Model Name] — [Type]**

- **What it does**: [1-2 sentences]
- **Key strengths**: [2-3 bullet points]
- **On Higgsfield**: [Confirmed/Unconfirmed + details]
- **Differentiator from existing models**: [How it's different from what we have]
- **Credit cost**: [Estimated credits]
- **Catch/caveat**: [Any limitations or concerns]
```

Then use **AskUserQuestion** with **adaptive options** based on classification:

**For NEW models:**
- "Create guide" — Worth having a guide for prompt generation
- "Skip" — Not a priority for my workflow
- "Need more info" — Research further before deciding

**For UPDATE models:**
- "Replace guide" — Replace existing guide with new version
- "Update existing" — Add new version info to current guide
- "Skip" — Current guide is sufficient

**For VARIANT models:**
- "Separate guide" — Different enough for its own guide
- "Add to existing" — Add as a section in the parent model's guide
- "Skip" — Parent model guide is sufficient

### Step 6: Execute Approved Actions

After all decisions are made, compile the action list and present:

> **Approved actions:**
> - Create: [list of new guides]
> - Replace: [list of guides to replace]
> - Update: [list of guides to update]
> - Skip: [list of skipped models]
>
> Starting model-researcher for each approved model...

Then **auto-chain to `/model-researcher`** for each approved model:
- Run in **parallel groups** for efficiency:
  - Group A: Video models (up to 3 parallel)
  - Group B: Image models (up to 4 parallel)
  - Group C: Replacements (up to 2 parallel)
- For replacements, tell model-researcher to overwrite the existing file
- For updates, tell model-researcher to update the existing file

After all model-researcher runs complete:
- **Update CLAUDE.md** with all new/updated models in:
  - Supported Models table
  - Mode-to-Model Mapping table
  - Model Files Location section
- **Update prompt-generator skill** Mode-to-Model Compatibility table if needed

### Step 7: Update Tracking & Report

1. **Update skip list**: Add newly skipped models to `.claude/skills/model-updates/skipped.json` with:
   ```json
   {
     "model-name": {
       "reason": "[user's stated reason or option description]",
       "date": "[YYYY-MM-DD]",
       "revisit": true
     }
   }
   ```

2. **Present summary report:**

```
## Model Updates Audit — [Date]

### Actions Taken
- Created X new model guides: [list]
- Replaced X existing guides: [list]
- Updated X existing guides: [list]
- Skipped X models: [list]

### Current Inventory
- Total model guides: X (was Y)
- Image models: X
- Video models: X
- Skipped models: X

### Files Modified
- [list of all files created/modified]
```

## Re-evaluating Skipped Models

If the user says "re-evaluate [model name]":
1. Remove the model from `skipped.json`
2. Research the model fresh
3. Present it in the walk-through format
4. Process the user's decision normally

## Quality Checklist

Before finishing, verify:
- [ ] All research-agent results were processed (no models missed)
- [ ] Every new/updated model was presented in the walk-through
- [ ] User made a decision on every presented model
- [ ] Model-researcher was run for every approved model
- [ ] CLAUDE.md tables are accurate and complete
- [ ] Skip list is updated with newly declined models
- [ ] Summary report is accurate
- [ ] Prompt-generator skill tables are updated if new modes/models added
