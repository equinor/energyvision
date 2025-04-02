import { Flags } from '../../common/helpers/datasetHelpers'

const REQUIRES_SLUG = ['news', 'localNews', 'magazine']

export default function preview(req, res) {
  if (!req?.query?.secret) {
    return res.status(401).json({ message: 'No secret token' })
  }

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid secret token' })
  }

  if (!req.query.slug && !req.query.id) {
    console.log(req.query)
    return res.status(400).json({ message: 'No slug or id', data: req.query })
  }

  if (!req.query.perspective) {
    console.log(req.query)
    return res.status(400).json({ message: 'Missing perspective to preview', data: req.query })
  }

  if (!req.query.slug && (REQUIRES_SLUG.includes(req.query.type) || req.query.type?.includes('route'))) {
    return res.status(400).json({ message: 'The document needs a slug before it can be previewed.' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({ perspective: req.query.perspective })

  const pathname = req?.query?.id ? `/${req.query.id}` : req?.query?.slug ?? '/'
  const locale = req?.query?.locale ? `/${req?.query?.locale}` : ''
  const baseUrl = '//' + req?.headers?.host
  const type = req.query.type

  let url = ''
  if (Flags.HAS_NEWSROOM && type == 'newsroom') {
    url = locale === 'no' ? `${baseUrl}/no/nyheter` : `${baseUrl}/news`
  } else if (Flags.HAS_MAGAZINE_INDEX && type == 'magazineIndex') {
    url = locale === 'no' ? `${baseUrl}/no/magasin` : `${baseUrl}/magazine`
  } else if (type == 'pageNotFound') {
    url = `${baseUrl}${locale}/404`
  } else if (type == 'internalServerError') {
    url = `${baseUrl}${locale}/500`
  } else {
    url = `${baseUrl}${locale}${pathname}`
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  console.log('Everything is fine, lets redirect', url)

  res.writeHead(307, { Location: url ?? `/` })

  return res.end()
}
