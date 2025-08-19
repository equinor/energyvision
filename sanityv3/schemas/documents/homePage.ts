import blocksToText from '../../helpers/blocksToText'
import { HeroTypes } from '../HeroTypes'
import sharedHeroFields from './header/sharedHeaderFields'
import { EdsIcon } from '../../icons'
import { paste } from '@equinor/eds-icons'
import { lang } from './langField'
import { isCampaign, openGraphImage, seo, stickyMenu, content } from './topic/sharedTopicPageFields'
import { Flags } from '../../src/lib/datasetHelpers'
import { defaultBackgroundColors } from '../defaultColors'

export default {
  type: 'document',
  name: 'homePage',
  title: 'Home page',
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
    ...sharedHeroFields,
    isCampaign,
    stickyMenu,
    {
      name: 'content',
      type: 'array',
      title: 'Page sections',
      of: [
        { type: 'textBlock' },
        { type: 'teaser' },
        { type: 'cardsList' },
        { type: 'figure' },
        { type: 'fullWidthImage' },
        { type: 'pullQuote', initialValue: { background: defaultBackgroundColors[0] } },
        { type: 'accordion' },
        { type: 'promoTileArray' },
        { type: 'iframe' },
        { type: 'fullWidthVideo' },
        { type: 'textWithIconArray' },
        { type: 'keyNumbers' },
        { type: 'textTeaser' },
        { type: 'promotion' },
        { type: 'anchorLink' },
        { type: 'imageCarousel' },
        { type: 'iframeCarousel' },
        { type: 'videoPlayer' },
        { type: 'videoPlayerCarousel' },
        { type: 'imageForText' },
        Flags.HAS_CAMPAIGN_BLOCKS && { type: 'grid' },
        Flags.HAS_CAMPAIGN_BLOCKS && { type: 'campaignBanner' },
        Flags.HAS_FORMS && { type: 'form' },
        Flags.HAS_NEWS && { type: 'newsList' },
        { type: 'stockValuesApi' },
        Flags.HAS_TWITTER_FEED && { type: 'twitterEmbed' },
        { type: 'cookieDeclaration' },
        { type: 'anchorLinkList' },
        { type: 'tabs' },
        { type: 'homepageBanner' },
      ].filter((e) => e),
    },
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
        subtitle: 'Home Page',
        media,
      }
    },
  },
}
