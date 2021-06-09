import {seleniumConfig} from '../seleniumConfig.js'
import webdriver from 'selenium-webdriver'
import {pettersTestPage} from '../energyVision.js'
import * as fs from 'fs';


const project = {
  name: 'Equinor News',
  build: 'Build #1',
  project: 'Energy Vision'
}
const platform = {
  os: 'Windows',
  os_version: '10',
  browserName: 'Chrome',
  browser_version: 'latest',
}

const capabilities = Object.assign({}, platform, project, seleniumConfig)
console.log(capabilities)

var userName = ''
var accessKey = ''
var browserstackURL = 'https://' + userName + ':' + accessKey + '@hub-cloud.browserstack.com/wd/hub'

var driver = new webdriver.Builder().usingServer(browserstackURL).withCapabilities(capabilities).build()
await driver.get(pettersTestPage)

const data = fs.readFileSync('../node_modules/axe-core/axe.min.js', 'utf8')
await driver.executeScript(data.toString());
try {
  let result;
  if (platform.browserName === "Firefox") {
    result = driver.executeScript('let result; axe.run().then((r)=> {result=r}); return result;');
  } else {
    result = await driver.executeScript('let result; await axe.run().then((r)=> {result=r}); return result;');
  }
  let reportFile = platform.browserName + 'pettersTestPage' + '_report.json'
  console.log("report file: " + reportFile)
  fs.writeFileSync(reportFile, JSON.stringify(result));
} catch (err) {
  console.log("An error occured for browser" + platform.browserName + " ," + err)
}
await driver.quit()

