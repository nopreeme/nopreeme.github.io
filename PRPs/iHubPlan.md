name: "iHub Showcase Website - Development Plan"
description: |
  This PRP outlines the plan for developing the iHub Showcase Website, an Astro-based project designed to highlight iHub's AI solutions and intern-driven approach. The website will feature a modern design with advanced glass morphism effects, a component-based architecture, and a focus on performance and accessibility.

## Purpose

This PRP provides a comprehensive plan for AI agents to implement the iHub Showcase Website. It includes all necessary context, implementation details, and validation gates to ensure a successful one-pass implementation.

## Core Principles

1.  **Context is King**: All necessary documentation, examples, and caveats are included.
2.  **Validation Loops**: Executable tests and linting commands are provided for self-validation.
3.  **Information Dense**: Keywords and patterns from the codebase are used.
4.  **Progressive Success**: The plan starts simple and progressively enhances the website.

---

## Goal

To build a 6-page showcase website for iHub that is mobile-responsive, has consistent branding, and is accessible (WCAG 2.1 AA). The website will feature a modern design with advanced glass morphism effects, a component-based architecture, and a focus on performance and accessibility.

## Why

-   To establish iHub as a leader in AI innovation.
-   To effectively communicate iHub's value proposition.
-   To attract potential clients, partners, and interns.

## What

A 6-page website with the following pages:

1.  **/Home**: A single page with Navigation, Hero, About, Featured Projects, Contact, and Footer components.
2.  **/About**: A single page with Navigation, About, and Footer components.
3.  **/Projects**: A single page showcasing iHub's AI projects with detailed case studies, including Navigation, Hero, Projects, and Footer components.
4.  **/Projects/AiInternChallenge**: A single page for showcasing the "AI Intern Challenge" with a video player, QR code, "Vote Now" button, and "View Results" button.
5.  **/Interns**: A single page for showcasing current and past interns with Navigation, Intern Showcase, and Footer components.
6.  **/Contact**: A single page with a contact form and other contact information, including Navigation, Contact, and Footer components.

### Success Criteria

-   [ ] All 6 pages are created with the specified components.
-   [ ] The website is mobile-responsive and accessible.
-   [ ] Adherence to existing codebase conventions (TypeScript, Astro component structure, styling via `tokens.css` and `global.css`).
-   [ ] WCAG 2.1 AA compliance for all new components.
-   [ ] Performance targets (Lighthouse 95+, FCP < 1.2s, LCP < 2.5s, FID < 100ms, CLS < 0.1, Bundle Size < 100KB) are met.
-   [ ] All validation gates (type-check, lint, format, build, tests) pass.

## All Needed Context

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- url: https://docs.astro.build/en/getting-started/
  why: Official Astro documentation for core concepts.
- url: https://docs.astro.build/en/guides/components/
  why: Understanding Astro components is crucial for this project.
- url: https://docs.astro.build/en/guides/styling/
  why: To understand how to work with the existing styling setup.
- file: /Users/kharipowell/Developer/iHubSiteAstro copy/src/styles/global.css
  why: Contains the existing design system and glass morphism implementation.
- file: /Users/kharipowell/Developer/iHubSiteAstro copy/src/components/atoms/Button.astro
  why: An example of a well-structured component with props and validation.
- file: /Users/kharipowell/Developer/iHubSiteAstro copy/PRPs/ai_docs/register-components.md
  why: An Astro component registration guideline
- file: /Users/kharipowell/Developer/iHubSiteAstro copy/PRPs/ai_docs/glass-morphism-guide.md
  why: An Astro 5 glass morphism guide
- file: /Users/kharipowell/Developer/iHubSiteAstro copy/PRPs/ai_docs/astro-5-patterns.md
  why: Critical Patterns for Component Library Development
- file: src/components/atoms/Button.astro
  why: Primary example for Astro component structure, props handling, styling, and effects.

- file: src/data/components/button.ts
  why: Defines the structure for component showcase data (ComponentShowcase, ComponentGroup, ComponentExample). New components must follow this pattern.

