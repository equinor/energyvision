import { client } from '@/sanity/lib/client'
import { validateFormRequest } from '../../forms/validateFormRequest'

const getFileUrlQuery = /* groq */ `
*[_type == "sanity.fileAsset" && originalFilename match $fileName]{
    url
}
`

export async function POST(req: Request) {
  const body = await req.json()
  const result = await validateFormRequest(req.method, body, 'download url')
  if (result.status !== 200) {
    return Response.json({ msg: result.message }, { status: result.status })
  }

  try {
    const result = await client.fetch(getFileUrlQuery, {
      fileName: body.fileName,
    })
    const equinorHref = result[0].url.replace('cdn.sanity.io', 'cdn.equinor.com')
    console.log('Returning fileUrl ', equinorHref)

    return Response.json({ url: equinorHref }, { status: 200 })
  } catch (err) {
    return Response.json({ error: 'Failed to fetch file url' }, { status: 500 })
  }
}
