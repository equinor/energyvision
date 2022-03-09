import { getNameFromLocale } from '../../lib/localization'
import { sanityClient } from '../../lib/sanity.server'
import { groq } from 'next-sanity'

const getTopicRoutesForLocale = async (locale: string) => {
  const lang = getNameFromLocale(locale)
  const data = await sanityClient.fetch(
    groq`*[_type match "route_" + $lang + "*" && defined(slug.current)][].slug.current`,
    {
      lang,
    },
  )

  return data
}

export default getTopicRoutesForLocale
