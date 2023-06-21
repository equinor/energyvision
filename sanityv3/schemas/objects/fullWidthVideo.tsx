import { play_circle } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

import { configureTitleBlockContent } from '../editors'
import CompactBlockEditor from '../components/CompactBlockEditor'
import blocksToText from '../../helpers/blocksToText'
import type { PortableTextBlock, Rule } from 'sanity'
import { ImageWithAlt } from './imageWithAlt'

const titleContentType = configureTitleBlockContent()

export default {
  name: 'fullWidthVideo',
  title: 'Full Width Video Player',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'array',
      title: 'Video Description',
      description: 'The (optional) video description',
      components: { input: CompactBlockEditor },
      of: [titleContentType],
    },
    {
      name: 'videoFile',
      type: 'reference',
      title: 'Video',
      to: [{ type: 'videoFile' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'spacing',
      type: 'boolean',
      title: 'Space between other components',
      initialValue: false,
    },
    {
      name: 'aspectRatio',
      type: 'string',
      title: 'Aspect ratio',
      options: {
        list: [
          { title: 'fullscreen', value: 'fullscreen' },
          { title: 'narrow', value: 'narrow' },
          { title: '2:1', value: '2:1' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'fullscreen',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      videoTitle: 'videoFile.video.title',
      media: 'videoFile.thumbnail',
    },
    prepare({ title, videoTitle, media }: { title: PortableTextBlock[]; videoTitle: string; media: ImageWithAlt }) {
      const plainTitle = title ? blocksToText(title) : undefined

      return {
        title: plainTitle || videoTitle,
        subtitle: `Full width video component`,
        media: media || EdsIcon(play_circle),
      }
    },
  },
}
