import { ColorSelector } from '../components/ColorSelector'
import { defaultBackgroundColors } from '../defaultColors'
import { defineType, defineField } from 'sanity'

export type ColorType = {
  title: string
  value: string
  key?: string
  dark?: boolean
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
    key: defaultBackgroundColors[0].key,
  },
  components: {
    input: (props) => {
      return <ColorSelector {...props} />
    },
  },
  preview: {
    select: {
      value: 'key',
    },
    prepare({ value }: { value: string }) {
      const color = defaultBackgroundColors.find((it) => it.key == value)
      return {
        title: `Color '${color?.title}'`,
        media: (
          <span
            style={{
              backgroundColor: color?.value,
              padding: '15px',
              borderRadius: '50%',
            }}
          />
        ),
      }
    },
  },
})
