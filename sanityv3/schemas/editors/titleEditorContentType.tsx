import { format_color_text } from '@equinor/eds-icons'
import { StrikethroughIcon } from '@sanity/icons'
import { type BlockDefinition, type BlockStyleDefinition, useFormValue } from 'sanity'
import { EdsBlockEditorIcon, IconSubScript, IconSuperScript } from '../../icons'
import { StrikeThroughRenderer, SubScriptRenderer, SuperScriptRenderer } from '../components'
import { defaultColors } from '../defaultColors'
import { displayTextConfig, extraLargeTextConfig, largeTextConfig } from './blockContentType'

export type TitleContentProps = {
  extendedStyles?: BlockStyleDefinition[]
  highlight?: boolean
  highlightTitle?: string
  largeText?: boolean
  extraLargeText?: boolean
  twoXLText?: boolean
}

// TODO: Add relevant styles for titles (i.e. highlighted text)
export const configureTitleBlockContent = (options: TitleContentProps = {}): BlockDefinition => {
  const {
    highlight = false,
    highlightTitle = 'Highlight',
    largeText = false,
    extraLargeText = false,
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
    config?.styles?.push(displayTextConfig)
    config?.styles?.push(largeTextConfig)
  }
  if (extraLargeText) {
    config?.styles?.push(extraLargeTextConfig)
  }

  return config
}

export default configureTitleBlockContent()
