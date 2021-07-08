// First, we must import the schema creator
//eslint-disable-next-line
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
//eslint-disable-next-line
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import news from './documents/news'
import page from './documents/page'
import route from './documents/route'

// Objects
import imageWithAlt from './objects/imageWithAlt'
import imageWithAltAndCaption from './objects/imageWithAltAndCaption'
import pullQuote from './objects/pullQuote'
import factbox from './objects/factbox'
import relatedLinks from './objects/relatedLinks'
import positionedInlineImage from './objects/positionedInlineImage'
import titleAndMeta from './objects/titleAndMeta'
import downloadableFile from './objects/files'
import downloadableImage from './objects/downloadableImage'
import teaser from './objects/teaser'
import textBlock from './objects/textBlock'
import accordion from './objects/accordion'
import accordionItem from './objects/accordionItem'
import fullWidthImage from './objects/fullWidthImage'
import figure from './objects/figure'
import textWithIcon from './objects/textWithIcon'
import textWithIconArray from './objects/textWithIconArray'
import callToAction from './objects/callToAction'
import externalUrl from './objects/externalUrl'
import internalUrl from './objects/internalUrl'
import promoTile from './objects/promoTile'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    news,
    page,
    route,
    imageWithAlt,
    imageWithAltAndCaption,
    pullQuote,
    factbox,
    relatedLinks,
    positionedInlineImage,
    titleAndMeta,
    downloadableFile,
    downloadableImage,
    teaser,
    textBlock,
    accordion,
    accordionItem,
    fullWidthImage,
    figure,
    textWithIcon,
    textWithIconArray,
    callToAction,
    externalUrl,
    internalUrl,
    promoTile,
  ]),
})
