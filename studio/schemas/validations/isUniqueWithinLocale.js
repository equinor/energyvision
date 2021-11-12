// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client'

export const isUniqueWithinLocale = (slug, options) => {
    const {document} = options
  
    const id = document._id.replace(/^drafts\./, '')
    const params = {
      draft: `drafts.${id}`,
      published: id,
      lang: document._lang,
      slug
    }
  
    const query = `!defined(*[!(_id in [$draft, $published]) &&
                    _lang == $lang &&
                    slug.current == $slug][0]._id)`
  
    return client.fetch(query, params)
  }