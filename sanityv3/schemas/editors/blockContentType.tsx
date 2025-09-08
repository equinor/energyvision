import { attach_file, format_color_text, link, star_filled } from '@equinor/eds-icons'
import type { BlockDefinition, BlockStyleDefinition } from 'sanity'
import { EdsBlockEditorIcon, EdsIcon, IconSubScript, IconSuperScript } from '../../icons'
import { SubScriptRenderer, SuperScriptRenderer } from '../components'
import { defaultColors } from '../defaultColors'
import {
  externalLink,
  homepageLink,
  internalReference,
  internalReferenceOtherLanguage,
  LinkType,
} from '../objects/linkSelector/common'
import linkSelector from '../objects/linkSelector/linkSelector'
import { fontSizes, fontWeight, spacing } from './typography'

const externalLinkConfig = {
  ...externalLink,
}

export const textColorConfig = {
  title: 'Highlight',
  value: 'highlight',
  icon: EdsBlockEditorIcon(format_color_text),
  component: ({ children }: { children: React.ReactNode }) => {
    return <span style={{ color: defaultColors[8].value }}>{children}</span>
  },
}

const SmallTextRender = (props: any) => {
  const { children } = props
  return <span style={{ fontSize: fontSizes['sm'] }}>{children}</span>
}
export const LargeTextRender = (props: any) => {
  const { children } = props
  return <span style={{ fontSize: fontSizes['2xl'] }}>{children}</span>
}
export const ExtraLargeTextRender = (props: any) => {
  const { children } = props
  return <span style={{ fontSize: fontSizes['5xl'], fontWeight: fontWeight['medium'] }}>{children}</span>
}
export const TwoXLTextRender = (props: any) => {
  const { children } = props
  return <span style={{ fontSize: fontSizes['8xl'], fontWeight: fontWeight['medium'] }}>{children}</span>
}

type TypographyGroups = 'heading' | 'paragraph' | 'article'
type TypographyVariants = 'h2' | 'h3' | 'h4'
const getGroupStyle = (group: TypographyGroups) => {
  switch (group) {
    case 'article':
      return {
        h2: {
          marginTop: spacing[2],
          marginBottom: spacing[2],
          fontSize: fontSizes['lg'],
        },
        h3: {
          fontSize: fontSizes['md'],
        },
        h4: {
          fontSize: fontSizes['base'],
          fontWeight: fontWeight['medium'],
        },
      }
    case 'paragraph':
      return {
        smallText: {
          fontSize: fontSizes['sm'],
        },
      }
    default:
      return {
        h2: {
          paddingBottom: spacing[8],
          fontSize: fontSizes['2xl'],
        },
        h3: {
          fontSize: fontSizes['xl'],
        },
        h4: {
          fontSize: fontSizes['lg'],
          fontWeight: fontWeight['medium'],
        },
        largeText: {
          fontSize: fontSizes['2xl'],
        },
        extraLargeText: {
          fontSize: fontSizes['5xl'],
        },
        twoXLText: {
          fontSize: fontSizes['8xl'],
        },
      }
  }
}
const getHeadingStyle = (group: TypographyGroups, level: TypographyVariants) => {
  const groupStyle = getGroupStyle(group)
  return groupStyle[level]
}

const Heading2Decorator = (children: React.ReactNode, group: TypographyGroups) => {
  const headingStyle = getHeadingStyle(group, 'h2')
  return <h2 style={{ ...headingStyle }}>{children}</h2>
}
const Heading3Decorator = (children: React.ReactNode, group: TypographyGroups) => {
  const headingStyle = getHeadingStyle(group, 'h3')
  return <h3 style={{ ...headingStyle }}>{children}</h3>
}
const Heading4Decorator = (children: React.ReactNode, group: TypographyGroups) => {
  const headingStyle = getHeadingStyle(group, 'h4')
  return <h4 style={{ ...headingStyle }}>{children}</h4>
}

