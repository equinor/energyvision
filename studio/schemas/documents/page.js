import React from 'react'
import { i18n } from '../documentTranslation'

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
      title: 'Page title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      fieldset: 'header',
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
        { type: 'pullQuote' },
        { type: 'accordion' },
        { type: 'promoTileArray' },
        { type: 'stockValuesApi' },
        { type: 'iframe' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroFigure.image',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title,
        media,
      }
    },
  },
}
