import { SanityDocument } from 'sanity'
import { sanityClient } from '../../sanity.client'
import { Flags } from '../../src/lib/datasetHelpers'

const client = sanityClient.withConfig({
  apiVersion: '2022-06-22',
})

const validateIsUniqueWithinLocale = async (slug: string, { document }: { document: SanityDocument }) => {
  const baseId = document._id.replace('drafts.', '').substring(0, 36)
  let query: string
  if (document._type.includes('route')) {
    query = `*[slug.current == $slug && _type == $type && !(_id match $baseId + "*") && !(_id in path("drafts.**"))]`
  } else {
    query = `*[slug.current == $slug && !(_id match $baseId + "*") && !(_id in path("drafts.**"))]`
  }
  const params = { type: document._type, baseId, slug }
  const matchingSlugs = await client.fetch(query, params)

  return matchingSlugs.length === 0
}

export const withSlugValidation = (options: any) => {
  return Flags.HAS_SAME_SLUG
    ? {
        ...options,
        isUnique: validateIsUniqueWithinLocale,
      }
    : options
}
