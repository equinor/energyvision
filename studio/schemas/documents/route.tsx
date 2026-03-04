import { library_books } from '@equinor/eds-icons'
// eslint-disable-next-line import/namespace
import type { SanityClient, SanityDocument } from '@sanity/client'
import { CiRoute, CiWarning } from 'react-icons/ci'
import { MdOutlineEvent } from 'react-icons/md'
import type {
  Reference,
  Rule,
  SlugParent,
  SlugSchemaType,
  SlugSourceContext,
} from 'sanity'
import slugify from 'slugify'
import blocksToText from '@/helpers/blocksToText'
import { EdsIcon } from '../../icons'
import { Flags } from '../../src/lib/datasetHelpers'
import SlugInput from '../components/SlugInput'
import { withSlugValidation } from '../validations/validateSlug'

export default (isoCode: string, title: string) => {
  return {
    type: 'document',
    title: `Page Routes ${title}`,
    name: `route_${isoCode}`,
    icon: () => EdsIcon(library_books),
    fieldsets: [
      {
        title: 'Slug',
        name: 'slug',
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
        description:
          'The content you want to appear at this path. Remember it needs to be published.',
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
        ].filter(e => e),
        options: {
          filter: 'lang == $lang',
          filterParams: { lang: `${isoCode}` },
          disableNew: true,
          sort: [{ direction: 'desc', field: '_createdAt' }],
        },
      },
      {
        title: 'Parent',
        name: 'parent',
        description:
          'Unless this route is a top level route, it should have a parent.',
        type: 'reference',
        // Only allow a reference to the same language
        to: [{ type: `route_${isoCode}` }],
        // Only allow to select a route that does not have a parent
        // Two level url structure only for the time being?
        options: {
          filter: '!defined(parent)',
          disableNew: true,
          sort: [{ direction: 'desc', field: '_updatedAt' }],
        },
      },
      {
        name: 'topicSlug',
        title: 'Topic slug',
        type: 'string',

        placeholder: 'For example "Experienced professionals"',
        description:
          'The unique part of the URL for this page. Should probably be something like the page title.',
        // validation: (Rule) => Rule.max(200),
        fieldset: 'slug',
      },
      {
        title: 'Complete URL for this page',
        name: 'slug',
        type: 'slug',
        fieldset: 'slug',
        components: {
          input: SlugInput,
        },
        options: withSlugValidation({
          source: (doc: SanityDocument) =>
            slugify(doc.topicSlug, { lower: true }),
          slugify: async (
            input: string,
            _schemaType: SlugSchemaType,
            context: SlugSourceContext & { client: SanityClient },
          ) => {
            const { client, parent } = context
            const document = parent as SlugParent & { parent: Reference }
            const refId = document.parent?._ref

            if (refId) {
              return client
                .fetch(/* groq */ `*[_id == $refId][0].slug.current`, {
                  refId: refId,
                })
                .then((parentSlug: string) => `${parentSlug}/${slugify(input)}`)
            }
            return `/${slugify(input)}`
          },
        }),
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: 'breadcrumbs',
        type: 'breadcrumbs',
      },
      {
        type: 'excludeFromSearch',
        name: 'excludeFromSearch',
      },
      {
        type: 'boolean',
        name: 'includeInBuild',
        title: 'Include in static build',
        description:
          'Enable this if this route should be generated at build time',
        initialValue: false,
      },
    ],
    orderings: [
      {
        title: 'Slug (desc)',
        name: 'slugDesc',
        by: [{ field: 'slug', direction: 'desc' }],
      },
      {
        title: 'Slug (Asc)',
        name: 'slugAsc',
        by: [{ field: 'slug', direction: 'asc' }],
      },
    ],
    preview: {
      select: {
        title: 'content.title',
        slug: 'slug.current',
        media: 'content.heroFigure.image',
        eventDate: 'content.eventDate',
        type: 'content._type',
      },
      prepare(selection: any) {
        const { slug, media, eventDate, title: contentTitle, type } = selection

        const mapType = (type: string | undefined) => {
          switch (type) {
            case 'page':
              return 'Topic page'
            case 'newsroom':
              return 'Newsroom'
            case 'landingPage':
              return 'Landing page'
            case 'event':
              return 'Event page'
            case 'magazineIndex':
              return 'Magazine room'
            default:
              return undefined
          }
        }

        const subTitle =
          mapType(type) ??
          (contentTitle && blocksToText(contentTitle)) ??
          'Missing content'

        const withoutParent = slug ? slug.split('/').at(-1) : ''
        let title = 'Missing route'
        if (slug) {
          title = withoutParent
        }
        const thumbnail = media ? media : eventDate ? MdOutlineEvent : CiRoute

        return {
          title: '/' + title,
          subtitle: subTitle,
          media: !slug ? CiWarning : thumbnail,
        }
      },
    },
  }
}
