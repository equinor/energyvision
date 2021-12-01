import { slugWithRef } from '../objects/slugWithRef'
import { SchemaType } from '../../types'
import blocksToText from '../../helpers/blocksToText'

export default (isoCode: string, title: string) => {
  return {
    type: 'document',
    title: `Page Routes ${title}`,
    name: `route_${isoCode}`,
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
        name: 'content',
        description: 'The content you want to appear at this path. Remember it needs to be published.',
        validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
        type: 'reference',
        to: [
          {
            type: 'page',
          },
          {
            type: 'landingPage',
          },
          {
            type: 'event',
          },
        ],
        options: {
          filter: '_lang == $lang',
          filterParams: { lang: `${isoCode}` },
        },
      },

      {
        title: 'Parent',
        name: 'parent',
        description: 'Unless this route is a top level route, it should have a parent.',
        type: 'reference',
        // Only allow a reference to the same language
        to: [{ type: `route_${isoCode}` }],
        // Only allow to select a route that does not have a parent
        // Two level url structure only for the time being?
        options: {
          filter: '!defined(parent)',
        },
      },
      {
        name: 'topicSlug',
        title: 'Topic slug',
        type: 'string',

        placeholder: 'For example "Experienced professionals"',
        description:
          'The unique part of the URL for this topic page. Should probably be something like the page title.',
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
      prepare(selection: any) {
        const { title, slug, media } = selection
        const plainTitle = title ? blocksToText(title) : ''

        return {
          title: plainTitle,
          subtitle: slug,
          media,
        }
      },
    },
  }
}
