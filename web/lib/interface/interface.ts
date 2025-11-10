import { getClient } from '../../lib/sanity.server'
import { groq } from 'next-sanity'

export const getAllRedirects = async () => {
  try {
    const results = await getClient(false).fetch(
      groq`*[_type == "externalRedirect" || _type == "redirect" && !(_id in path('drafts.**'))]{
      "lang": lang,
      from,
      "to": select(_type == "externalRedirect" => to, to->slug.current)
      }`,
    )
    return {
      isSuccess: true,
      data: results,
    }
  } catch (error) {
    console.log('Error when fetching from Sanity', error)
    return {
      isError: true,
      data: [],
    }
  }
}
