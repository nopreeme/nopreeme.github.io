# GEMINI.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Nature

This is a **PRP (Product Requirement Prompt) Framework** repository, not a traditional software project. The core concept: **"PRP = PRD + curated codebase intelligence + agent/runbook"** - designed to enable AI agents to ship production-ready code on the first pass.

## Core Architecture

### Template-Based Methodology

- **PRP Templates** in `PRPs/templates/` follow structured format with validation loops
- **Context-Rich Approach**: Every PRP must include comprehensive documentation, examples, and gotchas
- **Validation-First Design**: Each PRP contains executable validation gates (syntax, tests, integration)

### AI Documentation Curation

- `PRPs/ai_docs/` 

### PRP Execution

```bash
# Interactive mode (recommended for development)
uv run PRPs/scripts/prp_runner.py --prp [prp-name] --interactive

# Headless mode (for CI/CD)
uv run PRPs/scripts/prp_runner.py --prp [prp-name] --output-format json

# Streaming JSON (for real-time monitoring)
uv run PRPs/scripts/prp_runner.py --prp [prp-name] --output-format stream-json
```

## Critical Success Patterns

### The PRP Methodology

1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the codebase
4. **Progressive Success**: Start simple, validate, then enhance

### PRP Structure Requirements

- **Goal**: Specific end state and desires
- **Why**: Business value and user impact
- **What**: User-visible behavior and technical requirements
- **All Needed Context**: Documentation URLs, code examples, gotchas, patterns
- **Implementation Blueprint**: Pseudocode with critical details and task lists
- **Validation Loop**: Executable commands for syntax, tests, integration

### Validation Gates (Must be Executable)

```bash
# Level 1: Syntax & Style
ruff check --fix && mypy .

# Level 2: Unit Tests
uv run pytest tests/ -v

# Level 3: Integration
uv run uvicorn main:app --reload
curl -X POST http://localhost:8000/endpoint -H "Content-Type: application/json" -d '{...}'

# Level 4: Deployment
# mcp servers, or other creative ways to self validate
```

## Anti-Patterns to Avoid

- L Don't create minimal context prompts - context is everything - the PRP must be comprehensive and self-contained, reference relevant documentation and examples.
- L Don't skip validation steps - they're critical for one-pass success - The better The AI is at running the validation loop, the more likely it is to succeed.
- L Don't ignore the structured PRP format - it's battle-tested
- L Don't create new patterns when existing templates work
- L Don't hardcode values that should be config
- L Don't catch all exceptions - be specific

## Working with This Framework

### When Creating new PRPs

1. **Context Process**: New PRPs must consist of context sections, Context is King!
2.

### When Executing PRPs

1. **Load PRP**: Read and understand all context and requirements
2. **ULTRATHINK**: Create comprehensive plan, break down into todos, use subagents, batch tool etc check prps/ai_docs/
3. **Execute**: Implement following the blueprint
4. **Validate**: Run each validation command, fix failures
5. **Complete**: Ensure all checklist items done

## Project Structure Understanding

