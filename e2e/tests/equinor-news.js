import { platforms } from '../platforms.js'
import { credentials } from '../credentials.js'
import { seleniumConfig} from '../seleniumConfig.js'
import webdriver, { Capabilities } from 'selenium-webdriver'


const project = {
  name : 'Equinor News',
  build : 'Build #1',
  project : 'Energy Vision'
}

platforms.forEach( platform => {
  gotoNews(platform)
})

async function gotoNews(platform) {
  const capabilities = Object.assign({}, platform, project , seleniumConfig)
  console.log(capabilities)

  var userName = credentials.userName
  var accessKey = credentials.accessKey
  var browserstackURL = 'https://' + userName + ':' + accessKey + '@hub-cloud.browserstack.com/wd/hub'
  const envisStartPage = 'https://energyvision.app.radix.equinor.com/'

  var driver = new webdriver.Builder().usingServer(browserstackURL).withCapabilities(capabilities).build()
  await driver.get(envisStartPage)
  const newsElementText = await driver.findElement(webdriver.By.xpath("//*[text()='News']"))
  await newsElementText.click()
  const longestTitleOfAllTimesElement = await (await driver).findElement(webdriver.By.xpath("//*[text()='Testing with the longest title of all time, testing with the longest title of all time. This is 100 ']"))
  if (!longestTitleOfAllTimesElement.isDisplayed()) {
    console.log('Longest title of all times not visible')
  }
  await driver.quit()
}
