import { getAllRedirects } from '../lib/interface/interface'
import fs from 'node:fs'

const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('Missing SANITY_API_TOKEN')
  process.exit(1)
}

/**
 * Generate a list of urls for e2e tests
 */
getAllRedirects()
  .then((redirects) =>
    fs.writeFileSync(
      './redirects/redirects.json',
      JSON.stringify(
        redirects?.map(({ redirect }: { redirect: any }) => {
          console.log('redirct write to file', redirect)
          return redirect
        }),
      ),
    ),
  )
  .catch((e) => {
    console.error('Failed generating redirects')
    console.error(e)
  })
