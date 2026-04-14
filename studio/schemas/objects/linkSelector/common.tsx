import { external_link, facebook, home, link } from '@equinor/eds-icons'
import { LinkIcon } from '@sanity/icons'
import { Card, Flex, Select } from '@sanity/ui'
import { useCallback, useMemo } from 'react'
import { MdOutlineAnchor } from 'react-icons/md'
import type { Reference, Rule, ValidationContext } from 'sanity'
import { set, useFormValue } from 'sanity'
import {
  filterByPages,
  filterByPagesInOtherLanguages,
} from '../../../helpers/referenceFilters'
import { EdsBlockEditorIcon } from '../../../icons'
// eslint-disable-next-line import/no-unresolved
import { defaultLanguage, languages } from '../../../languages'
import { apiVersion } from '../../../sanity.client'
import { Flags } from '../../../src/lib/datasetHelpers'
import { ExternalLinkRenderer } from '../../components'
import routes from '../../routes'
import { warnHttpOrNotValidSlugExternal } from '../../validations/validateSlug'

export const PageAnchorInput = (props: any) => {
  const { onChange, value = '' } = props
  const document = useFormValue([])

  const anchorLinkComponentReferences = useMemo(() => {
    return document
      ? document?.content
          .filter((item: any) => item?.anchor || item?.anchorReference)
          .map((item: any) => item.anchor || item.anchorReference)
      : []
  }, [document])

  const handleChange = useCallback(
    (event: any) => {
      const nextValue = event.currentTarget.value
      onChange(set(nextValue))
    },
    [onChange],
  )

  return (
    <Card padding={3}>
      <Flex direction='column' justify='center'>
        <label htmlFor='anchorReferenceList' className='text-base'>
          Select from Anchor Link components in this document
        </label>
        <Select id='anchorReferenceList' value={value} onChange={handleChange}>
          {anchorLinkComponentReferences.map((referenceString: any) => (
            <option key={referenceString} value={referenceString}>
              {referenceString}
            </option>
          ))}
        </Select>
      </Flex>
    </Card>
  )
}

export type LinkType =
  | 'link'
  | 'reference'
  | 'homePageLink'
  | 'referenceToOtherLanguage'
  | 'socialMediaLink'
  | 'pageAnchor'
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
].filter(e => e)

const defaultReferenceTargets: ReferenceTarget[] = [
  ...(types as ReferenceTarget[]),
  ...routes,
]

const validation =
  (linkToAnotherLanguage = false) =>
  (Rule: Rule) =>
    Rule.custom(async (value: any, context: ValidationContext) => {
      if (value?._ref && linkToAnotherLanguage) return true
      const { document } = context as {
        parent: LinkSelector
        document: { lang?: string }
      }
      if (value?._ref) {
        const referenceLang = await context
          .getClient({ apiVersion: apiVersion })
          .fetch(
            /* groq */ `*[_id == $id][0]{"lang": coalesce(content->lang, lang)}.lang`,
            {
              id: value._ref,
            },
          )
        if (
          document.lang
            ? document.lang !== referenceLang
            : defaultLanguage.name !== referenceLang
        )
          return 'Reference must have the same language as the document'
        return true
      }
      return 'Required'
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
          .required()
          .error(),
    },
  ],
  preview: {
    select: {
      href: 'href',
    },
    prepare({ href }: { href: string }) {
      return {
        title: href || 'Add external link',
        media: EdsBlockEditorIcon(external_link),
      }
    },
  },
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
  /*   components: {
    preview: InternalLinkPreview,
  }, */
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
        list: languages.map(it => ({ title: it.title, value: it.name })),
      },
      initialValue: defaultLanguage.name,
    },
  ],
  preview: {
    select: {
      title: 'homePageLanguage',
    },
    prepare({ title }: { title: string }) {
      return {
        title: title
          ? `Linking to ${languages.find(it => it.name === title)?.title} home page`
          : 'Select language of the home page',
      }
    },
  },
}

export const internalReferenceOtherLanguage = {
  name: 'referenceToOtherLanguage',
  title: 'Internal link to another language',
  description:
    'Use this field to reference an internal page in other language.',
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

export const anchorReference = {
  name: 'anchorReference',
  title: 'Anchor reference',
  type: 'anchorReferenceField',
  hidden: ({ value }: any) => {
    return !value
  },
  description: () => (
    <span style={{ display: 'block', wordWrap: 'break-word' }}>
      Deprecated - use optional direct page anchor type.
    </span>
  ),
}

export const pageAnchor = {
  name: 'pageAnchor',
  type: 'object',
  title: 'Page anchor',
  icon: () => <MdOutlineAnchor />,
  fields: [
    {
      name: 'anchorId',
      type: 'string',
      components: {
        input: PageAnchorInput,
      },
    },
  ],
  preview: {
    select: {
      anchorId: 'anchorId',
    },
    prepare({ anchorId }: { anchorId: string }) {
      return {
        title: `#${anchorId}`,
        subTitle: 'Page anchor',
        media: MdOutlineAnchor,
      }
    },
  },
}
