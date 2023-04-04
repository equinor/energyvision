import { slugWithRef } from '../objects/slugWithRef'
import type { Rule, Reference } from '@sanity/types'
import blocksToText from '../../helpers/blocksToText'
import { calendar_event } from '@equinor/eds-icons'
import { EdsIcon, TopicDocuments } from '../../icons'
import { Flags } from '../../src/lib/datasetHelpers'
import { HeroTypes } from '../HeroTypes'
import routes from '../routes'
import { filterByRoute } from '../../helpers/referenceFilters'

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
      Flags.IS_DEV && {
        title: 'Breadcrumbs',
        name: 'breadcrumbs',
        options: {
          collapsible: true,
          collapsed: false,
        },
      },
    ].filter((e) => e),
    // @TODO: Temp. solution aka 1. iteration.
    fields: [
      {
        title: 'Content',
        name: 'content',
        description: 'The content you want to appear at this path. Remember it needs to be published.',
        validation: (Rule: Rule) => Rule.required(),
        type: 'reference',
        to: [
          {
            type: 'page',
          },
          Flags.HAS_LANDING_PAGE && {
            type: 'landingPage',
          },
          Flags.HAS_EVENT && {
            type: 'event',
          },
          Flags.HAS_NEWSROOM && {
            type: 'newsroom',
          },
          Flags.HAS_MAGAZINE && {
            type: 'magazineIndex',
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
      Flags.IS_DEV && {
        name: 'enableBreadcrumbs',
        type: 'boolean',
        fieldset: 'breadcrumbs',
        title: 'Enable breadcrumbs for this page',
        description: 'Toggle this if you want this page to display breadcrumbs',
      },
      Flags.IS_DEV && {
        name: 'useCustomBreadcrumbs',
        type: 'boolean',
        fieldset: 'breadcrumbs',
        title: 'Use custom breadcrumbs',
        description: 'Toggle this if you want to create custom breadcrumbs for this page',
        initialValue: false,
      },
      Flags.IS_DEV && {
        name: 'customBreadcrumbs',
        type: 'array',
        title: 'Custom breadcrumbs',
        description:
          'Create custom breadcrumbs for this page. If left empty and breadcrumbs are enabled, they will be generated automatically based on the slug of this page. This component will be improved in version 3 of the Sanity Studio.',
        fieldset: 'breadcrumbs',
        of: [
          {
            name: 'reference',
            title: 'Breadcrumb segment',
            description:
              "Use this field to link to an internal page. The last part of the linked page's route will be used to build the breadcrumbs. For example when linking to '/energy/sustainability', the 'sustainability' part will be used as label for this segment",
            type: 'reference',
            validation: (Rule: Rule) =>
              Rule.required().custom((value: Reference, context) => {
                const { document } = context
                if (document && document._id.replace('drafts.', '') === value._ref)
                  return 'Breadcrumbs cannot link to themselves'

                return true
              }),
            to: routes,
            options: {
              filter: filterByRoute,
              disableNew: true,
            },
          },
        ],
        validation: (Rule: Rule) => Rule.unique(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        hidden: ({ parent }) => !parent.enableBreadcrumbs || !parent.useCustomBreadcrumbs,
      },
      {
        type: 'excludeFromSearch',
        name: 'excludeFromSearch',
      },
    ].filter((e) => e),
    preview: {
      select: {
        title: 'content.title',
        slug: 'slug.current',
        media: 'content.heroFigure.image',
        video: 'content.heroLoopingVideo.thumbnail',
        heroType: 'content.heroType',
        type: 'content._type',
      },
      prepare(selection: any) {
        const { title, slug, media, type, heroType, video } = selection
        const plainTitle = title ? blocksToText(title) : ''
        let thumbnail
        if (heroType === HeroTypes.LOOPING_VIDEO) {
          thumbnail = video
        } else {
          thumbnail = media ? media : type === 'event' ? EdsIcon(calendar_event) : TopicDocuments
        }

        return {
          title: plainTitle,
          subtitle: slug,
          media: thumbnail,
        }
      },
    },
  }
}
