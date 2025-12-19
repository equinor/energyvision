import { getTranslations } from '../sanity/interface/interface'
import fs from 'node:fs'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('Missing SANITY_API_TOKEN')
  process.exit(1)
}

getTranslations(token)
  .then((translations) => {
    const jsonFile = JSON.stringify(
      translations?.data?.map((translation: any) => {
        const key = translation['_id'].replace('text_snippet_', '')
        const translationsOnKey = {}
        Object.entries(translation).forEach(([key, value]) => {
          if (!key.startsWith('_')) {
            return Object.assign(translationsOnKey, {
              ...translationsOnKey,
              [key]: value,
            })
          }
        })
        const putTogether = {
          [key]: translationsOnKey,
        }
        return putTogether
      }),
    )
    return fs.writeFileSync('./sanity/interface/translations.json', jsonFile)
  })
  .catch((e) => {
    console.error('Failed generating translations')
    console.error(e)
  })
