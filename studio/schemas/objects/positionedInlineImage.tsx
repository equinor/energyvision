import { BsFileImageFill } from 'react-icons/bs'
import { FaImage } from 'react-icons/fa'
import { LuText } from 'react-icons/lu'
import { MdImage } from 'react-icons/md'
import { PiTextAlignJustifyBold } from 'react-icons/pi'
import {
  RxTextAlignBottom,
  RxTextAlignCenter,
  RxTextAlignTop,
} from 'react-icons/rx'
import { TbFloatLeft, TbFloatRight } from 'react-icons/tb'
import type { StringInputProps } from 'sanity'
import { capitalizeFirstLetter } from '@/helpers/formatters'
import { InlineImageFullWidth } from '../../icons'
import { OptionButtons } from '../components/OptionButtons/OptionButtons'
import type { ImageWithAlt } from './imageWithAlt'

const textVerticalAlignmentOptions = [
  { value: 'top', icon: <RxTextAlignTop /> },
  { value: 'center', icon: <RxTextAlignCenter /> },
  { value: 'bottom', icon: <RxTextAlignBottom /> },
]

const imageOrientationOptions = [
  { value: 'landscape', icon: <FaImage /> },
  { value: 'portrait', icon: <BsFileImageFill /> },
  { value: 'square', icon: <MdImage /> },
]
const layoutOptions = [
  { value: 'full', icon: <InlineImageFullWidth /> },
  //align with text,inner column
  { value: 'center', icon: <PiTextAlignJustifyBold /> },
  { value: 'left', icon: <TbFloatLeft /> },
  { value: 'right', icon: <TbFloatRight /> },
]
const layoutOptionsConfig = {
  square: ['right', 'left'],
  landscape: ['right', 'left', 'full', 'center'],
}

const portraitLayoutOptions = [
  {
    value: 'left',
    icon: () => (
      <div style={{ display: 'flex' }}>
        <MdImage size={20} />
        <LuText size={20} />
      </div>
    ),
  },
  {
    value: 'right',
    icon: () => (
      <div style={{ display: 'flex' }}>
        <LuText size={20} />
        <MdImage size={20} />
      </div>
    ),
  },
]

export type PositionedInlineImage = {
  _type: 'positionedInlineImage'
  image: ImageWithAlt
  caption?: string
  attribution?: string
  layout?: string
}

export default {
  name: 'positionedInlineImage',
  title: 'Image',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image with alt',
      type: 'imageWithAlt',
    },
    {
      name: 'caption',
      title: 'Image caption',
      type: 'string',
    },
    {
      name: 'attribution',
      title: 'Credit',
      type: 'string',
    },
    {
      title: 'Image orientation',
      name: 'imageOrientation',
      type: 'string',
      options: {
        list: [
          ...imageOrientationOptions.map(option => ({
            title: capitalizeFirstLetter(option.value),
            value: option.value,
          })),
        ],
        layout: 'radio',
      },
      initialValue: 'landscape',
      components: {
        input: (props: StringInputProps) =>
          OptionButtons(props, imageOrientationOptions),
      },
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          ...layoutOptions.map(option => ({
            title: capitalizeFirstLetter(option.value),
            value: option.value,
          })),
        ],
      },
      initialValue: 'left',
      components: {
        input: (props: StringInputProps) =>
          OptionButtons(
            props,
            layoutOptions,
            layoutOptionsConfig,
            'imageOrientation',
            props.path.slice(0, -1),
          ),
      },
      hidden: ({ parent }: any) => {
        //When portrait, only aligned with text option is available and it doesn't make sense to show layout options
        return parent?.imageOrientation === 'portrait'
      },
    },
    {
      name: 'landscapeRatio',
      title: 'Landscape image aspect ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9', value: '16:9' },
          { title: '21:9', value: '21:9' },
          { title: 'Original', value: 'original' },
        ],
      },
      initialValue: '16:9',
      hidden: ({ parent }: any) => {
        if (parent?.imageOrientation !== 'landscape') {
          return true
        }
        if (parent?.layout !== 'center') {
          return true
        }
        return false
      },
    },
    {
      name: 'centerImageLayout',
      title: 'Image alignment',
      type: 'string',
      options: {
        list: [
          ...portraitLayoutOptions.map(option => ({
            title: capitalizeFirstLetter(option.value),
            value: option.value,
          })),
        ],
      },
      initialValue: 'left',
      components: {
        input: (props: StringInputProps) =>
          OptionButtons(props, portraitLayoutOptions),
      },
      hidden: ({ parent }: any) => {
        return parent?.imageOrientation !== 'portrait'
      },
    },
    {
      name: 'centerCaptionAlignment',
      title: 'Vertical caption alignment',
      type: 'string',
      initialValue: 'top',
      options: {
        list: [
          ...textVerticalAlignmentOptions.map(option => ({
            title: capitalizeFirstLetter(option.value),
            value: option.value,
          })),
        ],
        layout: 'radio',
      },
      components: {
        input: (props: StringInputProps) =>
          OptionButtons(props, textVerticalAlignmentOptions),
      },
      hidden: ({ parent }: any) => {
        return parent?.imageOrientation !== 'portrait'
      },
    },
    {
      name: 'enableImageZoom',
      title: 'Enable image zoom',
      type: 'boolean',
      hidden: () => true, //hide it until upgrade is done then work more on this feature
    },
  ],

  preview: {
    select: {
      imageUrl: 'image.asset.url',
      alt: 'image.alt',
      caption: 'caption',
    },
    prepare({
      imageUrl,
      caption,
      alt,
    }: {
      imageUrl: string
      alt: string
      caption: string
    }) {
      return {
        title: alt,
        subtitle: caption,
        media: <img src={imageUrl} alt={alt} style={{ height: '100%' }} />,
      }
    },
  },
}
