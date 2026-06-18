# Energyvision - GitHub Copilot instructions

This file tells Copilot how to work inside the Energyvision monorepo. Prefer existing patterns and symbols, keep changes minimal, and reference real files in this repo.

## How to act in this monorepo (quick)

- Edit only what’s asked. Don’t invent files/APIs or refactors.
- One file at a time. Provide a single coherent diff per file.
- Use existing exports, tokens, CSS layers, and patterns before adding new ones.
- Resolve imports in files using tsconfig.json paths.
- Keep changes focused and minimal; avoid drive-by rewrites or formatting churn.

## General code guidelines (Copilot)

- Verify before you claim. Don’t speculate.
- Preserve unrelated code and existing structure.
- No apologies, no “I think”, no change summaries.
- Don’t ask to confirm info that’s already in context.
- Prefer explicit, descriptive names and follow current style.
- Favor performance and security; add robust error handling and safe logging.
- Keep functions small and focused; remove duplication.
- Replace hardcoded values with named constants when reasonable.
- Prefer composition over deep inheritance; keep modules cohesive.
- Accessibility: WCAG 2.1 AA compliance (non-negotiable)
- Exports: Named exports only (no default exports)
- Cleanup: Remove unused imports and declarations

## Inline chat and editor completions

- Default tone: short and answer-first. Aim for 1–3 concise sentences before any code.
- Show only what changes. Provide minimal diffs/snippets; don’t paste whole files or unrelated lines.
- Keep edits scoped to a single file unless explicitly asked to touch more.
- Use existing APIs, utilities, tokens, and patterns. Don’t add new deps unless requested.
- Preserve style: imports, naming, types, JSX patterns, token usage, CSS layers.
- Reference files and symbols with repo-relative paths and backticks, e.g. `@section/...`.
- Extract requirements into a tiny checklist and proceed. Ask a question only when truly blocked.
- Avoid heavy formatting: bullets are OK; skip tables; use code fences only for code.
- For Next.js: don’t mix `app/` and `pages/` in the same hierarchy; prefer server components where used; add "use client" only when required.
- For CSS: never hard-code colors/spacing; use tailwind specifications.
- For performance/security: avoid unnecessary re-renders, side effects at module top-level, unsafe HTML, and leaking env vars.


## Repository overview
Energyvision is a pnpm workspaces monorepo

- Languages: TypeScript, CSS, React, Next.js
- Package manager: PNPM (packageManager: `pnpm@10.24.0`)
- Build: Per-package TypeScript builds (run via root scripts)

Related files: `package.json`, `eslint.config.js`, `biome.json`, `tsconfig.json`.


## Linting and formatting
- Biome config: `biome.json` (optional extra lint/format)
- Avoid disabling lint rules unless necessary; if you must, comment why.

# Packages, import and export Conventions
- **No Barrel Files:** Never import from index.ts/index.tsx files.
- **Direct Imports:** Always import directly from the specific source file (e.g., `import { Button } from './core/Button/Button'`).
- **Pathing:** Avoid using directory-level exports to ensure clear dependency paths.
- Keep props stable; prefer additive changes. Deprecate before removal when possible.
- Ensure tree-shakeability; avoid side effects at module top-level.


## Website (Next.js)

- The website uses Next.js 16. Place new files in the router that matches the surrounding code.
- Prefer server components where already used; mark client components with `"use client"` only when needed.
- Use Next Image, metadata APIs, and established utilities already in `energyvision/web`.
- Use existing route conventions and file organization; don’t mix `app/` and `pages/` in the same hierarchy.
- For Tailwind, prefer the shared preset in brand/tailwind in package `@energyvision/shared` and follow website `tailwind.config.js` patterns.

## Building and deployment
- Never use ARG or ENV for sensitive data or secrets, as they are easily extractable via docker history.
- Exclude Docker secret files, env.local and env.development from version control by adding them to .gitignore.
- Limit secret size: Docker imposes a 500 KB limit on individual secret files

## Code reviews (for Copilot)

- Summarize the pull-request on maximum two sentences
- Avoid listing all changes, focus on the most important ones
- Check the description against the actual changes
- Ensure the PR title is descriptive and follows the conventional commit format
- Look for: correctness, style, performance, security, tests, documentation
- Check: existing patterns, exports, tokens, CSS layers
- Make sure import paths are correct, updated and use existing aliases where possible


### Extra review tips

- Watch for unnecessary bundle impact (large deps, dynamic imports, side effects).
- Confirm a11y basics: semantic elements, labels, focus order, keyboard support.
- Check security footguns: unsafe HTML, unescaped data, leaking env vars, weak CSP assumptions.