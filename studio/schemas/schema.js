// First, we must import the schema creator
//eslint-disable-next-line
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
//eslint-disable-next-line
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import news from './documents/news'

// Objects
import imageWithAlt from './objects/imageWithAlt'
import imageWithAltAndCaption from './objects/imageWithAltAndCaption'
import pullQuote from './objects/pullQuote'
import backgroundColourPicker from './objects/backgroundColourPicker'
import factbox from './objects/factbox'
import relatedLinks from './objects/relatedLinks'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    news,
    imageWithAlt,
    imageWithAltAndCaption,
    pullQuote,
    backgroundColourPicker,
    factbox,
    relatedLinks,
  ]),
})
