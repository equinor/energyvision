// eslint-disable-next-line import/no-unresolved
import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({ apiVersion: `2021-05-19` })

export const isUniqueWithinLocale = async (slug, options) => {
  const { document: sanityDocument } = options
  const baseId = '*' + sanityDocument._id.replace('drafts.', '').split('_')[0] + '*'
  const type = sanityDocument._type
  const query = `*[_type == $type && slug.current == $slug && !(_id match $baseId)]`
  const params = { slug, type, baseId }
  const matchingSlugs = await client.fetch(query, params)

  return !matchingSlugs.length
}
