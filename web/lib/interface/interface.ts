import { getServerClient } from './client.server'

export const getAllRedirects = async () => {
  const client = getServerClient()

  try {
    const results = await client.fetch(
      /* groq */
      `*[_type == "externalRedirect" || _type == "redirect" && ${noDrafts}]{
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
