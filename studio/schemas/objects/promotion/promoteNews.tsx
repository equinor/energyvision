import type { PortableTextBlock } from '@portabletext/react';
import { Fragment } from 'react';
import { TiNews } from 'react-icons/ti';
import {
  type PreviewProps,
  type Reference,
  type Rule,
  useDocumentValues,
} from 'sanity';
import blocksToText from '../../../helpers/blocksToText';
import { defaultLanguage } from '../../../languages';
import { Flags } from '../../../src/lib/datasetHelpers';
import {
  ingress,
  theme,
  title,
  viewAllLink,
  viewAllLinkLabel,
} from '../commonFields/commonFields';

const NewsTagLabel = ({ documentId }: { documentId: string }) => {
  const { value, isLoading, error } = useDocumentValues<{
    title?: string | Record<string, string>;
    key?: { current?: string };
  }>(documentId, ['title', 'key']);
  const title =
    typeof value?.title === 'string'
      ? value.title
      : value?.title?.[defaultLanguage.name];

  return (
    <>
      {title ||
        value?.key?.current ||
        (isLoading ? 'Loading tag' : error ? 'Unavailable tag' : 'Unnamed tag')}
    </>
  );
};

const NewsPromotionPreview = (
  props: PreviewProps & { tagReferences?: Reference[] },
) => {
  const { tagReferences, renderDefault } = props;

  return renderDefault({
    ...props,
    subtitle: (
      <>
        News promotion:{' '}
        {tagReferences?.length
          ? tagReferences.map((tag, index) => (
              <Fragment key={tag._key ?? `${tag._ref}-${index}`}>
                {index > 0 && ', '}
                <NewsTagLabel documentId={tag._ref} />
              </Fragment>
            ))
          : 'All'}
      </>
    ),
  });
};

export default {
  title: 'News promotion',
  name: 'promoteNews',
  type: 'object',
  fieldsets: [
    {
      title: 'Tags',
      name: 'tagFieldset',
      description: 'Feed in the latest 3 news that satisfies the tags',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    title,
    ingress,
    {
      title: 'Topic tags',
      name: 'tags',
      type: 'array',
      fieldset: 'tagFieldset',
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
      fieldset: 'tagFieldset',
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
      fieldset: 'tagFieldset',
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
  ].filter((e) => e),
  components: {
    preview: NewsPromotionPreview,
  },
  preview: {
    select: {
      title: 'title',
      tags: 'tags',
      countryTags: 'countryTags',
      localNewsTags: 'localNewsTags',
    },
    prepare({
      title,
      tags,
      countryTags,
      localNewsTags,
    }: {
      title?: PortableTextBlock[];
      tags?: Reference[];
      countryTags?: Reference[];
      localNewsTags?: Reference[];
    }) {
      //@ts-ignore:todo
      const plainTitle = blocksToText(title) ?? 'No title, only news';
      return {
        title: plainTitle,
        tagReferences: [
          ...(tags ?? []),
          ...(countryTags ?? []),
          ...(localNewsTags ?? []),
        ],
        media: TiNews,
      };
    },
  },
};
