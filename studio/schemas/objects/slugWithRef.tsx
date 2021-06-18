import slugify from 'slugify'
import { SchemaType } from '../../types'
// eslint-disable-next-line import/no-unresolved
//eslint-disable-next-line
import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({ apiVersion: `2021-05-19` })
const slugifyConfig = { lower: true }

function formatSlug(input: any) {
  if (Array.isArray(input)) {
    return `/${input.join(`/`)}`
  }

  const slug = slugify(input, slugifyConfig)
  return `/${slug}`
}

async function getPrefix(doc: any, source: any, language: string, ref: any) {
  const docTitle = doc[source][language]

  // We use the slug as a base, as it's not a one to one relationship between the slug and the title
  const refQuery = `*[_id == $ref][0].slug.[$language].current`
  const refParams = { ref: doc?.[ref]?._ref, language: language }

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
    description:
      'Danger zone! Do not edit this field directly, use the "Generate" button. We will make if more fool proof with issue #308',
    name: `slug`,
    type: `object`,
    fields: [
      {
        title: 'English',
        name: 'en_gb',
        type: 'slug',
        options: {
          source: (doc: any) => getPrefix(doc, source, 'en_gb', ref),
          slugify: (value: any) => formatSlug(value),
        },
        validation: (Rule: SchemaType.ValidationRule) =>
          Rule.required().custom(({ current }: { current: any }) => SlugValidation(current)),
      },
      {
        title: 'Norwegian',
        name: 'nb_no',
        type: 'slug',
        options: {
          source: (doc: any) => getPrefix(doc, source, 'nb_no', ref),
          slugify: (value: any) => formatSlug(value),
        },
        validation: (Rule: SchemaType.ValidationRule) =>
          Rule.required().custom(({ current }: { current: any }) => SlugValidation(current)),
      },
    ],
    fieldset: fieldset,
  }
}

const SlugValidation = (current: any) => {
  if (typeof current === 'undefined') {
    return true
  }

  if (current) {
    if (current.endsWith('/')) {
      return `Slug cannot end with "/"`
    }
  }

  return true
}
