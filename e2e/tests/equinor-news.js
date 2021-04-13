import { platforms } from './platforms.js'
import { seleniumConfig} from '../seleniumConfig.js'
import webdriver from 'selenium-webdriver'
import { envisStartPage} from '../energyVision.js'


const project = {
  name : 'Equinor News',
  build : 'Build #1',
  project : 'Energy Vision'
}

platforms.forEach( platform => {
  gotoNewsAsync(platform)
})

async function gotoNewsAsync(platform) {
  const capabilities = Object.assign({}, platform, project , seleniumConfig)
  console.log(capabilities)

  var userName = process.env.BS_UserName
  var accessKey = process.env.BS_Accesskey
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
  await driver.quit()
}

