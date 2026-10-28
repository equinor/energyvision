# EnergyVision/web

This is the web frontend for equinor.com, built with the [Next.js](https://nextjs.org/) framework. The web primarily uses static site generation, with a few exceptions that are server-side generated.

Please refer to the [readme in the root of this repository](https://github.com/equinor/energyvision/blob/main/README.md) for more information on the project in general.

## Scripts

As described in the [main project readme](https://github.com/equinor/energyvision/blob/main/README.md), we use `pnpm` as main packager manager for this project. Script commands should be run from the root of the project. You can use the `web` alias to run commands specifically for this directory, for example:

```bash
# Install a dependency
pnpm web add styled-components

# Start Next.js dev server
pnpm web dev
# or
pnpm start:web

# Run tests
pnpm web test

# Run eslint
pnpm lint
# or
pnpm lint:web
```

## Environment variables

This application requires a number of environment variables to work. These should be added to a `.env.local` file in this directory.

## CSS & Styles

We use Tailwind for CSS. We prefer CSS Variables to
interpolation functions. [The styled-components happy path blogpost](https://styled-components.com/) explains the concept nicely.

To structure the global CSS we follow the
[Inverted Triangle CSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) approach.

Most of the general styles (such as colours and fonts) are based on the [Equinor Design System (EDS)](https://eds.equinor.com), additionally EDS React components are used where possible. Adjustments had to be made to certain styles and components due to the EDS being created primarily for data heavy applications instead of presentation style websites/applications

## Algolia Search

The [Algolia platform](https://www.algolia.com) is used for search on equinor.com as well as for content on certain pages that requires filtering and pagination, such as the main news page.

## Details

[Details](./core/Details/Details.tsx) is a native HTML disclosure with the primary
Accordion appearance. It works without client-side JavaScript.

```tsx
import { Details } from '@/core/Details/Details'

<Details>
  <Details.Header>More information</Details.Header>
  <Details.Content>
    <p>Additional content</p>
  </Details.Content>
</Details>
```

Keep `Details.Header` first: it renders the `<summary>` trigger with an `h2`
heading (`h3` when `hasSectionTitle` is set). Do not nest links or buttons inside
the header. All parts accept native attributes, refs, and `className`;
`headerClassName` styles the heading. Use `open` to render a disclosure initially
expanded, or give sibling Details the same `name` to allow only one open at a
time. In a Client Component, native `onToggle` is available for observing changes.

## Carousel

[Carousel](./core/Carousel/Carousel.tsx) handles interaction and layout; sections
own their content and compose keyed slides with
[CarouselItem](./core/Carousel/CarouselItem.tsx) or
[CarouselImageItem](./core/Carousel/CarouselImageItem.tsx). Pass each slide its
zero-based `index`. The old `items`, `variant`, and `getVariantElementBody` props
are replaced by children:

```tsx
<Carousel displayMode="scroll" labelledbyId={headingId}>
  {items.map((item, index) => (
    <CarouselItem key={item.id} index={index}>
      <Card data={item} />
    </CarouselItem>
  ))}
</Carousel>
```

`scroll` keeps its natural content height. While the pointer is over the carousel,
vertical wheel input scrolls horizontally with easing; at either boundary, page
scrolling resumes. Reduced-motion users get immediate movement. Horizontal
gestures, Shift+wheel, Ctrl+wheel zoom, and nested vertically scrollable content
retain native behavior. There is no pinning or extra vertical scroll space.
`single` uses looping navigation,
queues rapid presses, and keeps inactive slides and their descendants inert.
Arrow keys navigate when focus is on the slide or list, without intercepting
keys inside interactive content. Controls retain focus.

Keep slide keys stable: equivalent rerenders and viewport resizing preserve the
active slide, while changing the ordered keys resets the carousel. Pass native
attributes and event handlers to the outer element. Use `controlsClassName` for
caller-specific padding; shared controls do not add horizontal padding.

Only the image section opts into `autoRotation`. Reduced motion disables it.
Hover temporarily pauses rotation; entering with focus or navigating manually
stops it until Play is activated. Play/Pause retains focus when slides advance.
The generic client carousel can also receive slide content composed by a Server
Component, without passing a render function across the server/client boundary.

Run the navigation regression tests with:

```bash
pnpm web exec tsx --test core/Carousel/loopState.test.ts
```
