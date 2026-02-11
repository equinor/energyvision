import { collection_4 } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

export default {
  type: 'document',
  title: `Error pages`,
  name: `pageNotFound`,
  icon: () => EdsIcon(collection_4),
  fields: [
    {
      title: 'Background image',
      name: 'backgroundImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      image: 'backgroundImage',
    },
    prepare({ image }: { image: any }) {
      return {
        title: 'Background image for error pages',
        media: image,
      }
    },
  },
}
