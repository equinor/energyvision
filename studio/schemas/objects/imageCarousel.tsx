import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureTitleBlockContent } from '../editors'
import { Colors } from '../../helpers/ColorListValues'
import type { Rule } from '@sanity/types'

const titleContentType = configureTitleBlockContent()

export default {
  name: 'imageCarousel',
  title: 'Image carousel',
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
      name: 'title',
      type: 'array',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
      title: 'Title',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      type: 'array',
      name: 'items',
      description: 'Add images for the carousel',
      title: 'Carousel items',
      of: [{ type: 'imageWithAltAndCaption' }],
      validation: (Rule: Rule) => Rule.required().min(2),
    },
    {
      type: 'boolean',
      name: 'autoplay',
      title: 'Autoplay',
      initialValue: true,
    },
    {
      type: 'number',
      name: 'delay',
      title: 'Delay',
      description: 'Time in seconds that an image should be visible for before transitioning to the next.',
      initialValue: '3',
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
}
