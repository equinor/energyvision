import { defineField, defineType } from 'sanity'
import { capitalizeFirstLetter } from '../../../helpers/formatters'
import { ContentCenterImage, ContentLeftImage, ContentRightImage } from '../../../icons'
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Apply scroll animation',
      name: 'useAnimation',
      type: 'boolean',
      description: 'Animates content over the background image.',
      hidden: ({ parent }: any) => {
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
      title: 'Apply no gradient',
      description: 'Ensure enough contrast between text and background then',
      name: 'useNoGradient',
      type: 'boolean',
    }),
    defineField({
      title: 'Apply glass effect behind text',
      name: 'useGlass',
      type: 'boolean',
      hidden: (props: any) => {
        console.log('props', props)
        const { currentUser } = props || {}
        const allowedRoles = ['designer', 'administrator', 'developer']
        const isAllowed = currentUser?.roles?.some((role) => allowedRoles?.includes(role?.name))
        return !isAllowed
      },
    }),
    defineField({
      name: 'contentAlignment',
      title: 'Content Alignment',
      description: 'Select the content alignment on larger screens. Bottom alignments can be kept on mobile',
      type: 'string',
      initialValue: 'left',
      components: {
        input: ({ onChange, value }: { onChange: any; value: string }) => (
          <RadioIconSelector
            name="imageAlignmentSelector"
            options={contentAlignmentOptions}
            defaultValue={'left'}
            currentValue={value}
            onChange={onChange}
          />
        ),
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
        subtitle: `${`${capitalizeFirstLetter(contentAlignment ?? 'left')} aligned `} ${
          useAnimation ? ' | Animated ' : ''
        } content`,
        media: image.asset,
      }
    },
  },
})
