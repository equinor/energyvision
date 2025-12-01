import { paste } from '@equinor/eds-icons'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import { Flags } from '../../src/lib/datasetHelpers'
import { RolesBasedArrayInput } from '../components/RolesBasedArrayInput'
import { defaultColors } from '../defaultColors'
import sharedHeroFields, { HeroTypes } from './header/sharedHeaderFields'
import { lang } from './langField'
import { openGraphImage, seo, stickyMenu } from './topic/sharedTopicPageFields'

export default {
  type: 'document',
  name: 'homePage',
  title: 'Home page',
  icon: () => EdsIcon(paste),
  fieldsets: [
    {
      title: 'More page options',
      description: 'SEO, meta and sticky menu',
      options: {
        collapsible: true,
        collapsed: true,
      },
      name: 'other',
    },
    {
      title: 'Hero configuration',
      options: {
        collapsible: true,
        collapsed: true,
      },
      name: 'hero',
    },
  ],
  fields: [
    lang,
    ...sharedHeroFields,
    seo,
    openGraphImage,
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
        Flags.HAS_MAGAZINE && {
          type: 'promoteMagazine',
          title: 'Magazine promotion',
        },
        { type: 'promotePeople', title: 'People promotion' },
        { type: 'promoteTopics', title: 'Topic page promotion' },
        Flags.HAS_NEWS && { type: 'promoteNews', title: 'News promotions' },
        { type: 'promoteExternalLinkV2' },
        { type: 'promoteTopicsV2' },
      ].filter(e => e),
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
              of: [
                'promotion',
                'promoteMagazine',
                'promoteTopics',
                'promotePeople',
                'promoteEvents',
                'promoteNews',
              ],
            },
            {
              name: 'promotionsV2',
              title: 'Promotions(v2)',
              of: ['promoteExternalLinkV2', 'promoteTopicsV2'],
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
        subtitle: 'Home Page',
        media,
      }
    },
  },
}
