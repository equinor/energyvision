import { promises as fs } from 'fs'

async function extractUrls(file) {
  try {
    const nodes = await fs.readFile(file, 'utf8')
    const json = JSON.parse(nodes)
    const urls = json.urlset.url.map((url) => url.loc)
    const unique = new Set(urls)
    await fs.writeFile(
      `${file.split('.')[0]}.urls.json`,
      JSON.stringify(urls, null, 2),
      'utf8',
    )
    console.info(`Number of unique urls in ${file}: ${unique.size}`)
  } catch (error) {
    console.error(error)
  }
}

extractUrls('sitemap_en.json')
extractUrls('sitemap_no.json')

