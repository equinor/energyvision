import React from 'react'

import { validateInternalOrExternalUrl } from '../../validations/validateInternalOrExternalUrl'
import { validateRequiredIfVisible } from '../../validations/validateRequiredIfVisible'

import type { Rule, Reference, ValidationContext } from '@sanity/types'
import type { ImageWithAlt } from '../imageWithAlt'
import routes from '../../routes'
import { AnchorLinkDescription } from '../anchorReferenceField'
import { filterByPages, filterByPagesInOtherLanguages } from '../../../helpers/referenceFilters'
import { Flags } from '../../../src/lib/datasetHelpers'
import { contacts } from '@equinor/eds-icons'
import { EdsIcon } from '../../../icons'
// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client'

export type Promotion = {
  image?: ImageWithAlt
  name: string
  title?: string
  department?: string
  isLink: boolean
  reference?: Reference
  url?: string
  anchor?: string
  linkToOtherLanguage?: boolean
  referenceToOtherLanguage?: Reference
}

export type LinkSelector = {
  _type: 'linkSelector'
  linkToOtherLanguage?: boolean
  reference?: Reference
  referenceToOtherLanguage?: Reference
  url?: string
  label?: string
  ariaLabel?: string
  isLink?: boolean
}

export type ReferenceTarget = {
  type: string
}

function emailIsValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const newsType = Flags.HAS_NEWS
  ? [
      {
        type: 'news',
      },
    ]
  : []

const defaultReferenceTargets: ReferenceTarget[] = [...newsType, ...routes]

