# EnergyVision/Studio

This directory contains the [Sanity Studio](https://www.sanity.io/) used for equinor.com and associated websites.

## Scripts

As described in the [main project readme](../README.md#package-managers), we use `pnpm` as main packager manager for this project. Script commands should be run from the root of the project. You can use the `studio` alias to run commands specifically for this directory, for example:

```bash
# Start Next.js dev server
pnpm studio dev
# or
pnpm start:studio
```

⚠️ Note: due to compatibility issues, we use Yarn as package manager for the Studio, despite using pnpm as primary package manager within this project. Dependencies for the Studio should be installed, removed, and upgraded using Yarn. You can read more about this in the [main project readme](../README.md#package-managers).

## Environment variables

The Studio requires a number of environment variables to work. These should be added to a `.env.development` file in this directory.

## Custom plugins

We use 2 custom plugins for asset sources in the Studio; one for the BrandMaster DAM platform and the Fotoware DAM platform. These plugins are very much "purpose-made" for our needs and implementation - with the Fotoware plugin requiring some services hosted externally from this project to handle authentication and asset exports.

The code for these plugins can be found in [the plugins directory](./plugins/)

## Notes

- `import React from 'react'` is used in various places despite technically not being needed anymore in React v17 - this is because the studio crashes with `React is not defined` if not imported where needed.
- TypeScript typing in version 2 of the Sanity Studio is incomplete. Due to this, some typing has been added manually to supplement the types from Sanity, and some typing may be missing or incomplete. We are hopeful that this will improve significantly with version 3 of the Studio
