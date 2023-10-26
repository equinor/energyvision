import { SuperScriptRenderer, SubScriptRenderer, StrikeThroughRenderer } from '../components'
import { IconSuperScript, IconSubScript, EdsBlockEditorIcon } from '../../icons'
import { StrikethroughIcon } from '@sanity/icons'
import type { BlockFieldType } from '../../types/schemaTypes'
import { format_color_text } from '@equinor/eds-icons'

export type TitleContentProps = {
  highlight?: boolean
  extraLarge?: boolean
  isBigTitle?: boolean
  large?: {
    title: string
    value: 'normal'
    component?: ({ children }: { children: React.ReactNode }) => JSX.Element
  }
}

// TODO: Add relevant styles for titles (i.e. highlighted text)
export const configureTitleBlockContent = (options: TitleContentProps = {}): BlockFieldType => {
  const {
    large = {
      title: 'Large',
      value: 'normal',
    },
    extraLarge = false,
    highlight = false,
    isBigTitle = false,
  } = options

  const largeTitleText = {
    title: 'Large',
    value: 'normal',
    component: ({ children }: { children: React.ReactNode }) => <span style={{ fontSize: '42px' }}>{children}</span>,
  }

  const titleStyle = extraLarge || isBigTitle ? largeTitleText : large

  const config: BlockFieldType = {
    type: 'block',
    styles: [titleStyle],
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
  const extraLargeConfig = {
    title: 'Extra Large',
    value: 'extraLarge',
    component: ({ children }: { children: React.ReactNode }) => <span style={{ fontSize: '56px' }}>{children}</span>,
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
  if (extraLarge) {
    config.styles.push(extraLargeConfig)
  }
  if (highlight) {
    config.marks.decorators.push(textColorConfig)
  }
  return config
}

export default configureTitleBlockContent()
