// eslint-disable-next-line import/no-unresolved
import sanityClient from 'part:@sanity/base/client'
import { SanityDocument } from '@sanity/types'

const client = sanityClient.withConfig({
  apiVersion: '2022-06-22',
})

export const validateIsUniqueWithinLocale = async (slug: string, { document }: { document: SanityDocument }) => {
  const baseId = document._id.replace('drafts.', '').substring(0, 36)
  const query = `*[slug.current == $slug && !(_id match $baseId + "*") && !(_id in path("drafts.**"))]`
  const params = { baseId: baseId, slug: slug }
  const matchingSlugs = await client.fetch(query, params)
  console.log(baseId)
  console.log(matchingSlugs)
  return matchingSlugs.length === 0
}
