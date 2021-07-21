import {seleniumConfig} from '../seleniumConfig.js'
import webdriver from 'selenium-webdriver'
import {envisStartPage} from '../energyVision.js'
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

const capabilities = { ...platform, ...project, ...seleniumConfig }
console.log(capabilities)

const userName = process.env.BS_UserName
const accessKey = process.env.BS_Accesskey
const browserstackURL = `https://${userName}:${accessKey}@hub-cloud.browserstack.com/wd/hub`

const driver = new webdriver.Builder().usingServer(browserstackURL).withCapabilities(capabilities).build()
await driver.get(envisStartPage)

const axe = fs.readFileSync('../node_modules/axe-core/axe.min.js', 'utf8')
await driver.executeScript(axe.toString())
try {
  const result = (platform.browserName === "Firefox")
    ? driver.executeScript('let result; axe.run().then((r)=> {result=r}); return result;')
    : await driver.executeScript('let result; await axe.run().then((r)=> {result=r}); return result;')
  const reportFile = `${platform.browserName}_envis_news_report.json`
  console.log('report file: ', reportFile)
  fs.writeFileSync(reportFile, JSON.stringify(result))
} catch (err) {
  console.error('An error occured for browser', platform.browserName, err)
}
await driver.quit()
