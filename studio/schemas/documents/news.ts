import { newsSlug } from '@energyvision/shared/satelliteConfig';
import { file_add } from '@equinor/eds-icons';
import slugify from '@sindresorhus/slugify';
import type { CurrentUser, Rule } from 'sanity';
import { formatDate } from '../../helpers/formatDate';
import { isAllowed } from '../../helpers/isAllowed';
import { EdsIcon } from '../../icons';
import { defaultLanguage } from '../../languages';
import { Flags } from '../../src/lib/datasetHelpers';
import { SlugInfo } from '../components/Details/SlugInfo';
import SlugInput from '../components/SlugInput';
import { withSlugValidation } from '../validations/validateSlug';

import { lang } from './langField';

import {
  countryTags,
  excludeFromSearch,
  heroImage,
  iframe,
  ingress,
  newsContent,
  newsSlugField,
  openGraphImage,
  publishDateTime,
  relatedLinks,
  seo,
  subscriptionType,
  tags,
  title,
} from './news/sharedNewsFields';

export default {
  title: 'News',
  name: 'news',
  type: 'document',
  icon: () => EdsIcon(file_add),
  fieldsets: [
    {
      title: 'Newsletter',
      name: 'newsletter',
    },
    {
      title: 'SEO & metadata',
      name: 'metadata',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'Slug',
      name: 'slug',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: 'Tags',
      name: 'tagFieldset',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    lang,
    {
      ...seo,
      fieldset: 'metadata',
    },
    {
      ...openGraphImage,
      fieldset: 'metadata',
    },
    title,
    ...publishDateTime,
    Flags.HAS_NEWS && { ...tags, fieldset: 'tagFieldset' },
    Flags.HAS_NEWS && { ...countryTags, fieldset: 'tagFieldset' },
    Flags.HAS_NEWS_SUBSCRIPTION && {
      ...subscriptionType,
      fieldset: 'newsletter',
    },
    {
      name: 'slugInfo',
      title: 'About slugs',
      type: 'string',
      fieldset: 'slug',
      readOnly: true,
      components: {
        field: SlugInfo,
      },
    },
    {
      ...newsSlugField,
      fieldset: 'slug',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'slug',
      components: {
        input: SlugInput,
      },
      options: withSlugValidation({
        source: (doc: { newsSlug: string }) => {
          // translated document ids end with _i18n__lang while base documents don't
          return doc.newsSlug ? `${slugify(doc.newsSlug)}` : '';
        },
        slugify: (
          input: string,
          _schemaType: any,
          context: { parent: any },
        ) => {
          const slug = slugify(input);
          const { parent: document } = context;
          const translatedNews = document.lang
            ? `/${newsSlug[document.lang]}`
            : `/${newsSlug[defaultLanguage.iso]}`;
          return `${translatedNews}/${slug}`;
        },
      }),
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    heroImage,
    Flags.HAS_UPDATE_STATEMENT_NEWS_FEATURE && {
      title: 'Show updated design with pill and datetime',
      description:
        'Displays an update pill with date and time on news pages and news promotions.',
      name: 'showUpdatedTag',
      type: 'boolean',
      initialValue: false,
      readOnly: ({ currentUser }: { currentUser: CurrentUser | null }) =>
        !isAllowed(currentUser?.roles),
    },
    // Updated statement design for situations, where an statement might require its own updated datetime independent of the publish/modified date
    Flags.HAS_UPDATE_STATEMENT_NEWS_FEATURE && {
      title: 'Updated date and time',
      name: 'updateStatementDatetime',
      description:
        'Select the date/time to show for when the news item was updated on the news page, promotion cards, and in newsletters. (If left empty, the document’s last-modified date and time is used.)',
      type: 'datetime',
      options: {
        timeStep: 1,
        calendarTodayLabel: 'Today',
      },
      readOnly: ({ currentUser }: { currentUser: CurrentUser | null }) =>
        !isAllowed(currentUser?.roles),
      hidden: ({ parent }: { parent?: { showUpdatedTag?: boolean } }) =>
        !parent?.showUpdatedTag,
    },
    ingress,
    newsContent,
    iframe,
    Flags.HAS_PEOPLE && {
      name: 'relations',
      title: 'Relations',
      type: 'object',
      hidden: true,
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'persons',
          title: 'Persons',
          type: 'array',
          of: [
            {
              name: 'personRelation',
              title: 'Relation',
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                },
                {
                  name: 'person',
                  title: 'Person',
                  type: 'reference',
                  to: [{ type: 'person' }],
                  options: { disableNew: true },
                  validation: (Rule: Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: 'person.name',
                  subtitle: 'title',
                  media: 'person.image',
                },
              },
            },
          ],
        },
      ],
    },
    relatedLinks,
    excludeFromSearch,
  ].filter((e) => e),
  preview: {
    select: {
      title: 'title',
      media: 'heroImage.image',
      description: 'ingress',
      publishedDate: 'publishDateTime',
      firstPublishedAt: 'firstPublishedAt',
      isCustomDate: 'customPublicationDate',
    },
    prepare(selection: {
      title: any;
      media: any;
      description: any;
      publishedDate: any;
      firstPublishedAt: any;
      isCustomDate: any;
    }) {
      const {
        title,
        media,
        description,
        publishedDate,
        firstPublishedAt,
        isCustomDate,
      } = selection;
      const currentDate = new Date();
      const date =
        publishedDate && isCustomDate
          ? new Date(publishedDate)
          : firstPublishedAt
            ? new Date(firstPublishedAt)
            : null;

      const displayDate =
        date && date <= currentDate
          ? `Published ${formatDate(date)}`
          : 'Not published';

      const ingressBlock = (description || []).find(
        (ingressBlock: { _type: string }) => ingressBlock._type === 'block',
      );
      return {
        title,
        subtitle: displayDate,
        description: ingressBlock
          ? ingressBlock.children
              .filter((child: { _type: string }) => child._type === 'span')
              .map((span: { text: any }) => span.text)
              .join('')
          : 'Missing lead',
        media,
      };
    },
  },
};
