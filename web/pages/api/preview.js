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
    return res.status(401).json({ message: 'No slug or id', data: req.query })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  const pathname = req?.query?.id ? `/${req.query.id}` : req?.query?.slug ?? '/'
  const url = '//' + req?.headers?.host + pathname

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  console.log('Everything is fine, lets redirect', url)

  res.writeHead(307, { Location: url ?? `/` })

  return res.end()
}
