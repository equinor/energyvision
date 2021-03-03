[![Build & deploy Storybook](https://github.com/equinor/energyvision/actions/workflows/storybook.yaml/badge.svg?branch=main)](https://github.com/equinor/energyvision/actions/workflows/storybook.yaml)

[![Lint & Test web](https://github.com/equinor/energyvision/actions/workflows/web.yaml/badge.svg?branch=main)](https://github.com/equinor/energyvision/actions/workflows/web.yaml)

# Energy Vision

New home page for Equinor.

## Overview

This repository is organized into several folder. Please refer to README files inside each folder for more information.

- `studio` - [Sanity](https://www.sanity.io/) powered content platform.
- `web` - Web application using [Next.js](https://nextjs.org/) and React components developed in isolation with [Storybook](https://storybook.js.org/)

## Storybook

The Storybook for the components are running at https://envis-storybook.azureedge.net/  
Pushing files to `./web/components` will trigger a build and deploy
