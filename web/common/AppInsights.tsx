// AppInsights.js
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { ReactPlugin } from '@microsoft/applicationinsights-react-js'

const reactPlugin = new ReactPlugin()
const appInsights = new ApplicationInsights({
    config: {
        // TODO: Fetch instrumentationKey from server based on environment
        instrumentationKey: '5280e52e-c378-460c-bda5-caa42f707068',
        extensions: [reactPlugin],
    }
});
appInsights.loadAppInsights()
export { reactPlugin, appInsights }