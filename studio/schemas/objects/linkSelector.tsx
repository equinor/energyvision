import { link } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { validateStaticUrl } from '../validations/validateStaticUrl'
import { validateInternalOrExternalUrl } from '../validations/validateInternalOrExternalUrl'
import type { Rule, ValidationContext, Reference } from '@sanity/types'

export type ReferenceTarget = {
  type: string
}

export type LinkSelector = {
  _type: 'linkSelector'
  isStatic: boolean
  reference?: Reference
  url?: string
  label?: string
  ariaLabel?: string
}

const defaultReferenceTargets: ReferenceTarget[] = [
  {
    type: 'news',
  },
  { type: 'route_en_GB' },
  { type: 'route_nb_NO' },
]

const LinkField = {
  name: 'linkSelector',
  title: 'Link',
  type: 'object',
  description: 'Select either an internal or external URL',
  fieldsets: [
    {
      name: 'label',
      title: 'Label',
      description: 'The label that the link/button should have.',
    },
  ],
  fields: [
    {
      name: 'isStatic',
      title: 'Is static page',
      description: `While migrating, content can be available as static pages generated from the old CMS. If this is 
      the case for this menu item, it's important to register the url in the static input field`,
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'reference',
      title: 'Internal link',
      description: 'Use this field to reference an internal page.',
      type: 'reference',
      validation: (Rule: Rule) =>
        Rule.custom((value: any, context: ValidationContext) => {
          const { parent } = context as { parent: LinkSelector }
          return validateInternalOrExternalUrl(parent?.isStatic, value, parent.url)
        }),
      to: defaultReferenceTargets,
      options: {
        filter: ({ document }: { document: any }) => ({
          filter: `_type == $routeLang || _type == 'news'`,
          params: { routeLang: `route_${document._lang}` },
        }),
      },
      hidden: ({ parent }: { parent: LinkSelector }) => parent?.isStatic === true,
    },
    {
      name: 'url',
      title: 'External URL',
      description: 'Use this field to link to an external site.',
      type: 'url',
      validation: (Rule: Rule) =>
        Rule.uri({ scheme: ['http', 'https', 'tel', 'mailto'] }).custom((value: any, context: ValidationContext) => {
          const { parent } = context as { parent: LinkSelector }
          return validateInternalOrExternalUrl(parent?.isStatic, value, parent.reference)
        }),
      hidden: ({ parent }: { parent: LinkSelector }) => parent?.isStatic === true,
    },
    {
      name: 'staticUrl',
      title: 'Static URL',
      type: 'string',
      description: `The URL for the static page. Please don't add language information (no/en) or .html`,
      placeholder: '/careers/experienced-professionals',
      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext) => {
          return validateStaticUrl(value, context)
        }),
      hidden: ({ parent }: { parent: LinkSelector }) => parent?.isStatic === false || parent?.isStatic === undefined,
    },
    {
      name: 'label',
      title: 'Visible label',
      description: 'The visible text on the link/button.',
      type: 'string',
      fieldset: 'label',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'ariaLabel',
      title: '♿ Screenreader label',
      description: 'A text used for providing screen readers with additional information',
      type: 'string',
      fieldset: 'label',
    },
  ],
  preview: {
    select: {
      title: 'label',
      url: 'url',
    },
    prepare({ title, url }: { title: string; url: string | null }) {
      return {
        title: title,
        subtitle: `${url ? 'External' : 'Internal'} link`,
        media: EdsIcon(link),
      }
    },
  },
}

// Used to generate a linkSelector field with dynamic reference targets
// Might be a better way of doing this, but doesn't seem like we can pass
// params to a schema field
export const FilteredLinkField = (
  fieldName = 'link',
  referenceTargets: ReferenceTarget[] = defaultReferenceTargets,
) => {
  const FilteredLink = { ...LinkField }
  FilteredLink.name = fieldName
  FilteredLink.fields[1].to = referenceTargets

  return FilteredLink
}

export default LinkField
