import { credentials } from '../credentials.js'
import { seleniumConfig} from '../seleniumConfig.js'
import { envisStartPage} from '../energyVision.js'
import webdriver from 'selenium-webdriver'
import percySnapshot from '@percy/selenium-webdriver'

const project = {
  name : 'Equinor News Visual Tests',
  build : 'Build #1',
  project : 'Energy Vision'
}

const platform =  {
  os: 'Windows',
  os_version: '10',
  browserName: 'Chrome',
  browser_version: 'latest',
}

const capabilities = Object.assign({}, platform, project , seleniumConfig)

var userName = credentials.userName
var accessKey = credentials.accessKey
var browserstackURL = 'https://' + userName + ':' + accessKey + '@hub-cloud.browserstack.com/wd/hub'

var driver = new webdriver.Builder().usingServer(browserstackURL).withCapabilities(capabilities).build()
await driver.get(envisStartPage)
const newsElementText = await driver.findElement(webdriver.By.xpath("//*[text()='News']"))
await newsElementText.click()
const longestTitleOfAllTimesElement = await (await driver).findElement(webdriver.By.xpath("//*[text()='Testing with the longest title of all time, testing with the longest title of all time. This is 100 ']"))
if (false === await longestTitleOfAllTimesElement.isDisplayed()) {
  console.log("Longest title ever not displayed")
  throw new Error("Longest title ever not displayed")
}
var snapshotName = 'Energy Vision News'
await percySnapshot(driver, snapshotName);
await driver.quit()