export type BlockContentProps = {
  h2?: boolean
  h3?: boolean
  h4?: boolean
  /** Preconfigured options variants
   * simbleBlock - lists and normal text
   * withH2SimpleBlock - only h2 and normal text
   * extendedBlock - h3,normal,lists,links, small,larger,xl text and 2xl text
   * fullBlock - all headings,lists,links,attachment.
   * title - just normal text
   * the other title variants has the title config plus up to either larger xl text and 2xl text
   * ingress  - normal and small text
   */
  variant?:
    | 'title'
    | 'withLargerTitle'
    | 'withXLTitle'
    | 'with2XLTitle'
    | 'ingress'
    | 'simpleBlock'
    | 'withH2SimpleBlock'
    | 'block'
    | 'extendedBlock'
    | 'fullBlock'
  /** Used to render the typography similar to TypographyGroups in Typography in web
   * use group article for news to get headings 2,3,4
   */
  group?: TypographyGroups
  internalLink?: boolean
  externalLink?: boolean
  footnote?: boolean
  attachment?: boolean
  lists?: boolean
  smallText?: boolean
  largeText?: boolean
  extraLargeText?: boolean
  twoXLText?: boolean
  highlight?: boolean
  extendedStyles?: BlockStyleDefinition[]
  onlySubSupScriptDecorators?: boolean
}

// Only need to override the default true
const titleVariantOptions: BlockContentProps = {
  h2: false,
  h3: false,
  internalLink: false,
  externalLink: false,
  lists: false,
}
const withLargerTitleStylesOptions: BlockContentProps = {
  ...titleVariantOptions,
  largeText: true,
}
const withXLTitleStylesOptions: BlockContentProps = {
  ...titleVariantOptions,
  largeText: true,
  extraLargeText: true,
}
const with2XLTitleStylesOptions: BlockContentProps = {
  ...titleVariantOptions,
  largeText: true,
  extraLargeText: true,
  twoXLText: true,
}
const extendedBlockStylesOptions: BlockContentProps = {
  largeText: true,
  extraLargeText: true,
  twoXLText: true,
  smallText: true,
}
const ingressStylesOptions: BlockContentProps = {
  lists: false,
  h2: false,
  h3: false,
  h4: false,
  smallText: true,
}
const articleStylesOptions: BlockContentProps = {
  h2: true,
  h4: true,
}
const simpleBlockStylesOptions: BlockContentProps = {
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
}
const withH2SimpleBlockStylesOptions: BlockContentProps = {
  h2: true,
  h3: false,
  internalLink: false,
  externalLink: false,
  lists: false,
}
const fullBlockStylesOptions: BlockContentProps = {
  h2: true,
  h4: true,
  attachment: true,
}

