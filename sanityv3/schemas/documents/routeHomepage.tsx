import { calendar_event, home } from '@equinor/eds-icons'
import type { ValidationContext } from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon, TopicDocuments } from '../../icons'
import { defaultLanguage, languages } from '../../languages'
import { apiVersion } from '../../sanity.client'
import type { SchemaType } from '../../types'

export default {
  type: 'document',
  title: `Home Page Route`,
  name: `route_homepage`,
  icon: () => EdsIcon(home),
  fields: [
    {
      title: 'Content',
      name: 'content',
      description:
        'The content you want to appear as the home page. Remember it needs to be published along with its translations.',
      validation: (Rule: SchemaType.ValidationRule) => {
        return Rule.custom(async (value: any, context: ValidationContext) => {
          if (value) {
            const result = await context.getClient({ apiVersion: apiVersion }).fetch(
              /* groq */ `coalesce(count(*[_type=="translation.metadata" && references($id)][0].translations[]),0)`,
              {
                id: value._ref,
              },
              { perspective: 'published' },
            )
            return result === languages.length || result === 0 || 'Translations of this home page must be published'
          } else return 'Required'
        })
      },
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
