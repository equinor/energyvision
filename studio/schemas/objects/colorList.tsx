import { Flex, Text } from '@sanity/ui'
import { defineField, defineType, type PreviewProps } from 'sanity'
import { ColorSelector } from '../components/ColorSelector'
import {
  ColorStringSelect,
  type ColorStringValueField,
  getColorStringOptionValue,
  getSelectableColors,
} from '../components/ColorStringSelect/ColorStringSelect'
import type { Color } from '../defaultColors'
import { defaultBackgroundColors } from '../defaultColors'

export type ColorType = {
  title: string
  value: string
  key: string
  dark: boolean
}

export const defaultColorListInitialValue: ColorType = {
  title: defaultBackgroundColors[0].title,
  value: defaultBackgroundColors[0].value,
  key: defaultBackgroundColors[0].key,
  dark: defaultBackgroundColors[0].dark ?? false,
}

export const createColorListInitialValue = (
  color: ColorType = defaultColorListInitialValue,
): ColorType => ({
  title: color.title,
  value: color.value,
  key: color.key,
  dark: color.dark,
})

type CreateColorStringSelectFieldConfig = {
  name: string
  title: string
  colors?: Color[]
  valueField?: ColorStringValueField
  initialValue?: string
} & Record<string, unknown>

export const createColorStringSelectField = ({
  colors = defaultBackgroundColors,
  valueField = 'key',
  initialValue,
  ...field
}: CreateColorStringSelectFieldConfig) => {
  const selectableColors = getSelectableColors(colors)
  const fallbackColor = selectableColors[0] ?? defaultBackgroundColors[0]

  return defineField({
    ...field,
    type: 'string',
    initialValue:
      initialValue ?? getColorStringOptionValue(fallbackColor, valueField),
    options: {
      layout: 'dropdown',
      list: selectableColors.map(color => ({
        title: color.title,
        value: getColorStringOptionValue(color, valueField),
      })),
      colors: selectableColors,
      colorValueField: valueField,
    } as any,
    components: {
      input: ColorStringSelect,
    },
  })
}

export function ColorListPreview(props: PreviewProps) {
  const previewProps = props as PreviewProps & { value?: string }
  const title = typeof props.title === 'string' ? props.title : undefined
  const value =
    typeof previewProps.value === 'string' ? previewProps.value : undefined

  return (
    <Flex gap={2} padding={2} align={'center'}>
      <div
        style={{
          background: value,
          width: '33px',
          height: '33px',
        }}
      />
      <Text size={1}>{title}</Text>
    </Flex>
  )
}

export default defineType({
  name: 'colorlist',
  title: 'Color',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'value',
      type: 'string',
    }),
  ],
  components: {
    input: props => {
      return <ColorSelector {...props} />
    },
    preview: ColorListPreview,
  },
  preview: {
    select: {
      value: 'value',
      title: 'title',
    },
  },
})
