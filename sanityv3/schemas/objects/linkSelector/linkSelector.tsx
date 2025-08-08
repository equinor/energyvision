import { Rule } from 'sanity'
import {
  anchorReference,
  externalLink,
  homepageLink,
  internalReference,
  internalReferenceOtherLanguage,
  LinkType,
  socialMediaLink,
} from './common'
import singleItemArray from '../singleItemArray'

const defaultLinks = ['link', 'reference', 'referenceToOtherLanguage', 'homePageLink'] as LinkType[]
const linkSelector = (
  linkTypes: LinkType[] = defaultLinks,
  hidden?: (arg0: any) => boolean,
  includeLabels = true,
  required = true,
) => ({
  name: 'linkSelector',
  title: 'Link',
  type: 'object',
  hidden: hidden,
  fields: [
    singleItemArray(
      {
        name: 'link',
        type: 'array',
        of: [externalLink, internalReference, internalReferenceOtherLanguage, homepageLink, socialMediaLink].filter(
          (it) => {
            const types = linkTypes
              ? linkTypes.includes(it.name as LinkType)
              : defaultLinks.includes(it.name as LinkType)
            return types
          },
        ),
      },
      required,
    ),
    anchorReference,
    includeLabels && {
      name: 'label',
      title: 'Link label',
      type: 'string',
      validation: (Rule: Rule) =>
        Rule.custom((value: string) => {
          return value ? true : 'You must add a label'
        }),
    },
  ].filter((e) => e),
})

export default linkSelector