// H1 not allowed in block content since it should be a document title.
// Default configuration is for text block main block content
export const configureBlockContent = (options?: BlockContentProps): BlockDefinition => {
  let defaultConfigOptions = {
    h3: true,
    lists: true,
    internalLink: true,
    externalLink: true,
    variant: 'block',
    group: 'paragraph',
    h2: false,
    h4: false,
    attachment: false,
    largeText: false,
    extraLargeText: false,
    smallText: false,
    highlight: false,
    //Big title seems to have large 42 and extra large 56px options
    //fiftyFiftyBigTitleStyle, '42px' heroBigTitleFiftyFifty
    //defaultBannerBigTitletStyle '56px' heroBigTitleDefault
    //blockContentTypeForBigText teaser '42px'
    // text block is big titile 42px
    footnote: false,
    onlySubSupScriptDecorators: false,
  }

  //news template
  if (options?.group === 'article') {
    defaultConfigOptions = Object.assign(defaultConfigOptions, articleStylesOptions, options)
  }
  if (options?.variant === 'title') {
    defaultConfigOptions = Object.assign(defaultConfigOptions, titleVariantOptions, options)
  }
  if (options?.variant === 'withLargerTitle') {
    defaultConfigOptions = Object.assign(defaultConfigOptions, withLargerTitleStylesOptions, options)
  }
  if (options?.variant === 'withXLTitle') {
    defaultConfigOptions = Object.assign(defaultConfigOptions, withXLTitleStylesOptions, options)
  }
  if (options?.variant === 'with2XLTitle') {
    defaultConfigOptions = Object.assign(defaultConfigOptions, with2XLTitleStylesOptions, options)
  }
  if (options?.variant === 'simpleBlock') {
    defaultConfigOptions = Object.assign(defaultConfigOptions, simpleBlockStylesOptions, options)
  }
  if (options?.variant === 'extendedBlock') {
    defaultConfigOptions = Object.assign(defaultConfigOptions, extendedBlockStylesOptions, options)
  }
  if (options?.variant === 'fullBlock') {
    defaultConfigOptions = Object.assign(defaultConfigOptions, fullBlockStylesOptions, options)
  }
  if (options?.variant === 'withH2SimpleBlock') {
    defaultConfigOptions = Object.assign(defaultConfigOptions, withH2SimpleBlockStylesOptions, options)
  }
  if (options?.variant === 'ingress') {
    defaultConfigOptions = Object.assign(defaultConfigOptions, ingressStylesOptions, options)
  }

  const {
    h2,
    h3,
    h4,
    lists,
    internalLink,
    externalLink,
    variant,
    group,
    attachment,
    largeText,
    extraLargeText,
    smallText,
    highlight,
    footnote,
    onlySubSupScriptDecorators,
  } = defaultConfigOptions

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
  }

  const StrongEmConfig = [
    { title: 'Strong', value: 'strong' },
    { title: 'Emphasis', value: 'em' },
  ]

  const h2Config = {
    title: 'Heading 2',
    value: 'h2',
    component: (props: any) => Heading2Decorator(props.children, variant),
  }
  const h3Config = {
    title: 'Heading 3',
    value: 'h3',
    component: (props: any) => Heading3Decorator(props.children, variant),
  }
  const h4Config = {
    title: 'Heading 4',
    value: 'h4',
    component: (props: any) => Heading4Decorator(props.children, variant),
  }
  const smallTextConfig = {
    title: 'Small text',
    value: 'smallText',
    component: SmallTextRender,
  }
  const largeTextConfig = {
    title: 'Large text',
    value: 'largeText',
    component: LargeTextRender,
  }
  const extraLargeTextConfig = {
    title: 'XL text',
    value: 'extraLargeText',
    component: ExtraLargeTextRender,
  }
  const twoExtraLargeTextConfig = {
    title: '2xl text',
    value: 'twoXLText',
    component: TwoXLTextRender,
  }

  const internalLinkConfig = (linkConfig: any) => {
    const linkType: LinkType = linkConfig.name
    const linkSelectorSchema = linkSelector([linkType], undefined, false)
    return {
      icon: linkConfig.icon,
      ...linkSelectorSchema,
      name: linkType + '_block',
      title: linkConfig.title,
      initialValue: {
        value: 'dummyValue', // need this to set the _type
        link: [{ _type: linkType, _key: 'dummyKey' }],
      },
    }
  }

  const attachmentConfig = {
    name: 'attachment',
    type: 'object',
    title: 'Attachment',
    icon: () => EdsBlockEditorIcon(attach_file),
    fields: [
      {
        name: 'reference',
        type: 'reference',
        to: [{ type: 'downloadableFile' }],
      },
    ],
  }
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
            styles: [
              {
                title: 'Small text',
                value: 'smallText',
                component: SmallTextRender,
              },
            ],
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
  }

  if (!onlySubSupScriptDecorators) {
    //@ts-ignore: why is it undefined when defined aboved
    config.marks.decorators.push(...StrongEmConfig)
  }

  if (h2) {
    config?.styles?.push(h2Config)
  }
  if (h3) {
    config?.styles?.push(h3Config)
  }
  if (h4) {
    config?.styles?.push(h4Config)
  }
  if (smallText) {
    config?.styles?.push(smallTextConfig)
  }
  if (largeText) {
    config?.styles?.push(largeTextConfig)
  }
  if (extraLargeText) {
    config?.styles?.push(extraLargeTextConfig)
  }

  if (externalLink) {
    //@ts-ignore
    config?.marks?.annotations?.push(externalLinkConfig)
  }

  if (internalLink) {
    config?.marks?.annotations?.push(internalLinkConfig(internalReference))
    config?.marks?.annotations?.push(internalLinkConfig(internalReferenceOtherLanguage))
    config?.marks?.annotations?.push(internalLinkConfig(homepageLink))
  }

  if (attachment) {
    config?.marks?.annotations?.push(attachmentConfig)
  }

  if (footnote) {
    config?.marks?.annotations?.push(footnoteConfig)
  }

  if (highlight) {
    config.marks?.decorators?.push(textColorConfig)
  }

  return config
}

export default configureBlockContent()
