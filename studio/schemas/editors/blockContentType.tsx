import {
  attach_file,
  format_color_text,
  star_filled,
} from '@equinor/eds-icons';
import { MdOutlineAnchor } from 'react-icons/md';
import type { BlockDefinition, BlockStyleDefinition } from 'sanity';
import type { Level2Keys } from '@/helpers/Level2KeyTypes';
import {
  EdsBlockEditorIcon,
  EdsIcon,
  IconSubScript,
  IconSuperScript,
} from '../../icons';
import { SubScriptRenderer, SuperScriptRenderer } from '../components';
import { defaultColors } from '../defaultColors';
import {
  externalLink,
  homepageLink,
  internalReference,
  internalReferenceOtherLanguage,
  type LinkType,
  PageAnchorInput,
} from '../objects/linkSelector/common';
import linkSelector from '../objects/linkSelector/linkSelector';

const externalLinkConfig = {
  ...externalLink,
};

export const textColorConfig = {
  title: 'Highlight',
  value: 'highlight',
  icon: EdsBlockEditorIcon(format_color_text),
  component: ({ children }: { children: React.ReactNode }) => {
    return <span style={{ color: defaultColors[8].value }}>{children}</span>;
  },
};

/**
 * Options for `configureBlockContent`.
 *
 * Options are merged in this order: base defaults → `group` preset → `variant`
 * preset → the options passed in, so any single flag can be overridden.
 *
 * Base defaults: h3, lists, internal and external links, strong, emphasis, sub
 * and sup. Everything else is off.
 */
export type BlockContentProps = {
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  /**
   * Preconfigured presets, each described as the result after merging with the base defaults.
   *
   * - `block` (default) — h3, lists, links, strong/em/sub/sup.
   * - `textBlock` — `block` plus the highlight color decorator.
   * - `textBlockWithoutHeadings` — `block` without headings, plus small text.
   * - `textBlockWithHeadings` — h2, h3, lists, links plus small text.
   * - `simpleBlock` — normal and small text with lists. No headings, no links.
   * - `withH2SimpleBlock` — h2 and normal text only. No lists, no links.
   * - `ingress` — normal and small text with lists and links. No headings.
   * - `extendedBlock` — h2, h3, lists, links plus display, large and extra large text.
   * - `fullBlock` — h2, h3, h4, lists, links, attachments plus small, display, large and extra large text.
   * - `title` — normal text with strikethrough. No headings, lists or links; web assigns the heading level.
   * - `titleWithDisplay` — `title` plus the display, large and extra large text styles.
   * - `onlySubSup` — sub and sup only, without strong and emphasis. No headings, lists or links.
   * - `onlyTextDecorations` — strong, emphasis, sub and sup. No headings, lists or links.
   * - `textDecorationAndLinks` — `onlyTextDecorations` plus links and attachments.
   */
  variant?:
    | 'title'
    | 'titleWithDisplay'
    | 'ingress'
    | 'simpleBlock'
    | 'withH2SimpleBlock'
    | 'block'
    | 'extendedBlock'
    | 'fullBlock'
    | 'textBlock'
    | 'textBlockWithoutHeadings'
    | 'textBlockWithHeadings'
    | 'onlySubSup'
    | 'onlyTextDecorations'
    | 'textDecorationAndLinks';

  /** Used to render the typography similar to TypographyGroups in Typography in web.
   * Use group `article` for news to get headings 2 and 4 plus small text.
   */
  group?: BlockTypographyGroups;
  internalLink?: boolean;
  externalLink?: boolean;
  footnote?: boolean;
  attachment?: boolean;
  lists?: boolean;
  smallText?: boolean;
  largeText?: boolean;
  extraLargeText?: boolean;
  highlight?: boolean;
  extendedStyles?: BlockStyleDefinition[];
  onlySubSupScriptDecorators?: boolean;
  strikeThrough?: boolean;
};

// Use this when it should not have a dropdown for title variants
// Web components then need to assign correct heading level

