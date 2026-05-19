import type { Rule } from 'sanity'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors'
import { layoutGrid } from './commonFields/commonFields'
import { TablePreview } from './tableV2'

export default {
  title: 'Import Table',
  name: 'importTable',
  type: 'object',
  fieldsets: [
    {
      title: 'Design options',
      name: 'design',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'array',
      description: 'Will render h2',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'title' })],
      validation: (Rule: Rule) =>
        Rule.required().warning('In most cases you should add a title'),
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      of: [configureBlockContent({ variant: 'ingress' })],
    },
    {
      name: 'tableCaption',
      title: 'Table caption',
      description:
        'Tables should have caption, will render as caption just above table',
      type: 'string',
    },
    {
      title: 'Table',
      name: 'importedTable',
      type: 'csvTable',
    },
    {
      title: 'Theme',
      name: 'theme',
      type: 'string',
      initialValue: 'grey',
      options: {
        list: [
          { title: 'Grey', value: 'grey' },
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
        ],
      },
      fieldset: 'design',
    },
    layoutGrid(undefined, 'design', 'lg'),
    {
      title: 'Width adjustment',
      name: 'widthAdjustment',
      type: 'string',
      initialValue: 'fit',
      description: 'Default is fit to content within selected layout grid.',
      options: {
        list: [
          { title: 'Fit to content within selected layout grid', value: 'fit' },
          {
            title: 'Stretch to full width of selected layout grid',
            value: 'full',
          },
        ],
      },
      fieldset: 'design',
    },
    {
      title: 'Border bottom/no background color row style',
      description:
        'Default is zebra style with background color on every other row.',
      type: 'boolean',
      name: 'useBorder',
      fieldset: 'design',
    },
  ],
  components: {
    preview: TablePreview,
  },
  preview: {
    select: {
      title: 'title',
      useBorder: 'useBorder',
      theme: 'theme',
    },
  },
}
