import { MdOutlinePeopleAlt } from 'react-icons/md'
import type { PortableTextBlock, Rule } from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors'

export default {
  name: 'personList',
  title: 'Person list',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'array',
      title: 'Title',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'title' })],
    },
    {
      type: 'boolean',
      name: 'hideTitle',
      title: 'Hide title',
      description: 'Hides the title, but screen readers will read it',
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'ingress' })],
    },
    {
      name: 'items',
      title: 'People',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'person' }],
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      name: 'theme',
      title: 'Theme color',
      type: 'string',
      options: {
        list: [
          { title: 'Grey', value: 'grey' },
          { title: 'Green', value: 'green' },
        ],
        layout: 'radio',
      },
      initialValue: 'grey',
    },
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }: { title?: PortableTextBlock[]; items?: any[] }) {
      return {
        title: blocksToText(title) || 'Person list',
        subtitle: `Person list | ${items?.length ?? 0} people`,
        media: MdOutlinePeopleAlt,
      }
    },
  },
}
