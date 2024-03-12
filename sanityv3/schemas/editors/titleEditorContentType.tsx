import { SuperScriptRenderer, SubScriptRenderer, StrikeThroughRenderer } from '../components'
import { IconSuperScript, IconSubScript, EdsBlockEditorIcon } from '../../icons'
import { StrikethroughIcon } from '@sanity/icons'
import { BlockDefinition, BlockStyleDefinition } from 'sanity'
import { format_color_text } from '@equinor/eds-icons'
import { defaultColors } from '../defaultColors'

export type TitleContentProps = {
  styles?: BlockStyleDefinition[]
  highlight?: boolean
  highlightTitle?: string
}

// TODO: Add relevant styles for titles (i.e. highlighted text)
export const configureTitleBlockContent = (
  options: TitleContentProps = {
    styles: [
      {
        title: 'Normal',
        value: 'normal',
      },
    ],
  },
): BlockDefinition => {
  const { highlight = false, styles, highlightTitle = 'Highlight' } = options

  const config: BlockDefinition = {
    type: 'block',
    name: 'block',
    styles: styles,
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

  return config
}

export default configureTitleBlockContent()
