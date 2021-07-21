import { createRequire } from 'module'
import { seleniumConfig } from '../seleniumConfig.js'
import webdriver from 'selenium-webdriver'
import { envisStartPage } from '../energyVision.js'
import fs, { promises as fsAsync } from 'fs'
import { config } from 'dotenv'

const require = createRequire(import.meta.url)

// TODO: Might want to move generic stuff out of this file and just keep what is needed for one particular test scenario

config()

const axeFile = require.resolve('axe-core/axe.min.js')

const project = {
  name: 'Equinor News',
  build: 'Build #1',
  project: 'Energy Vision',
}
const platform = {
  os: 'Windows',
  os_version: '10',
  browserName: 'Chrome',
  browser_version: 'latest',
}
const authentication = {
  'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER, // Only use when on server. Comment out locally.
  'browserstack.user': process.env.BROWSERSTACK_USERNAME,
  'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
}

const defaultCapabilities = { ...platform, ...project, ...seleniumConfig, ...authentication }
console.log(defaultCapabilities)

const browserstackURL = `https://hub-cloud.browserstack.com/wd/hub`

const checkCreateDirectory = (dir) => (fs.existsSync(dir) || fs.mkdirSync(dir)) && dir

const configureDriver = (browserStackURL) => (capabilities) =>
  new webdriver.Builder().usingServer(browserStackURL).withCapabilities(capabilities).build()

const storeJsonResult = async (fullPath, jsonResult) => await fsAsync.writeFile(fullPath, JSON.stringify(jsonResult))

const testPage = (browserstackURL) => (capabilities) => async (page) => {
  const outputDir = 'output'
  const driver = configureDriver(browserstackURL)(capabilities)

  await driver.get(page)
  const axe = await fsAsync.readFile(axeFile, 'utf8')
  await driver.executeScript(axe.toString())
  await checkCreateDirectory(outputDir)
  const result = await driver.executeScript('let result; await axe.run().then((r)=> {result=r}); return result;')
  await storeJsonResult(`${outputDir}/${capabilities.browserName}_envis_news_report.json`, result)
  await driver.quit()
}

await testPage(browserstackURL)(defaultCapabilities)(envisStartPage)