- file: src/data/types.ts
  why: Defines core types for component props (e.g., ButtonProps) and showcase data schemas (Zod). New component props and showcase data must be typed here.

- file: src/data/showcase.ts
  why: Central registry for all component showcase data. New component showcase data must be imported and added to `sections.components` array.

- file: src/styles/tokens.css
  why: Defines design tokens (colors, typography scale, spacing, shadows, glass morphism, gradients). All styling must use these variables.

- file: src/styles/global.css
  why: Contains global styles, typography definitions, and utility classes. New components should leverage these.

- file: src/lib/schemas.ts
  why: Contains Zod schemas for runtime validation of component props (e.g., validateButtonProps). New components should have similar validation.

- file: astro.config.mjs
  why: Astro project configuration.

- file: package.json
  why: Defines project scripts for linting, formatting, type-checking, building, and testing.
```

### Current Codebase tree

```bash
/Users/kharipowell/Developer/iHubSiteAstro copy/
├───.DS_Store
├───astro.config.mjs
├───eslint.config.js
├───GEMINI-NEXTJS-15.md
├───GEMINI-NODE.md
├───GEMINI-PYTHON-BASIC.md
├───GEMINI-REACT.md
├───GEMINI.md
├───package.json
├───pnpm-lock.yaml
├───README.md
├───PRPs/
│   ├───.DS_Store
│   ├───GEMINI.md
│   ├───iHubPlan.md
│   ├───README.md
│   ├───ai_docs/
│   │   ├───astro-5-patterns.md
│   │   ├───glass-morphism-guide.md
│   │   └───register-components.md
│   ├───branding/
│   │   └───branding.md
│   └───templates/
│       ├───prp-base-typescript.md
│       ├───TS-prp-create.md
│       └───TS-prp-execute.md
├───public/
│   └───favicon.svg
└───src/
    ├───.DS_Store
    ├───components/
    │   ├───.DS_Store
    │   ├───atoms/
    │   │   └───Button.astro
    │   └───showcase/
    │       ├───ColorShowcase.astro
    │       ├───ComponentExample.astro
    │       ├───ComponentSection.astro
    │       ├───IconShowcase.astro
    │       ├───ThemeToggle.astro
    │       └───TypographyShowcase.astro
    ├───data/
    │   ├───.DS_Store
    │   ├───colors.ts
    │   ├───showcase.ts
    │   ├───types.ts
    │   └───components/
    │       └───button.ts
    ├───layouts/
    │   └───Layout.astro
    ├───lib/
    │   ├───accessibility.ts
    │   ├───schemas.ts
    │   └───theme.ts
    ├───pages/
    │   └───index.astro
    └───styles/
        ├───global.css
        └───tokens.css
```

### Desired Codebase tree with files to be added and responsibility of file

```bash
/Users/kharipowell/Developer/iHubSiteAstro copy/
└───src/
    ├───components/
    │   ├───sections/
    │   │   ├───Header.astro
    │   │   ├───Hero.astro
    │   │   ├───About.astro
    │   │   ├───FeaturedProjects.astro
    │   │   ├───Contact.astro
    │   │   ├───Footer.astro
    │   │   ├───InternShowcase.astro
    │   │   └───Projects.astro
    ├───pages/
    │   ├───about.astro
    │   ├───contact.astro
    │   ├───interns.astro
    │   └───projects/
    │       ├───index.astro
    │       └───ai-intern-challenge.astro
    └───content/
        ├───projects/
        │   ├───project-1.md
        │   └───project-2.md
        └───interns/
            ├───intern-1.md
            └───intern-2.md
```

### Known Gotchas of our codebase & Library Quirks

```typescript
// CRITICAL: Astro components are server-rendered by default.
// CRITICAL: Use `client:load` for interactive components.
// CRITICAL: All styling is done through CSS custom properties in `src/styles/tokens.css`.
// CRITICAL: All components must have their props validated with Zod schemas.
```

## Implementation Blueprint

### Data models and structure

  All new component props will be defined as TypeScript interfaces in `src/data/types.ts`, similar to `ButtonProps`.
Zod schemas for runtime validation of these props will be added to `src/lib/schemas.ts`, mirroring `validateButtonProps`.
Showcase data for each new component will be defined in a new `.ts` file within `src/data/components/` (e.g., `navigation.ts`), following the `ComponentShowcase` type from `src/data/types.ts`.


```typescript
// src/lib/schemas.ts

