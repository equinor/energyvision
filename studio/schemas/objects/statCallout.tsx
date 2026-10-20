import type { PortableTextBlock, PreviewProps, Reference, Rule } from 'sanity';
import blocksToText from '../../helpers/blocksToText';
import type { ColorSelectorValue } from '../components/ColorSelector';
import { StatCalloutBackgroundTypeInput } from '../components/StatCalloutBackgroundTypeInput';
import { configureBlockContent } from '../editors';
import { layoutGrid } from './commonFields/commonFields';
import type { ImageWithAlt } from './imageWithAlt';

type StatCalloutItem = {
  title?: PortableTextBlock[];
  caption?: PortableTextBlock[];
  titleVerticalAlignment?: 'top' | 'center' | 'bottom';
  backgroundType?: 'image' | 'video' | 'color';
  backgroundImage?: ImageWithAlt;
  backgroundVideo?: Reference;
  backgroundColor?: ColorSelectorValue;
  icon?: ImageWithAlt;
};

export type StatCallout = {
  _type: 'statCallout';
  title?: PortableTextBlock[];
  hideTitle?: boolean;
  useHorizontalScroll?: boolean;
  items?: StatCalloutItem[];
  background?: ColorSelectorValue;
};

export default {
  name: 'statCallout',
  title: 'Stat Callout',
  type: 'object',
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'array',
      of: [configureBlockContent({ variant: 'titleWithDisplay' })],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'hideTitle',
      title: 'Hide title',
      type: 'boolean',
      description: 'Hides the title visually while keeping it accessible.',
      initialValue: false,
    },
    {
      name: 'useHorizontalScroll',
      title: 'Use horizontal scroll',
      type: 'boolean',
      initialValue: false,
    },
    layoutGrid(({ parent }: { parent?: StatCallout }) =>
      Boolean(parent?.useHorizontalScroll),
    ),
    {
      name: 'items',
      title: 'Callouts',
      type: 'array',
      of: [
        {
          name: 'statCalloutItem',
          title: 'Callout',
          type: 'object',
          fieldsets: [
            {
              name: 'background',
              title: 'Background',
            },
          ],
          components: {
            input: StatCalloutBackgroundTypeInput,
            preview: (props: PreviewProps) => {
              const prefix = `${props.schemaType?.title}: `;
              const title =
                typeof props.title === 'string' &&
                props.title.startsWith(prefix)
                  ? props.title.slice(prefix.length)
                  : props.title;

              return props.renderDefault({ ...props, title });
            },
          },
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'array',
              of: [configureBlockContent({ variant: 'title' })],
            },
            {
              name: 'titleVerticalAlignment',
              title: 'Title vertical alignment',
              type: 'string',
              options: {
                list: [
                  { title: 'Top', value: 'top' },
                  { title: 'Center', value: 'center' },
                  { title: 'Bottom', value: 'bottom' },
                ],
              },
              initialValue: 'center',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'array',
              of: [configureBlockContent({ variant: 'onlySubSup' })],
              description:
                'Optional caption for the callout. Displayed below callout card',
            },
            {
              name: 'backgroundType',
              title: 'Background type',
              type: 'string',
              fieldset: 'background',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Video', value: 'video' },
                  { title: 'Color', value: 'color' },
                ],
                layout: 'radio',
              },
              initialValue: 'color',
            },
            {
              name: 'backgroundImage',
              title: 'Background image',
              type: 'image',
              fieldset: 'background',
              hidden: ({ parent }: { parent?: StatCalloutItem }) =>
                (parent?.backgroundType ??
                  (parent?.backgroundVideo
                    ? 'video'
                    : parent?.backgroundImage
                      ? 'image'
                      : 'color')) !== 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'backgroundVideo',
              title: 'Background video',
              type: 'reference',
              fieldset: 'background',
              to: [{ type: 'assetFile' }],
              hidden: ({ parent }: { parent?: StatCalloutItem }) =>
                (parent?.backgroundType ??
                  (parent?.backgroundVideo
                    ? 'video'
                    : parent?.backgroundImage
                      ? 'image'
                      : 'color')) !== 'video',
              options: {
                filter: 'asset.asset->extension == "mp4"',
              },
            },
            {
              name: 'backgroundColor',
              title: 'Background color',
              type: 'colorlist',
              fieldset: 'background',
              description: 'Select a background color for the callout.',
              hidden: ({ parent }: { parent?: StatCalloutItem }) =>
                (parent?.backgroundType ??
                  (parent?.backgroundVideo
                    ? 'video'
                    : parent?.backgroundImage
                      ? 'image'
                      : 'color')) !== 'color',
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'imageWithAlt',
              description:
                'Black default. Other color is ignored, use option below for white. If present, it will displayed opposite title',
            },
            {
              name: 'useWhite',
              title:
                'Use white text because dark background. Applies to title and icon, if set',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'title',
              titleVerticalAlignment: 'titleVerticalAlignment',
              backgroundType: 'backgroundType',
              backgroundColorTitle: 'backgroundColor.title',
              backgroundImage: 'backgroundImage',
              useWhite: 'useWhite',
            },
            prepare({
              title,
              titleVerticalAlignment,
              backgroundType,
              backgroundColorTitle,
              backgroundImage,
              useWhite,
            }: {
              title?: PortableTextBlock[];
              titleVerticalAlignment?: string;
              backgroundType?: string;
              backgroundColorTitle?: string;
              backgroundImage?: { asset?: unknown };
              useWhite?: boolean;
            }) {
              const itemTitle = title ? blocksToText(title) : undefined;
              const subtitle = [
                titleVerticalAlignment,
                backgroundType === 'color'
                  ? backgroundColorTitle || backgroundType
                  : backgroundType,
                useWhite ? 'White text' : undefined,
              ]
                .filter(Boolean)
                .join(' | ');

              return {
                title: itemTitle ? `Callout: ${itemTitle}` : 'Callout',
                subtitle,
                media: backgroundImage?.asset,
              };
            },
          },
        },
      ],
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      fieldset: 'design',
    },
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({
      title,
      items,
    }: {
      title?: PortableTextBlock[];
      items?: StatCalloutItem[];
    }) {
      const firstItem = items?.[0];

      return {
        title: title ? blocksToText(title) : 'Stat Callout',
        subtitle: `Stat callout: ${items?.length ?? 0} callouts`,
        media: firstItem?.backgroundImage?.asset || firstItem?.icon?.asset,
      };
    },
  },
  components: {
    preview: (props: PreviewProps) => {
      const prefix = `${props.schemaType?.title}: `;
      const title =
        typeof props.title === 'string' && props.title.startsWith(prefix)
          ? props.title.slice(prefix.length)
          : props.title;

      return props.renderDefault({ ...props, title });
    },
  },
};
