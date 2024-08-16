import { info_circle } from '@equinor/eds-icons'
import { PortableTextBlock, Rule } from 'sanity'
import { EdsIcon } from '../../icons'
import { configureBlockContent } from '../editors/blockContentType'
import type { ImageWithAlt } from './imageWithAlt'

const blockContentType = configureBlockContent({
  h2: true,
  h3: true,
  h4: true,
  internalLink: false,
  externalLink: false,
  lists: false,
  attachment: false,
  smallText: false,
})

export type Factbox = {
  _type: 'imageForText'
  content?: PortableTextBlock[]
  image?: ImageWithAlt
}

export default {
  title: 'Image for text',
  name: 'imageForText',
  type: 'object',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [blockContentType],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'aspectRatio',
      type: 'string',
      description: '',
      title: 'Aspect ratio',
      options: {
        list: [
          { title: '16:9', value: '16:9' },
          { title: 'Full width 16:9', value: 'fullWidth' },
        ],
      },
      initialValue: '16:9',
    },
  ],
  preview: {
    select: {
      imageUrl: 'image.asset.url',
    },
    prepare({ imageUrl }: { title: string; imageUrl: string }) {
      return {
        title: 'Image for text',
        media: imageUrl ? <img src={imageUrl} alt="" style={{ height: '100%' }} /> : EdsIcon(info_circle),
      }
    },
  },
}
