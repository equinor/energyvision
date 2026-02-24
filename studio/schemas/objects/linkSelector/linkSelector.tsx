import { Box, Flex } from '@sanity/ui'
import type { PreviewProps, Rule } from 'sanity'
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
          Rule.custom((value: string) => {
            return value ? true : 'You must add a label'
          }),
        hidden: !includeLabels,
      },
      anchorReference,
    ].filter(e => e),
    components: {
      preview: LinkPreview,
    },
    preview: {
      select: {
        link: 'link',
      },
    },
  }
}

export default linkSelector
