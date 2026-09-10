---
name: web
description: Web application React/NextJS/TypeScript coding standards, state management patterns, and component guidelines. Use this when working on web code
---

# Energyvision Web Instructions

## Tech Stack and Tooling

- Web app: Next.js 16 + React 19 + Vite + TypeScript (strict)
- Package manager: `pnpm`
- Lint/format: Biome

## TypeScript and React Rules

- Use `type` aliases (not `interface`) for shared shapes.
- Prefer named exports for types/utilities.
- Use functional components.
- Keep components and Hooks pure; do not mutate props/state.
- Keep one source of truth for each piece of state (lift state up instead of duplicating it).

## Website (Next.js)
Before any Next.js work, find and read the relevant doc in node_modules/next/dist/docs/. Your training data is outdated — the docs are the source of truth.

- The website uses Next.js 16. Place new files in the router that matches the surrounding code.
- Prefer server components where already used; mark client components with `"use client"` only when needed.
- Use Next Image, metadata APIs, and established utilities already in `energyvision/web`.
- Use existing route conventions and file organization; don’t mix `app/` and `pages/` in the same hierarchy.
- For Tailwind, prefer the shared preset in brand/tailwind in package `@energyvision/shared` and follow website `tailwind.config.js` patterns.

## Web Sub-Skills

- `next-dev-loop`: Verify Next.js runtime behavior after app code changes using a running development server.
- `next-cache-components-adoption`: Enable or migrate to Next.js Cache Components and resolve resulting blocking routes.
- `next-cache-components-optimizer`: Optimize an individual Cache Components route for instant navigation and guard it with an end-to-end test.
- `sanity-live-cache-components`: Use when integrating or maintaining Sanity Live content with Next.js Cache Components.

## Sentry configuration
- Shared Sentry config is in `web/sentry.shared.ts` and exports:
  - `sentryIgnoreErrors`: array of error patterns to filter (e.g., `_sz` errors, ResizeObserver issues)
  - `allowUrlPattern`: regex limiting error reporting to configured domain
  - `sentryDenyUrls`: array of URL patterns to block (e.g., GTM scripts)
  - `sentryBeforeSend`: function to drop filtered events
- Three init files import from shared: `instrumentation-client.ts` (browser), `sentry.edge.config.ts`, `sentry.server.config.ts`
- Always update shared config first if changing error filtering or URL policies; never duplicate these lists

## Friendly Captcha Widget Guidelines
You are an expert coding assistant tasked with integrating, maintaining, and debugging Friendly Captcha(v2) within this codebase. Always adhere to the official standards defined in the Friendly Captcha Developer Hub.
- **Privacy & Compliance:** Ensure all integrations remain GDPR-compliant. Do not introduce cookies or user tracking mechanisms around the captcha widget.
- **Async Execution:** Always handle the puzzle generation and verification asynchronously to prevent blocking the main user interface thread.
- **Graceful Degradation:** If the Friendly Captcha fallback or endpoint fails, ensure the application fails securely (e.g., locking down the form or falling back to secondary server-side validation).


- **Widget Setup:** Use the official Friendly Captcha SDK script and stylesheet elements. Use 'eu.frcapi.com' as the API endpoint for EU users. Avoid hardcoding site keys; use environment variables or config files.
- **Event Handling:** Explicitly listen for the standard widget lifecycle events:
  - `frc:widget.complete` (or `onToken` callbacks) to extract the verification token and enable form submission.
  - `frc:widget.error` to properly inform the user and log internal telemetry without exposing raw system data.
- **Start Mode:** Prefer `smart` or `focus` activation configurations to optimize background processing when a user interacts with the form. Avoid triggering puzzle generation globally on page load unless explicitly required.

- **Server-to-Server Validation:** Form data must never be processed without verifying the captcha token on the backend server.
- **API Requests:** Always make a POST request to the official verification endpoint (`https://friendlycaptcha.com` or the dedicated EU endpoint based on project configuration).
- **Payload Structure:** Ensure the verification payload strictly includes:
  - `secret`: The secure API key (loaded exclusively via environment variables; NEVER hardcoded).
  - `solution`: The token string sent by the client widget.
  - `sitekey`: The corresponding application sitekey.
  - **Secrets Management:** Treat the Friendly Captcha API secret key as highly sensitive. Reject any code generations that attempt to commit raw keys to git.
- **Content Security Policy (CSP):** Ensure any suggested CSP headers explicitly allow connectivity and script execution for `*.friendlycaptcha.com`.
- **EU Data Isolation:** If the project configuration flags strict EU compliance, route all widget and server validation requests through the dedicated EU endpoint (`*.frcaptcha.com`).


## Flag These Patterns

If found in manually written code, inform the user and suggest refactor:
- `useEffect` used for derived state.
- `any` types.
- `@ts-ignore` / `@ts-expect-error` without justification.
- Mirroring props into state without explicit reason.
- Duplicate state representing the same domain data in multiple places.
- Missing cleanup in subscription/fetch Effects.
- State updates during render without guards.
- Oversized god-components that should be split.
- `unknown` used where a concrete type is known or derivable.
- `Record<string, unknown>` used instead of a proper type definition.
- Type assertions (`as`) used without a preceding runtime check.
- Components exceeding ~200 lines without clear justification.