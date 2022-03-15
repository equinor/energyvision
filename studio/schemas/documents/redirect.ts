import type { Rule } from '@sanity/types'
import routes from '../routes'
import { filterByRouteAndNews } from '../../helpers/referenceFilters'
import blocksToText from '../../helpers/blocksToText'

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
        Rule.custom((value: string) => {
          if (!value) {
            return 'Slug is required'
          } else if (value.charAt(0) !== '/') {
            return "Slug must begin with '/'. Do not add https://www.equinor.etc"
          }
          return true
        }),
    },
    {
      title: 'To:',
      name: 'to',
      type: 'reference',
      to: [
        {
          type: 'news',
        },
        ...routes,
      ],
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
}
