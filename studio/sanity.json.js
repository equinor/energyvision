/* eslint-disable @typescript-eslint/no-var-requires */
const sanityJson = require('./sanity.json')
const dotenv = require('dotenv')
const fs = require('fs')

dotenv.config()
if (process.env.NODE_ENV !== 'production' && !process.env.SANITY_STUDIO_API_PROJECT_ID) {
  dotenv.config({ path: '.env.development' })
}

const updateSanityJson = () => {
  let updatedSanityJson = {}
  if (process.env.SANITY_STUDIO_API_PROJECT_ID === 'w3b4om14') {
    console.info('Setting up spaces for the Secret Studio...')
    const spaces = [
      {
        name: 'secret',
        title: 'Secret',
        default: true,
        api: {
          projectId: 'w3b4om14',
          dataset: 'secret',
        },
      },
      {
        name: 'development',
        title: 'Development',
        api: {
          projectId: 'h61q9gi9',
          dataset: 'global-development',
        },
      },
      {
        name: 'global',
        title: 'Production',
        api: {
          projectId: 'h61q9gi9',
          dataset: 'global',
        },
      },
    ]
    updatedSanityJson = { ...sanityJson, __experimental_spaces: spaces }
  } else {
    console.info('Configuring sanity.json file...')
    delete sanityJson['__experimental_spaces']
    updatedSanityJson = sanityJson
  }
  fs.writeFile('sanity.json', JSON.stringify(updatedSanityJson, null, 2), (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
}

module.exports = updateSanityJson()
