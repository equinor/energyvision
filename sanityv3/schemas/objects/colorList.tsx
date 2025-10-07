import { Flex, Text } from '@sanity/ui'
import { ColorSelector } from '../components/ColorSelector'
import { defaultBackgroundColors } from '../defaultColors'
import { defineType, defineField, PreviewProps } from 'sanity'

export type ColorType = {
  title: string
  value: string
  key: string
  dark: boolean
}

type ColorListPreviewProps = {
  title?: string
  value?: string
} & PreviewProps

export function ColorListPreview(props: ColorListPreviewProps) {
  const { title, value } = props

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
  initialValue: {
    title: defaultBackgroundColors[0].title,
    value: defaultBackgroundColors[0].value,
    key: defaultBackgroundColors[0].key,
    dark: defaultBackgroundColors[0].dark,
  },
  components: {
    input: (props) => {
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
