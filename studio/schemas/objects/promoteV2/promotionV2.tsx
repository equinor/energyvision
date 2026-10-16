import { Card, Flex, Grid, Radio, Text, useTheme_v2 } from '@sanity/ui';
import { useCallback } from 'react';
import { LuPanelBottom, LuText } from 'react-icons/lu';
import {
  type Image,
  type PortableTextBlock,
  type Reference,
  type Rule,
  type StringInputProps,
  set,
  type ValidationContext,
} from 'sanity';
import { capitalizeFirstLetter } from '@/helpers/formatters';
import { OptionButtons } from '@/schemas/components/OptionButtons/OptionButtons';
import { Flags } from '@/src/lib/datasetHelpers';
import blocksToText from '../../../helpers/blocksToText';
import {
  gridColumns,
  hideTitle,
  ingress,
  layoutGrid,
  theme,
  title,
  viewAllLink,
  viewAllLinkLabel,
} from '../commonFields/commonFields';
import linkSelector from '../linkSelector/linkSelector';

type PromotionLayoutDirection = 'col' | 'row';

export const PromotionLayoutIcon = ({
  direction = 'col',
  preview = false,
}: {
  direction?: PromotionLayoutDirection;
  preview?: boolean;
}) => {
  const theme = useTheme_v2();
  const iconColor = theme.color.muted.fg;
  const isRow = direction === 'row';
  const aspectRatio = isRow ? (preview ? 4 / 3 : 2) : (16 / 9) * 0.65;
  const iconStyle = {
    color: iconColor,
    width: '100%',
    height: '100%',
    minWidth: 0,
    minHeight: 0,
  };

  const layoutIcon = (
    <div
      aria-hidden
      style={{
        display: 'grid',
        gridTemplateColumns: isRow ? '31% 69%' : '1fr',
        gridTemplateRows: isRow ? '1fr' : '65% 35%',
        width: preview ? 16 : 48,
        aspectRatio,
        boxSizing: 'border-box',
        flexShrink: 0,
        color: 'var(--card-muted-fg-color)',
        border: '1px solid currentColor',
        borderRadius: preview ? '2px' : '4px',
        overflow: 'hidden',
      }}
    >
      <div style={{ ...iconStyle, backgroundColor: 'currentColor' }} />
      <LuText style={iconStyle} />
    </div>
  );

  return preview ? (
    <div
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 33,
        height: 33,
        flexShrink: 0,
      }}
    >
      {layoutIcon}
    </div>
  ) : (
    layoutIcon
  );
};

type PromotionLayoutInputProps = {
  options: any[];
} & StringInputProps;

export const PromotionLayoutInput = (props: PromotionLayoutInputProps) => {
  const { onChange, schemaType, value = '' } = props;

  const handleChange = useCallback(
    (event: any) => {
      const nextValue = event.currentTarget.value;
      onChange(set(nextValue));
    },
    [onChange],
  );

  return (
    <Grid
      gridTemplateColumns={schemaType?.options?.list?.length}
      gridTemplateRows={1}
      gap={2}
    >
      {schemaType?.options?.list?.map((option: any) => {
        return (
          <Card
            key={option.value}
            paddingY={2}
            paddingX={3}
            radius={2}
            shadow={1}
          >
            <Flex
              direction="row"
              align="center"
              height="stretch"
              gap={2}
              style={{ width: '100%' }}
            >
              <Radio
                checked={value === option.value}
                name={option.value}
                id={option.value}
                onChange={handleChange}
                value={option.value}
              />
              <Flex gap={2} align="center" style={{ width: '100%' }}>
                <Text as="label" htmlFor={option.value}>
                  {option.title}
                </Text>
                <div
                  style={{
                    marginLeft: 'auto',
                    border: '1px solid lightgrey',
                    padding: '1px',
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: option?.value === 'col' ? 'column' : 'row',
                  }}
                >
                  <PromotionLayoutIcon
                    direction={option?.value === 'row' ? 'row' : 'col'}
                  />
                </div>
              </Flex>
            </Flex>
          </Card>
        );
      })}
    </Grid>
  );
};

const layoutOptions = [
  {
    value: 'col',
    icon: <PromotionLayoutIcon direction="col" />,
  },
  {
    value: 'row',
    icon: <PromotionLayoutIcon direction="row" />,
  },
];
type PromotedTopicPage = {
  _key: string;
  _type: 'topics';
  ingress: PortableTextBlock[];
  reference: Reference;
};

export type promotionV2 = {
  _type: 'promotionV2';
  references: PromotedTopicPage[];
};

