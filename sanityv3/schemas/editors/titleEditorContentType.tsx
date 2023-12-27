import { SuperScriptRenderer, SubScriptRenderer, StrikeThroughRenderer, TextHighLightRenderer } from '../components'
import { IconSuperScript, IconSubScript, EdsBlockEditorIcon } from '../../icons'
import { StrikethroughIcon } from '@sanity/icons'
import { BlockDefinition, BlockStyleDefinition } from 'sanity'
import { format_color_text } from '@equinor/eds-icons'
import type { Reference, Rule, ValidationContext } from 'sanity'
import React, { Children } from 'react'
import { ColorSelectorValue, isValidTextColor } from '../components/ColorSelector'

export type TitleContentProps = {
  styles?: BlockStyleDefinition[]
  highlight?: boolean
  highlightWithColor?: boolean
}

type HighLighWithColor = {
  _key: string
  _type: ''
  color: ColorSelectorValue
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
  const { highlight = false, highlightWithColor = false, styles } = options

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
    title: 'Highlight',
    value: 'highlight',
    icon: EdsBlockEditorIcon(format_color_text),
    component: ({ children }: { children: React.ReactNode }) => {
      return <span style={{ color: 'hsl(348, 100%, 54%)' }}>{children}</span>
    },
  }

  const textColorConfigWithColorOptions = {
    title: 'Highlight Color',
    type: 'object',
    name: 'highlightWithColor',
    icon: EdsBlockEditorIcon(format_color_text),
    components: {
      annotation: TextHighLightRenderer,
    },
    fields: [
      {
        name: 'color',
        title: 'Text Highlight Color',
        type: 'colorlist',
        options: {
          textColor: true,
        },
        validation: (Rule: Rule) =>
          Rule.custom((value: ColorSelectorValue, context: ValidationContext) => {
            const { parent, document } = context as { parent: any; document: any }
            const component = document.content.find((it: any) =>
              it.title.find((child: any) => child.markDefs.find((i: any) => i._key == parent._key)),
            )
            console.log(parent)
            return (
              isValidTextColor(value.title, component.background.title) ||
              `${value.title} text on ${component.background.title} background does not go well.`
            )
          }).error(),
      },
    ],
  }

  if (highlight) {
    config.marks?.decorators?.push(textColorConfig)
  }
  if (highlightWithColor) {
    config.marks?.annotations?.push(textColorConfigWithColorOptions)
  }

  return config
}

export default configureTitleBlockContent()
