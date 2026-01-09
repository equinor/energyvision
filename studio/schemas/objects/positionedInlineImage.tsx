/* eslint-disable import/no-unresolved */

import { TbFloatCenter, TbFloatLeft, TbFloatRight } from 'react-icons/tb'
import { set, useFormValue, type StringInputProps} from 'sanity'
import { InlineImageFullWidth } from '../../icons'
import type { ImageWithAlt } from './imageWithAlt'
import { useCallback } from 'react'
import { Card, Flex, Radio, Text } from '@sanity/ui'
import { FaImage } from "react-icons/fa";
import { BsFileImageFill } from "react-icons/bs";
import { MdImage } from "react-icons/md";
import { PiTextAlignJustifyBold } from "react-icons/pi";
import { LuText } from 'react-icons/lu'
import { RadioIconSelector } from '../components'
import { RxTextAlignTop,RxTextAlignCenter, RxTextAlignBottom  } from "react-icons/rx";

const contentAlignmentOptions = [
  { value: 'left', icon: <RxTextAlignTop size={24} /> },
  { value: 'center', icon: <RxTextAlignCenter size={24} /> },
  { value: 'right', icon: <RxTextAlignBottom size={24} /> },
]

type LayoutInputProps = {
  options: any[]
} & StringInputProps

export const OrientationInput = (props: LayoutInputProps) => {
  const { onChange, schemaType, value = '', path } = props

  const getOrientationIcon = (orientation:string) => {
    switch (orientation) {
      case 'square':
        return <MdImage size={33} /> 
      case 'portrait':
        return <BsFileImageFill size={33} />      
      default:
        return <FaImage size={33} />   
    }
  }

  const handleChange = useCallback(
    (event: any) => {
      const nextValue = event.currentTarget.value
      onChange(set(nextValue))
    },
    [onChange],
  )

  return (
    <Flex gap={2}>
      {schemaType?.options?.list?.map((option: any) => {
        //@ts-ignore
        return (
          <Card
            key={option.value}
            paddingY={2}
            paddingX={3}
            radius={2}
            shadow={1}
            width="fit-content"
          >
            <Flex
              direction='row'
              align='center'
              width='100%'
              height='stretch'
              gap={2}
            >
              <Radio
                checked={value === option.value}
                name={option.value}
                id={option.value}
                onChange={handleChange}
                value={option.value}
              />
              <Flex gap={2} direction="column" align='center' width='100%'>
                  {getOrientationIcon(option?.value)}
                <Text as='label' htmlFor={option.value} size={1}>
                  {option.title}
                </Text>
              </Flex>
            </Flex>
          </Card>
        )
      })}
    </Flex>
  )
}

export const ImageCaptionLayoutInput = (props: LayoutInputProps) => {
  const { onChange, schemaType, value = '' } = props

  const handleChange = useCallback(
    (event: any) => {
      const nextValue = event.currentTarget.value
      onChange(set(nextValue))
    },
    [onChange],
  )

  return (
    <Flex gap={2}>
      {schemaType?.options?.list?.map((option: any) => {
        //@ts-ignore
        return (
          <Card
            key={option.value}
            paddingY={2}
            paddingX={3}
            radius={2}
            shadow={1}
            width="fit-content"
          >
            <Flex
              direction='row'
              align='center'
              width='100%'
              height='stretch'
              gap={2}
            >
              <Radio
                checked={value === option.value}
                name={option.value}
                id={option.value}
                onChange={handleChange}
                value={option.value}
              />
              <Flex gap={2} direction="column" align='center' width='100%'>
                 <div style={{
                    display: 'flex',
                    flexDirection: option?.value === 'left' ? 'row' : 'row-reverse',
                  }}>
                    {/*@ts-ignore:todo*/}
                    <MdImage size={20} />
                    {/*@ts-ignore:todo*/}
                    <LuText size={20} />
                 </div>
                <Text as='label' htmlFor={option.value} size={1}>
                  {option.title}
                </Text>
              </Flex>
            </Flex>
          </Card>
        )
      })}
    </Flex>
  )
}

export const LayoutInput = (props: LayoutInputProps) => {
  const { onChange, schemaType, value = '', path } = props

  const parentPath = path.slice(0, -1) // Remove the last segment to get parent path
  const selectedImageOrientationField = useFormValue([...parentPath, 'imageOrientation'])
  const validOptions = {
    square: ["right", "left"],
    landscape: ["right", "left","full", "center"],
  }

  const getAlignmentIcon = (alignment:string) => {
    switch (alignment) {
      case 'full':
        return <InlineImageFullWidth /> 
      case 'center':
        return <PiTextAlignJustifyBold size={33} />    
      case 'right':
        return <TbFloatRight size={33} />   
      default:
        return <TbFloatLeft size={33} />   
    }
  }
  //@ts-ignore
  const validList = validOptions[String(selectedImageOrientationField) ?? "landscape"] 

  const filteredOptions = schemaType?.options?.list?.filter((option) => validList.includes(option?.value))
 
  const handleChange = useCallback(
    (event: any) => {
      const nextValue = event.currentTarget.value
      onChange(set(nextValue))
    },
    [onChange],
  )

  return (
    <Flex gap={2}>
      {filteredOptions?.map((option: any) => {
        //@ts-ignore
        return (
          <Card
            key={option.value}
            paddingY={2}
            paddingX={3}
            radius={2}
            shadow={1}
            width="fit-content"
          >
            <Flex
              direction='row'
              align='center'
              width='100%'
              height='stretch'
              gap={2}
            >
              <Radio
                checked={value === option.value}
                name={option.value}
                id={option.value}
                onChange={handleChange}
                value={option.value}
              />
              <Flex gap={2} direction="column" align='center' width='100%'>
                  {getAlignmentIcon(option?.value)}
                <Text as='label' htmlFor={option.value} size={1}>
                  {option.title}
                </Text>
              </Flex>
            </Flex>
          </Card>
        )
      })}
    </Flex>
  )
}

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
          { title: 'Portrait', value: 'portrait' },
          { title: 'Landscape', value: 'landscape' },
          { title: 'Square', value: 'square' },
        ],
        layout: 'radio',
      },
      initialValue: 'landscape',
      components: {
        input: OrientationInput,
      },
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Full', value: 'full' },
          { title: 'Aligned with text', value: 'center' },
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      components: {
        input: LayoutInput,
      },
      hidden: ({ parent }: any) => {
        return parent?.imageOrientation === 'portrait'
      },
    },
    {
      name: 'centerImageLayout',
      title: 'Image alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      components: {
        input: ImageCaptionLayoutInput,
      },
      hidden: ({ parent }: any) => {
        return parent?.imageOrientation !== 'portrait'
      },
    },
    {
          name: 'centerCaptionAlignment',
          title: 'Caption vertical alignment',
          type: 'string',
          initialValue: 'left',
          components: {
            //@ts-ignore
            input: function (props: ObjectInputProps) {
              const { value, onChange, schemaType } = props
              const { initialValue } = schemaType
              return (
                <RadioIconSelector
                  name='centerCaptionAlignment'
                  options={contentAlignmentOptions}
                  defaultValue={String(initialValue) ?? 'left'}
                  currentValue={String(value)}
                  onChange={onChange}
                />
              )
            },
          },
        },
    {
      name: 'enableImageZoom',
      title: 'Enable image zoom',
      type: 'boolean',
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
