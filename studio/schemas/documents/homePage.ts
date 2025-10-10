import blocksToText from '../../helpers/blocksToText'
import { HeroTypes } from '../HeroTypes'
import sharedHeroFields from './header/sharedHeaderFields'
import { EdsIcon } from '../../icons'
import { paste } from '@equinor/eds-icons'
import { lang } from './langField'
import { isCampaign, openGraphImage, seo, stickyMenu, content } from './topic/sharedTopicPageFields'
import { Flags } from '../../src/lib/datasetHelpers'
import { defaultColors } from '../defaultColors'
import { RolesBasedArrayInput } from '../components/RolesBasedArrayInput'

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
        { type: 'pullQuote', initialValue: { background: defaultColors[0] } },
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
        { type: 'tableV2' },
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
        Flags.HAS_EVENT && { type: 'promoteEvents', title: 'Event promotion' },
        Flags.HAS_MAGAZINE && { type: 'promoteMagazine', title: 'Magazine promotion' },
        { type: 'promotePeople', title: 'People promotion' },
        { type: 'promoteTopics', title: 'Topic page promotion' },
        Flags.HAS_NEWS && { type: 'promoteNews', title: 'News promotions' },
      ].filter((e) => e),
      components: {
        input: RolesBasedArrayInput,
      },
      options: {
        insertMenu: {
          filter: true,
          groups: [
            {
              name: 'promotions',
              title: 'Promotions',
              of: ['promotion', 'promoteMagazine', 'promoteTopics', 'promotePeople', 'promoteEvents', 'promoteNews'],
            },
            {
              name: 'carousels',
              title: 'Carousels',
              of: ['imageCarousel', 'videoPlayerCarousel', 'iframeCarousel'],
            },
          ],
        },
      },
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
