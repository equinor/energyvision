import React from 'react'
import { i18n } from '../documentTranslation'
import { configureTitleBlockContent } from '../editors'
import CompactBlockEditor from '../components/CompactBlockEditor'
import blocksToText from '../../helpers/blocksToText'
import { Colors } from '../../helpers/ColorListValues'
// import { done } from '@equinor/eds-icons'

const titleContentType = configureTitleBlockContent()

// export default ({ topicPrefix, title }: { topicPrefix: Topics; title: string }) => {
export default {
  type: 'document',
  name: `page`,
  title: `Topic page`,
  i18n,
  fieldsets: [
    {
      title: 'Header / Banner v1',
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
    {
      name: 'title',
      type: 'array',
      title: 'Title',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
      fieldset: 'header',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Hero image',
      name: 'heroFigure',
      type: 'imageWithAltAndCaption',
      validation: (Rule) => Rule.required(),
      fieldset: 'header',
    },

    //This is no longer in use, but will it make sense to be more explicit about this? Dunno
    // Keeping this field as a reminder
    /*  {
      title: 'Is the landing page?',
      description: 'This is the landing page and should not have a unique part in the url',
      name: 'isLandingPage',
      type: 'boolean',
      fieldset: 'slug',
    }, */
    // @TODO: Write a new function
    //slugWithRef('topicSlug', 'parent', 'slug'),
    {
      name: 'content',
      type: 'array',
      title: 'Page sections',
      of: [
        { type: 'textBlock' },
        { type: 'teaser' },
        { type: 'fullWidthImage' },
        { type: 'figure' },
        { type: 'textWithIconArray' },
        { type: 'pullQuote', initialValue: { background: Colors[0] } },
        { type: 'accordion' },
        { type: 'promoTileArray' },
        { type: 'promotion' },
        /*
        The table is just done done, it's just a poc
         { type: 'table' }, */
        { type: 'stockValuesApi' },
        { type: 'iframe' },
        { type: 'remitTable' },
        { type: 'subscribeForm' },
        { type: 'cookieDeclaration' },
      ],
    },
  ],
  orderings: [
    {
      title: 'Title ',
      name: 'titleAsc',
      by: [{ field: 'title[0].children[0].text', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroFigure.image',
    },
    prepare(selection) {
      const { title, media } = selection
      const plainTitle = title ? blocksToText(title) : ''

      return {
        title: plainTitle,
        subtitle: 'Topic content',
        media,
      }
    },
  },
}
