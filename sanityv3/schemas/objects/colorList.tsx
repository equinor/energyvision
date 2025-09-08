import { ColorSelector } from '../components/ColorSelector'
import { defaultBackgroundColors } from '../defaultColors'
import { defineType, defineField } from 'sanity'

export type ColorType = {
  title: string
  value: string
  key: string
  dark: boolean
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
  },
  preview: {
    select: {
      value: 'value',
      title: 'title',
    },
    prepare({ value, title }: { value: string; title: string }) {
      return {
        title: `Color '${title}'`,
        media: (
          <span
            style={{
              backgroundColor: value,
              padding: '15px',
              borderRadius: '50%',
            }}
          />
        ),
      }
    },
  },
})
