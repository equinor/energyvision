import React from 'react'
// We should at some point use typescript
// import type { Topics } from '../../helpers/topics'
import { slugWithType } from '../objects/slugWithType'

// export default ({ topicPrefix, title }: { topicPrefix: Topics; title: string }) => {
export default (topicSuffix, title) => {
  return {
    type: 'document',
    name: `page_${topicSuffix}`,
    title: `${title}`,
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
        name: 'seo',
        type: 'titleAndMeta',
        fieldset: 'metadata',
        title: 'Meta information',
      },
      {
        name: 'openGraphImage',
        type: 'imageWithAlt',
        title: 'Open Graph Image',
        description: 'You can override the hero image as the SoMe image by uploading another image here.',
        fieldset: 'metadata',
      },
      {
        name: 'topicSuffix',
        initialValue: `${topicSuffix}`,
        type: 'string',
        hidden: true,
      },
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'topicSlug',
        type: 'string',
        title: 'Topic slug',
        placeholder: 'E.g. "Experienced professionals"',
        description: 'The unique part of the URL for this topic page. Should probably be something like the title.',
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
      slugWithType(topicSuffix, 'slug', 'isLandingPage'),
      {
        name: 'content',
        type: 'array',
        title: 'Page sections',
        localize: false,
        of: [{ type: 'teaser' }, { type: 'textBlock' }, { type: 'fullWidthImage' }],
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
}