const titleVariantOptions: BlockContentProps = {
  h2: false,
  h3: false,
  internalLink: false,
  externalLink: false,
  lists: false,
  strikeThrough: true,
};

const titleWithDisplayVariantOptions: BlockContentProps = {
  h2: false,
  h3: false,
  largeText: true,
  extraLargeText: true,
  internalLink: false,
  externalLink: false,
  lists: false,
  strikeThrough: true,
};

const extendedBlockStylesOptions: BlockContentProps = {
  h2: true,
  largeText: true,
  extraLargeText: true,
  //smallText: true,
};
const ingressStylesOptions: BlockContentProps = {
  lists: true,
  h2: false,
  h3: false,
  h4: false,
  smallText: true,
};
const articleStylesOptions: BlockContentProps = {
  h2: true,
  h4: true,
  smallText: true,
};
//h3, lists, links, text decorations and highlight
const textBlockStylesOptions: BlockContentProps = {
  highlight: true,
};
//lists, links, text decorations, highlight and small text, no headings
const textBlockWithoutHeadingsStylesOptions: BlockContentProps = {
  h3: false,
  smallText: true,
};
//h2, h3, lists, links, text decorations and small text
const textBlockWithHeadingsStylesOptions: BlockContentProps = {
  h2: true,
  h3: true,
  smallText: true,
};
const simpleBlockStylesOptions: BlockContentProps = {
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  smallText: true,
};
const withH2SimpleBlockStylesOptions: BlockContentProps = {
  h2: true,
  h3: false,
  internalLink: false,
  externalLink: false,
  lists: false,
};
const fullBlockStylesOptions: BlockContentProps = {
  h2: true,
  h4: true,
  largeText: true,
  extraLargeText: true,
  attachment: true,
  smallText: true,
};
//sub, sup
const onlySubSupOptions: BlockContentProps = {
  h3: false,
  onlySubSupScriptDecorators: true,
  lists: false,
  internalLink: false,
  externalLink: false,
};
//bold, italic,sub, sup
const onlyTextDecorationsOptions: BlockContentProps = {
  h3: false,
  lists: false,
  internalLink: false,
  externalLink: false,
};
//bold, italic,sub, sup, links and attachments
const textDecorationAndLinksOptions: BlockContentProps = {
  h3: false,
  lists: false,
  internalLink: true,
  externalLink: true,
  attachment: true,
};

const baseStylesOptions: BlockContentProps = {
  h3: true,
  lists: true,
  internalLink: true,
  externalLink: true,
  variant: 'block',
  h2: false,
  h4: false,
  attachment: false,
  largeText: false,
  extraLargeText: false,
  smallText: false,
  highlight: false,
  footnote: false,
  onlySubSupScriptDecorators: false,
  strikeThrough: false,
};

const variantStylesOptions: Record<
  NonNullable<BlockContentProps['variant']>,
  BlockContentProps
> = {
  block: {},
  title: titleVariantOptions,
  titleWithDisplay: titleWithDisplayVariantOptions,
  ingress: ingressStylesOptions,
  simpleBlock: simpleBlockStylesOptions,
  withH2SimpleBlock: withH2SimpleBlockStylesOptions,
  extendedBlock: extendedBlockStylesOptions,
  fullBlock: fullBlockStylesOptions,
  textBlock: textBlockStylesOptions,
  textBlockWithoutHeadings: textBlockWithoutHeadingsStylesOptions,
  textBlockWithHeadings: textBlockWithHeadingsStylesOptions,
  onlySubSup: onlySubSupOptions,
  onlyTextDecorations: onlyTextDecorationsOptions,
  textDecorationAndLinks: textDecorationAndLinksOptions,
};

