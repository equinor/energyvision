// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client'

export const isUniqueWithinLocale = async (slug, options) => {
  const { document: sanityDocument } = options

  const baseId = sanityDocument._id
    .split(`.`)
    .filter((idPart) => ![`drafts`, `i18n`, sanityDocument.__i18n_lang].includes(idPart))
    .join(`.`)
  const type = sanityDocument._type

  const query = `*[_type == $type && slug.current == $slug && !(_id match $baseId)]`
  const params = { slug, type, baseId }
  const matchingSlugs = await client.fetch(query, params)

  return !matchingSlugs.length
}
