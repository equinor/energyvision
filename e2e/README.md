# E2E test framework

The E2E test framework will contain end-to-end tests for Energy Vision

## Organization

.
|e2e
|   +--credentials.js
|   +--energyVision.js
|   +--package.json
|   +--seleniumCfg.js
|   visualTests
|       +--equinor-news.js
|   tests
|       +--platforms.js
|       +--equinor-news.js
    


## Setup

In order to run the tests, set the following environment variables:
BS_UserName='Browserstack username'
BS_Accesskey'Browserstack accesskey'

### Visual testing using Percy - visualTests
To run visual tests, set the following environment variable.
PERCY_TOKEN=c96f042120d71e27afbf238a481e551b62ab1a1d75ab5cdab13263ada2fdfa93
This sets up the integration with Percy.io and ensures test results are written there.

### Tests (Accessibility) - tests
Tests in this folder will be accessibility tests
To run a test a go to tests and type
node name-of-test
Example:
node equinor-news.js
