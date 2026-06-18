import { groq } from 'next-sanity'
import { noCdnClient } from './client.server'


export const getTranslations = async (token: string,) => {
  const client =  noCdnClient(token)
  try {
    const results = await client.fetch(
      groq`  *[_type == "textSnippet"]`,
    )
    return {
      isSuccess: true,
      data: results,
    }
  } catch (error) {
    console.log('Error when fetching translations from Sanity', error)
    return {
      isError: true,
      data: [],
    }
  }
}