/* eslint-disable import/no-unresolved */

import { type PortableTextBlock, toPlainText } from '@portabletext/react'
import { Card, Flex, Radio, Text } from '@sanity/ui'
import { useCallback } from 'react'
import { BsFileImageFill } from 'react-icons/bs'
import { FaImage } from 'react-icons/fa'
import { MdImage } from 'react-icons/md'
import { type StringInputProps, set } from 'sanity'
import { configureBlockContent } from '../editors'
import { description } from './iframe/sharedIframeFields'
import type { ImageWithAlt } from './imageWithAlt'

type IconInputProps = {
  options: any[]
} & StringInputProps

export const IconInput = (props: IconInputProps) => {
  const { onChange, schemaType, value = '' } = props

  const getIcon = (orientation: string) => {
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
            width='fit-content'
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
              <Flex gap={2} direction='column' align='center' width='100%'>
                {getIcon(option?.value)}
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

export type Thumbnail = {
  _type: 'thumbnail'
  image: ImageWithAlt
  icon: string
}

export const ThumbnailDescription = () => (
  <span style={{ display: 'block', wordWrap: 'break-word' }}>
    Will be inline with text with width/height 2.2rem(approx 33px)
  </span>
)

export default {
  name: 'thumbnail',
  title: 'Thumbnail with text',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image/SVG',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: ThumbnailDescription(),
    },
    /*     {
      title: 'Icon',
      name: 'reactIcon',
      type: 'string',
      description: ThumbnailDescription(),
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
        input: IconInput,
      },
    }, */
    {
      name: 'text',
      title: 'Text content',
      type: 'array',
      of: [configureBlockContent({ variant: 'ingress' })],
    },
  ],
  preview: {
    select: {
      imageUrl: 'image.asset.url',
      text: 'text',
    },
    prepare({ imageUrl, text }: { imageUrl: string; text: PortableTextBlock }) {
      const plainTitle = toPlainText(text)
      return {
        title: plainTitle,
        subTitle: 'Thumbnail',
        media: <img src={imageUrl} alt='' style={{ height: '100%' }} />,
      }
    },
  },
}
