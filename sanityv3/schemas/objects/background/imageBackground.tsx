import { defineType, defineField, Image, ObjectDefinition } from 'sanity'
import { RadioIconSelector } from '../../components'
import { ContentRightImage, ContentLeftImage, ContentCenterImage } from '../../../icons'

export type ColorType = {
  title: string
  value: string
}

export type ImageBackground = {
  image: Image
  contentAlignment?: string
} & ObjectDefinition

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
      type: 'image',
      options: {
        hotspot: true,
        collapsed: false,
      },
    }),
    defineField({
      name: 'contentAlignment',
      title: 'Content Alignment',
      description: 'Select the content alignment on larger screens.',
      type: 'string',
      initialValue: 'left',
      components: {
        input: function ({ onChange, value }: { onChange: any; value: string }) {
          return (
            <RadioIconSelector
              name="imageAlignmentSelector"
              options={contentAlignmentOptions}
              defaultValue={'left'}
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
      contentAlignment: 'contentAlignment',
    },
    prepare({ image, contentAlignment }: { image: Image; contentAlignment: string }) {
      return {
        title: `Image background`,
        subtitle: `${contentAlignment.toUpperCase() + ' aligned '} content`,
        media: image.asset,
      }
    },
  },
})
