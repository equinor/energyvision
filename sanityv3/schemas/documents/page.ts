import blocksToText from '../../helpers/blocksToText'
import { defaultColors } from '../defaultColors'
import { Flags } from '../../src/lib/datasetHelpers'
import { HeroTypes } from '../HeroTypes'
import sharedHeroFields from './header/sharedHeaderFields'
import { EdsIcon } from '../../icons'
import { paste } from '@equinor/eds-icons'
import { lang } from './langField'
import { withConditionalVisibility } from '../utils/withConditionalVisibility'
import { fieldVisibilityRules } from '../utils/fieldVisibilityRules'
import { DocumentDefinition } from 'sanity'
import { getDesignerOnlySchemas } from '../utils/schemaReadOnlyRules'

const pageSchema = {
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
  ],
  fields: [
    lang,
    {
      title: 'Meta information',
      name: 'seo',
      type: 'titleAndMeta',
      fieldset: 'metadata',
    },
    {
      title: 'Open Graph Image',
      name: 'openGraphImage',
      type: 'imageWithAlt',
      description: 'You can override the hero image as the SoMe image by uploading another image here.',
      fieldset: 'metadata',
    },
    ...sharedHeroFields,
    {
      title: 'Is Campain',
      name: 'isCampaign',
      description: 'Set this to true if the page should be treated as campaign. the header title h1 will be hidden.',
      type: 'boolean',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Page sections',
      components: {
        field: (props: any) => {
          const { renderDefault, value, actions } = props
          const shouldDisableCopy = value.some((it: any) => getDesignerOnlySchemas().includes(it._type))
          return renderDefault({
            ...props,
            actions: shouldDisableCopy ? actions.filter((e: any) => e.name != 'copyField') : actions,
          })
        },
      },
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
        { type: 'table' },
        { type: 'imageForText' },
        Flags.HAS_CAMPAIGN_BLOCKS && { type: 'grid' },
        Flags.HAS_CAMPAIGN_BLOCKS && { type: 'campaignBanner' },
        Flags.HAS_FORMS && { type: 'form' },
        Flags.HAS_NEWS && { type: 'newsList' },
        { type: 'stockValuesApi' },
        Flags.HAS_TWITTER_FEED && { type: 'twitterEmbed' },
        { type: 'cookieDeclaration' },
        { type: 'anchorLinkList' },
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
        subtitle: 'Topic content',
        media,
      }
    },
  },
}

export default withConditionalVisibility(pageSchema as DocumentDefinition, fieldVisibilityRules)
