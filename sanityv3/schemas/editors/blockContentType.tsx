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

const externalLinkConfig = {
  ...externalLink,
}

export type BlockContentProps = {
  h2?: boolean
  useH2BaseStyle?: boolean
  h3?: boolean
  useH3BaseStyle?: boolean
  h4?: boolean
  internalLink?: boolean
  externalLink?: boolean
  attachment?: boolean
  lists?: boolean
  smallText?: boolean
  largeText?: boolean
  extraLargeText?: boolean
  highlight?: boolean
  normalTextOverride?: {
    title: string
    value: 'normal'
    component?: ({ children }: { children: React.ReactNode }) => JSX.Element
  }
  extendedStyles?: BlockStyleDefinition[]
}

export const textColorConfig = {
  title: 'Highlight',
  value: 'highlight',
  icon: EdsBlockEditorIcon(format_color_text),
  component: ({ children }: { children: React.ReactNode }) => {
    return <span style={{ color: defaultColors[8].value }}>{children}</span>
  },
}

const round = (num: number) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
export const em = (px: number, base: number) => `${round(px / base)}em`

const SmallTextRender = (props: any) => {
  const { children } = props
  return <span style={{ fontSize: '0.8rem' }}>{children}</span>
}
export const LargeTextRender = (props: any) => {
  const { children } = props
  return <span style={{ fontSize: `${em(36, 16)}`, fontWeight: '600' }}>{children}</span>
}
export const ExtraLargeTextRender = (props: any) => {
  const { children } = props
  return <span style={{ fontSize: `${em(56, 16)}`, fontWeight: '600' }}>{children}</span>
}

// H1 not allowed in block content since it should be a document title.
export const configureBlockContent = (options: BlockContentProps = {}): BlockDefinition => {
  const {
    h2 = true,
    h3 = true,
    h4 = false,
    internalLink = true,
    externalLink = true,
    attachment = false,
    lists = true,
    largeText = false,
    extraLargeText = false,
    smallText = true,
    highlight = false,
    extendedStyles = [],
    normalTextOverride = { title: 'Normal', value: 'normal' },
  } = options

  /** comment */
  const config: BlockDefinition = {
    type: 'block',
    name: 'block',
    styles: [normalTextOverride, ...extendedStyles],
    lists: lists
      ? [
          { title: 'Numbered', value: 'number' },
          { title: 'Bullet', value: 'bullet' },
        ]
      : [],
    marks: {
      decorators: [
        // @TODO: Strong and Em are built in and not needed
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
      annotations: [
        {
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
        },
      ],
    },
  }

  const h2DefaultConfig = { title: 'Heading 2', value: 'h2' }
  const h3DefaultConfig = { title: 'Heading 3', value: 'h3' }
  const h4Config = { title: 'Heading 4', value: 'h4' }
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
    title: 'Extra large text',
    value: 'extraLargeText',
    component: ExtraLargeTextRender,
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

  if (h2) {
    config?.styles?.push(h2DefaultConfig)
    /*     if (useH2BaseStyle) {
      config?.styles?.push(h2BaseConfig)
    } else {
      config?.styles?.push(h2DefaultConfig)
    } */
  }

  if (h3) {
    config?.styles?.push(h3DefaultConfig)
    /*     if (useH3BaseStyle) {
      config?.styles?.push(h3BaseConfig)
    } else {
      config?.styles?.push(h3DefaultConfig)
    } */
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

  if (highlight) {
    config.marks?.decorators?.push(textColorConfig)
  }

  return config
}

export default configureBlockContent()
