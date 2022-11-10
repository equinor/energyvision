# EnergyVision/legacy

This directory contains legacy code and content from previous versions of the Equinor website. This code is used to render archived news articles on equinor.com.

These packages are rarely updated and rely on outdated and/or deprecated dependencies. This causes issues when using a node version higher than node v14 on certain platforms (for example node-sass does not compile). When working on these packages, be sure to switch to node v14 to build the packages.

Efforts have previously been made to remove unused CSS/JS code in order to reduce the bundle size and reduce the amount of dependencies; this has however proven to be more difficult than initially thought.

## Installing dependencies

The packages in this directory are currently excluded from the pnpm workspace (see [the pnpm-workspace file](../pnpm-workspace.yaml)) so will not have their dependencies installed when running `pnpm setup-project` / `pnpm m i` / `pnpm recursive install` from the project root.