import { z } from 'zod';

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  url: z.string(),
});

export const InternSchema = z.object({
  name: z.string(),
  title: z.string(),
  image: z.string(),
  url: z.string(),
});
```

### List of tasks to be completed to fulfill the PRP in the order they should be completed

```yaml
Task 1:
CREATE src/components/sections/Header.astro:
  - CREATE a reusable header component with navigation links.
  - USE the existing design system for styling.

Task 2:
CREATE src/components/sections/Footer.astro:
  - CREATE a reusable footer component with social media links.
  - USE the existing design system for styling.

Task 3:
CREATE src/components/sections/Hero.astro:
  - CREATE a hero section for the homepage.
  - USE the existing design system for styling.

Task 4:
CREATE src/components/sections/About.astro:
  - CREATE an about section for the homepage and about page.
  - USE the existing design system for styling.

Task 5:
CREATE src/components/sections/FeaturedProjects.astro:
  - CREATE a featured projects section for the homepage.
  - USE the existing design system for styling.

Task 6:
CREATE src/components/sections/Contact.astro:
  - CREATE a contact section for the homepage and contact page.
  - USE the existing design system for styling.

Task 7:
CREATE src/pages/index.astro:
  - MODIFY the existing index page to use the new components.

Task 8:
CREATE src/pages/about.astro:
  - CREATE the about page with the Header, About, and Footer components.

Task 9:
CREATE src/pages/contact.astro:
  - CREATE the contact page with the Header, Contact, and Footer components.

Task 10:
CREATE src/components/sections/Projects.astro:
  - CREATE a projects section for the projects page.
  - USE the existing design system for styling.

Task 11:
CREATE src/pages/projects/index.astro:
  - CREATE the projects page with the Header, Projects, and Footer components.

Task 12:
CREATE src/pages/projects/ai-intern-challenge.astro:
  - CREATE the AI Intern Challenge page with a video player, QR code, and buttons.

Task 13:
CREATE src/components/sections/InternShowcase.astro:
  - CREATE an intern showcase section for the interns page.
  - USE the existing design system for styling.

Task 14:
CREATE src/pages/interns.astro:
  - CREATE the interns page with the Header, InternShowcase, and Footer components.
```

## Validation Loop

### Level 1: Syntax & Style

```bash
# Run these FIRST - fix any errors before proceeding
pnpm run lint
pnpm run format
pnpm run check

# Expected: No errors. If errors, READ the error and fix.
```

### Level 2: Unit Tests

```bash
# Run and iterate until passing:
pnpm test

# If failing: Read error, understand root cause, fix code, re-run
```

### Level 3: Integration Test

```bash
# Start the dev server
pnpm dev

# Test the pages load
curl http://localhost:4321/
curl http://localhost:4321/about
curl http://localhost:4321/contact
curl http://localhost:4321/projects
curl http://localhost:4321/projects/ai-intern-challenge
curl http://localhost:4321/interns

# Expected: HTML response for each page
```

### Level 4: Deployment & Creative Validation

```bash
# Production build check
pnpm build

# Expected: Successful build with no errors
```

## Final validation Checklist

-   [ ] All tests pass: `pnpm test`
-   [ ] No linting errors: `pnpm run lint`
-   [ ] No type errors: `pnpm run check`
-   [ ] Manual test successful: All pages load correctly in the browser.
-   [ ] Error cases handled gracefully
-   [ ] Logs are informative but not verbose
-   [ ] Documentation updated if needed

---

## Anti-Patterns to Avoid

-   ❌ Don't create new patterns when existing ones work
-   ❌ Don't skip validation because "it should work"
-   ❌ Don't ignore failing tests - fix them
-   ❌ Don't use 'client:load' unnecessarily - embrace Server Components
-   ❌ Don't hardcode values that should be config
-   ❌ Don't catch all exceptions - be specific