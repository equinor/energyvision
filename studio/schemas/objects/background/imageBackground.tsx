import { FaRegImage } from 'react-icons/fa6'
import { defineField, defineType, type ObjectInputProps } from 'sanity'
import { capitalizeFirstLetter } from '../../../helpers/formatters'
import {
  ContentCenterImage,
  ContentLeftImage,
  ContentRightImage,
} from '../../../icons'
import { RadioIconSelector } from '../../components'

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
      validation: Rule => Rule.required(),
    }),
    defineField({
      title: 'Apply scroll animation',
      name: 'useAnimation',
      type: 'boolean',
      description: 'Animates content over the background image.',
      hidden: () => {
        return false
      },
    }),
    defineField({
      title: 'Apply light gradient',
      name: 'useLight',
      type: 'boolean',
      description:
        'Applies a white gradient over semi transparent background image.',
    }),
    defineField({
      name: 'contentAlignment',
      title: 'Content Alignment',
      description:
        'Select the content alignment on larger screens. Bottom alignments can be kept on mobile',
      type: 'string',
      initialValue: 'left',
      components: {
        //@ts-ignore
        input: function (props: ObjectInputProps) {
          const { value, onChange, schemaType } = props
          const { initialValue } = schemaType
          return (
            <RadioIconSelector
              name='imageAlignmentSelector'
              options={contentAlignmentOptions}
              defaultValue={String(initialValue) ?? 'left'}
              currentValue={String(value)}
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
        subtitle: `${contentAlignment ? capitalizeFirstLetter(contentAlignment) + ' aligned ' : ''} ${
          useAnimation ? ' | Animated ' : ''
        } content`,
        media: image?.asset ?? FaRegImage,
      }
    },
  },
})
