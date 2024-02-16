import { defineType, defineField } from 'sanity'
import { RadioIconSelector } from '../../components'
import { ContentRightImage, ContentLeftImage, ContentCenterImage } from '../../../icons'

export type ColorType = {
  title: string
  value: string
}

const contentAlignmentOptions = [
  { value: 'left', icon: ContentLeftImage },
  { value: 'center', icon: ContentCenterImage },
  { value: 'right', icon: ContentRightImage },
]

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
      name: 'contentAlignment',
      title: 'Content Alignment',
      description: 'Select the content alignment on larger screens.',
      type: 'string',
      components: {
        input: function ({ onChange, value }: { onChange: any; value: string }) {
          return (
            <RadioIconSelector
              name="imageAlignmentSelector"
              options={contentAlignmentOptions}
              defaultValue="left"
              currentValue={value}
              onChange={onChange}
            />
          )
        },
      },
    }),
  ],

  preview: {
    select: {
      image: 'image',
      useAnimation: 'useAnimation',
      contentAlignment: 'contentAlignment',
    },
    prepare({
      image,
      useAnimation,
      contentAlignment,
    }: {
      image: Reference
      useAnimation: boolean
      contentAlignment: string
    }) {
      return {
        title: `Image background`,
        subtitle: `${contentAlignment.toUpperCase() + ' aligned'} ${useAnimation ? ' | Animated ' : ''} content`,
        media: image,
      }
    },
  },
})
