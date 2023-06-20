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

We use [💅🏾 styled-components](https://styled-components.com/) for CSS. We prefer CSS Variables to
interpolation functions. [The styled-components happy path blogpost](https://styled-components.com/) explains the concept nicely.

To structure the global CSS we follow the
[Inverted Triangle CSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) approach.

Most of the general styles (such as colours and fonts) are based on the [Equinor Design System (EDS)](https://eds.equinor.com), additionally several EDS React components are used where possible. Adjustments had to be made to certain styles and components due to the EDS being created primarily for data heavy applications instead of presentation style websites/applications.

## Storybook

We use [Storybook](https://storybook.js.org/) for the development of components. Pushing files to `./web/components` will trigger a build and deploy the Storybook - which can then be viewed here: https://s166-cdne-envis-storybook-dev.azureedge.net.

To start Storybook locally during development, run the following command from the project root:

```bash
pnpm web storybook

# or

pnpm start:storybook
```

## Algolia Search

The [Algolia platform](https://www.algolia.com) is used for search on equinor.com as well as for content on certain pages that requires filtering and pagination, such as the main news page.
