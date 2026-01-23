import { attach_file, format_color_text, star_filled } from '@equinor/eds-icons'
import type { ElementType } from 'react'
import type { BlockDefinition, BlockStyleDefinition } from 'sanity'
import styled from 'styled-components'
import {
  EdsBlockEditorIcon,
  EdsIcon,
  IconSubScript,
  IconSuperScript,
} from '../../icons'
import { SubScriptRenderer, SuperScriptRenderer } from '../components'
import { defaultColors } from '../defaultColors'
import {
  externalLink,
  homepageLink,
  internalReference,
  internalReferenceOtherLanguage,
  type LinkType,
} from '../objects/linkSelector/common'
import linkSelector from '../objects/linkSelector/linkSelector'

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

export type BlockContentProps = {
  h2?: boolean
  h3?: boolean
  h4?: boolean
  /** Preconfigured options variants
   * simbleBlock - lists and normal text
   * withH2SimpleBlock - only h2 and normal text
   * extendedBlock - h2,h3,normal,lists,links, small, display h2
   * fullBlock - all headings,lists,links,attachment.
   * title - just normal text(as h1 in web)
   * richTitle - normal text(as h1 in web) and display h1
   * ingress  - normal and small text
   */
  variant?:
    | 'title'
    | 'richTitle'
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
  displayH1?: boolean
  displayH2?: boolean
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
const richTitleVariantOptions: BlockContentProps = {
  h2: false,
  h3: false,
  displayH1: true,
  internalLink: false,
  externalLink: false,
  lists: false,
}
const extendedBlockStylesOptions: BlockContentProps = {
  h2: true,
  displayH2: true,
  //smallText: true,
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
  displayH2: true,
  attachment: true,
  smallText: true,
}

type TypographyGroups = 'normal' | 'paragraph' | 'article' | 'display'

const getGroupStyle = (group: TypographyGroups) => {
  switch (group) {
    case 'article':
      return {
        h2: 'text-lg font-normal py-2 m-0',
        h3: 'text-md font-normal pt-2 m-0',
        h4: 'text-md font-md m-0',
      }
    case 'display':
      return {
        h1_base: 'text-3xl tracking-display font-normal m-0 ',
        h1_lg: 'text-4xl leading-md tracking-display font-normal m-0 ',
        h1_xl: 'text-5xl tracking-display font-normal m-0',
        h2_base: 'text-3xl tracking-display font-normal m-0 ',
        h2_lg: 'text-4xl leading-md tracking-display font-normal m-0 ',
        h2_xl: 'text-5xl tracking-display font-normal m-0',
      }
    case 'normal':
      return {
        h2: 'text-2xl pb-8 m-0',
        h3: 'text-xl m-0',
        h4: 'text-lg font-md m-0',
        sm: 'text-sm',
      }
  }
}

export const TextRenderer = (
  props: any,
  as: ElementType,
  group?: TypographyGroups,
  level?: string,
) => {
  const { children } = props
  const ElementTag = as ?? (`span` as React.ElementType)
  const classNames = getGroupStyle(group)[level] ?? ''

  return (
    <span className={classNames} data-group={group}>
      {children}
    </span>
  )
}

// H1 not allowed in block content since it should be a document title.
// Default configuration is for text block main block content
export const configureBlockContent = (
  options?: BlockContentProps,
): BlockDefinition => {
  let defaultConfigOptions: BlockContentProps = {
    h3: true,
    lists: true,
    internalLink: true,
    externalLink: true,
    variant: 'block',
    group: options?.group ?? 'normal',
    h2: false,
    h4: false,
    attachment: false,
    displayH1: false,
    displayH2: false,
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
    defaultConfigOptions = Object.assign(
      defaultConfigOptions,
      articleStylesOptions,
      options,
    )
  }
  if (options?.variant === 'title') {
    defaultConfigOptions = Object.assign(
      defaultConfigOptions,
      titleVariantOptions,
      options,
    )
  }
  if (options?.variant === 'richTitle') {
    defaultConfigOptions = Object.assign(
      defaultConfigOptions,
      richTitleVariantOptions,
      options,
    )
  }
  if (options?.variant === 'simpleBlock') {
    defaultConfigOptions = Object.assign(
      defaultConfigOptions,
      simpleBlockStylesOptions,
      options,
    )
  }
  if (options?.variant === 'extendedBlock') {
    defaultConfigOptions = Object.assign(
      defaultConfigOptions,
      extendedBlockStylesOptions,
      options,
    )
  }
  if (options?.variant === 'fullBlock') {
    defaultConfigOptions = Object.assign(
      defaultConfigOptions,
      fullBlockStylesOptions,
      options,
    )
  }
  if (options?.variant === 'withH2SimpleBlock') {
    defaultConfigOptions = Object.assign(
      defaultConfigOptions,
      withH2SimpleBlockStylesOptions,
      options,
    )
  }
  if (options?.variant === 'ingress') {
    defaultConfigOptions = Object.assign(
      defaultConfigOptions,
      ingressStylesOptions,
      options,
    )
  }

  const {
    h2,
    h3,
    h4,
    lists,
    internalLink,
    externalLink,
    group,
    attachment,
    displayH1,
    displayH2,
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
    component: (props: any) => TextRenderer(props, 'h2', group, 'h2'),
  }
  const h3Config = {
    title: 'Heading 3',
    value: 'h3',
    component: (props: any) => TextRenderer(props, 'h3', group, 'h3'),
  }
  const h4Config = {
    title: 'Heading 4',
    value: 'h4',
    component: (props: any) => TextRenderer(props, 'h4', group, 'h4'),
  }
  const displayH1BaseConfig = {
    title: 'Display base',
    value: 'display_h1_base',
    component: (props: any) =>
      TextRenderer(props, 'span', 'display', 'h1_base'),
  }
  const displayH1LgConfig = {
    title: 'Display large',
    value: 'display_h1_lg',
    component: (props: any) => TextRenderer(props, 'span', 'display', 'h1_lg'),
  }
  const displayH1XlConfig = {
    title: 'Display extra large',
    value: 'display_h1_xl',
    component: (props: any) => TextRenderer(props, 'span', 'display', 'h1_xl'),
  }
  const displayH2BaseConfig = {
    title: 'Display H2 base',
    value: 'display_h2_base',
    component: (props: any) => TextRenderer(props, 'h2', 'display', 'h2_base'),
  }
  const displayH2LgConfig = {
    title: 'Display h2 large',
    value: 'display_h2_lg',
    component: (props: any) => TextRenderer(props, 'h2', 'display', 'h2_lg'),
  }
  const displayH2XlConfig = {
    title: 'Display h2 extra large',
    value: 'display_h2_xl',
    component: (props: any) => TextRenderer(props, 'h2', 'display', 'h2_xl'),
  }

  const smallTextConfig = {
    title: 'Small text',
    value: 'smallText',
    component: (props: any) => TextRenderer(props, 'span', group, 'sm'),
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
  if (displayH1) {
    config?.styles?.push(
      displayH1BaseConfig,
      displayH1LgConfig,
      displayH1XlConfig,
    )
  }
  if (displayH2) {
    config?.styles?.push(
      displayH2BaseConfig,
      displayH2LgConfig,
      displayH2XlConfig,
    )
  }
  if (externalLink) {
    //@ts-ignore
    config?.marks?.annotations?.push(externalLinkConfig)
  }
  if (internalLink) {
    config?.marks?.annotations?.push(internalLinkConfig(internalReference))
    config?.marks?.annotations?.push(
      internalLinkConfig(internalReferenceOtherLanguage),
    )
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
  console.log('config.styles', config.styles)

  return config
}
