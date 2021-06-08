import slugify from 'slugify'
import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({ apiVersion: `2021-05-19` })
const slugifyConfig = { lower: true }

function formatSlug(input) {
  if (Array.isArray(input)) {
    return `/${input.join(`/`)}`
  }

  const slug = slugify(input, slugifyConfig)
  return `/${slug}`
}

async function getPrefix(doc, source, ref) {
  const docTitle = doc[source]

  const refQuery = `*[_id == $ref][0].title`
  const refParams = { ref: doc?.[ref]?._ref }

  if (!refParams.ref) {
    return slugify(docTitle, slugifyConfig)
  }

  const refTitle = await client.fetch(refQuery, refParams)

  if (!refTitle) {
    return slugify(docTitle, slugifyConfig)
  }

  const slugArray = [refTitle, docTitle].filter((p) => p).map((p) => slugify(p, slugifyConfig))

  return slugArray
}

export function slugWithRef(source = `title`, ref = ``, fieldset: string) {
  return {
    title: 'Complete URL for this page',
    name: `slug`,
    type: `slug`,
    fieldset: fieldset,
    options: {
      source: (doc) => getPrefix(doc, source, ref),
      slugify: (value) => formatSlug(value),
    },
    validation: (Rule) =>
      Rule.required().custom(({ current }) => {
        if (typeof current === 'undefined') {
          return true
        }

        if (current) {
          if (current.endsWith('/')) {
            return `Slug cannot end with "/"`
          }
        }

        return true
      }),
  }
}
