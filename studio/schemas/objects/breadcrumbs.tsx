// eslint-disable-next-line import/no-unresolved
import sanityClient from 'part:@sanity/base/client'
import { SanityDocument } from '@sanity/types'
import slugify from 'slugify'
import SlugInput from '../components/SlugInput'

const client = sanityClient.withConfig({
  apiVersion: '2022-06-22',
})

const validateIsUniqueWithinLocale = async (breadcrumbs: string, { document }: { document: SanityDocument }) => {
  const baseId = document._id.replace('drafts.', '').substring(0, 36)
  const query = /* groq */ `*[_type == $type && breadcrumbs.current == $breadcrumbs && !(_id match $baseId + "*") && !(_id in path("drafts.**"))]`

  const params = { type: document._type, baseId, breadcrumbs }
  const matchingBreadcrumbs = await client.fetch(query, params)

  return matchingBreadcrumbs.length === 0
}

const formatBreadcrumbs = (value: string) =>
  value
    .split('/')
    .map((i) => slugify(i, { lower: true }))
    .filter((e) => e)
    .join('/')

export function breadcrumbs(source = `breadcrumbsInput`, fieldset: string) {
  return {
    title: 'Custom breadcrumbs for this page',
    name: 'breadcrumbs',
    type: 'slug',
    inputComponent: SlugInput,
    fieldset: fieldset,
    options: {
      source: source,
      slugify: formatBreadcrumbs,
      isUnique: validateIsUniqueWithinLocale,
    },
  }
}
