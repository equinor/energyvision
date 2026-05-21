import { FaRegImage } from 'react-icons/fa6'
import {
  type BooleanInputProps,
  defineField,
  defineType,
  type StringInputProps,
} from 'sanity'
import { OptionButtons } from '@/schemas/components/OptionButtons/OptionButtons'
import { Toggle } from '@/schemas/components/Toggle/Toggle'
import { capitalizeFirstLetter } from '../../../helpers/formatters'
import {
  ContentCenterImage,
  ContentLeftImage,
  ContentRightImage,
} from '../../../icons'
import {
  backgroundGradient,
  backgroundPosition,
  glassEffect,
  layoutGrid,
} from '../commonFields/commonFields'

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
      },
    }),
    {
      title: 'Apply scroll animation',
      name: 'useAnimation',
      type: 'boolean',
      description: 'Animates content over the background image.',
      components: {
        input: (props: BooleanInputProps) => Toggle(props),
      },
    },
    {
      title: 'Apply light gradient',
      name: 'useLight',
      deprecated: true,
      type: 'boolean',
      description: 'Applies semi transparent white gradient over',
      hidden: ({ value }: DocumentType) => {
        return !value
      },
      components: {
        input: (props: BooleanInputProps) => Toggle(props),
      },
    },
    {
      deprecated: true,
      title: 'Apply no gradient',
      description: 'Ensure enough contrast between text and background then',
      name: 'useNoGradient',
      type: 'boolean',
      hidden: ({ value }: DocumentType) => {
        return !value
      },
      components: {
        input: (props: BooleanInputProps) => Toggle(props),
      },
    },
    glassEffect(),
    backgroundGradient(),
    backgroundPosition(),
    layoutGrid(
      undefined,
      undefined,
      'md',
      'Select layout grid for the content over the background image.',
    ),
    {
      name: 'contentAlignment',
      title: 'Content Alignment',
      description: 'Select the content alignment on larger screens',
      type: 'string',
      initialValue: 'left',
      options: {
        list: contentAlignmentOptions.map(option => ({
          title: capitalizeFirstLetter(option.value),
          value: option.value,
        })),
      },
      components: {
        input: (props: StringInputProps) =>
          OptionButtons(props, contentAlignmentOptions),
      },
    },
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
