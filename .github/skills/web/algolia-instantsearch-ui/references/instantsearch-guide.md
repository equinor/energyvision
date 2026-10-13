# InstantSearch Guide

## Official Skill Bridge

Algolia already maintains an official `instantsearch` skill in `algolia/skills`. Use it as the implementation authority whenever code, framework APIs, widget props, hooks, connectors, SSR, middleware, routing APIs, autocomplete integration, or source-of-truth checks are involved.

This skill owns the customer-readiness layer around that official skill:

| Concern | Use official `instantsearch` for | Use this skill for |
| --- | --- | --- |
| Framework/API | Current React InstantSearch and InstantSearch.js APIs | Whether the chosen UI pattern fits the customer journey |
| Source of truth | Installed types, live docs, CSS class names, widget props, SSR/middleware details | Readiness checks, business explanation, UX QA, and launch handoff |
| Search results page | React search results page features, styling, anti-patterns, custom widgets | Facet usefulness, mobile filters, empty states, routing expectations, event readiness |
| Autocomplete | Official autocomplete pattern references | Whether autocomplete should hand off to a results page or stay separate |
| Events | Event helper and middleware mechanics | Whether hit components preserve `queryID`, `objectID`, index, position, and `userToken` for the customer's analytics goals |

Recommended sequence:

1. Use this guide to frame the search experience, user journey, data contract, and event requirements.
2. Use official `instantsearch` for implementation-specific API decisions.
3. Return to this guide for customer-facing QA, mobile behavior, event-readiness, and launch notes.

## Implementation Map

Before coding, identify:

- Package: `react-instantsearch`, `instantsearch.js`, or another integration. The official skill currently centers React, and InstantSearch.js.
- Index and replicas used by the page.
- Query source: search box, route param, category page, static filter, or autocomplete handoff.
- Refinements: user-visible widgets and silent filters.
- Routing requirements.
- Event requirements.
- Empty/loading/error states.
- Server-side rendering requirements.
- Mobile filter and sort pattern.
- Detail-page navigation and return-to-results behavior.

## Widget And Connector Guidance

- Use built-in widgets/hooks first for standard search box, hits, refinement lists, menu, range, sort-by, pagination, infinite hits, current refinements, and stats.
- Customize rendering when project UI requires it, while preserving widget semantics.
- Use connectors or hooks for custom UI that still needs InstantSearch state.
- Create a custom widget only when existing widgets/connectors cannot express the behavior.

Core teaching pattern:

- `searchBox` lets users express a query.
- `hits` shows the matching records.
- `refinementList`, `menu`, `range`, and related widgets let users narrow results.
- `currentRefinements` shows what is active.
- `clearRefinements` gives users a recovery path.
- `pagination` or `infiniteHits` lets users continue.
- `configure` applies search parameters that belong to the search state.

Decision rules:

- Use a widget when the built-in behavior matches the desired interaction.
- Use hooks or connectors when the UI must be custom but should still preserve InstantSearch state.
- Use a custom widget only when the behavior is stateful and not expressible with existing widgets, hooks, or connectors.
- Use index settings, replicas, or rules for relevance and sorting behavior that should be true for all users, rather than hiding it in component code.
- Use `configure` for search parameters that are part of the InstantSearch state, such as default filters or hits-per-page. Do not use it as a dumping ground for unrelated UI behavior.

## Filters And Refinements

Good filters are not merely available attributes. They match how users narrow decisions.

Checklist:

- Each visible facet has a user reason to exist.
- Facet labels are customer-facing, not raw field names.
- Active refinements are visible.
- Users can clear one refinement or all refinements.
- Counts, ranges, and disabled states make sense with the current query.
- Silent filters are documented and visible in the page context when they shape user expectations.
- Mobile filters open, close, apply, clear, and preserve scroll position predictably.

Common filter choices:

| Pattern | Use when | Watch for |
| --- | --- | --- |
| Refinement list | Users choose one or many values | Long lists need search, ordering, or show-more behavior |
| Menu | User chooses one category-like value | Multi-select expectations can make menus frustrating |
| Range | Numeric comparison matters | Values must be normalized and meaningful |
| Toggle | A binary refinement is high value | Hidden defaults can surprise users |
| Sort-by | Users need alternate orderings | Sort replicas and ranking tradeoffs must be understood |

## Routing

- Enable routing when users should share or revisit query/refinement state.
- Do not combine `initialUiState` and routing for the same state; the official docs state the two options override each other.
- Keep route parameter names human-readable for public pages where possible.
- Verify browser back/forward behavior and page reload restoration.
- Decide whether category context comes from the route, a silent filter, or both.
- Validate that autocomplete handoff creates the intended search results URL.
- For authenticated or permissioned pages, avoid putting sensitive filters or identifiers in public URLs.

