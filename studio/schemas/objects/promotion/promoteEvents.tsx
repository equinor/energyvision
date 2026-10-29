import type { PortableTextBlock } from '@portabletext/react';
import { Fragment } from 'react';
import { RiCalendarEventFill } from 'react-icons/ri';
import {
  type PreviewProps,
  type Reference,
  type Rule,
  useDocumentValues,
  type ValidationContext,
} from 'sanity';
import { defaultBackgroundColors } from '@/schemas/defaultColors';
import blocksToText from '../../../helpers/blocksToText';
import { capitalizeFirstLetter } from '../../../helpers/formatters';
import { filterByRouteEvents } from '../../../helpers/referenceFilters';
import {
  getTranslation,
  type TranslationValue,
} from '../../../helpers/translation';
import routes from '../../routes';
import { createColorSelectField } from '../colorList';
import {
  backgroundPosition,
  ingress,
  theme,
  title,
  viewAllLink,
  viewAllLinkLabel,
} from '../commonFields/commonFields';

export type EventPromotion = {
  _key: string;
  _type: 'promoteEvents';
  tags?: Reference[];
  promotionType?: 'automatic' | 'manual';
  promotedEvents?: Reference[];
  promotePastEvents?: boolean;
  eventsCount?: number;
};

const EventTagLabel = ({ documentId }: { documentId: string }) => {
  const { value, isLoading, error } = useDocumentValues<{
    translation?: TranslationValue[];
    key?: { current?: string };
  }>(documentId, ['translation', 'key']);

  return (
    <>
      {getTranslation(value?.translation) ||
        value?.key?.current ||
        (isLoading ? 'Loading tag' : error ? 'Unavailable tag' : 'Unnamed tag')}
    </>
  );
};

const EventPromotionPreview = (
  props: PreviewProps & { tags?: Reference[] },
) => {
  const { tags, subtitle, renderDefault } = props;

  return renderDefault({
    ...props,
    subtitle: (
      <>
        Event promotion: {subtitle && <>{subtitle} | </>}
        {tags?.length
          ? tags.map((tag, index) => (
              <Fragment key={tag._key ?? tag._ref}>
                {index > 0 && ', '}
                <EventTagLabel documentId={tag._ref} />
              </Fragment>
            ))
          : 'All'}
      </>
    ),
  });
};

