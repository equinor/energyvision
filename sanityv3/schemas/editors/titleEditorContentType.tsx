import { SuperScriptRenderer, SubScriptRenderer, StrikeThroughRenderer } from '../components'
import { IconSuperScript, IconSubScript, EdsBlockEditorIcon } from '../../icons'
import { StrikethroughIcon } from '@sanity/icons'
import { BlockDefinition, BlockStyleDefinition } from 'sanity'
import { format_color_text } from '@equinor/eds-icons'
import { defaultColors } from '../defaultColors'
import { em, ExtraLargeTextRender, LargeTextRender } from './blockContentType'

export type TitleContentProps = {
  extendedStyles?: BlockStyleDefinition[]
  highlight?: boolean
  highlightTitle?: string
  largeText?: boolean
  extraLargeText?: boolean
  twoXLText?: boolean
}

const TwoXLTextRender = (props: any) => {
  const { children } = props
  return <span style={{ fontSize: `${em(64, 16)}`, fontWeight: '400' }}>{children}</span>
}

// TODO: Add relevant styles for titles (i.e. highlighted text)
export const configureTitleBlockContent = (options: TitleContentProps = {}): BlockDefinition => {
  const {
    highlight = false,
    highlightTitle = 'Highlight',
    largeText = false,
    extraLargeText = false,
    twoXLText = false,
    extendedStyles = [],
  } = options

  const config: BlockDefinition = {
    type: 'block',
    name: 'block',
    styles: [{ title: 'Normal', value: 'normal' }, ...extendedStyles],
    lists: [],
    marks: {
      decorators: [
        { title: 'Strong', value: 'strong' },
        { title: 'Emphasis', value: 'em' },
        {
          title: 'Strikethrough',
          value: 's',
          icon: StrikethroughIcon,
          component: StrikeThroughRenderer,
        },
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
  const twoXLTextConfig = {
    title: '2XL text',
    value: 'twoXLText',
    component: TwoXLTextRender,
  }

  const textColorConfig = {
    title: highlightTitle,
    value: 'highlight',
    icon: EdsBlockEditorIcon(format_color_text),
    component: ({ children }: { children: React.ReactNode }) => {
      return <span style={{ color: defaultColors[8].value }}>{children}</span>
    },
  }

  if (highlight) {
    config.marks?.decorators?.push(textColorConfig)
  }
  if (largeText) {
    config?.styles?.push(largeTextConfig)
  }
  if (extraLargeText) {
    config?.styles?.push(extraLargeTextConfig)
  }
  if (twoXLText) {
    config?.styles?.push(twoXLTextConfig)
  }

  return config
}

export default configureTitleBlockContent()
