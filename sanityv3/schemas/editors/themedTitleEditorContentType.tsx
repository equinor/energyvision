import { SuperScriptRenderer, SubScriptRenderer, StrikeThroughRenderer } from '../components'
import { IconSuperScript, IconSubScript } from '../../icons'
import { StrikethroughIcon } from '@sanity/icons'
import { BlockDefinition } from 'sanity'
import { displayTextConfig, em, extraLargeTextConfig, largeTextConfig, TextRenderer } from './blockContentType'

export type ThemedTitleContentProps = {
  normalText?: boolean
  largeText?: boolean
  extraLargeText?: boolean
  twoXLText?: boolean
}

// TODO: Add relevant styles for titles (i.e. highlighted text)
export const configureThemedTitleBlockContent = (options: ThemedTitleContentProps = {}): BlockDefinition => {
  const { largeText = true, extraLargeText = false, twoXLText = false, normalText = true } = options

  const config: BlockDefinition = {
    type: 'block',
    name: 'block',
    styles: [],
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

  const normalTextConfig = { title: 'Normal', value: 'normal' }
  // Since one cant disable value normal, when title should only have large and not normal, make normal like Large
  // Make sure that the block serializer picks up this 'as large' for normal text
  const normalAsLargeTextConfig = {
    title: 'Large',
    value: 'normal',
    component: (props: any) => TextRenderer(props, 'span', 'display', 'h2_lg'),
    //blockEditor: { render: TextRenderer(undefined, 'span', 'display', 'h2_xl') },
  }

  if (normalText) {
    config?.styles?.push(normalTextConfig)
  }
  if (!normalText && largeText) {
    config?.styles?.push(normalAsLargeTextConfig)
  }
  if (normalText && largeText) {
    config?.styles?.push(displayTextConfig)
    config?.styles?.push(largeTextConfig)
  }
  if (extraLargeText) {
    config?.styles?.push(extraLargeTextConfig)
  }

  return config
}

export default configureThemedTitleBlockContent()