Routing QA:

- Search, refine, sort, and paginate, then reload the page.
- Copy the URL into a new tab.
- Use browser back and forward after several refinements.
- Clear refinements and confirm the URL returns to an understandable base state.
- Navigate to a hit detail page and return without losing the user's place when the product experience requires it.

## Events

- Enable click analytics for result interactions that require queryID.
- Use InstantSearch event helpers or middleware where appropriate.
- Make hit components receive the original hit data needed for objectID, index, position, and queryID.
- Test click and conversion flows from search, category, and sorted/replica views.
- For custom hit components, preserve the original hit object or explicitly pass the fields required by Insights.
- Treat event wiring as part of UI completeness when analytics, personalization, Dynamic Re-Ranking, Recommend, NeuralSearch evaluation, or Agent Studio feedback are in scope.
- Coordinate with `algolia-events-insights` for the event taxonomy and validation standard.

Event-readiness questions:

- Does the search response include `queryID` for clickable results?
- Does the rendered hit know its displayed one-based position?
- Does the click event reference the exact `objectID` returned by Algolia?
- Does sort/replica selection change the index used by the event?
- Does mobile UI fire the same event as desktop?
- Are clicks, add-to-cart, purchase, save, lead, or support-resolution events owned by frontend, backend, or a connector?

## SSR And Performance

Use official `instantsearch` for SSR implementation details. This skill only adds readiness checks:

- SSR/hydration should not double-query unexpectedly.
- Initial UI state, routing, and server-rendered state should not fight each other.
- Loading and stalled-search states should be designed, not accidental.
- Search credentials must remain search-only on the client.
- Large result cards, images, and filter panels should not make search feel slow.
- For Next.js, Remix, Nuxt, or equivalent frameworks, validate route transitions, hydration warnings, and client navigation.

## Mobile And Accessibility

Mobile search is not a smaller desktop sidebar.

- Filters and sort need an obvious entry point.
- Users need to see active filter count before reopening the panel.
- Apply, clear, and close actions should be reachable.
- Result cards should remain scannable with images, prices, snippets, or metadata appropriate to the use case.
- Keyboard focus should not get trapped in filter drawers.
- Search input labels, result links, refinement controls, and clear buttons need accessible names.
- Live-updated result counts and empty states should be understandable to assistive technology users.

## UX QA

- Query typing and clearing.
- Filter selection, deselection, and current refinements.
- Clear all and clear-one recovery.
- Sort switching and replica correctness.
- Pagination or infinite loading.
- Empty state and no-query state.
- Slow network and error behavior.
- Mobile filter/sort affordances.
- Accessibility for form labels, result links, keyboard focus, and live-updated content.
- Users can tell why results changed after selecting filters.
- Users can recover from too many filters without starting over.
- Mobile filters do not crowd or hide the results.
- URL sharing, reload, and back/forward behavior when routing is enabled.
- Result click and conversion event readiness when events are in scope.
- Detail-page navigation and return-to-results behavior.

## Review Output Template

Use this structure for audits or handoffs:

1. Official Skill Usage Note: which official `instantsearch` guidance, installed types, docs, or references were used.
2. Customer UI Plan: page frame, query source, widgets/refinements, routing, mobile behavior, and continuation pattern.
3. Data/Event Readiness Notes: index, replicas, facets, display attributes, secured filters, event fields, and known gaps.
4. Implementation Notes: files changed or proposed, framework package, configuration boundaries, and any deferred API checks.
5. QA Checklist: browser tests for query, filters, active refinements, clear refinements, sort, pagination/infinite hits, empty/loading/error states, routing, mobile, accessibility, and event readiness.

## Source Notes

- Official Algolia skills repository: https://github.com/algolia/skills
- Official `instantsearch` skill includes React InstantSearch, Vue InstantSearch, InstantSearch.js, source-of-truth checks, React search results pages, autocomplete references, middleware, SSR, and custom widget guidance: https://github.com/algolia/skills/tree/main/skills/instantsearch
- InstantSearch is a frontend UI library that combines widgets to build search interfaces: https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js
- InstantSearch supports predefined widgets, customized widgets, and custom widgets/connectors: https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js
- Routing lets InstantSearch synchronize UI state with the browser URL: https://www.algolia.com/doc/guides/building-search-ui/going-further/routing-urls/js
- InstantSearch event implementation guidance: https://www.algolia.com/doc/guides/building-search-ui/events/js
