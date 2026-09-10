---
name: studio
description: Sanity Studio coding standards, content modeling patterns, and component guidelines. Use this when working on studio code
---

# Energyvision Studio Instructions

## Tech Stack and Tooling

- Studio app: Sanity 6
- Package manager: `pnpm`
- Lint/format: Biome

## TypeScript and React Rules

- Use `type` aliases (not `interface`) for shared shapes.
- Prefer named exports for types/utilities.
- Use functional components.
- Keep components and Hooks pure; do not mutate props/state.
- Keep one source of truth for each piece of state (lift state up instead of duplicating it).

## Studio Guidelines
- Follow Sanity Studio best practices for content modeling and component development.
- Use existing schemas and components as references for new additions.
- Keep the Studio UI consistent with the established design system.
- Avoid duplicating logic; create reusable components and utilities.
- Ensure proper validation and field-level rules are applied to content models.
- Document any new schemas or components clearly for future maintainers.

## Sanity Sub-Skills

- `sanity-best-practices`: Sanity schemas, GROQ queries, Studio configuration, previews, webhooks, and framework integrations.
- `content-modeling-best-practices`: Content types, field design, references, embedded objects, reuse, and taxonomies.
- `portable-text-conversion`: HTML or Markdown imports and conversion to Portable Text.
- `portable-text-serialization`: Rendering or serializing Portable Text in applications and other output formats.
- `sanity-migration`: Content or CMS migrations into Sanity.
- `sanity-studio-upgrade`: Sanity Studio version upgrades, migration plans, and upgrade troubleshooting.
- `content-experimentation-best-practices`: CMS-managed experiments, variants, success metrics, and experiment analysis.
- `seo-aeo-best-practices`: Metadata, structured data, sitemaps, hreflang, and search or answer-engine optimization.

# Internationalization (i18n)
Managed through the `document-internationalization` plugin in Sanity Studio. Ensure that all new document types are configured for internationalization if they contain translatable content.

- Use Sanity's built-in localization features for content that needs to support multiple languages.
- Keep translations organized and consistent across schemas.
- Avoid hardcoding text; use references to localized content where possible.
