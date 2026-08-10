import fs from 'node:fs'
import dotenv from 'dotenv'
import { getAllRedirects } from '../sanity/interface/redirects'

dotenv.config({ path: '.env.local' })

const generateRedirects = async () => {
  try {
    const redirects = await getAllRedirects()
    fs.writeFileSync(
      './sanity/interface/redirects.json',
      JSON.stringify(redirects, null, 2),
    )
  } catch (error) {
    console.error('Failed generating redirects')
    console.error(error)
    process.exit(1)
  }
}

generateRedirects()
