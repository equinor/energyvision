import { Flags } from '../../../src/lib/datasetHelpers'
import { RolesBasedArrayInput } from '../../components/RolesBasedArrayInput'
import { defaultColors } from '../../defaultColors'

export const seo = {
  title: 'Meta information',
  name: 'seo',
  type: 'titleAndMeta',
  fieldset: 'other',
}
export const openGraphImage = {
  title: 'Open Graph Image',
  name: 'openGraphImage',
  type: 'imageWithAlt',
  description:
    'You can override the hero image as the SoMe image by uploading another image here.',
  fieldset: 'other',
}

export const stickyMenu = {
  name: 'stickyMenu',
  title: 'Sticky Menu',
  type: 'stickyMenu',
  fieldset: 'other',
}

export const content = {
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
    /*     Flags.HAS_TWITTER_FEED && { type: 'twitterEmbed' }, */
    { type: 'cookieDeclaration' },
    { type: 'anchorLinkList' },
    { type: 'tabs' },
    { type: 'importTable' },
    Flags.HAS_EVENT && { type: 'promoteEvents', title: 'Event promotion' },
    Flags.HAS_MAGAZINE && {
      type: 'promoteMagazine',
      title: 'Magazine promotion',
    },
    { type: 'promotePeople', title: 'People promotion' },
    { type: 'promoteTopics', title: 'Topic page promotion' },
    Flags.HAS_NEWS && { type: 'promoteNews', title: 'News promotions' },
    { type: 'pieChartBlock', title: 'Pie chart' },
    { type: 'lineChartBlock', title: 'Line chart' },
    { type: 'barChartBlock', title: 'Bar chart' },
    { type: 'promoteExternalLinkV2' },
    { type: 'promoteTopicsV2' },
    { type: 'promotionsV2' },
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
          of: ['promotionsV2', 'promoteExternalLinkV2', 'promoteTopicsV2'],
        },
        {
          name: 'carousels',
          title: 'Carousels',
          of: ['imageCarousel', 'videoPlayerCarousel', 'iframeCarousel'],
        },
        {
          name: 'charts',
          title: 'Charts',
          of: ['barChartBlock', 'pieChartBlock', 'lineChartBlock'],
        },
      ],
    },
  },
}
