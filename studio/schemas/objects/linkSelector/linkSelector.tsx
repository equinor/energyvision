import type { Rule } from 'sanity'
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
const linkSelector = (
  linkTypes?: LinkType[],
  hidden?: (arg0: any) => boolean,
  includeLabels = true,
) => ({
  name: 'linkSelector',
  title: 'Link',
  type: 'object',
  hidden: hidden,
  fields: [
    includeLabels && {
      name: 'label',
      title: 'Link label',
      type: 'string',
      validation: (Rule: Rule) =>
        Rule.custom((value: string) => {
          return value ? true : 'You must add a label'
        }),
    },
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
    anchorReference,
  ].filter(e => e),
})

export default linkSelector
