import { SuperScriptRenderer, SubScriptRenderer, StrikeThroughRenderer } from '../components'
import { IconSuperScript, IconSubScript, EdsBlockEditorIcon } from '../../icons'
import { StrikethroughIcon } from '@sanity/icons'
import { BlockDefinition, BlockStyleDefinition } from 'sanity'
import { format_color_text } from '@equinor/eds-icons'

export type TitleContentProps = {
  styles?: BlockStyleDefinition[]
  highlight?: boolean
}

// TODO: Add relevant styles for titles (i.e. highlighted text)
export const configureTitleBlockContent = (options: TitleContentProps = {}): BlockDefinition => {
  const { highlight = false, styles } = options
  const defaultStyle = {
    title: 'Normal',
    value: 'normal',
  }

  const config: BlockDefinition = {
    type: 'block',
    name: 'block',
    styles: styles ? styles : [defaultStyle],
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

  const HighlightTextRender = (props: any) => {
    const { children } = props
    return <span style={{ color: 'hsl(348, 100%, 54%)' }}>{children}</span>
  }

  const textColorConfig = {
    title: 'HighLight',
    value: 'highlight',
    icon: EdsBlockEditorIcon(format_color_text),
    component: HighlightTextRender,
  }
  if (highlight) {
    config.marks?.decorators?.push(textColorConfig)
  }
  return config
}

export default configureTitleBlockContent()
