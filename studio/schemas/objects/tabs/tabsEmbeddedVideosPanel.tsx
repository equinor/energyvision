import { play_circle } from '@equinor/eds-icons';
import type { PortableTextBlock, Rule } from 'sanity';
import blocksToText from '../../../helpers/blocksToText';
import { EdsIcon } from '../../../icons';
import { CompactBlockEditor } from '../../components/CompactBlockEditor';
import { configureBlockContent } from '../../editors';
import { cookiePolicy } from '../iframe/sharedIframeFields';

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
              title: 'Embed URL',
              description:
                'Paste the full embed URL (YouTube or Vimeo iframe src).',
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
              title: PortableTextBlock[];
              subtitle: string;
            }) {
              return {
                title: blocksToText(title),
                subtitle,
              };
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
      };
    },
  },
};
