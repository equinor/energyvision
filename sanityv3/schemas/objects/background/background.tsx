import { defineType, defineField } from 'sanity'

export type ColorType = {
  title: string
  value: string
}

export default defineType({
  name: 'imageBackground',
  title: 'Image background',
  type: 'object',
  fields: [
    defineField({
      title: 'Background Image',
      name: 'image',
      type: 'imageWithAlt',
      description: 'Alt text is always ignored even if provided, considering background image as decorative.',
    }),
    defineField({
      title: 'Animation',
      name: 'useAnimation',
      type: 'boolean',
      description: 'Animates content over the background image.',
    }),
    defineField({
      title: 'Switch to dark theme.',
      description: 'Switch to dark theme if the background image is dark.',
      name: 'useDarkTheme',
      type: 'boolean',
    }),
  ],
})
