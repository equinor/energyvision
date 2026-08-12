import { MdOutlinePerson } from 'react-icons/md'
import type { Rule } from 'sanity'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors'
import { lang } from './langField'

export default {
  title: 'Person',
  name: 'person',
  type: 'document',
  icon: MdOutlinePerson,
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      description:
        'Enable structured markup to show rich results on Google search',
    },
  ],
  fields: [
    lang,
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
      title: 'Organization hierarchy level',
      name: 'hierarchyLevel',
      type: 'string',
      options: {
        list: [
          { title: 'Level 1', value: '1' },
          { title: 'Level 2', value: '2' },
          { title: 'Level 3', value: '3' },
        ],
        layout: 'dropdown',
      },
      description: 'Position in organization hierarchy diagram',
    },
    {
      title: 'Date of employment',
      name: 'employmentDate',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'imageWithAlt',
    },
    {
      title: 'Bio',
      name: 'bio',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'ingress' })],
    },
    {
      name: 'enableStructuredMarkup',
      type: 'boolean',
      title: 'Show the person card content as rich results',
      description: 'Enable this only if its about a person',
      fieldset: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image.asset',
    },
  },
}
