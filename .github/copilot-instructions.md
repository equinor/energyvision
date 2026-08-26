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
- Package manager: pnpm `11.24.0` (pinned in root `package.json`)
- Build orchestration: Turborepo `2.10.11` (tasks defined in `turbo.json`)
- Build: Per-package builds orchestrated via Turborepo

Related files: `package.json`, `eslint.config.js`, `biome.json`, `tsconfig.json`, `turbo.json`, `pnpm-workspace.yaml`.

## Turborepo and monorepo structure

- **Workspaces**: `web`, `studio`, `search`, `packages/energyvision`, `packages/typescript-config`
- **Task definitions** (`turbo.json`):
  - `energy-vision-web#build`: Next.js static build with caching
  - `energy-vision-studio#build`: Sanity Studio build
  - `lint`, `check-types`, `dev`: root-level tasks with workspace dependencies
- **Building**: Run `pnpm web build` or `pnpm turbo build --filter=energy-vision-web` to build the web package
- **Docker build**: Uses `turbo prune energy-vision-web --docker`, then installs from the generated `out/pnpm-lock.yaml`, `out/pnpm-workspace.yaml`, and `out/json/` with `pnpm install --frozen-lockfile`.
- **Shared config**: TypeScript configs, Tailwind presets, and other shared utilities live in `packages/`
- **pnpm-workspace.yaml**: The authoritative workspace definition. It explicitly lists all workspaces and contains pnpm settings, overrides, build approvals, and hoisting rules. Do not add a `workspaces` field to root `package.json`.
- **Lockfile**: The root `pnpm-lock.yaml` is shared by the workspace. When package manifests or pnpm workspace settings change, update it with pnpm `11.24.0`; keep Docker installs frozen.
- **Caching**: Turbo caches build outputs to speed up CI/CD and local rebuilds; outputs specified per task in `turbo.json`


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
## Sentry configuration
- Shared Sentry config is in `web/sentry.shared.ts` and exports:
  - `sentryIgnoreErrors`: array of error patterns to filter (e.g., `_sz` errors, ResizeObserver issues)
  - `allowUrlPattern`: regex limiting error reporting to configured domain
  - `sentryDenyUrls`: array of URL patterns to block (e.g., GTM scripts)
  - `sentryBeforeSend`: function to drop filtered events
- Three init files import from shared: `instrumentation-client.ts` (browser), `sentry.edge.config.ts`, `sentry.server.config.ts`
- Always update shared config first if changing error filtering or URL policies; never duplicate these lists

## Search implementation
- Search page (`app/[locale]/search/page.tsx`) is client-only (`force-static`) using Algolia with `instantsearch.js` routing
- `sections/searchBlocks/Search.tsx` wraps `InstantSearch` with client mount guard via `isMounted` state
- URL state maintained via `history` router with typed `SearchRouteState` (query/page/tab)
- `SearchBox.tsx` trims input before submit; whitespace-only queries clear search instead of requesting empty results
- No unnecessary Algolia requests before user submits a non-empty query
## Building and deployment
- Never use ARG or ENV for sensitive data or secrets, as they are easily extractable via docker history.
- Exclude Docker secret files, env.local and env.development from version control by adding them to .gitignore.
- Limit secret size: Docker imposes a 500 KB limit on individual secret files
- **Docker multistage build**: Web Dockerfile uses `node:24-bookworm-slim` and installs pnpm directly with npm, not Corepack. The complete repository is copied only into the prune stage; the builder gets only Turbo's pruned output so unrelated workspaces such as `search` cannot invalidate the frozen install.
  - `turbo prune` creates the dependency manifests and pruned root lockfile.
  - Builder runs `pnpm install --frozen-lockfile` before copying the pruned source and running `turbo build`.
  - Runner uses the standalone `.next` output, public assets, static assets, and `/usr/bin/tini`.
- **Standalone output**: Next.js `output: standalone` requires `outputFileTracingRoot: path.join(__dirname, '../')` in `next.config.ts` so tracing includes the shared workspace package.

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