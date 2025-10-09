import { ValidationContext } from 'sanity'
import { apiVersion } from '../../sanity.client'
import { Flags } from '../../src/lib/datasetHelpers'
import { isEquinorUrl } from './checkEquinorUrls'

const validateIsUniqueWithinLocale = async (slug: string, context: ValidationContext) => {
  const { document, getClient } = context

  if (!document) return
  const id = document._id.replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    type: document._type,
    language: document.lang || '',
  }

  let query: string
  if (document._type.includes('route')) {
    query = /* groq */ `!defined(*[
      !(_id in [$draft, $published]) &&
      slug.current == $slug && 
      _type == $type
    ][0]._id)`
  } else {
    query = /* groq */ `!defined(*[
      !(_id in [$draft, $published]) &&
      slug.current == $slug && 
      lang == $language
    ][0]._id)`
  }
  const result = await getClient({ apiVersion: apiVersion }).fetch(query, params)
  return result
}

export const withSlugValidation = (options: any) => {
  return Flags.HAS_SAME_SLUG
    ? {
        ...options,
        isUnique: validateIsUniqueWithinLocale,
      }
    : options
}

const stringIsSlug =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,256}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
const httpRegex = /^http:\/\/[^\s]+$/
export const warnHttpOrNotValidSlugExternal = (slug: string) => {
  if (!slug) return true
  if (!slug.startsWith('http')) return true // ignore mailto , tel
  const isHttp = httpRegex.test(slug)
  const validSlug = stringIsSlug.test(slug)
  const slugWithOutQueryParam = slug.split('?')[0]
  const isPotentialArchivedNewsUrl = isEquinorUrl(slug) && Flags.HAS_ARCHIVED_NEWS && slug.includes("/news")
  const isInvalidEquinorUrl = slugWithOutQueryParam !== slugWithOutQueryParam.toLowerCase() && isEquinorUrl(slug)

  if (isHttp) {
    return 'Use https in url. '
  }
  if (!validSlug) {
    return `Not a valid url.`
  }
  if(isPotentialArchivedNewsUrl){
      return true
  }

  if (isInvalidEquinorUrl) {
    return 'Equinor urls should contain lowercase letters only.'
  }
  return true
}