export default {
  title: 'People promotion',
  name: 'promotePeople',
  type: 'object',
  fields: [
    {
      type: 'array',
      name: 'peopleList',
      title: 'Add the people you want to promote',
      of: [
        {
          type: 'object',
          name: 'people',
          title: 'People',

          fields: [
            {
              title: 'Image',
              name: 'image',
              type: 'imageWithAlt',
            },
            {
              title: 'Name',
              name: 'name',
              type: 'string',
              validation: (Rule: Rule) => Rule.required().error('Please provide a name'),
            },
            {
              title: 'Title',
              name: 'title',
              type: 'string',
            },
            {
              title: 'Department',
              name: 'department',
              type: 'string',
            },
            {
              name: 'isLink',
              type: 'boolean',
              title: 'Use a link',
              description: 'Link to another piece of content instead of adding contact information',
              options: {
                isHighlighted: true,
              },
              initialValue: false,
            },
            {
              title: 'Email',
              name: 'email',
              type: 'string',
              placeholder: 'abbr@equinor.com',
              hidden: ({ parent }: { parent: Promotion }) => parent?.isLink,
              validation: (Rule: Rule) =>
                Rule.warning().custom((email: string) => {
                  if (!email || email === '') return true
                  if (!emailIsValid(email)) return 'Not a valid email'
                  return true
                }),
            },
            {
              title: 'Telephone number',
              name: 'phone',
              type: 'string',
              placeholder: '+47 999 99 999',
              hidden: ({ parent }: { parent: Promotion }) => parent?.isLink,
            },
            {
              name: 'linkToOtherLanguage',
              type: 'boolean',
              title: 'Link to a different language',
              hidden: ({ parent }: { parent: LinkSelector | Promotion }) => !Flags.IS_DEV && !parent.isLink,
              description: 'Use this if you want to create a link to a page of a different language',
            },
            {
              name: 'reference',
              title: 'Internal link',
              description: 'Use this field to reference an internal page.',
              type: 'reference',
              hidden: ({ parent }: { parent: LinkSelector | Promotion }) =>
                parent.linkToOtherLanguage || !parent.isLink,
              validation: (Rule: Rule) =>
                Rule.custom(async (value: any, context: ValidationContext) => {
                  const { parent, document } = context as {
                    parent: LinkSelector | Promotion
                    document: { _lang?: string }
                  }
                  if (!(parent as Promotion).isLink) return true
                  if (Flags.IS_DEV && parent.linkToOtherLanguage) return true
                  if (Flags.IS_DEV && value?._ref) {
                    const referenceLang = await client.fetch(
                      /* groq */ `*[_id == $id][0]{"lang": coalesce(content->_lang, _lang)}.lang`,
                      {
                        id: value._ref,
                      },
                    )
                    if (document._lang !== referenceLang) return 'Reference must have the same language as the document'
                  }
                  return validateInternalOrExternalUrl(value, parent.url)
                }),
              to: defaultReferenceTargets,
              options: {
                filter: filterByPages,
                disableNew: true,
              },
            },
            {
              name: 'referenceToOtherLanguage',
              title: 'Internal link',
              description: 'Use this field to reference an internal page.',
              type: 'reference',
              hidden: ({ parent }: { parent: LinkSelector | Promotion }) =>
                !parent.linkToOtherLanguage || !parent.isLink,
              validation: (Rule: Rule) =>
                Rule.custom((value: any, context: ValidationContext) => {
                  const { parent } = context as { parent: LinkSelector | Promotion }
                  // Needed for promotion
                  if (!(parent as Promotion).isLink) return true
                  if (Flags.IS_DEV && !parent.linkToOtherLanguage) return true
                  return validateInternalOrExternalUrl(value, parent.url)
                }),
              to: defaultReferenceTargets,
              options: {
                filter: filterByPagesInOtherLanguages,
                disableNew: true,
              },
            },
            {
              name: 'url',
              title: 'External URL',
              description: 'Use this field to link to an external site.',
              type: 'url',
              validation: (Rule: Rule) =>
                Rule.uri({ scheme: ['http', 'https', 'tel', 'mailto'] }).custom(
                  (value: any, context: ValidationContext) => {
                    const { parent } = context as { parent: LinkSelector | Promotion }
                    if (Flags.IS_DEV && !(parent as Promotion).isLink) return true
                    const connectedField = parent.linkToOtherLanguage
                      ? parent.referenceToOtherLanguage
                      : parent.reference
                    return validateInternalOrExternalUrl(value, connectedField)
                  },
                ),
              hidden: ({ parent }: { parent: Promotion }) => !parent?.isLink,
            },
            {
              name: 'anchorReference',
              title: 'Anchor reference',
              type: 'anchorReferenceField',
              description: AnchorLinkDescription(),
              hidden: ({ parent }: { parent: Promotion }) => !parent?.isLink,
            },
            {
              name: 'label',
              title: 'Visible label',
              description: 'The visible text on the link/button.',
              type: 'string',
              validation: (Rule: Rule) =>
                Rule.custom((value: string, context: ValidationContext) => {
                  const { parent } = context as { parent: Promotion }
                  return validateRequiredIfVisible(parent.isLink, value, 'You must add a label')
                }),
              hidden: ({ parent }: { parent: Promotion }) => !parent?.isLink,
            },
            {
              name: 'ariaLabel',
              title: '♿ Screenreader label',
              description: 'A text used for providing screen readers with additional information',
              type: 'string',
              hidden: ({ parent }: { parent: Promotion }) => !parent?.isLink,
            },
          ],
          preview: {
            select: {
              name: 'name',
              title: 'title',
              department: 'department',
              image: 'image.asset',
            },
            prepare({
              name,
              title,
              department,
              image,
            }: {
              name: string
              title: string
              department: string
              image: Reference
            }) {
              const departmentText = department ? department : ''
              const titleText = title ? title : ''
              return {
                title: name,
                subtitle: `${titleText} ${departmentText}`,
                media: image,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      people1: 'peopleList.0.name',
      people2: 'peopleList.1.name',
      people3: 'peopleList.2.name',
      people4: 'peopleList.3.name',
    },
    prepare({
      people1,
      people2,
      people3,
      people4,
    }: {
      people1: string
      people2: string
      people3: string
      people4: string
    }) {
      const people = [people1, people2, people3].filter(Boolean)
      const hasMorePeople = Boolean(people4)
      const peopleList = people.length > 0 ? `People: ${people.join(', ')}` : ''

      return {
        title: hasMorePeople ? `${peopleList}...` : peopleList,
        subtitle: `People promotions.`,
        media: EdsIcon(contacts),
      }
    },
  },
}
