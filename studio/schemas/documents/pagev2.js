import React from 'react'
// We should at some point use typescript
// import type { Topics } from '../../helpers/topics'

import { slugWithType } from '../objects/slugWithType'
import { slugWithRef } from '../objects/slugWithRef'

// export default ({ topicPrefix, title }: { topicPrefix: Topics; title: string }) => {
export default {
  type: 'document',
  name: `page`,
  title: `Topic page`,
  fieldsets: [
    {
      title: 'Slug',
      name: 'slug',
      description: 'Some clever description of the slug woo',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
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
      title: 'Parent',
      name: 'parent',
      type: 'reference',
      to: [{ type: 'page' }],
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
    {
      name: 'topicSlug',
      type: 'string',
      title: 'Topic slug',
      placeholder: 'For example "Experienced professionals"',
      description: 'The unique part of the URL for this topic page. Should probably be something like the page title.',
      validation: (Rule) => Rule.max(200),
      fieldset: 'slug',
    },
    {
      title: 'Is the landing page?',
      description: 'This is the landing page and should not have a unique part in the url',
      name: 'isLandingPage',
      type: 'boolean',
      fieldset: 'slug',
    },
    // @TODO: Write a new function
    slugWithRef('topicSlug', 'parent', 'slug'),
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
        { type: 'callToAction' },
        { type: 'pullQuote' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare(selection) {
      const { title, slug } = selection
      return {
        title,
        subtitle: slug,
      }
    },
  },
}
