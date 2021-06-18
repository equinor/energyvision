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
  fields: [
    {
      title: 'Content',
      name: 'content',
      description: 'The content you want to appear at this path. Remember it needs to be published.',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      to: [
        {
          type: 'page',
        },
      ],
    },
    {
      title: 'Parent route',
      description: 'Unless this route is a top level route, it should have a parent.',
      name: 'parent',
      type: 'reference',
      to: [{ type: 'route' }],
    },
    {
      name: 'topicSlug',
      title: 'Topic slug',
      type: 'object',
      fields: [
        {
          title: 'English',
          name: 'en_gb',
          type: 'string',
        },
        {
          title: 'Norwegian',
          name: 'nb_no',
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
      title: 'content.title',
      slug: 'slug.current',
      media: 'content.heroFigure.image',
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
