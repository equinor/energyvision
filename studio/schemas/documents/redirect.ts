import type { Rule, ValidationContext } from '@sanity/types'
import routes from '../routes'
import { filterByRouteAndNews } from '../../helpers/referenceFilters'
import blocksToText from '../../helpers/blocksToText'
// eslint-disable-next-line import/no-unresolved
import sanityClient from 'part:@sanity/base/client'
import { HAS_NEWS } from '../../src/lib/datasetHelpers'
import { SearchWeights } from '../searchWeights'

const client = sanityClient.withConfig({ apiVersion: '2021-05-19' })

export default {
  title: 'Redirect',
  name: 'redirect',
  type: 'document',
  fields: [
    {
      title: 'From:',
      description: 'Example: /this-is/an-example',
      name: 'from',
      type: 'string',
      validation: (Rule: Rule) =>
        Rule.custom(async (value: string, context: ValidationContext) => {
          const { document } = context
          const documentId = document?._id
          const query = `*[_type == 'redirect' && from == $value && _id != $documentId && "drafts." + _id != $documentId]`
          const params = { value, documentId }
          const redirects = await client.fetch(query, params)

          if (!value) {
            return 'Slug is required'
          } else if (value.charAt(0) !== '/') {
            return "Slug must begin with '/'. Do not add https://www.equinor.etc"
          } else if (redirects.length > 0) {
            return 'Another redirect from this path already exists'
          }

          return true
        }),
    },
    {
      title: 'To:',
      name: 'to',
      type: 'reference',
      to: [
        HAS_NEWS && {
          type: 'news',
        },
        ...routes,
      ].filter((e) => e),
      validation: (Rule: Rule) => Rule.required(),
      options: {
        filter: filterByRouteAndNews,
        disableNew: true,
      },
    },
  ],
  preview: {
    select: {
      type: 'to._type',
      newsTitle: 'to.title',
      newsMedia: 'to.heroImage.image',
      routeMedia: 'to.content.heroFigure.image',
      routeTitle: 'to.content.title',
      newSlug: 'to.slug.current',
      oldSlug: 'from',
    },
    prepare(selection: Record<string, any>) {
      const { type, newsTitle, newsMedia, routeMedia, routeTitle, newSlug, oldSlug } = selection
      let title, media
      if (type === 'news') {
        title = newsTitle
        media = newsMedia
      } else {
        title = blocksToText(routeTitle)
        media = routeMedia
      }
      return {
        media: media,
        title: 'From: ' + oldSlug,
        subtitle: 'To: ' + title + ' (' + newSlug + ')',
      }
    },
  },
  __experimental_search: [
    { weight: SearchWeights.Redirects, path: 'from' },
    { weight: SearchWeights.Redirects, path: 'to' },
  ],
}
