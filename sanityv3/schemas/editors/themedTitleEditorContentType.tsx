import { SuperScriptRenderer, SubScriptRenderer, StrikeThroughRenderer } from '../components'
import { IconSuperScript, IconSubScript } from '../../icons'
import { StrikethroughIcon } from '@sanity/icons'
import { BlockDefinition } from 'sanity'
import { em, ExtraLargeTextRender, LargeTextRender } from './blockContentType'

export type ThemedTitleContentProps = {
  normalText?: boolean
  largeText?: boolean
  extraLargeText?: boolean
  twoXLText?: boolean
}

const TwoXLTextRender = (props: any) => {
  const { children } = props
  return <span style={{ fontSize: `${em(64, 16)}`, fontWeight: '400' }}>{children}</span>
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
  const normalAsLargeTextConfig = { title: 'Large', value: 'normal', blockEditor: { render: LargeTextRender } }

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

  if (normalText) {
    config?.styles?.push(normalTextConfig)
  }
  if (!normalText && largeText) {
    config?.styles?.push(normalAsLargeTextConfig)
  }
  if (normalText && largeText) {
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

export default configureThemedTitleBlockContent()
