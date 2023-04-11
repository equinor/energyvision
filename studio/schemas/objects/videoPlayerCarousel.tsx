import { Colors } from '../../helpers/ColorListValues'
import { EdsIcon } from '../../icons'
import { library_image } from '@equinor/eds-icons'
import blocksToText from '../../helpers/blocksToText'
import type { Rule } from '@sanity/types'
import { title } from './iframe/sharedIframeFields'
import { configureTitleBlockContent } from '../editors'
import CompactBlockEditor from '../components/CompactBlockEditor'

const titleContentType = configureTitleBlockContent()

export default {
  name: 'videoPlayerCarousel',
  title: 'Horizontal scroll video player',
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
    title,
    {
      type: 'array',
      name: 'items',
      description: 'Add more iframes',
      title: 'Scrollable iframe items',
      of: [
        {
          title: 'Iframe item',
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'array',
              title: 'Title',
              description: 'The (optional) title/heading shown beneath the video.',
              inputComponent: CompactBlockEditor,
              of: [titleContentType],
            },
            {
              name: 'videoFile',
              type: 'reference',
              title: 'Video',
              to: [{ type: 'videoFile' }],
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(2),
    },
    {
      name: 'aspectRatio',
      type: 'string',
      title: 'Aspect ratio',
      options: {
        list: [
          { title: '16:9', value: '16:9' },
          { title: '9:16', value: '9:16' },
          { title: '1:1', value: '1:1' },
        ],
        layout: 'dropdown',
      },
      initialValue: '16:9',
      fieldset: 'design',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      options: {
        borderradius: {
          outer: '100%',
          inner: '100%',
        },
        tooltip: false,
        list: Colors,
      },
      fieldset: 'design',
      initialValue: Colors[0],
    },
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare(selection: any) {
      const { title, items } = selection
      const length = items ? items.length : 0

      return {
        title: title ? blocksToText(title) : 'Untitled horizontal scroll iframe',
        subtitle: `Horizontal scroll iframe carousel with ${length} items`,
        media: EdsIcon(library_image),
      }
    },
  },
}
