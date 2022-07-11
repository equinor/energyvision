import slugify from 'slugify'

// eslint-disable-next-line import/no-unresolved
import sanityClient from 'part:@sanity/base/client'
import type { Rule } from '@sanity/types'
import SlugInput from '../components/SlugInput'
import { withSlugValidation } from '../validations/validateSlug'

const client = sanityClient.withConfig({ apiVersion: `2021-05-19` })
const slugifyConfig = { lower: true }

function formatSlug(input: any) {
  if (Array.isArray(input)) {
    return `/${input.join(`/`)}`
  }

  const slug = slugify(input, slugifyConfig)
  return `/${slug}`
}

async function getPrefix(doc: any, source: any, ref: any) {
  const docTitle = doc[source]

  // We use the slug as a base, as it's not a one to one relationship between the slug and the title
  const refQuery = `*[_id == $ref][0].slug.current`
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
    description:
      'Danger zone! Do not edit this field directly, use the "Generate" button. We will make if more fool proof with issue #308',
    name: 'slug',
    type: 'slug',
    fieldset: fieldset,
    inputComponent: SlugInput,
    options: withSlugValidation({
      source: (doc: any) => getPrefix(doc, source, ref),
      slugify: (value: any) => formatSlug(value),
    }),
    validation: (Rule: Rule) => Rule.required().custom(({ current }: { current: any }) => SlugValidation(current)),
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
