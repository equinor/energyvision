import { createRequire } from 'module';
import {seleniumConfig} from '../seleniumConfig.js'
import webdriver from 'selenium-webdriver'
import {envisStartPage} from '../energyVision.js'
import * as fs from 'fs'
import { config } from 'dotenv'

const require = createRequire(import.meta.url);

config()

const axeFile = require.resolve('axe-core/axe.min.js');

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
const authentication = {
  'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
  'browserstack.user': process.env.BROWSERSTACK_USERNAME,
  'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY
}

const capabilities = { ...platform, ...project, ...seleniumConfig, ...authentication }
console.log(capabilities)

const browserstackURL = `https://hub-cloud.browserstack.com/wd/hub`

const driver = new webdriver.Builder().usingServer(browserstackURL).withCapabilities(capabilities).build()
await driver.get(envisStartPage)

const axe = fs.readFileSync(axeFile, 'utf8')
await driver.executeScript(axe.toString())
try {
  const result = (platform.browserName === "Firefox")
    ? driver.executeScript('let result; axe.run().then((r)=> {result=r}); return result;')
    : await driver.executeScript('let result; await axe.run().then((r)=> {result=r}); return result;')
  const reportFile = `output/${platform.browserName}_envis_news_report.json`
  console.log('report file: ', reportFile)
  fs.writeFileSync(reportFile, JSON.stringify(result))
} catch (err) {
  console.error('An error occured for browser', platform.browserName, err)
  await driver.quit()
  throw err
}

await driver.quit()
