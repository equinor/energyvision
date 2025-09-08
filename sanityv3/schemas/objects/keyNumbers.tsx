import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../editors'
import { PortableTextBlock, Rule } from 'sanity'
import { NumberIcon } from '@sanity/icons'
import blocksToText from '../../helpers/blocksToText'
import singleItemArray from './singleItemArray'

const titleContentType = configureTitleBlockContent()
const ingressContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

const disclaimerContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
  smallText: true,
})

export default {
  name: 'keyNumbers',
  title: 'Key Numbers',
  type: 'object',
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],

  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [titleContentType],
      validation: (Rule: Rule) => Rule.required().warning('In most cases you should add a title'),
    },
    {
      type: 'boolean',
      name: 'hideTitle',
      title: 'Hide title',
      description: 'Hides the title, but screen readers will read title of carousel',
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      of: [ingressContentType],
    },
    {
      name: 'keyNumberItems',
      title: 'Key Number Items',
      type: 'array',
      of: [{ type: 'keyNumberItem' }],
      validation: (Rule: Rule) => Rule.min(2).error('Need minimum 2 key numbers'),
    },
    {
      name: 'useHorizontalScroll',
      title: 'Use horizontal scroll',
      description:
        'When this is enabled, the key numbers will use horizontal scroll if the amount of content is greater than the screen size allows. Only for mobiles.',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'disclaimer',
      title: 'Disclaimer',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [disclaimerContentType],
    },
    singleItemArray({
      name: 'action',
      title: 'Link/action',
      description: 'Select the link or downloadable file for the teaser',
      type: 'array',
      of: [
        { type: 'linkSelector', title: 'Link' },
        { type: 'downloadableImage', title: 'Downloadable image' },
        { type: 'downloadableFile', title: 'Downloadable file' },
      ],
    }),
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      fieldset: 'design',
    },
  ],
  preview: {
    select: {
      title: 'title',
      items: 'keyNumberItems',
    },
    prepare(selection: { title: PortableTextBlock[]; items: Array<object> }) {
      return {
        title: blocksToText(selection.title),
        subtitle: `Showing ${selection.items.length} key numbers`,
        media: NumberIcon,
      }
    },
  },
}
