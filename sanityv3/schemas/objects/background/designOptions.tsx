import type { ColorSelectorValue } from '../../components/ColorSelector'
import type { ImageWithAltAndCaption } from '../imageWithAltAndCaption'
import { ImageWithAlt } from '../imageWithAlt'
import { Rule, ValidationContext } from 'sanity'
import { ImageBackground } from './imageBackground'

export type DesignOptions = {
  figure: ImageWithAltAndCaption
  backgroundColor?: ColorSelectorValue
  imageBackground?: ImageWithAlt
  useScrollAnimation?: boolean
  utility: string
  dark: boolean
  imagePosition?: string
  imageSize?: string
}

export default {
  name: 'designOptions',
  title: 'Design options',
  type: 'object',
  description: 'Choose design options for component',
  fields: [
    {
      name: 'backgroundType',
      title: 'Select type of background',
      type: 'string',
      options: {
        list: [
          { title: 'Color background', value: 'color-regular' },
          { title: 'Image background', value: 'image-regular' },
          { title: 'Image background with scroll animation', value: 'image-scroll-animation' },
        ],
      },
    },
    {
      title: 'Color background',
      description: 'Pick from a range of colors. Default is white.',
      name: 'backgroundColor',
      type: 'colorlist',
      options: {
        collapse: false,
      },
      hidden: ({ parent }: any) => {
        console.log('parent', parent)
        return String(parent?.backgroundType) !== 'color-regular'
      },
    },
    {
      type: 'imageBackground',
      name: 'imageBackground',
      title: 'Image background',
      validation: (Rule: Rule) => [
        Rule.custom((imageBackground: ImageBackground, context: ValidationContext) => {
          if (
            String(context.parent.backgroundType) === 'image-regular' ||
            String(context.parent.backgroundType) === 'image-scroll-animation'
          ) {
            return imageBackground._type === 'imageBackground' && imageBackground?.image?.asset
              ? true
              : 'Image required'
          }
          return true
        }),
      ],
      hidden: ({ parent }: any) => {
        return String(parent?.backgroundType) === 'color-regular'
      },
    },
  ],
}
