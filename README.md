[![Build & deploy Storybook](https://github.com/equinor/energyvision/actions/workflows/storybook.yaml/badge.svg?branch=main)](https://github.com/equinor/energyvision/actions/workflows/storybook.yaml) [![Lint & Test web](https://github.com/equinor/energyvision/actions/workflows/web.yaml/badge.svg?branch=main)](https://github.com/equinor/energyvision/actions/workflows/web.yaml)

# EnergyVision

This is the main repository for the EnergyVision project, home of the next version of the [equinor.com website](https://www.equinor.com). This version of the website is built using the [Sanity content platform](https://www.sanity.io/) as headless CMS and [Next.js](https://nextjs.org/) for the web frontend.

The project is licensed under the [MIT license](https://github.com/equinor/energyvision/blob/main/LICENSE) following [the open source strategy of Equinor](https://opensource.equinor.com).

## Overview

This repository is organized into several folder. Please refer to README files inside each folder for more information.

- `studio` - [Sanity](https://www.sanity.io/) powered content platform.
- `web` - Web application using [Next.js](https://nextjs.org/) and React components developed in isolation with [Storybook](https://storybook.js.org/)

## Storybook

We use [Storybook](https://storybook.js.org/) for the development of components. Pushing files to `./web/components` will trigger a build and deploy the Storybook - which can then be viewed here: https://envis-storybook.azureedge.net
