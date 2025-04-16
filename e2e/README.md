# E2E test framework

The E2E test framework will contain end-to-end tests for Energy Vision

## Organization

.
|e2e
| +--energyVision.js
| +--package.json
| +--seleniumCfg.js
| visualTests
| +--equinor-news.js
| tests
| +--platforms.js
| +--equinor-news.js

## Setup

In order to run the tests, set the following environment variables:
BS_UserName='Browserstack username'
BS_Accesskey'Browserstack accesskey'

#### Run from command line

To run Percy from the command line, cd into the directory visualTests and type
npx percy exec -- node equinor-news.js

### Tests (Accessibility) - tests

Tests in this folder will be accessibility tests
To run a test a go to tests and type
node name-of-test
Example:
node equinor-news.js
