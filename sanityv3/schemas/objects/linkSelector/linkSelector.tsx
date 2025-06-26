import { Rule } from 'sanity'
import {
  externalLink,
  getLinkFields,
  homepageLink,
  internalReference,
  internalReferenceOtherLanguage,
  LinkType,
  socialMediaLink,
} from './common'

const linkSelector = (
  linkTypes: LinkType[] = ['link', 'homePageLink', 'reference', 'referenceToOtherLanguage'],
  hidden?: (arg0: any) => boolean,
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
    ...getLinkFields(),
  ],
})

export default linkSelector