export default {
  title: 'Promotion',
  name: 'promotionsV2',
  type: 'object',
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    title,
    hideTitle,
    ingress,
    {
      name: 'promoteList',
      title: 'List of promoted items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'promotedItem',
          title: 'Promoted item',
          fields: [
            linkSelector(),
            {
              name: 'image',
              title: 'Image',
              type: 'imageWithAlt',
              description:
                'Required for external,anchor and homepage links, optional for others',
              validation: (Rule: Rule) =>
                Rule.custom((value: string, ctx: ValidationContext) => {
                  const parent = ctx.parent as
                    | {
                        linkSelector?: {
                          link?: { _type?: string }[];
                        };
                      }
                    | undefined;
                  if (
                    parent?.linkSelector?.link?.[0]?._type === 'link' ||
                    parent?.linkSelector?.link?.[0]?._type ===
                      'anchorLinkReference' ||
                    parent?.linkSelector?.link?.[0]?._type === 'homePageLink'
                  ) {
                    return value ? true : 'You must add an image';
                  }
                  return true;
                }),
            },
          ],
          preview: {
            select: {
              referenceNewsMagTitle: 'linkSelector.link.0.title',
              referenceNewsMedia: 'linkSelector.link.0.heroImage.image',
              referenceMagMedia: 'linkSelector.link.0.heroFigure.image',
              referenceTopicTitle: 'linkSelector.link.0.content.title',
              referenceTopicMedia:
                'linkSelector.link.0.content.heroFigure.image',
              customImage: 'image',
              link: 'link',
              label: 'linkSelector.label',
              type: 'linkSelector.link.0._type',
            },
            prepare({
              referenceNewsMagTitle,
              referenceNewsMedia,
              referenceMagMedia,
              referenceTopicTitle,
              referenceTopicMedia,
              customImage,
              link,
              label,
              type,
            }: {
              referenceNewsMagTitle?: PortableTextBlock[];
              referenceNewsMedia?: Image;
              referenceMagMedia?: Image;
              referenceTopicTitle?: PortableTextBlock[];
              referenceTopicMedia?: Image;
              customImage?: Image;
              link?: any;
              label?: string;
              type?: string;
            }) {
              let promoType = type ?? 'not set';
              if (type === 'pageAnchor') {
                promoType = 'anchor link';
              } else if (type === 'link') {
                promoType = 'external link';
              } else if (type) {
                promoType = 'internal link ';
              }
              const referenceTitle =
                referenceTopicTitle ?? referenceNewsMagTitle;
              let title = label ?? 'Missing title';
              if (
                link?.[0]?._type === 'anchorLinkReference' &&
                typeof label === 'undefined'
              ) {
                title = link?.[0]?.title;
              }
              if (
                link?.[0]?._type !== 'link' &&
                link?.[0]?._type !== 'anchorLinkReference' &&
                typeof label === 'undefined' &&
                referenceTitle
              ) {
                title =
                  blocksToText(referenceTitle) ?? label ?? 'Missing title';
              }

              return {
                title: title,
                subtitle: `${capitalizeFirstLetter(promoType)}`,
                media:
                  customImage ??
                  referenceTopicMedia ??
                  referenceNewsMedia ??
                  referenceMagMedia ??
                  LuPanelBottom,
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
    layoutGrid(),
    gridColumns({
      hiddenCallBack: ({ parent }: { parent?: { layoutGrid?: string } }) => {
        return parent?.layoutGrid === 'lg';
      },
      fieldset: 'design',
      initialValue: undefined,
      validation: (Rule: Rule) =>
        Rule.custom((value: string, ctx: ValidationContext) => {
          const parent = ctx.parent as
            | {
                layoutGrid?: string;
                layoutDirection?: string;
                promoteList?: unknown[];
              }
            | undefined;

          if (parent?.layoutGrid === 'lg') return true;

          if (Number(parent?.promoteList?.length) < Number(value)) {
            return 'Fewer promotions than grid columns. Please select lower grid columns';
          }

          if (
            parent?.layoutDirection === 'row' &&
            parent?.layoutGrid !== 'sm'
          ) {
            if (value === '4') {
              return 'Please use only 2 or 3 cols when using the smaller layout grids with side by side promotions';
            }
          }
          return true;
        }),
    }),
    {
      title: 'Layout variant',
      name: 'layoutDirection',
      type: 'string',
      description: 'Select  variant for image and content ',
      options: {
        list: layoutOptions.map((option) => ({
          title: capitalizeFirstLetter(option.value),
          value: option.value,
        })),
      },
      fieldset: 'design',
      initialValue: 'col',
      components: {
        input: (props: StringInputProps) => OptionButtons(props, layoutOptions),
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      promoteList: 'promoteList',
      theme: 'theme',
      layoutDirection: 'layoutDirection',
      layoutGrid: 'layoutGrid',
      gridColumns: 'gridColumns',
    },
    prepare({
      title,
      promoteList,
      layoutDirection = 'col',
      layoutGrid,
      gridColumns,
    }: {
      title?: PortableTextBlock[];
      promoteList: any[];
      theme?: any;
      layoutDirection?: PromotionLayoutDirection;
      layoutGrid?: string;
      gridColumns?: string;
    }) {
      const plainTitle = title ? blocksToText(title) : 'Untitled';
      const subtitleDetails = [
        `${promoteList?.length ?? 0} items`,
        layoutGrid,
        gridColumns ? `${gridColumns} columns` : '',
      ]
        .filter(Boolean)
        .join(' | ');
      return {
        title: plainTitle,
        subtitle: `Promotion: ${subtitleDetails}`,
        media: <PromotionLayoutIcon direction={layoutDirection} preview />,
      };
    },
  },
};
