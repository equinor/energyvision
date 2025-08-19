import { attach_file, format_color_text, link, star_filled } from '@equinor/eds-icons'
import { BookmarkIcon } from '@sanity/icons'
import type { BlockDefinition, BlockStyleDefinition, Rule, TypedObject } from 'sanity'
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
import { validateAnchorReference } from '../validations/validateAnchorReference'

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
  footnote?: boolean
  attachment?: boolean
  lists?: boolean
  smallText?: boolean
  largeText?: boolean
  extraLargeText?: boolean
  headingAnchor?: boolean
  highlight?: boolean
  normalTextOverride?: {
    title: string
    value: 'normal'
    component?: ({ children }: { children: React.ReactNode }) => JSX.Element
  }
  extendedStyles?: BlockStyleDefinition[]
  onlySubSupScriptDecorators?: boolean
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
    headingAnchor = false,
    extendedStyles = [],
    normalTextOverride = { title: 'Normal', value: 'normal' },
    footnote = false,
    onlySubSupScriptDecorators = false,
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
      decorators: onlySubSupScriptDecorators
        ? [
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
          ]
        : [
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
      annotations: [],
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
        to: [{ type: 'assetFile' }],
      },
    ],
  }

  const headingAnchorConfig = {
    name: 'headingAnchor',
    type: 'object',
    title: 'Heading Anchor',
    icon: BookmarkIcon,
    fields: [
      {
        name: 'anchor',
        description:"Add anchor id that will be set as id of the heading. Only use together with headings. The # is only to indicate that this has an anchor id. Not visible in web",
        type: 'string',
/*         validation: (Rule: Rule) => Rule.custom((value: string, context: any) => {
          if (!value) return true
        
          const errors: string[] = []
        
          // Check for duplicate anchor values in the document
          const anchors = context.document.content
            .filter((item: TypedObject) => {
              return (item?.anchor || item?.anchorReference || item?.text?.some((block: any) => block?.markDefs?.some((mark: any) => mark?._type === "headingAnchor")))
             })
            .map((item) => {
              return item.anchor || item.anchorReference || item?.text?.find((block: any) => block?.markDefs?.find((mark: any) => mark?._type === "headingAnchor"))?.markDefs?.find((mark: any) => mark?._type === "headingAnchor").anchor
            })
          if (anchors.some((val : string, i : number) => anchors.indexOf(val) !== i)) {
            errors.push(` Anchor value ${value} is used multiple times. Must be unique`)
          }
          if (context.document.content?.find((item) => item?.text?.some((block: any) => block?.markDefs?.some((mark: any) => mark?._type === "headingAnchor" && mark?.anchor === value)))?.text?.find((block: any) => block?.markDefs?.some((mark: any) => mark?._type === "headingAnchor" && mark?.anchor === value) )) {
            errors.push(` Anchor value ${value} is used multiple times. Must be unique`)
          }
        
          // Validate the input value
          const inputValidation = validateAnchorReference(value)
          if (Array.isArray(inputValidation)) {
            return [...errors, ...inputValidation]
          }
        
          if (errors.length > 0) return errors
        
          return true
        }), */
      },
    ],
    components:{
      annotation: (props : any) => {
        return <span>
          <span style={{paddingRight: '4px', color:"lightgrey"}}>#</span>
          {props.renderDefault(props)}
        </span>
      }
    }
    }

  if (h2) {
    config?.styles?.push(h2DefaultConfig)
  }

  if (h3) {
    config?.styles?.push(h3DefaultConfig)
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
  if (headingAnchor) {
    config?.marks?.annotations?.push(headingAnchorConfig)
  }

  if (footnote) {
    config?.marks?.annotations?.push(
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
      }
    )
  }

  if (highlight) {
    config.marks?.decorators?.push(textColorConfig)
  }

  return config
}

export default configureBlockContent()
