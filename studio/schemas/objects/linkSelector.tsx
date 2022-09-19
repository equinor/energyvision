import { link } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { validateInternalOrExternalUrl } from '../validations/validateInternalOrExternalUrl'
import type { Rule, ValidationContext, Reference } from '@sanity/types'
import routes from '../routes'
import { AnchorLinkDescription } from './anchorReferenceField'
import { filterByPages } from '../../helpers/referenceFilters'
import { Flags } from '../../src/lib/datasetHelpers'

export type ReferenceTarget = {
  type: string
}

export type LinkSelector = {
  _type: 'linkSelector'
  reference?: Reference
  url?: string
  label?: string
  ariaLabel?: string
}

const types = [
  Flags.HAS_NEWS && {
    type: 'news',
  },
  Flags.HAS_NEWSROOM && {
    type: 'newsroom',
  },
  Flags.HAS_LOCAL_NEWS && {
    type: 'localNews',
  },
  Flags.HAS_MAGAZINE && {
    type: 'magazine',
  },
  Flags.HAS_MAGAZINE && {
    type: 'magazineIndex',
  },
].filter((e) => e)

const defaultReferenceTargets: ReferenceTarget[] = [...(types as ReferenceTarget[]), ...routes]

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
      name: 'reference',
      title: 'Internal link',
      description: 'Use this field to reference an internal page.',
      type: 'reference',
      validation: (Rule: Rule) =>
        Rule.custom((value: any, context: ValidationContext) => {
          const { parent } = context as { parent: LinkSelector }
          return validateInternalOrExternalUrl(value, parent.url)
        }),
      to: defaultReferenceTargets,
      options: {
        filter: filterByPages,
        disableNew: true,
      },
    },
    {
      name: 'url',
      title: 'External URL',
      description: 'Use this field to link to an external site.',
      type: 'url',
      validation: (Rule: Rule) =>
        Rule.uri({ scheme: ['http', 'https', 'tel', 'mailto'] }).custom((value: any, context: ValidationContext) => {
          const { parent } = context as { parent: LinkSelector }
          return validateInternalOrExternalUrl(value, parent.reference)
        }),
    },
    {
      name: 'anchorReference',
      title: 'Anchor reference',
      type: 'anchorReferenceField',
      description: AnchorLinkDescription(),
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
