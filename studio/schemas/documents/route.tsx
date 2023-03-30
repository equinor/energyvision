import { slugWithRef } from '../objects/slugWithRef'
import type { Rule } from '@sanity/types'
import blocksToText from '../../helpers/blocksToText'
import { calendar_event } from '@equinor/eds-icons'
import { EdsIcon, TopicDocuments } from '../../icons'
import { Flags } from '../../src/lib/datasetHelpers'
import { HeroTypes } from '../HeroTypes'
import { breadcrumbs } from '../objects/breadcrumbs'

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
        type: 'string',
        name: 'breadcrumbsInput',
        title: 'Breadcrumbs input',
        description:
          'Enter the desired breadcrumbs here, for example "about/equinor/contact". Breadcrumbs must be built from existing and published routes.',
        fieldset: 'breadcrumbs',
      },
      Flags.IS_DEV && breadcrumbs('breadcrumbsInput', 'breadcrumbs'),
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
