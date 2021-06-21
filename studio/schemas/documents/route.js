import { slugWithRef } from '../objects/slugWithRef'

export default {
  type: 'document',
  title: 'Page Routes',
  name: 'route',
  fieldsets: [
    {
      title: 'Slug',
      name: 'slug',
      description: '⚠️ This feature is still actively being worked on ⚠️',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  // @TODO: Temp. solution aka 1. iteration.
  fields: [
    {
      title: 'Content',
      description: '1. iteration with separate content for each language',
      type: 'object',
      name: 'content',
      fields: [
        {
          title: 'English content',
          name: 'en_GB',
          description: 'The content you want to appear at this path. Remember it needs to be published.',
          validation: (Rule) => Rule.required(),
          type: 'reference',
          to: [
            {
              type: 'page',
            },
          ],
          options: {
            filter: '_lang == $lang',
            filterParams: { lang: 'en_GB' },
          },
        },
        {
          title: 'Norwegian content',
          name: 'nb_NO',
          description: 'The content you want to appear at this path. Remember it needs to be published.',
          validation: (Rule) => Rule.required(),
          type: 'reference',
          to: [
            {
              type: 'page',
            },
          ],
          options: {
            filter: '_lang == $lang',
            filterParams: { lang: 'nb_NO' },
          },
        },
      ],
    },
    {
      title: 'Parent route',
      description: '1. iteration with separate parent for each language',
      type: 'object',
      name: 'parent',
      fields: [
        {
          title: 'English parent',
          name: 'en_GB',
          description: 'Unless this route is a top level route, it should have a parent.',
          validation: (Rule) => Rule.required(),
          type: 'reference',
          to: [{ type: 'route' }],
          options: {
            filter: '_lang == $lang',
            filterParams: { lang: 'en_GB' },
          },
        },
        {
          title: 'Norwegian content',
          name: 'nb_NO',
          description: 'Unless this route is a top level route, it should have a parent.',
          validation: (Rule) => Rule.required(),
          type: 'reference',
          to: [
            {
              type: 'page',
            },
          ],
          options: {
            filter: '_lang == $lang',
            filterParams: { lang: 'nb_NO' },
          },
        },
      ],
    },
    {
      name: 'topicSlug',
      title: 'Topic slug',
      type: 'object',
      fields: [
        {
          title: 'English',
          name: 'en_GB',
          type: 'string',
        },
        {
          title: 'Norwegian',
          name: 'nb_NO',
          type: 'string',
        },
      ],
      // placeholder: 'For example "Experienced professionals"',
      // description: 'The unique part of the URL for this topic page. Should probably be something like the page title.',
      // validation: (Rule) => Rule.max(200),
      fieldset: 'slug',
    },
    slugWithRef('topicSlug', 'parent', 'slug'),
  ],
  preview: {
    select: {
      title: 'content.en_GB.title',
      slug: 'slug.en_GB.current',
      media: 'content.en_GB.heroFigure.image',
    },
    prepare(selection) {
      const { title, slug, media } = selection
      return {
        title,
        subtitle: slug,
        media,
      }
    },
  },
}
