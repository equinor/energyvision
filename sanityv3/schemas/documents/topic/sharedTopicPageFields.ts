import { Flags } from '../../../src/lib/datasetHelpers'
import { defaultColors } from '../../defaultColors'

export const seo = {
  title: 'Meta information',
  name: 'seo',
  type: 'titleAndMeta',
  fieldset: 'metadata',
}
export const openGraphImage = {
  title: 'Open Graph Image',
  name: 'openGraphImage',
  type: 'imageWithAlt',
  description: 'You can override the hero image as the SoMe image by uploading another image here.',
  fieldset: 'metadata',
}
export const isCampaign = {
  title: 'Dont show title (h1) and hero image',
  description:
    'This option hides the main title and hero image on page, but will still be available for screenreaders and SEO/SOME purposes. The first content block will be the first to show',
  name: 'isCampaign',
  type: 'boolean',
}
export const stickyMenu = {
  name: 'stickyMenu',
  title: 'Sticky Menu',
  type: 'stickyMenu',
  fieldset: 'stickymenu',
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
    Flags.HAS_TWITTER_FEED && { type: 'twitterEmbed' },
    { type: 'cookieDeclaration' },
    { type: 'anchorLinkList' },
    { type: 'tabs' },
    { type: 'importTable' },
  ].filter((e) => e),
}
