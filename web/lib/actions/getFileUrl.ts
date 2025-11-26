"use server"
import { validateCaptcha } from '@/app/api/forms/validateCaptcha'
import { client } from '@/sanity/lib/client'

const getFileUrlQuery = /* groq */ `
*[_type == "sanity.fileAsset" && originalFilename match $fileName]{
    url
}
`

async function fetchUrl(fileName:string){
      try {
    const result = await client.fetch(getFileUrlQuery, {
     fileName,
    })
    const equinorHref = result[0].url.replace('cdn.sanity.io', 'cdn.equinor.com')
    if(!equinorHref)
      console.log('Missing url for download link',fileName)
    return { url: equinorHref }
  } catch (err) {
    return { error: 'Failed to fetch file url' }
  }
}
export async function getFileUrl(fileName:string, frcCaptchaSolution:any): Promise<{url:string}|{error:string}> {
    try {
        const { accept, errorCode } = await validateCaptcha(frcCaptchaSolution)
        if (!accept) {
          console.log(`Anti-robot check failed [code=${errorCode}] for file download`)
          return { error: `Anti-robot check failed [code=${errorCode}], please try again.` }
        }
        const result = await fetchUrl(fileName)
        return result
      } catch (err) {
        console.error('Error occured while attempting to validate captcha', err)
        return { error: 'failed to validate captcha' }
      }
}
