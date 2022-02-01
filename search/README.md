# Search

This folder contains the code needed for enabling search capabilities in EnergyVision.
Integrations to Algolia, Sanity and Azure BlobStorage are being used.

## Getting started
`npm install -g azure-functions-core-tools@4 --unsafe-perm true`
`npm install -g azurite`

From the root of EnergyVision:
```
  pnpm search-indexers azurite
  pnpm search-indexers build
  pnpm search-indexers start
```


