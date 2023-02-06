import { link } from '@equinor/eds-icons'
import type { Reference, Rule, ValidationContext } from '@sanity/types'
import { filterByPages, filterByPagesInOtherLanguages } from '../../helpers/referenceFilters'
import { EdsIcon } from '../../icons'
import { Flags } from '../../src/lib/datasetHelpers'
import routes from '../routes'
import { validateInternalOrExternalUrl } from '../validations/validateInternalOrExternalUrl'
import { AnchorLinkDescription } from './anchorReferenceField'
// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client'
import { validateRequiredIfVisible } from '../validations/validateRequiredIfVisible'

export type ReferenceTarget = {
  type: string
}

export type LinkSelector = {
  _type: 'linkSelector'
  linkToOtherLanguage?: boolean
  reference?: Reference
  referenceToOtherLanguage?: Reference
  url?: string
  label?: string
  ariaLabel?: string
} & {
  // Hack for promotion type
  isLink?: boolean
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

export const getLinkSelectorFields = (labelFieldset: string | undefined, checkForIsLink = false) => {
  const isLinkCheck = (parent: LinkSelector) => checkForIsLink && !parent?.isLink
  return [
    {
      name: 'linkToOtherLanguage',
      type: 'boolean',
      title: 'Link to a different language',
      description: 'Use this if you want to create a link to a page of a different language',
      hidden: ({ parent }: { parent: LinkSelector }) => !Flags.IS_DEV || (Flags.IS_DEV && isLinkCheck(parent)),
    },
    {
      name: 'reference',
      title: 'Internal link',
      description: 'Use this field to reference an internal page.',
      type: 'reference',
      hidden: ({ parent }: { parent: LinkSelector }) =>
        parent.linkToOtherLanguage || (Flags.IS_DEV && isLinkCheck(parent)),
      validation: (Rule: Rule) =>
        Rule.custom(async (value: any, context: ValidationContext) => {
          const { parent, document } = context as { parent: LinkSelector; document: { _lang?: string } }
          if (Flags.IS_DEV && isLinkCheck(parent)) return true
          if (parent.linkToOtherLanguage) return true
          if (Flags.IS_DEV && value?._ref) {
            const referenceLang = await client.fetch(
              /* groq */ `*[_id == $id][0]{"lang": coalesce(content->_lang, _lang)}.lang`,
              {
                id: value._ref,
              },
            )
            if (document._lang !== referenceLang) return 'Reference must have the same language as the document'
          }
          return validateInternalOrExternalUrl(value, parent.url)
        }),
      to: defaultReferenceTargets,
      options: {
        filter: filterByPages,
        disableNew: true,
      },
    },
    {
      name: 'referenceToOtherLanguage',
      title: 'Internal link',
      description: 'Use this field to reference an internal page.',
      type: 'reference',
      hidden: ({ parent }: { parent: LinkSelector }) =>
        !parent.linkToOtherLanguage || (Flags.IS_DEV && isLinkCheck(parent)),
      validation: (Rule: Rule) =>
        Rule.custom((value: any, context: ValidationContext) => {
          const { parent } = context as { parent: LinkSelector }
          if (Flags.IS_DEV && isLinkCheck(parent)) return true
          if (!parent.linkToOtherLanguage) return true
          return validateInternalOrExternalUrl(value, parent.url)
        }),
      to: defaultReferenceTargets,
      options: {
        filter: filterByPagesInOtherLanguages,
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
          if (Flags.IS_DEV && isLinkCheck(parent)) return true
          const connectedField = parent.linkToOtherLanguage ? parent.referenceToOtherLanguage : parent.reference
          return validateInternalOrExternalUrl(value, connectedField)
        }),
      hidden: ({ parent }: { parent: LinkSelector }) => isLinkCheck(parent),
    },
    {
      name: 'anchorReference',
      title: 'Anchor reference',
      type: 'anchorReferenceField',
      description: AnchorLinkDescription(),
      hidden: ({ parent }: { parent: LinkSelector }) => isLinkCheck(parent),
    },
    {
      name: 'label',
      title: 'Visible label',
      description: 'The visible text on the link/button.',
      type: 'string',
      fieldset: labelFieldset,
      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext) => {
          const { parent } = context as { parent: LinkSelector }
          if (Flags.IS_DEV && isLinkCheck(parent)) return true
          return validateRequiredIfVisible(!isLinkCheck(parent), value, 'You must add a label')
        }),
      hidden: ({ parent }: { parent: LinkSelector }) => isLinkCheck(parent),
    },
    {
      name: 'ariaLabel',
      title: '♿ Screenreader label',
      description: 'A text used for providing screen readers with additional information',
      type: 'string',
      fieldset: labelFieldset,
      hidden: ({ parent }: { parent: LinkSelector }) => isLinkCheck(parent),
    },
  ]
}

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
  fields: [...getLinkSelectorFields('label')],
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
