import { paste } from '@equinor/eds-icons'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import sharedHeroFields, { HeroTypes } from './header/sharedHeaderFields'
import { lang } from './langField'
import {
  content,
  openGraphImage,
  seo,
  stickyMenu,
} from './topic/sharedTopicPageFields'

export default {
  type: 'document',
  name: 'page',
  title: 'Topic page',
  icon: () => EdsIcon(paste),
  fieldsets: [
    {
      title: 'Hero configuration',
      options: {
        collapsible: true,
        collapsed: true,
      },
      name: 'hero',
    },
    {
      title: 'More page options',
      description: 'SEO, meta and sticky menu',
      options: {
        collapsible: true,
        collapsed: true,
      },
      name: 'other',
    },
  ],
  fields: [
    lang,
    ...sharedHeroFields,
    seo,
    openGraphImage,
    stickyMenu,
    content,
  ].filter(e => e),
  orderings: [
    {
      title: 'Title ',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      image: 'heroFigure.image',
      video: 'heroLoopingVideo.thumbnail',
      type: 'heroType',
    },
    prepare(selection: any) {
      const { title, image, video, type } = selection
      const plainTitle = title ? blocksToText(title) : ''
      const media = type === HeroTypes.LOOPING_VIDEO ? video : image
      return {
        title: plainTitle,
        subtitle: 'Topic content',
        media,
      }
    },
  },
}
