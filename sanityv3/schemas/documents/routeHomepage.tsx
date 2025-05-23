import { SchemaType } from '../../types'
import blocksToText from '../../helpers/blocksToText'
import { calendar_event, home } from '@equinor/eds-icons'
import { EdsIcon, TopicDocuments } from '../../icons'
import { defaultLanguage } from '../../languages'

export default {
  type: 'document',
  title: `Home Page Route`,
  name: `route_homepage`,
  icon: () => EdsIcon(home),
  fields: [
    {
      title: 'Content',
      name: 'content',
      description: 'The content you want to appear as the home page. Remember it needs to be published.',
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
      type: 'reference',
      to: [
        {
          type: 'homePage',
        },
      ],
      options: {
        filter: 'lang == $lang',
        filterParams: { lang: defaultLanguage.name },
        disableNew: true,
      },
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