export const BlockTypography = {
  article: {
    h2: 'text-lg font-normal py-2 m-0',
    h3: 'text-md font-normal pt-2 m-0',
    h4: 'text-md font-md m-0',
  },
  display: {
    h1_base: 'text-4xl tracking-display font-normal m-0 ',
    h1_lg: 'text-5xl leading-md tracking-display font-normal m-0 ',
    h1_xl: 'text-6xl tracking-display font-normal m-0',
    h2_base: 'text-3xl tracking-display font-normal m-0 ',
    h2_lg: 'text-4xl leading-md tracking-display font-normal m-0 ',
    h2_xl: 'text-5xl tracking-display font-normal m-0',
  },
  normal: {
    h2: 'text-xl leading-lofty mb-8',
    h3: 'text-lg leading-lofty mt-10 mb-4',
    h4: 'text-md mt-4 mb-2',
    sm: 'text-sm',
  },
};
export type BlockTypographyGroups = keyof typeof BlockTypography;
export type BlockTypographyVariants = Level2Keys<typeof BlockTypography>;

export const TextRenderer = ({
  blockProps,
  group,
  level,
}: {
  blockProps: any;
  group?: BlockTypographyGroups;
  level?: BlockTypographyVariants;
}) => {
  const { children } = blockProps;
  //@ts-ignore: wont accept the types
  const classNames = BlockTypography[group ?? 'normal'][level ?? 'h2'] ?? '';

  return (
    <span className={classNames} data-group={group}>
      {children}
    </span>
  );
};

