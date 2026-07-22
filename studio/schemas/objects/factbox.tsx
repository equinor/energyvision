import { info_circle } from '@equinor/eds-icons'
import { useEffect } from 'react'
import type { PortableTextBlock } from 'sanity'
import { type BooleanInputProps, set, useFormValue } from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon, LeftAlignedImage, RightAlignedImage } from '../../icons'
import { RadioIconSelector } from '../components'
import type { ColorSelectorValue } from '../components/ColorSelector'
import { configureBlockContent } from '../editors/blockContentType'
import type { ImageWithAlt } from './imageWithAlt'

const imageAlignmentOptions = [
  { value: 'left', icon: LeftAlignedImage },
  { value: 'right', icon: RightAlignedImage },
]

const blockContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: true,
  attachment: false,
  smallText: false,
})

function SingleColumnLayoutInput(props: BooleanInputProps) {
  const { onChange, path, value } = props
  const parentPath = path.slice(0, -1)
  const content = useFormValue([...parentPath, 'content']) as
    | PortableTextBlock[]
    | undefined

  const text = Array.isArray(content) ? blocksToText(content) || '' : ''
  const isReadOnly = text.length < 800

  useEffect(() => {
    if (isReadOnly && value === false) {
      onChange(set(true))
    }
  }, [isReadOnly, onChange, value])

  return props.renderDefault(props)
}

export type Factbox = {
  _type: 'factbox'
  title?: string
  content?: PortableTextBlock[]
  image?: ImageWithAlt
  background?: ColorSelectorValue
  isSingleColumn?: boolean
  imagePosition?: string
  dynamicHeight?: boolean
}

export default {
  title: 'Factbox',
  name: 'factbox',
  type: 'object',
  initialValue: {
    isSingleColumn: true,
  },
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
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      fieldset: 'design',
    },
    {
      name: 'isSingleColumn',
      type: 'boolean',
      title: 'Single column layout',
      description:
        'Enabled by default. You can turn this off once content reaches 800 characters. This will have no effect if image is selected',
      initialValue: true,
      components: {
        input: SingleColumnLayoutInput,
      },
      readOnly: ({ parent }: { parent: any }) => {
        const content = parent?.content
        if (!content || !Array.isArray(content)) {
          return true
        }
        const text = blocksToText(content) || ''
        return text.length < 800
      },
    },
    {
      name: 'imagePosition',
      title: 'Image position',
      description:
        'Select which side of the factbox the image should be displayed at on larger screens.',
      type: 'string',
      fieldset: 'design',
      components: {
        input: function ImagePosition({
          onChange,
          value,
        }: {
          onChange: any
          value: string
        }) {
          return (
            <RadioIconSelector
              name='imageAlignmentSelector'
              options={imageAlignmentOptions}
              defaultValue='left'
              currentValue={value}
              onChange={onChange}
            />
          )
        },
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
        media: imageUrl ? (
          <img src={imageUrl} alt='' style={{ height: '100%' }} />
        ) : (
          EdsIcon(info_circle)
        ),
      }
    },
  },
}
