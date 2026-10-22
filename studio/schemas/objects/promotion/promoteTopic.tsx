import { LiaPagerSolid } from 'react-icons/lia';
import type { Image, PortableTextBlock, Reference, Rule } from 'sanity';
import blocksToText from '../../../helpers/blocksToText';
import { topicPromotionFilter } from '../../../helpers/referenceFilters';
import { configureBlockContent } from '../../editors/blockContentType';
import routes from '../../routes';
import { validateCharCounterEditor } from '../../validations/validateCharCounterEditor';
import {
  ingress,
  theme,
  title,
  viewAllLink,
  viewAllLinkLabel,
} from '../commonFields/commonFields';

type PromotedTopicPage = {
  _key: string;
  _type: 'topics';
  ingress: PortableTextBlock[];
  reference: Reference;
};

export type TopicPromotion = {
  _type: 'promoteTopics';
  references: PromotedTopicPage[];
};

export default {
  title: 'Topic/magazine promotion',
  name: 'promoteTopics',
  type: 'object',
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    title,
    ingress,
    {
      name: 'references',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'topics',
          title: 'Pages',
          fields: [
            {
              title: 'Page to be promoted',
              name: 'reference',
              description: 'Select the page you want to promote',
              type: 'reference',
              to: [...routes].filter((e) => e),
              options: {
                filter: topicPromotionFilter,
                disableNew: true,
              },
            },
            {
              name: 'ingress',
              title: 'Ingress',
              description:
                'A short and catchy introduction text for this topic content card (max. 215 chars)',
              type: 'array',
              of: [configureBlockContent({ variant: 'ingress' })],
              validation: (Rule: Rule) =>
                Rule.custom((value: any) =>
                  validateCharCounterEditor(value, 215, true),
                ),
            },
          ],
          preview: {
            select: {
              topicTitle: 'reference.content.title',
              magazineTitle: 'reference.title',
              topicMedia: 'reference.content.heroFigure.image',
              magazineMedia: 'reference.heroFigure.image',
            },
            prepare({
              topicTitle,
              magazineTitle,
              topicMedia,
              magazineMedia,
            }: {
              topicTitle: PortableTextBlock[];
              magazineTitle: PortableTextBlock[];
              topicMedia: Image;
              magazineMedia: Image;
            }) {
              const title = topicTitle || magazineTitle || '';
              const plainTitle = title ? blocksToText(title) : '';

              return {
                title: plainTitle,
                media: topicMedia || magazineMedia,
              };
            },
          },
        },
      ],
      validation: (Rule: Rule) => Rule.unique(),
    },
    viewAllLink,
    viewAllLinkLabel,
    theme,
    {
      title: 'Background (Deprecated)',
      description: 'Please select a theme instead',
      name: 'background',
      type: 'colorlist',
      fieldset: 'design',
      readonly: true,
      hidden: ({ value }: any) => {
        return !value || value.title === 'White';
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: { title?: PortableTextBlock[] }) {
      return {
        title: blocksToText(title ?? [])?.trim() || 'Untitled',
        subtitle: 'Please update to type Promotion',
        media: LiaPagerSolid,
      };
    },
  },
};
