import { Card, Text } from '@sanity/ui';
import { LuNewspaper } from 'react-icons/lu';
import type { PortableTextBlock, Reference, Rule } from 'sanity';
import { Flags } from '@/src/lib/datasetHelpers';
import blocksToText from '../../helpers/blocksToText';
import { hideTitle, theme, title } from './commonFields/commonFields';

const NewsListDescription = () => (
  <Card padding={1}>
    <Text size={1}>
      If no tags selected below, component will fetch all latest news
    </Text>
  </Card>
);

export default {
  title: 'News list',
  name: 'newsList',
  type: 'object',
  fieldsets: [
    {
      title: 'Design options',
      name: 'design',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    title,
    hideTitle,
    {
      name: 'hitsPerPage',
      title: 'Articles per page',
      type: 'number',
      fieldset: 'design',
      initialValue: 18,
      options: {
        list: [
          { title: '6', value: 6 },
          { title: '12', value: 12 },
          { title: '18', value: 18 },
        ],
        layout: 'dropdown',
      },
      validation: (Rule: Rule) => Rule.integer().valid([6, 12, 18]),
    },
    {
      name: 'description',
      type: 'string',
      readOnly: true,
      components: {
        input: NewsListDescription,
      },
    },
    {
      title: 'Topic tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }],
          options: { disableNew: true },
        },
      ],
      validation: (Rule: Rule) => Rule.unique(),
      options: { sortable: false },
    },
    {
      title: 'Country tags',
      name: 'countryTags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'countryTag' }],
          options: { disableNew: true },
        },
      ],
      validation: (Rule: Rule) => Rule.unique(),
      options: { sortable: false },
    },
    Flags.HAS_LOCAL_NEWS && {
      title: 'Local news tags',
      name: 'localNewsTags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'localNewsTag' }],
          options: { disableNew: true },
        },
      ],
      validation: (Rule: Rule) => Rule.unique(),
      options: { sortable: false },
    },
    theme,
    /*     {
      type: 'promoteNews',
      name: 'selectedTags',
      title: 'News tags',
      description:
        'Select which tags should be used to generate the news list.',
      validation: (Rule: Rule) => Rule.required(),
    }, */
  ],
  preview: {
    select: {
      title: 'title',
      topicTagReferences: 'tags',
      countryTagReferences: 'countryTags',
      localNewsTagReferences: 'localNewsTags',
      legacyTopicTagReferences: 'selectedTags.tags',
      legacyCountryTagReferences: 'selectedTags.countryTags',
      legacyLocalNewsTagReferences: 'selectedTags.localNewsTags',
    },
    prepare({
      title,
      topicTagReferences,
      countryTagReferences,
      localNewsTagReferences,
      legacyTopicTagReferences,
      legacyCountryTagReferences,
      legacyLocalNewsTagReferences,
    }: {
      title?: PortableTextBlock[];
      topicTagReferences?: Reference[] | null;
      countryTagReferences?: Reference[] | null;
      localNewsTagReferences?: Reference[] | null;
      legacyTopicTagReferences?: Reference[] | null;
      legacyCountryTagReferences?: Reference[] | null;
      legacyLocalNewsTagReferences?: Reference[] | null;
    }) {
      const topicTagCount =
        (topicTagReferences ?? legacyTopicTagReferences)?.length ?? 0;
      const countryTagCount =
        (countryTagReferences ?? legacyCountryTagReferences)?.length ?? 0;
      const localNewsTagCount =
        (localNewsTagReferences ?? legacyLocalNewsTagReferences)?.length ?? 0;

      return {
        title: blocksToText(title),
        subtitle:
          topicTagCount + countryTagCount + localNewsTagCount === 0
            ? 'Newslist | all tags'
            : `Newslist | ${topicTagCount} topic | ${countryTagCount} country | ${localNewsTagCount} local news tags`,
        media: LuNewspaper,
      };
    },
  },
};
