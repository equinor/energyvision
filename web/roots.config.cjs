// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const languages = require('./languages.js')

module.exports = {
  originDir: path.resolve(__dirname, 'routes'),
  localizedDir: path.resolve(__dirname, 'app'),
  locales: [languages.languages.map((l) => l.locale)],
  defaultLocale: 'en',
  prefixDefaultLocale: false, // serves "en" locale on / instead of /en
  afterGenerate: () => {
    // this callback is triggered after app dir files are generated
    console.log("I'm done!")
  },
}
