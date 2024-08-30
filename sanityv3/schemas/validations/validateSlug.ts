import { ValidationContext } from 'sanity'
import { apiVersion } from '../../sanity.client'
import { Flags } from '../../src/lib/datasetHelpers'

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

const stringIsSlug = /^[a-z0-9]+(-[a-z0-9]+)*$/
const httpRegex = /^(?:http:\/\/|).*$/
export const warnHttpOrNotValidSlugExternal = (slug: string, context: ValidationContext) => {
  const isHttp = httpRegex.test(slug)
  const validSlug = stringIsSlug.test(slug)
  let message = ''
  if (isHttp) {
    message = 'Use https in url. '
  }
  if (!validSlug) {
    message = message.concat(`Should only contain lowercase letters [a-z], numbers [0-9], and dashes ("-")`)
  }
  return isHttp || !validSlug ? message : true
}
