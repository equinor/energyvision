/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line import/no-unresolved
import sanityClient from 'part:@sanity/base/client'
import {
  CustomValidator,
  SanityDocument,
  Rule,
  SlugParent,
  SlugSchemaType,
  Slug,
  ValidationContext,
} from '@sanity/types'
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
    description: 'Use the "generate" button to create the breadcrumbs.',
    name: 'breadcrumbs',
    type: 'slug',
    inputComponent: SlugInput,
    fieldset: fieldset,
    options: {
      source: source,
      slugify: formatBreadcrumbs,
      isUnique: validateIsUniqueWithinLocale,
    },
    validation: (Rule: Rule) => Rule.custom((value: Slug, context: ValidationContext) => slugValidator(value, context)),
  }
}

const checkSlugParts = async (slug: string): Promise<string | null> => {
  const slugPartExists =
    (await client.fetch(`*[slug.current == $slug && !(_id in path("drafts.**"))]`, { slug: `/${slug}` })).length > 0

  if (!slugPartExists) {
    return `'${slug}' is not a valid route`
  }

  return null
}

// @ts-ignore - possible error in @sanity/types with CustomValidatorResult
export const slugValidator: CustomValidator = async (slug: Slug, context) => {
  if (!slug) {
    return true
  }

  const slugValue = slug.current

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

  const breadcrumbsIsUnique = await validateIsUniqueWithinLocale(slugValue, slugContext)
  if (!breadcrumbsIsUnique) {
    return 'Breadcrumbs already in use'
  }

  const slugParts = slugValue.split('/')

  const hasDuplicates = slugParts.some((val, i) => slugParts.indexOf(val) !== i)
  if (hasDuplicates) {
    return 'Breadcrumbs cannot contain duplicate parts'
  }

  const hasInvalidParts = (await Promise.all(slugParts.map(checkSlugParts))).filter((e) => e)
  if (hasInvalidParts.length > 0) {
    return hasInvalidParts as string[]
  }

  return true
}
