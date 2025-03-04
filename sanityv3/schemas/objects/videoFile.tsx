import { play_circle } from '@equinor/eds-icons'
import type { Reference, Rule } from 'sanity'
import { EdsIcon } from '../../icons/edsIcons'
import { ImageWithAlt } from './imageWithAlt'
import { HLSVideo } from './hlsVideo'

export default {
  type: 'document',
  title: 'Video file',
  name: 'videoFile',
  icon: () => EdsIcon(play_circle),
  fields: [
    {
      name: 'video',
      title: 'Video',
      description: 'Pick from Equinor Media Bank',
      type: 'hlsVideo',
      validation: (Rule: Rule) =>
        Rule.custom((value: HLSVideo) => {
          if (!value || !value?.id) return 'Id is required'
          else if (!value.url) return 'Please fetch the video.'
          else if (!value.title) return 'Title is required.'
          else return true
        }),
    },
    {
      name: 'transcript',
      title: 'Video Transcript',
      type: 'transcript',
    },
    {
      name: 'thumbnail',
      type: 'imageWithAlt',
      title: 'Thumbnail',
      description: 'Use the alt text below to describe the video content (for screenreaders).',
      initialValue: {
        isDecorative: true,
      },
      validation: (Rule: Rule) => Rule.custom((value: ImageWithAlt) => (!value.asset ? 'Image is required' : true)),
    },
  ],
  preview: {
    select: {
      title: 'video.title',
      image: 'thumbnail',
    },
    prepare({ title = '', image }: { title: string; image: Reference }) {
      return {
        title,
        media: image,
      }
    },
  },
}
