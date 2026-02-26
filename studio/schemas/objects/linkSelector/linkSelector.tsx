import { Box, Flex } from '@sanity/ui'
import type { PreviewProps, Rule } from 'sanity'
import blocksToText from '@/helpers/blocksToText'
import { capitalizeFirstLetter } from '@/helpers/formatters'
import singleItemArray from '../singleItemArray'
import {
  anchorReference,
  externalLink,
  homepageLink,
  internalReference,
  internalReferenceOtherLanguage,
  type LinkType,
  socialMediaLink,
} from './common'

const defaultLinks = [
  'link',
  'reference',
  'referenceToOtherLanguage',
  'homePageLink',
] as LinkType[]

function LinkPreview(props: PreviewProps) {
  console.log('LinkPreview props', props)

  return (
    <Flex align='center'>
      <Box flex={1}>{props.renderDefault(props)}</Box>
    </Flex>
  )
}

const linkSelector = (
  linkTypes?: LinkType[],
  hidden = false,
  includeLabels = true,
) => {
  /*   console.log('link selector method linkTypes', linkTypes)
  console.log('link selector method hidden', hidden)
  console.log('link selector method includeLabel', includeLabels) */
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
          'Optional, if you want to overwrite the title from the referenced page',
        type: 'string',
        validation: (Rule: Rule) =>
          Rule.custom((value: string, context: any) => {
            console.log('valudate context', context)
            const { parent } = context
            if (parent?.link?.[0]?._type === 'link') {
              return value ? true : 'You must add a label'
            }
            return true
          }),
        hidden: !includeLabels,
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
      }: any) {
        console.log('link selector slug', slug)

        let title = label ?? 'Missing title'
        if (!label && (referenceTopicTitle || referenceNewsMagTitle)) {
          title = blocksToText(referenceTopicTitle ?? referenceNewsMagTitle)
        }
        if (!label && anchorReference) {
          title = anchorReference
        }

        let linkType = type ?? 'not set'

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
        const subtitle = slug ?? href ?? `${capitalizeFirstLetter(linkType)}`

        return {
          title: title,
          subtitle: subtitle,
          media: referenceTopicMedia ?? referenceNewsMedia ?? referenceMagMedia,
        }
      },
    },
  }
}

export default linkSelector