export default {
  title: 'Event promotion',
  name: 'promoteEvents',
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
      title: 'Set how events should be picked',
      name: 'promotionType',
      type: 'string',
      options: {
        list: [
          { title: 'Automatic', value: 'automatic' },
          { title: 'Manually', value: 'manual' },
        ],
      },
      initialValue: 'automatic',
    },
    {
      name: 'promotePastEvents',
      type: 'boolean',
      title: 'Only past events',
      description: 'Only select from past events',
      initialValue: false,
      hidden: ({ parent }: any) => parent?.promotionType === 'manual',
    },
    {
      name: 'eventsCount',
      title: 'Number of events',
      description:
        'Set this if you want to restrict the number of events to show',
      type: 'number',
      validation: (Rule: Rule) => Rule.max(50).error('Max 50'),
      hidden: ({ parent }: any) => parent?.promotionType === 'manual',
    },
    {
      title: 'Select from tags',
      name: 'tags',
      description:
        'Select specific tags if you want to promote events from a selection. Default is from all tags',
      type: 'array',
      of: [
        {
          title: 'Select the event tag(s) to promote',
          type: 'reference',
          to: [{ type: 'eventTag' }],
          options: { disableNew: true },
        },
      ],
      hidden: ({ parent }: any) => parent?.promotionType === 'manual',
    },
    {
      title: 'Selected Events',
      name: 'promotedEvents',
      description: 'Select the specific events you want to promote',
      type: 'array',
      of: [
        {
          title: 'Add event',
          type: 'reference',
          to: routes,
          options: {
            filter: filterByRouteEvents,
            disableNew: true,
          },
        },
      ],
      hidden: ({ parent }: any) => parent?.promotionType !== 'manual',
      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext) => {
          const { parent } = context as { parent: EventPromotion };
          if (parent?.promotionType === 'automatic') return true;
          if (!value || value.length === 0)
            return 'You must select at least one event';
          return true;
        }).unique(),
    },
    {
      title: 'Background image',
      description:
        'If this is used theme will be ignored and a background filter will be applied for title and ingress above',
      name: 'backgroundImage',
      type: 'image',
      options: {
        hotspot: true,
        collapsed: false,
      },
      hidden: (props: any) => {
        const { parent, currentUser } = props || {};
        const allowedRoles = ['designer', 'administrator', 'developer'];
        const isAllowed = currentUser?.roles?.some((role: any) =>
          allowedRoles?.includes(role?.name),
        );
        if (!isAllowed) return true;
        if (
          parent?.promotionType === 'manual' &&
          parent?.promotedEvents?.length === 1
        )
          return false;
        return true;
      },
    },
    backgroundPosition((props: any) => {
      const { parent, currentUser } = props || {};
      const allowedRoles = ['designer', 'administrator', 'developer'];
      const isAllowed = currentUser?.roles?.some((role: any) =>
        allowedRoles?.includes(role?.name),
      );
      if (!isAllowed) return true;
      if (
        parent?.promotionType === 'manual' &&
        parent?.promotedEvents?.length === 1
      )
        return false;
      return true;
    }),
    {
      title: 'Use white text',
      description: 'Default is black text, set this if you want white.',
      name: 'isDark',
      type: 'boolean',
      hidden: (props: any) => {
        const { parent, currentUser } = props || {};
        const allowedRoles = ['designer', 'administrator', 'developer'];
        const isAllowed = currentUser?.roles?.some((role: any) =>
          allowedRoles?.includes(role?.name),
        );
        if (!isAllowed) return true;
        if (
          parent?.promotionType === 'manual' &&
          parent?.promotedEvents?.length === 1
        )
          return false;
        return true;
      },
    },
    {
      title: 'Use glass effect behind text',
      description: '',
      name: 'useGlassEffect',
      type: 'boolean',
      hidden: (props: any) => {
        const { parent, currentUser } = props || {};
        const allowedRoles = ['designer', 'administrator', 'developer'];
        const isAllowed = currentUser?.roles?.some((role: any) =>
          allowedRoles?.includes(role?.name),
        );
        if (!isAllowed) return true;
        if (
          parent?.promotionType === 'manual' &&
          parent?.promotedEvents?.length === 1
        )
          return false;
        return true;
      },
    },
    viewAllLink,
    viewAllLinkLabel,
    createColorSelectField({
      name: 'containerBackground',
      title: 'Background color',
      fieldset: 'design',
      description: 'Selected background with white cards',
      colors: [
        ...defaultBackgroundColors.filter((color) => color.key !== 'white-100'),
      ],
      valueField: 'key',
    }),
    theme,
  ].filter((e) => e),
  components: {
    preview: EventPromotionPreview,
  },
  preview: {
    select: {
      title: 'title',
      tags: 'tags',
      promotedEvents: 'promotedEvents',
      promotionType: 'promotionType',
      promotePastEvents: 'promotePastEvents',
      eventsCount: 'eventsCount',
    },
    prepare({
      title,
      promotionType,
      promotePastEvents,
      eventsCount,
      tags,
      promotedEvents,
    }: {
      title?: PortableTextBlock[];
      promotionType: 'automatic' | 'manual';
      promotePastEvents?: boolean;
      eventsCount?: number;
      tags?: Reference[];
      promotedEvents?: Reference[];
    }) {
      //@ts-ignore:todo
      const plainTitle = blocksToText(title);
      let mainTitle = 'Event promotion';
      if (promotionType === 'automatic') {
        mainTitle = `${capitalizeFirstLetter(promotionType ?? '')} | ${promotePastEvents ? 'past' : ''} ${eventsCount ? `${eventsCount}` : 'all'} event(s) ${tags && tags?.length > 0 ? 'on tag(s)' : 'on all tags'}`;
      }
      if (promotionType === 'manual') {
        mainTitle = `${capitalizeFirstLetter(promotionType ?? '')} | ${promotedEvents && promotedEvents?.length > 0 ? promotedEvents?.length : 'No'} event(s)`;
      }
      const eventCount =
        promotionType === 'manual' ? promotedEvents?.length : eventsCount;
      const subtitleDetails = [
        eventCount !== undefined ? `${eventCount}` : '',
        promotionType ? capitalizeFirstLetter(promotionType) : '',
        promotionType === 'automatic' && promotePastEvents ? 'Past events' : '',
      ]
        .filter(Boolean)
        .join(' | ');

      return {
        title: plainTitle ? plainTitle : mainTitle,
        subtitle: subtitleDetails,
        tags: promotionType === 'manual' ? [] : (tags ?? []),
        media: RiCalendarEventFill,
      };
    },
  },
};
