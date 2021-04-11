# E2E test framework

The E2E test framework will contain end-to-end tests for Energy Vision

## Setup

In order to run the tests the user must create a file named 'credentials.js' with the login information for browserstack.com.

### Sample credentials.js

export const credentials = {
userName : 'bamsemoms',
accessKey : 'daAccessKey'
}

### Running tests

To run a test a go to tests and type
node name-of-test
Example:
node equinor-news.js
