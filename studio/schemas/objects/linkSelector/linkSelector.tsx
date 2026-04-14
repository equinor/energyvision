import { link } from '@equinor/eds-icons'
import { MdOutlineAnchor } from 'react-icons/md'
import type { Rule } from 'sanity'
import blocksToText from '@/helpers/blocksToText'
import { capitalizeFirstLetter } from '@/helpers/formatters'
import { EdsBlockEditorIcon } from '@/icons'
import { apiVersion } from '@/sanity.client'
import singleItemArray from '../singleItemArray'
import {
  anchorReference,
  externalLink,
  homepageLink,
  internalReference,
  internalReferenceOtherLanguage,
  type LinkType,
  pageAnchor,
  socialMediaLink,
} from './common'

const defaultLinks = [
  'link',
  'reference',
  'referenceToOtherLanguage',
  'homePageLink',
  'pageAnchor',
] as LinkType[]

const linkSelector = (
  linkTypes?: LinkType[],
  hidden = false,
  /**
   *  Will show the label field when true
   */
  includeLabel = true,
  /**
   * Label is considered optional
   */
  labelIsOptional = false,
) => {
  return {
    name: 'linkSelector',
    title: 'Link',
    type: 'object',
    hidden: hidden,
    fields: [
      singleItemArray(
        {
          name: 'link',
          type: 'array',
          of: [
            externalLink,
            internalReference,
            internalReferenceOtherLanguage,
            homepageLink,
            socialMediaLink,
            pageAnchor,
          ].filter(it => {
            const types = linkTypes
              ? linkTypes.includes(it.name as LinkType)
              : defaultLinks.includes(it.name as LinkType)
            return types
          }),
        },
        true,
      ),
      {
        name: 'label',
        title: 'Label',
        description:
          'Required for external urls and homepage links. Optional on internal links if referenced item has a title',
        type: 'string',
        validation: (Rule: Rule) =>
          Rule.custom(async (value: string, context: any) => {
            const { parent } = context
            let hasReferenceTitle = false

            if (
              parent?.link?.[0]?._type === 'referenceToOtherLanguage' ||
              parent?.link?.[0]?._type === 'reference'
            ) {
              //If internal link get title to make label optional if reference has this
              const referencedTitle = await context
                .getClient({ apiVersion: apiVersion })
                .fetch(
                  /* groq */ `*[_id == $id][0]{"title": coalesce(content->title, title)}.title`,
                  {
                    id: parent?.link?.[0]._ref,
                  },
                )
              hasReferenceTitle = !!referencedTitle
            }

            if (
              // Do not warn for hidden label or internal link with optional label
              !includeLabel ||
              (labelIsOptional && parent?.link?.[0]?._type !== 'link') ||
              ((parent?.link?.[0]?._type === 'referenceToOtherLanguage' ||
                parent?.link?.[0]?._type === 'reference') &&
                hasReferenceTitle)
            ) {
              return true
            }
            return value ? true : 'You must add a label'
          }),
        hidden: !includeLabel,
      },
      anchorReference,
    ].filter(e => e),
    preview: {
      select: {
        link: 'link.0.content.title',
        media: 'link.0.content.title',
        label: 'label',
        type: 'link.0._type',
        anchorReference: 'anchorReference',
        referenceNewsMagTitle: 'link.0.title',
        referenceNewsMedia: 'link.0.heroImage.image',
        referenceMagMedia: 'link.0.heroFigure.image',
        referenceTopicTitle: 'link.0.content.title',
        referenceTopicMedia: 'link.0.content.heroFigure.image',
        slug: 'link.0.slug.current',
        href: 'link.0.href',
        anchorId: 'link.0.anchorId',
      },
      prepare({
        slug,
        href,
        label,
        type,
        anchorReference,
        referenceNewsMagTitle,
        referenceNewsMedia,
        referenceMagMedia,
        referenceTopicTitle,
        referenceTopicMedia,
        anchorId,
      }: any) {
        let title = label ?? 'Missing title'
        if (!label && (referenceTopicTitle || referenceNewsMagTitle)) {
          title = blocksToText(referenceTopicTitle ?? referenceNewsMagTitle)
        }
        if (!label && anchorReference) {
          title = anchorReference
        }

        let linkType = type ?? 'not set'
        let media =
          referenceTopicMedia ??
          referenceNewsMedia ??
          referenceMagMedia ??
          EdsBlockEditorIcon(link)

        if (type?.includes('route')) {
          linkType = 'internal route'
        }
        if (type?.includes('news') || type?.includes('magazine')) {
          linkType = `${type} route`
        }
        if (anchorReference || type?.includes('anchorLinkReference')) {
          linkType = 'anchor link'
        }
        if (type === 'link') {
          linkType = 'external link'
        }
        let subtitle = slug ?? href ?? `${capitalizeFirstLetter(linkType)}`

        if (anchorId) {
          subtitle = `#${anchorId}`
          media = <MdOutlineAnchor />
        }

        return {
          title: title,
          subtitle: subtitle,
          media,
        }
      },
    },
  }
}

export default linkSelector
