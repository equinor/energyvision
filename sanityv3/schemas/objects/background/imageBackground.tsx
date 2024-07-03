import { defineType, defineField, Image } from 'sanity'
import { RadioIconSelector } from '../../components'
import { ContentRightImage, ContentLeftImage, ContentCenterImage } from '../../../icons'
import { capitalizeFirstLetter } from '../../../helpers/formatters'

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
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
        collapsed: false,
      },
    }),
    defineField({
      title: 'Apply scroll animation',
      name: 'useAnimation',
      type: 'boolean',
      description: 'Animates content over the background image.',
      hidden: ({ parent }: any) => {
        console.log('parent in image background', parent)
        return false
      },
    }),
    defineField({
      title: 'Apply light gradient',
      name: 'useLight',
      type: 'boolean',
      description: 'Applies a white gradient over semi transparent background image.',
    }),
    defineField({
      name: 'contentAlignment',
      title: 'Content Alignment',
      description: 'Select the content alignment on larger screens. Bottom alignments can be kept on mobile',
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
      useAnimation: 'useAnimation',
      contentAlignment: 'contentAlignment',
    },
    prepare({ image, useAnimation, contentAlignment }) {
      return {
        title: `Image background`,
        subtitle: `${capitalizeFirstLetter(contentAlignment) + ' aligned '} ${
          useAnimation ? ' | Animated ' : ''
        } content`,
        media: image.asset,
      }
    },
  },
})