// H1 not allowed in block content since it should be a document title.
// Default configuration is for text block main block content
export const configureBlockContent = (
  options?: BlockContentProps,
): BlockDefinition => {
  const defaultConfigOptions: BlockContentProps = {
    ...baseStylesOptions,
    group: options?.group ?? 'normal',
    //news template
    ...(options?.group === 'article' ? articleStylesOptions : {}),
    ...(options?.variant ? variantStylesOptions[options.variant] : {}),
    ...options,
  };

  const {
    h2,
    h3,
    h4,
    lists,
    internalLink,
    externalLink,
    group,
    attachment,
    largeText,
    extraLargeText,
    smallText,
    highlight,
    footnote,
    onlySubSupScriptDecorators,
    strikeThrough,
  } = defaultConfigOptions;

  const config: BlockDefinition = {
    type: 'block',
    name: 'block',
    styles: [],
    lists: lists
      ? [
          { title: 'Numbered', value: 'number' },
          { title: 'Bullet', value: 'bullet' },
        ]
      : [],
    marks: {
      decorators: [
        {
          title: 'Sub',
          value: 'sub',
          icon: IconSubScript,
          component: SubScriptRenderer,
        },
        {
          title: 'Super',
          value: 'sup',
          icon: IconSuperScript,
          component: SuperScriptRenderer,
        },
      ],
      annotations: [],
    },
  };

  const StrongEmConfig = [
    { title: 'Strong', value: 'strong' },
    { title: 'Emphasis', value: 'em' },
  ];

  const strikeThroughConfig = {
    title: 'Strikethrough',
    value: 'strike-through',
  };

  const h2Config = {
    title: 'Heading 2',
    value: 'h2',
    component: (props: any) =>
      TextRenderer({
        blockProps: props,
        group,
        level: 'h2',
      }),
  };
  const h3Config = {
    title: 'Heading 3',
    value: 'h3',
    component: (props: any) =>
      TextRenderer({
        blockProps: props,
        group,
        level: 'h3',
      }),
  };
  const h4Config = {
    title: 'Heading 4',
    value: 'h4',
    component: (props: any) =>
      TextRenderer({
        blockProps: props,
        group,
        level: 'h4',
      }),
  };
  const displayTextConfig = {
    title: 'Display text',
    value: 'displayText',
    component: (props: any) =>
      TextRenderer({
        blockProps: props,
        group: 'display',
        level: 'h2_base',
      }),
  };
  const largeTextConfig = {
    title: 'Large text',
    value: 'largeText',
    component: (props: any) =>
      TextRenderer({
        blockProps: props,
        group: 'display',
        level: 'h2_lg',
      }),
  };
  const extraLargeTextConfig = {
    title: 'Extra large text',
    value: 'extraLargeText',
    component: (props: any) =>
      TextRenderer({
        blockProps: props,
        group: 'display',
        level: 'h2_xl',
      }),
  };

  const smallTextConfig = {
    title: 'Small text',
    value: 'smallText',
    component: (props: any) =>
      TextRenderer({
        blockProps: props,
        group,
        level: 'sm',
      }),
  };

  const internalLinkConfig = (linkConfig: any) => {
    const linkType: LinkType = linkConfig.name;
    const linkSelectorSchema = linkSelector([linkType], false, false, true);
    return {
      icon: linkConfig.icon,
      ...linkSelectorSchema,
      name: linkType + '_block',
      title: linkConfig.title,
      initialValue: {
        value: 'dummyValue', // need this to set the _type
        link: [{ _type: linkType, _key: 'dummyKey' }],
      },
    };
  };

  const anchorLinkConfig = {
    name: 'pageAnchor',
    type: 'object',
    title: 'Page anchor',
    icon: () => <MdOutlineAnchor />,
    fields: [
      {
        name: 'anchorId',
        type: 'string',
        components: {
          input: PageAnchorInput,
        },
      },
    ],
    preview: {
      select: {
        anchorId: 'anchorId',
      },
      prepare({ anchorId }: { anchorId: string }) {
        return {
          title: `#${anchorId}`,
          subTitle: 'Page anchor',
          media: MdOutlineAnchor,
        };
      },
    },
  };
  const attachmentConfig = {
    name: 'attachment',
    type: 'object',
    title: 'Attachment',
    icon: () => EdsBlockEditorIcon(attach_file),
    fields: [
      {
        name: 'reference',
        type: 'reference',
        to: [{ type: 'assetFile' }],
        options: { disableNew: true },
      },
    ],
  };
  const footnoteConfig = {
    name: 'footnote',
    type: 'object',
    title: 'Footnote',
    icon: EdsIcon(star_filled),
    fields: [
      {
        name: 'text',
        type: 'array',
        of: [
          {
            type: 'block',
            styles: [smallTextConfig],
            lists: [],
            marks: {
              decorators: [
                { title: 'Strong', value: 'strong' },
                { title: 'Emphasis', value: 'em' },
                {
                  title: 'Sub',
                  value: 'sub',
                  icon: IconSubScript,
                  component: SubScriptRenderer,
                },
                {
                  title: 'Super',
                  value: 'sup',
                  icon: IconSuperScript,
                  component: SuperScriptRenderer,
                },
              ],
            },
          },
        ],
      },
    ],
  };

  if (!onlySubSupScriptDecorators) {
    //@ts-ignore: why is it undefined when defined aboved
    config.marks.decorators.push(...StrongEmConfig);
  }
  if (strikeThrough) {
    config.marks?.decorators?.push(strikeThroughConfig);
  }

  if (h2) {
    config?.styles?.push(h2Config);
  }
  if (h3) {
    config?.styles?.push(h3Config);
  }
  if (h4) {
    config?.styles?.push(h4Config);
  }
  if (smallText) {
    config?.styles?.push(smallTextConfig);
  }
  if (largeText) {
    config?.styles?.push(displayTextConfig);
    config?.styles?.push(largeTextConfig);
  }
  if (extraLargeText) {
    config?.styles?.push(extraLargeTextConfig);
  }

  if (externalLink) {
    //@ts-ignore
    config?.marks?.annotations?.push(externalLinkConfig);
  }
  if (internalLink) {
    config?.marks?.annotations?.push(internalLinkConfig(internalReference));
    config?.marks?.annotations?.push(
      internalLinkConfig(internalReferenceOtherLanguage),
    );
    config?.marks?.annotations?.push(internalLinkConfig(homepageLink));
    //@ts-ignore: todo
    config?.marks?.annotations?.push(anchorLinkConfig);
  }
  if (attachment) {
    config?.marks?.annotations?.push(attachmentConfig);
  }
  if (footnote) {
    config?.marks?.annotations?.push(footnoteConfig);
  }
  if (highlight) {
    config.marks?.decorators?.push(textColorConfig);
  }

  return config;
};
