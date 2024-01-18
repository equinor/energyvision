import { SuperScriptRenderer, SubScriptRenderer, StrikeThroughRenderer } from '../components'
import { IconSuperScript, IconSubScript } from '../../icons'
import { StrikethroughIcon } from '@sanity/icons'
import { BlockDefinition, BlockStyleDefinition } from 'sanity'
import { textColorConfig } from './blockContentType'

export type TitleContentProps = {
  styles?: BlockStyleDefinition[]
  highlight?: boolean
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
  const { highlight = false, styles } = options

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

  if (highlight) {
    config.marks?.decorators?.push(textColorConfig)
  }

  return config
}

export default configureTitleBlockContent()
