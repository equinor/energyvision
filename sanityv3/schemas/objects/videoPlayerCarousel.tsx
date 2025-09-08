import { EdsIcon } from '../../icons'
import { play_circle } from '@equinor/eds-icons'
import blocksToText from '../../helpers/blocksToText'
import type { Reference, Rule, PortableTextBlock } from 'sanity'
import { title } from './iframe/sharedIframeFields'
import { configureBlockContent } from '../editors'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { defaultColors } from '../defaultColors'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'

export default {
  name: 'videoPlayerCarousel',
  title: 'Video carousel',
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
    title,
    {
      type: 'boolean',
      name: 'hideTitle',
      title: 'Hide title',
      description: 'Hides the title, but screen readers will read title of carousel',
    },
    {
      name: 'ingress',
      title: 'Ingress',
      description: 'Optional short description. Max 400 characters',
      type: 'array',
      of: [configureBlockContent({ variant: 'ingress' })],
      validation: (Rule: Rule) => Rule.custom((value: any) => validateCharCounterEditor(value, 400, true)),
    },
    {
      type: 'array',
      name: 'items',
      description: 'Add more videos',
      title: 'Video items',
      of: [
        {
          title: 'Video item',
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'array',
              title: 'Title',
              description: 'Optional title/heading shown beneath the video.',
              components: { input: CompactBlockEditor },
              of: [configureBlockContent({ variant: 'title' })],
            },
            {
              name: 'videoFile',
              type: 'reference',
              title: 'Video',
              to: [{ type: 'videoFile' }],
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'videoFile.video.title',
              image: 'videoFile.thumbnail',
            },
            prepare({
              title = [],
              subtitle,
              image,
            }: {
              title: PortableTextBlock[]
              subtitle: string
              image: Reference
            }) {
              return {
                title: blocksToText(title),
                subtitle: subtitle,
                media: image,
              }
            },
          },
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(3),
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
      type: 'boolean',
      name: 'scrollMode',
      title: 'Scroll mode',
      description: 'Displays the carousel as scroll container',
      initialValue: false,
      fieldset: 'design',
      hidden: ({ parent }: { parent: any }) => parent?.aspectRatio !== '9:16',
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      fieldset: 'design',
      initialValue: defaultColors[0],
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
        title: title ? blocksToText(title) : 'Untitled video carousel',
        subtitle: `Video carousel with ${length} items`,
        media: EdsIcon(play_circle),
      }
    },
  },
}
