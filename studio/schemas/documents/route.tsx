import { slugWithRef } from '../objects/slugWithRef'
import { SchemaType } from '../../types'
import blocksToText from '../../helpers/blocksToText'
import { calendar_event } from '@equinor/eds-icons'
import { EdsIcon, TopicDocuments } from '../../icons'
import { HAS_EVENT, HAS_MAGAZINE, HAS_LANDING_PAGE, HAS_NEWSROOM } from '../../src/lib/datasetHelpers'

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
          HAS_LANDING_PAGE && {
            type: 'landingPage',
          },
          HAS_EVENT && {
            type: 'event',
          },
          HAS_NEWSROOM && {
            type: 'newsroom',
          },
          HAS_MAGAZINE && {
            type: 'magazine',
          },
        ].filter((e) => e),
        options: {
          filter: '_lang == $lang',
          filterParams: { lang: `${isoCode}` },
          disableNew: true,
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
          disableNew: true,
        },
      },
      {
        name: 'topicSlug',
        title: 'Topic slug',
        type: 'string',

        placeholder: 'For example "Experienced professionals"',
        description: 'The unique part of the URL for this page. Should probably be something like the page title.',
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
        type: 'content._type',
      },
      prepare(selection: any) {
        const { title, slug, media, type } = selection
        const plainTitle = title ? blocksToText(title) : ''

        const thumbnail = media ? media : type === 'event' ? EdsIcon(calendar_event) : TopicDocuments

        return {
          title: plainTitle,
          subtitle: slug,
          media: thumbnail,
        }
      },
    },
  }
}
