import { play_circle } from '@equinor/eds-icons'
import type { PortableTextBlock, Rule } from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors'
import type { ImageWithAlt } from './imageWithAlt'
import singleItemArray from './singleItemArray'

export default {
  name: 'videoPlayer',
  title: 'Video Player',
  type: 'object',
  fieldsets: [
    {
      name: 'designOptions',
      title: 'Design options',
      description: '',
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
      title: 'Title',
      description: 'The (optional) title/heading shown above the video.',
      components: { input: CompactBlockEditor },
      of: [configureBlockContent({ variant: 'title' })],
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      of: [configureBlockContent({ variant: 'ingress' })],
    },
    singleItemArray({
      name: 'action',
      title: 'Link/action',
      description:
        'You can add one separate link if you need. The link will show up at the bottom of the component.',
      type: 'array',
      of: [{ type: 'linkSelector', title: 'Link' }],
    }),
    {
      name: 'videoFile',
      type: 'reference',
      title: 'Video',
      to: [{ type: 'videoFile' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'videoControls',
      type: 'videoControls',
      title: 'Video Controls',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: 'Show transcript button',
      description: 'Shows transcript from the video asset.',
      name: 'showTranscript',
      type: 'boolean',
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
      fieldset: 'designOptions',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'width',
      type: 'string',
      title: 'Width',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Extra wide', value: 'extraWide' },
        ],
        layout: 'dropdown',
      },
      fieldset: 'designOptions',
      initialValue: 'normal',
    },
    {
      title: 'Use brand theme for video',
      description: 'Make play button bigger and brand red.',
      name: 'useBrandTheme',
      type: 'boolean',
      fieldset: 'designOptions',
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      fieldset: 'designOptions',
      type: 'colorlist',
    },
  ],
  preview: {
    select: {
      title: 'title',
      videoTitle: 'videoFile.video.title',
      media: 'videoFile.thumbnail',
    },
    prepare({
      title,
      videoTitle,
      media,
    }: {
      title: PortableTextBlock[]
      videoTitle: string
      media: ImageWithAlt
    }) {
      const plainTitle = title ? blocksToText(title) : undefined

      return {
        title: plainTitle || videoTitle,
        subtitle: `Video component`,
        media: media || EdsIcon(play_circle),
      }
    },
  },
}
