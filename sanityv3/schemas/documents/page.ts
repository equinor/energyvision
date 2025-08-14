import blocksToText from '../../helpers/blocksToText'
import { HeroTypes } from '../HeroTypes'
import sharedHeroFields from './header/sharedHeaderFields'
import { EdsIcon } from '../../icons'
import { paste } from '@equinor/eds-icons'
import { lang } from './langField'
import { isCampaign, openGraphImage, seo, stickyMenu, content } from './topic/sharedTopicPageFields'

export default {
  type: 'document',
  name: 'page',
  title: 'Topic page',
  icon: () => EdsIcon(paste),
  fieldsets: [
    {
      title: 'Header',
      name: 'header',
    },
    {
      title: 'SEO & metadata',
      name: 'metadata',
      description: 'This part is used for meta information when this content is used on the web',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'Sticky Menu',
      name: 'stickymenu',
      options: {
        collapsible: true,
        collaped: true,
      },
    },
  ],
  fields: [
    lang,
    seo,
    openGraphImage,
    ...sharedHeroFields.map((it) => ({ fieldset: 'header', ...it })),
    isCampaign,
    stickyMenu,
    content,
  ].filter((e) => e),
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
