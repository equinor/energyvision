import { MdOutlinePeopleAlt } from 'react-icons/md'
import type { PortableTextBlock, Rule } from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors'
import { theme } from './commonFields/commonFields'

export default {
  name: 'personList',
  title: 'Person list',
  type: 'object',
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
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
      type: 'boolean',
      name: 'asDiagram',
      title: 'Display as diagram',
      description:
        'Displays the people as an organization diagram where org level and connection lines is added to web component',
    },
    theme,
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
