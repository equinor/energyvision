import CompactBlockEditor from '../../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../../editors'
import { Rule } from 'sanity'
import { TablePreview } from '../tableV2'

const titleContentType = configureTitleBlockContent()
const ingressContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export default {
  title: 'Import Table',
  name: 'importTable',
  type: 'object',
  fieldsets: [
    {
      title: 'Design options',
      name: 'design',
      description: 'Some options for design',
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
      of: [titleContentType],
      validation: (Rule: Rule) => Rule.required().warning('In most cases you should add a title'),
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      of: [ingressContentType],
    },
    {
      name: 'tableCaption',
      title: 'Table caption',
      description: 'Tables should have caption, will render as caption just above table',
      type: 'string',
    },
    {
      title: 'Table',
      name: 'importedTable',
      type: 'csvTable',
    },
    {
      title: 'Theme',
      description: 'Default is grey.',
      name: 'theme',
      type: 'tableTheme',
      fieldset: 'design',
    },
    {
      title: 'Use border row style',
      description: 'Default is zebra rows',
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
