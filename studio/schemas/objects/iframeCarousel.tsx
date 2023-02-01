import { Colors } from '../../helpers/ColorListValues'
import { EdsIcon } from '../../icons'
import { library_image } from '@equinor/eds-icons'
import blocksToText from '../../helpers/blocksToText'
import type { Rule } from '@sanity/types'
import { title, frameTitle, description, cookiePolicy, aspectRatio, url, height } from './iframe/sharedIframeFields'

const carouselItemFields = [title, frameTitle, description, cookiePolicy, aspectRatio, url, height]
export default {
  name: 'iframeCarousel',
  title: 'Iframe carousel',
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
      description: 'Add iframes for the carousel',
      title: 'Carousel items',
      of: [
        {
          title: 'Iframe carousel item',
          type: 'object',
          fieldsets: [
            {
              title: 'IFrame settings',
              name: 'iframe',
              options: {
                collapsible: true,
                collapsed: false,
              },
            },
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
          fields: [...carouselItemFields],
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(2),
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
        title: title ? blocksToText(title) : 'Untitled iframe carousel',
        subtitle: `Iframe carousel with ${length} items`,
        media: EdsIcon(library_image),
      }
    },
  },
}
