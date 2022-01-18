import { slugWithRef } from '../objects/slugWithRef'
import { SchemaType } from '../../types'
import blocksToText from '../../helpers/blocksToText'
import { calendar_event } from '@equinor/eds-icons'
import { EdsIcon, TopicDocuments } from '../../icons'

export default {
  type: 'document',
  title: 'Home Page Route',
  name: 'route_homepage',
  fields: [
    {
      title: 'Content',
      name: 'content',
      description: 'The content you want to appear as the home page. Remember it needs to be published.',
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
      type: 'reference',
      to: [
        {
          type: 'page',
        },
        {
          type: 'landingPage',
        },
        {
          type: 'event',
        },
      ],
      options: {
        disableNew: true,
      },
    },
    {
      title: 'Home page URL',
      name: 'slug',
      type: 'slug',
      description: `The home page slug is always '/'. This cannot be changed.`,
      readOnly: true,
      initialValue: { current: '/', _type: 'slug' },
    },
  ],
  preview: {
    select: {
      title: 'content.title',
      slug: 'slug.current',
      media: 'content.heroFigure.image',
      type: 'content._type',
    },
    prepare(selection: any) {
      const { title, slug, media, type } = selection
      const plainTitle = title ? blocksToText(title) : ''

      const thumbnail = media ? media : type === 'event' ? EdsIcon(calendar_event) : TopicDocuments

      return {
        title: plainTitle,
        subtitle: slug,
        media: thumbnail,
      }
    },
  },
}
