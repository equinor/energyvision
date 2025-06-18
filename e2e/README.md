# E2E test framework

The E2E test framework contains end-to-end tests for Energy Vision.

## Organization

```
e2e/
├── energyVision.js
├── package.json
├── seleniumCfg.js
├── tests/
│   └── equinor-news.js
```

## Setup

To run the tests, set the following environment variables:
- `BS_UserName` (Browserstack username)
- `BS_Accesskey` (Browserstack access key)

### Accessibility Tests

Tests in the `tests` folder are accessibility tests. To run a test, go to `tests` and type:

```
node name-of-test.js
```

Example:
```
node equinor-news.js
```
