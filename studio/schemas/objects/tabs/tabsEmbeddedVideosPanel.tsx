import { play_circle } from '@equinor/eds-icons'
import type { PortableTextBlock, Rule } from 'sanity'
import blocksToText from '../../../helpers/blocksToText'
import { EdsIcon } from '../../../icons'
import { CompactBlockEditor } from '../../components/CompactBlockEditor'
import { configureBlockContent } from '../../editors'
import { cookiePolicy } from '../iframe/sharedIframeFields'

export default {
  name: 'tabsEmbeddedVideosPanel',
  title: 'Embedded videos panel',
  type: 'object',
  fields: [
    cookiePolicy(),
    {
      type: 'array',
      name: 'items',
      title: 'Video items',
      description: 'Add one or more videos for this tab panel.',
      of: [
        {
          title: 'Video item',
          type: 'object',
          fields: [
            {
              name: 'videoId',
              type: 'string',
              title: 'YouTube video ID',
              description: 'Paste only the video ID, not the full URL.',
              validation: (Rule: Rule) =>
                Rule.required().custom((value?: string) => {
                  if (!value) return true

                  const isValidYoutubeId = /^[A-Za-z0-9_-]{11}$/.test(value)

                  if (!isValidYoutubeId) {
                    return 'Enter a valid YouTube video ID (11 characters).'
                  }

                  return true
                }),
            },
            {
              name: 'title',
              type: 'array',
              title: 'Title',
              description: 'Optional title shown beneath the video.',
              components: { input: CompactBlockEditor },
              of: [configureBlockContent({ variant: 'title' })],
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'videoId',
            },
            prepare({
              title = [],
              subtitle,
            }: {
              title: PortableTextBlock[]
              subtitle: string
            }) {
              return {
                title: blocksToText(title),
                subtitle,
              }
            },
          },
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items = [] }: { items?: unknown[] }) {
      return {
        title: 'Embedded videos',
        subtitle: `${items.length} video${items.length === 1 ? '' : 's'}`,
        media: EdsIcon(play_circle),
      }
    },
  },
}
