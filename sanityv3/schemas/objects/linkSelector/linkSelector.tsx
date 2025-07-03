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

const linkSelector = (
  linkTypes: LinkType[] = ['link', 'homePageLink', 'reference', 'referenceToOtherLanguage'],
  hidden?: (arg0: any) => boolean,
  includeLabels = true,
) => ({
  name: 'linkSelector',
  title: 'Link',
  type: 'object',
  hidden: hidden,
  fields: [
    {
      name: 'link',
      type: 'array',
      of: [internalReference, internalReferenceOtherLanguage, homepageLink, externalLink, socialMediaLink].filter(
        (it) => linkTypes.includes(it.name as LinkType),
      ),
      validation: (Rule: Rule) => Rule.length(1).required(),
    },
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
