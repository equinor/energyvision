import type { PortableTextBlock } from '@portabletext/react'
import { MdOutlineContactEmergency } from 'react-icons/md'
import type { Reference, Rule } from 'sanity'
import blocksToText from '../../../helpers/blocksToText'
import {
  ingress,
  theme,
  title,
  viewAllLink,
  viewAllLinkLabel,
} from '../commonFields/commonFields'
import type { ImageWithAlt } from '../imageWithAlt'
import linkSelector from '../linkSelector/linkSelector'

export type Promotion = {
  image?: ImageWithAlt
  name: string
  title?: string
  department?: string
  isLink: boolean
  reference?: Reference
  url?: string
  anchor?: string
}

export type ReferenceTarget = {
  type: string
}

function emailIsValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default {
  title: 'People promotion',
  name: 'promotePeople',
  type: 'object',
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    title,
    ingress,
    {
      type: 'array',
      name: 'peopleList',
      title: 'Add the people you want to promote',
      of: [
        {
          type: 'object',
          name: 'people',
          title: 'People',
          fieldsets: [
            {
              name: 'seo',
              title: 'SEO',
              description:
                'Enable structured markup to show rich results on Google search',
            },
          ],
          fields: [
            {
              name: 'enableStructuredMarkup',
              type: 'boolean',
              title: 'Show the people card content as rich results',
              description: 'Enable this only if its about a person',
              fieldset: 'seo',
            },
            {
              title: 'Image',
              name: 'image',
              type: 'imageWithAlt',
            },
            {
              title: 'Name',
              name: 'name',
              type: 'string',
              validation: (Rule: Rule) =>
                Rule.required().error('Please provide a name'),
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
              description:
                'Link to another piece of content instead of adding contact information',
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
            linkSelector(
              ['reference', 'referenceToOtherLanguage', 'link'],
              ({ parent }: { parent: Promotion }) => !parent?.isLink,
            ),
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
    viewAllLink,
    viewAllLinkLabel,
    theme,
    {
      title: 'Background (Deprecated)',
      description: 'Please select a theme instead',
      name: 'background',
      type: 'colorlist',
      fieldset: 'design',
      readonly: true,
      hidden: ({ value }: any) => {
        return !value || value.title === 'White'
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      peopleList: 'peopleList',
    },
    prepare({
      title,
      peopleList,
    }: {
      title?: PortableTextBlock[]
      peopleList?: any[]
    }) {
      //@ts-ignore:todo
      const plainTitle = blocksToText(title) ?? 'No title, only people'
      return {
        title: `${plainTitle}`,
        subtitle: `People promotion | ${peopleList?.length} people`,
        media: MdOutlineContactEmergency,
      }
    },
  },
}
