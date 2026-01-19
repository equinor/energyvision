import type { Rule, ValidationContext } from 'sanity'
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
    includeLabels && {
      name: 'label',
      title: 'Label',
      description:
        'Leave empty if you want to use referenced page title. Required for external and social media links',
      type: 'string',
      validation: (Rule: Rule) =>
        Rule.custom((value: string, ctx: ValidationContext) => {
          if (
            ctx.parent?.link?.[0]?._type === 'link' ||
            ctx?.parent?.link?.[0]?._type === 'socialMediaLink'
          ) {
            return value ? true : 'You must add a label'
          }
          return true
        }),
    },
    anchorReference,
  ].filter(e => e),
})

export default linkSelector
