import { paste } from '@equinor/eds-icons'
import { RiPagesLine } from 'react-icons/ri'
import { formatDate } from '@/helpers/formatDate'
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
      description: 'Such as image,ingress,ratio and background',
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
      image: 'heroFigure.image.asset',
      video: 'heroLoopingVideo.thumbnail',
      type: 'heroType',
      updated: '_updatedAt',
    },
    prepare(selection: any) {
      const { title, image, video, type, updated } = selection
      const plainTitle = title ? blocksToText(title) : ''
      const media = type === HeroTypes.LOOPING_VIDEO ? video : image
      return {
        title: plainTitle,
        subtitle: `Updated ${formatDate(updated)}`,
        media: media ?? RiPagesLine,
      }
    },
  },
}
