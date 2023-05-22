import slugify from 'slugify'

import type { Rule } from 'sanity'
import SlugInput, { SlugInputProps } from '../components/SlugInput'
import { withSlugValidation } from '../validations/validateSlug'

const slugifyConfig = { lower: true }

function formatSlug(input: any) {
  if (Array.isArray(input)) {
    return `/${input.join(`/`)}`
  }

  const slug = slugify(input, slugifyConfig)
  return `/${slug}`
}

export function slugWithRef(source = `title`, ref = ``, fieldset: string) {
  return {
    title: 'Complete URL for this page',
    name: 'slug',
    type: 'slug',
    fieldset: fieldset,
    components: {
      input: (props: SlugInputProps) => <SlugInput {...props} prefix={ref} />,
    },
    options: withSlugValidation({
      source: (doc: any) => slugify(doc[source], slugifyConfig),
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
