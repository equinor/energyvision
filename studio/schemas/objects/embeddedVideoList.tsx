import { play_circle } from '@equinor/eds-icons'
import type { PortableTextBlock, Rule } from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'
import { gridColumns } from './commonFields/commonFields'
import { cookiePolicy } from './iframe/sharedIframeFields'

export default {
  name: 'embeddedVideoList',
  title: 'Embedded video list',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'title' })],
      title: 'Title',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      type: 'boolean',
      name: 'hideTitle',
      title: 'Hide title',
      description:
        'Hides the title, but screen readers will read title of carousel',
    },
    {
      name: 'ingress',
      title: 'Ingress',
      description: 'Optional short description. Max 400 characters',
      type: 'array',
      of: [configureBlockContent({ variant: 'ingress' })],
      validation: (Rule: Rule) =>
        Rule.custom((value: any) =>
          validateCharCounterEditor(value, 400, true),
        ),
    },
    cookiePolicy(),
    gridColumns(),
    {
      type: 'array',
      name: 'items',
      title: 'Video items',
      description: 'Add one or more embedded videos.',
      of: [
        {
          title: 'Video item',
          type: 'object',
          fields: [
            {
              name: 'videoId',
              type: 'string',
              title: 'Embed URL',
              description:
                'Paste the full embed URL (YouTube or Vimeo iframe src).',
            },
            {
              name: 'highlighted',
              type: 'boolean',
              title: 'Highlight video',
              description:
                'Places this video first and larger at the top of the list on web.',
              initialValue: false,
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
              highlighted: 'highlighted',
            },
            prepare({
              title = [],
              subtitle,
              highlighted,
            }: {
              title: PortableTextBlock[]
              subtitle: string
              highlighted?: boolean
            }) {
              return {
                title: blocksToText(title) || 'Embedded video',
                subtitle: highlighted ? `Highlighted | ${subtitle}` : subtitle,
              }
            },
          },
        },
      ],
      validation: (Rule: Rule) =>
        Rule.required()
          .min(1)
          .custom((items?: Array<{ highlighted?: boolean }>) => {
            const highlightedCount =
              items?.filter(item => item?.highlighted).length ?? 0

            return highlightedCount > 1
              ? 'Only one video can be highlighted.'
              : true
          }),
    },
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare(selection: any) {
      const { title, items } = selection
      const length = items ? items.length : 0

      return {
        title: title ? blocksToText(title) : 'Untitled embedded video list',
        subtitle: `Embedded video list with ${length} items`,
        media: EdsIcon(play_circle),
      }
    },
  },
}
