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
const linkSelector = (linkTypes?: LinkType[], hidden?: (arg0: any) => boolean, includeLabels = true) => ({
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
      true,
    ),
    anchorReference,
    includeLabels && {
      name: 'label',
      title: 'Visible label',
      description: 'The visible text on the link/button.',
      type: 'string',
      validation: (Rule: Rule) =>
        Rule.custom((value: string) => {
          return value ? true : 'You must add a label'
        }),
    },
    includeLabels && {
      name: 'ariaLabel',
      title: '♿ Screenreader label',
      description: 'A text used for providing screen readers with additional information',
      type: 'string',
    },
  ].filter((e) => e),
})

export default linkSelector
