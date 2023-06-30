import { SchemaType } from '../../types'
import blocksToText from '../../helpers/blocksToText'
import { calendar_event, home } from '@equinor/eds-icons'
import { EdsIcon, TopicDocuments } from '../../icons'
import { HeroTypes } from '../HeroTypes'

export default (isoCode: string, title: string) => ({
  type: 'document',
  title: `Home Page Route ${title}`,
  name: `route_${isoCode}_homepage`,
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
          type: 'page',
        },
      ],
      options: {
        filter: '_lang == $lang',
        filterParams: { lang: `${isoCode}` },
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
      video: 'content.heroLoopingVideo.thumbnail',
      heroType: 'content.heroType',
      type: 'content._type',
    },
    prepare(selection: any) {
      const { title, slug, media, type, heroType, video } = selection
      const plainTitle = title ? blocksToText(title) : ''
      let thumbnail
      if (heroType === HeroTypes.LOOPING_VIDEO) {
        thumbnail = video
      } else {
        thumbnail = media ? media : type === 'event' ? EdsIcon(calendar_event) : TopicDocuments
      }

      return {
        title: plainTitle,
        subtitle: slug,
        media: thumbnail,
      }
    },
  },
})
