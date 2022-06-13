[![Build & deploy Storybook](https://github.com/equinor/energyvision/actions/workflows/storybook.yaml/badge.svg?branch=main)](https://github.com/equinor/energyvision/actions/workflows/storybook.yaml)[![DEV - Build & Deploy equinor.com](https://github.com/equinor/energyvision/actions/workflows/DEV-web.yaml/badge.svg)](https://github.com/equinor/energyvision/actions/workflows/DEV-web.yaml)[![DEV - Build & deploy studio for equinor.com](https://github.com/equinor/energyvision/actions/workflows/DEV-studio.yml/badge.svg)](https://github.com/equinor/energyvision/actions/workflows/DEV-studio.yml) 

# Energy Vision

This is the main repository for the EnergyVision project, home of the next version of the [equinor.com website](https://www.equinor.com). This version of the website is built using the [Sanity content platform](https://www.sanity.io/) as headless CMS and [Next.js](https://nextjs.org/) for the web frontend.

The project is licensed under the [MIT license](https://github.com/equinor/energyvision/blob/main/LICENSE) following [the open source strategy of Equinor](https://opensource.equinor.com).

## Getting started

```
    $ git clone git@github.com:equinor/energyvision.git
    $ cd energyvision
    $ pnpm setup-project
```

This will install the dependencies for the Sanity studio (which uses Yarn for compatibility reasons) as well as the dependencies for the workspace packages listed in `pnpm-workspace.yaml`

Remember to add the .env files as described in the .env.template files for the web and studio folders.

## Overview

This repository is organized into several folder. Please refer to README files inside each folder for more information.

- `studio` - [Sanity](https://www.sanity.io/) powered content platform.
- `web` - Web application using [Next.js](https://nextjs.org/) and React components developed in isolation with [Storybook](https://storybook.js.org/)
- `search` - Azure functions for maintaining search indexes at [Algolia](https://www.algolia.com/apps/24ZMKUY18Z/dashboard)
- `legacy` and `legacy-css` Old archived news content

## PNPM

This project uses the PNPM package manager\*. All commands should be run from root. There’s an alias in the package-file to studio and web. So to run scripts from the package.json in studio:

    # Install dependencies
    pnpm web install

    # Start the web in dev mode
    pnpm web dev

    # Add some package to the web folder
    pnpm web add <some-package>

    # Build Next.js
    pnpm web build

When adding arguments to scripts, such as `--force` or `--dev` to force a re-install of all dependencies, then when running scripts from the root, you must add `--` so that for example:

    pnpm web install -- --force
    pnpm web add chalk -- --save-dev

- PNPM is not perfect, and there has been some issues in the project.
  Since Sanity Studio doesn't work well with pnpm, we use yarn as package manager inside that folder instead. You can still run command from root using pnpm using the `studio` alias, but adding/updating/removing packages from the root may work unexpectedly.

      ```
      # Start studio in dev mode
      pnpm studio dev
      ```

For the Search indexers NPM is being used. The reason being that it was not possible (with PNPM v6 at least) to generate a package containing all dependencies from the search folder. So to work with dependencies for anything under `search`, use NPM in within that folder. PNPM from the root folder stil works for executing scripts though.

## Legacy packages

The `legacy` folder contains packages related to static content from the AEM based equinor.com website and the legacy CSS/JavaScript needed to run this static content. These packages are rarely updated and rely on outdated and/or deprecated dependencies. This causes issues when using a node version higher than node v14 on certain platforms (for example node-sass does not compile). When working on these packages, be sure to switch to node v14 to build the packages.

The legacy packages are currently excluded from the pnpm workspace (see `pnpm-workspace.yaml`) so will not have their dependencies installed when running `pnpm m i` / `pnpm recursive install` from the root.

## Storybook

We use [Storybook](https://storybook.js.org/) for the development of components. Pushing files to `./web/components` will trigger a build and deploy the Storybook - which can then be viewed here: https://envis-storybook.azureedge.net.

To start the storybook during development, run `pnpm web storyboook` from the root.
