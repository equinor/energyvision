# Search

This folder contains the code needed for enabling search capabilities in EnergyVision.
Integrations to Algolia, Sanity and Azure BlobStorage are being used.

## Getting started

### Prereq

- `npm install -g azure-functions-core-tools@4 --unsafe-perm true`
- `npm install -g azurite`
- Make sure to insert the proper environment variables, either through `.env` file or using GitHub secrets if you are on Codespace. API keys for Algolia can be found on the Algolia site under Equinor.com application.

### Run the Azure functions

From the root of EnergyVision:

```
  pnpm search-indexers azurite
  pnpm search-indexers build
  pnpm search-indexers start
```
