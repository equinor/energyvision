import { play_circle } from '@equinor/eds-icons'
import type { Reference, Rule } from '@sanity/types'
import { EdsIcon } from '../../icons/edsIcons'
import { SanityImageCrop, SanityImageHotspot, SanityImageObject } from '@sanity/image-url/lib/types/types'

type ImageWithAlt = {
  isDecorative: boolean
  alt?: string
  asset: SanityImageObject
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
  _type: 'imageWithAlt'
  extension?: string
}

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
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'thumbnail',
      type: 'imageWithAlt',
      title: 'Thumbnail',
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
