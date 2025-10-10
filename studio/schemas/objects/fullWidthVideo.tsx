import { play_circle } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import blocksToText from '../../helpers/blocksToText'
import type { PortableTextBlock, Rule } from 'sanity'
import { ImageWithAlt } from './imageWithAlt'

export default {
  name: 'fullWidthVideo',
  title: 'Full Width Video Player',
  type: 'object',
  fields: [
    {
      name: 'videoFile',
      type: 'reference',
      title: 'Video',
      to: [{ type: 'videoFile' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'aspectRatio',
      type: 'string',
      title: 'Aspect ratio',
      options: {
        list: [
          { title: 'Tall', value: 'fullScreen' },
          { title: 'Narrow', value: 'narrow' },
          { title: '2:1', value: '2:1' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'fullScreen',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'containVideo',
      title: 'Contain video',
      description:
        'Aspect ratios Tall and Narrow applies object cover, which might clip video content. This can problematic if the video has text.Set this to not clip content but black bars in the video might appear.',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }: any) => {
        return parent?.aspectRatio === '2:1'
      },
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
