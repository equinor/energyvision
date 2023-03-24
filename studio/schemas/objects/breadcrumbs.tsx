// eslint-disable-next-line import/no-unresolved
import sanityClient from 'part:@sanity/base/client'
import { CustomValidator, SanityDocument, Rule, SlugParent, SlugSchemaType } from '@sanity/types'
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
    validation: (Rule: Rule) => Rule.custom((value, context) => slugValidator(value, context)),
  }
}

export const slugValidator: CustomValidator = async (value, context) => {
  if (!value) {
    return true
  }
  if (typeof value !== 'object') {
    return 'Breadcrumbs must be an object'
  }

  const slugValue = (value as { current?: string }).current
  if (!slugValue) {
    return 'Breadcrumbs must have a value'
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const slugContext: SlugValidationContext = {
    ...context,
    parent: context.parent as SlugParent,
    type: context.type as SlugSchemaType,
    defaultIsUnique: validateIsUniqueWithinLocale,
  }

  const wasUnique = await validateIsUniqueWithinLocale(slugValue, slugContext)
  if (wasUnique) {
    return true
  }

  return 'Breadcrumbs already in use'
}
