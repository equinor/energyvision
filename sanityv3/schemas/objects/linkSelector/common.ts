import type { Reference, Rule, ValidationContext } from 'sanity'
import { filterByPages, filterByPagesInOtherLanguages } from '../../../helpers/referenceFilters'
import { Flags } from '../../../src/lib/datasetHelpers'
import routes from '../../routes'
import { AnchorLinkDescription } from '../anchorReferenceField'
// eslint-disable-next-line import/no-unresolved
import { defaultLanguage, languages } from '../../../languages'
import { apiVersion } from '../../../sanity.client'
import { EdsBlockEditorIcon } from '../../../icons'
import { external_link, facebook, home, language, link } from '@equinor/eds-icons'
import { ExternalLinkRenderer } from '../../components'
import { LinkIcon } from '@sanity/icons'
import { warnHttpOrNotValidSlugExternal } from '../../validations/validateSlug'

export type LinkType = 'link' | 'reference' | 'homePageLink' | 'referenceToOtherLanguage' | 'socialMediaLink'
export type ReferenceTarget = {
  type: string
}

export type LinkSelector = {
  _type: 'linkSelector'
  reference?: Reference
  label?: string
  ariaLabel?: string
} & Record<string, boolean> // Hack for flags

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

const validation =
  (linkToAnotherLanguage: boolean = false) =>
  (Rule: Rule) =>
    Rule.custom(async (value: any, context: ValidationContext) => {
      if (value?._ref && linkToAnotherLanguage) return true
      const { document } = context as { parent: LinkSelector; document: { lang?: string } }
      if (value?._ref) {
        const referenceLang = await context
          .getClient({ apiVersion: apiVersion })
          .fetch(/* groq */ `*[_id == $id][0]{"lang": coalesce(content->lang, lang)}.lang`, {
            id: value._ref,
          })
        if (document.lang ? document.lang !== referenceLang : defaultLanguage.name !== referenceLang)
          return 'Reference must have the same language as the document'
        else return true
      } else return 'Required'
    })

export const externalLink = {
  name: 'link',
  type: 'object',
  title: 'External link',
  icon: () => EdsBlockEditorIcon(external_link),
  component: ExternalLinkRenderer,
  fields: [
    {
      name: 'href',
      type: 'url',
      validation: (Rule: any) =>
        Rule.uri({ scheme: ['http', 'https', 'tel', 'mailto'] })
          .custom((value: any) => {
            return warnHttpOrNotValidSlugExternal(value)
          })
          .error(),
    },
  ],
}

export const internalReference = {
  name: 'reference',
  title: 'Internal link',
  description: 'Use this field to reference an internal page.',
  type: 'reference',
  validation: validation(),
  icon: () => EdsBlockEditorIcon(link),
  to: defaultReferenceTargets,
  options: {
    filter: filterByPages,
    disableNew: true,
  },
}

export const homepageLink = {
  name: 'homePageLink',
  title: 'Link to Home page',
  description: 'Use this field to add a link to home page.',
  type: 'object',
  icon: () => EdsBlockEditorIcon(home),
  fields: [
    {
      name: 'homePageLanguage',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        list: languages.map((it) => ({ title: it.title, value: it.name })),
      },
    },
  ],
}

export const internalReferenceOtherLanguage = {
  name: 'referenceToOtherLanguage',
  title: 'Internal link to another language',
  description: 'Use this field to reference an internal page in other language.',
  type: 'reference',
  icon: LinkIcon,
  validation: validation(true),
  to: defaultReferenceTargets,
  options: {
    filter: filterByPagesInOtherLanguages,
    disableNew: true,
  },
}

export const socialMediaLink = {
  name: 'socialMediaLink',
  title: 'Social Media link',
  description: 'Use this field to add social media links ',
  type: 'object',
  icon: EdsBlockEditorIcon(facebook),
  fields: [
    {
      name: 'href',
      title: 'URL',
      description: 'Use this field to link to an external site.',
      type: 'url',

      validation: (Rule: Rule) =>
        Rule.uri({ scheme: ['https'] }).custom((value: any) => {
          return warnHttpOrNotValidSlugExternal(value)
        }),
    },
    {
      name: 'someType',
      type: 'string',
      title: 'Type of Some platform',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Twitter', value: 'twitter' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'YouTube', value: 'youtube' },
        ],
        layout: 'radio',
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
}

export const getLinkFields = () => {
  return [
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
      validation: (Rule: Rule) =>
        Rule.custom((value: string) => {
          return value ? true : 'You must add a label'
        }),
    },
    {
      name: 'ariaLabel',
      title: '♿ Screenreader label',
      description: 'A text used for providing screen readers with additional information',
      type: 'string',
    },
  ]
}
