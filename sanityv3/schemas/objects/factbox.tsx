import { info_circle } from '@equinor/eds-icons'
import { PortableTextBlock } from 'sanity'
import type { ColorListValue } from 'sanity-plugin-color-list'
import { Colors } from '../../helpers/ColorListValues'
import { EdsIcon, LeftAlignedImage, RightAlignedImage } from '../../icons'
import { RadioIconSelector } from '../components'
import { configureBlockContent } from '../editors/blockContentType'
import type { ImageWithAlt } from './imageWithAlt'

const imageAlignmentOptions = [
  { value: 'left', icon: LeftAlignedImage },
  { value: 'right', icon: RightAlignedImage },
]

const chosenColors = ['White', 'Moss Green', 'Spruce Wood']
const backgroundColors = Colors.filter((color) => chosenColors.includes(color.title))
const blockContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: true,
  attachment: false,
  smallText: false,
})

export type Factbox = {
  _type: 'factbox'
  title?: string
  content?: PortableTextBlock[]
  image?: ImageWithAlt
  background?: ColorListValue
  imagePosition?: string
  dynamicHeight?: boolean
}

export default {
  title: 'Factbox',
  name: 'factbox',
  type: 'object',
  fieldsets: [
    {
      title: 'Design options',
      name: 'design',
      description: 'Some options for design',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [blockContentType],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
    },
    /*     {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      options: {
        tooltip: true,
        list: backgroundColors,
      },
      fieldset: 'design',
      initialValue: backgroundColors[0],
    }, */
    {
      name: 'imagePosition',
      title: 'Image position',
      description: 'Select which side of the factbox the image should be displayed at on larger screens.',
      type: 'string',
      fieldset: 'design',
      inputComponent: function ImagePosition({ type, onChange, value }: { type: any; onChange: any; value: string }) {
        return (
          <RadioIconSelector
            name="imageAlignmentSelector"
            options={imageAlignmentOptions}
            defaultValue="left"
            currentValue={value}
            type={type}
            onChange={onChange}
          />
        )
      },
    },
    {
      name: 'dynamicHeight',
      type: 'boolean',
      title: 'Dynamic height',
      fieldset: 'design',
      description:
        'Let the text decide height of the component instead of the image, up to a maximum of 800 pixels. Used by default if no image is selected.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      imageUrl: 'image.asset.url',
    },
    prepare({ title = '', imageUrl }: { title: string; imageUrl: string }) {
      return {
        title: title,
        subtitle: 'Factbox',
        media: imageUrl ? <img src={imageUrl} alt="" style={{ height: '100%' }} /> : EdsIcon(info_circle),
      }
    },
  },
}