import { getTopicConfig } from '../../helpers/topics'
import { SchemaType } from '../../types'
import type { Topics } from '../../helpers/topics'

function slugify(input: string) {
  return input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
}

function formatSlug(input: string, slugStart: string) {
  // Really bad code coming up
  const test = input.split(';')

  if (test[0] === 'true') {
    return slugStart.slice(0, -1)
  }

  if (test[1] === 'undefined') {
    return slugStart
  }
  const slug = slugify(test[1])
  return slugStart + slug
}

// @TODO: Do something more clever with types if we'll use this for the news articles

export function slugWithType(prefix: Topics, fieldset = 'slug') {
  const topic = getTopicConfig(prefix)

  const slugStart = prefix ? `/${topic?.slug.en}/` : `/`

  return {
    name: `slug`,
    type: `slug`,
    title: 'Full slug',
    // readOnly: true,
    fieldset: fieldset,

    options: {
      source: (doc: any) => `${doc.isLandingPage};${doc.topicSlug}`,
      slugify: (value: any) => formatSlug(value, slugStart),
    },
    validation: (Rule: SchemaType.ValidationRule) =>
      Rule.required().custom((slug: any, context: any) => {
        const current = slug && slug.current
        const isLandingPage = context.document.isLandingPage
        if (slug && typeof slug.current === 'undefined') {
          return true
        }

        if (slug && slug.current) {
          if (!isLandingPage && !current.startsWith(slugStart)) {
            return `Slug must begin with "${slugStart}". Click "Generate" to reset.`
          }

          if (current.slice(slugStart.length).split('').includes('/')) {
            return `Slug cannot have another "/" after "${slugStart}"`
          }

          if (current === slugStart) {
            return `Slug cannot be empty`
          }

          if (current.endsWith('/')) {
            return `Slug cannot end with "/"`
          }
        }

        return true
      }),
  }
}