.
├── astro.config.mjs
├── dist
│   ├── _astro
│   │   ├── about.HaSPfzOM.css
│   │   └── contact.DCR8qOuM.css
│   ├── about
│   │   └── index.html
│   ├── contact
│   │   └── index.html
│   ├── favicon.svg
│   ├── index.html
│   ├── interns
│   │   └── index.html
│   ├── placeholder.svg
│   └── projects
│       ├── ai-intern-challenge
│       │   └── index.html
│       └── index.html
├── eslint.config.js
├── GEMINI-NEXTJS-15.md
├── GEMINI-NODE.md
├── GEMINI-PYTHON-BASIC.md
├── GEMINI-REACT.md
├── GEMINI.md
├── node_modules
│   ├── @astrojs
│   │   ├── check -> ../.pnpm/@astrojs+check@0.9.4_prettier-plugin-astro@0.14.1_prettier@3.6.2_typescript@5.8.3/node_modules/@astrojs/check
│   │   └── tailwind -> ../.pnpm/@astrojs+tailwind@6.0.2_astro@5.11.0_@types+node@24.0.13_jiti@1.21.7_rollup@4.44.2_type_8ba8956f81ae5a6243dafde423e8698c/node_modules/@astrojs/tailwind
│   ├── @eslint
│   │   └── js -> ../.pnpm/@eslint+js@9.30.1/node_modules/@eslint/js
│   ├── @iconify-json
│   │   ├── lucide -> ../.pnpm/@iconify-json+lucide@1.2.57/node_modules/@iconify-json/lucide
│   │   └── mdi -> ../.pnpm/@iconify-json+mdi@1.2.3/node_modules/@iconify-json/mdi
│   ├── @typescript-eslint
│   │   ├── eslint-plugin -> ../.pnpm/@typescript-eslint+eslint-plugin@8.36.0_@typescript-eslint+parser@8.36.0_eslint@9.30.1__dc2f88a882bdde48c0d05e7713d43690/node_modules/@typescript-eslint/eslint-plugin
│   │   └── parser -> ../.pnpm/@typescript-eslint+parser@8.36.0_eslint@9.30.1_jiti@1.21.7__typescript@5.8.3/node_modules/@typescript-eslint/parser
│   ├── astro -> .pnpm/astro@5.11.0_@types+node@24.0.13_jiti@1.21.7_rollup@4.44.2_typescript@5.8.3_yaml@2.8.0/node_modules/astro
│   ├── astro-icon -> .pnpm/astro-icon@1.1.5/node_modules/astro-icon
│   ├── eslint -> .pnpm/eslint@9.30.1_jiti@1.21.7/node_modules/eslint
│   ├── eslint-plugin-astro -> .pnpm/eslint-plugin-astro@1.3.1_eslint@9.30.1_jiti@1.21.7_/node_modules/eslint-plugin-astro
│   ├── prettier -> .pnpm/prettier@3.6.2/node_modules/prettier
│   ├── prettier-plugin-astro -> .pnpm/prettier-plugin-astro@0.14.1/node_modules/prettier-plugin-astro
│   ├── typescript -> .pnpm/typescript@5.8.3/node_modules/typescript
│   ├── vitest -> .pnpm/vitest@3.2.4_@types+debug@4.1.12_@types+node@24.0.13_jiti@1.21.7_yaml@2.8.0/node_modules/vitest
│   └── zod -> .pnpm/zod@4.0.3/node_modules/zod
├── package.json
├── pnpm-lock.yaml
├── PRPs
│   ├── ai_docs
│   │   ├── astro-5-patterns.md
│   │   ├── glass-morphism-guide.md
│   │   ├── llm.md
│   │   ├── mcp_patterns.md
│   │   └── register-components.md
│   ├── branding
│   │   └── branding.md
│   ├── GEMINI.md
│   ├── iHubPlan.md
│   ├── README.md
│   └── templates
│       ├── prp-base-typescript.md
│       ├── TS-prp-create.md
│       └── TS-prp-execute.md
├── public
│   ├── favicon.svg
│   └── placeholder.svg
├── README.md
├── src
│   ├── components
│   │   ├── atoms
│   │   │   └── Button.astro
│   │   ├── sections
│   │   │   ├── About.astro
│   │   │   ├── CastYourVote.astro
│   │   │   ├── Contact.astro
│   │   │   ├── FeaturedProjects.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Header.astro
│   │   │   ├── Hero.astro
│   │   │   ├── InternShowcase.astro
│   │   │   └── Projects.astro
│   │   └── showcase
│   │       ├── ColorShowcase.astro
│   │       ├── ComponentExample.astro
│   │       ├── ComponentSection.astro
│   │       ├── IconShowcase.astro
│   │       ├── ThemeToggle.astro
│   │       └── TypographyShowcase.astro
│   ├── content
│   │   ├── interns
│   │   │   ├── intern-1.md
│   │   │   └── intern-2.md
│   │   └── projects
│   │       ├── ai-intern-challenge.md
│   │       └── project-2.md
│   ├── data
│   │   ├── colors.ts
│   │   ├── components
│   │   │   └── button.ts
│   │   ├── showcase.ts
│   │   └── types.ts
│   ├── layouts
│   │   └── Layout.astro
│   ├── lib
│   │   ├── accessibility.ts
│   │   ├── schemas.ts
│   │   └── theme.ts
│   ├── pages
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── index.astro
│   │   ├── interns.astro
│   │   └── projects
│   │       ├── ai-intern-challenge.astro
│   │       └── index.astro
│   └── styles
│       ├── global.css
│       └── tokens.css
└── tsconfig.json





```

Remember: This framework is about **one-pass implementation success through comprehensive context and validation**. Every PRP should contain the exact context for an AI agent to successfully implement working code in a single pass.
