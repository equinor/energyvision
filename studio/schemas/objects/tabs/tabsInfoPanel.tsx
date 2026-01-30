import { Card, Flex, Radio, Text } from '@sanity/ui'
import { useCallback } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import {
  defineField,
  type PortableTextBlock,
  type Role,
  type Rule,
  type StringInputProps,
  set,
  useCurrentUser,
} from 'sanity'
import { CompactBlockEditor } from '../../components/CompactBlockEditor'
import { configureBlockContent } from '../../editors'
import { backgroundPosition } from '../commonFields/commonFields'

type ImageVariantInputProps = {
  options: any[]
} & StringInputProps

export const ImageVariantInput = (props: ImageVariantInputProps) => {
  const { onChange, schemaType, value = '' } = props

  //get the role of the current user
  //@ts-ignore CurrentUser has roles in types...
  const { roles } = useCurrentUser()

  const options = schemaType?.options?.list?.filter((option: any) => {
    return option.value === 'backgroundImage'
      ? roles.some(
          (userRole: Role) =>
            userRole.name === 'designer' || userRole.name === 'developer',
        )
      : true
  })

  const handleChange = useCallback(
    (event: any) => {
      onChange(set(event.currentTarget.value))
    },
    [onChange],
  )

  return (
    <Flex gap={2}>
      {options?.map((option: any) => {
        return (
          <Card key={option.value} paddingY={2} paddingX={3} radius={2}>
            <Flex direction='row' align='center' gap={2}>
              <Radio
                checked={value === option.value}
                name={option.value}
                id={option.value}
                onChange={handleChange}
                value={option.value}
              />
              <Text as='label' htmlFor={option.value}>
                {option.title}
              </Text>
            </Flex>
          </Card>
        )
      })}
    </Flex>
  )
}

export default {
  title: 'Information Panel',
  type: 'object',
  name: 'tabsInfoPanel',
  fields: [
    defineField({
      name: 'imageVariant',
      title: 'Select image variant',
      description: 'Use same image variant for all information panels.',
      type: 'string',
      options: {
        list: [
          {
            title: 'Background image',
            value: 'backgroundImage',
          },
          { title: 'Side image', value: 'sideImage' },
          { title: 'Banner image', value: 'bannerImage' },
        ],
        layout: 'radio',
      },
      initialValue: 'sideImage',
      components: {
        input: ImageVariantInput,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    backgroundPosition(),
    defineField({
      name: 'title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'titleH2' })],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) =>
          !value ? 'A title is recommended' : true,
        ).warning(),
    }),
    defineField({
      name: 'text',
      title: 'Content',
      type: 'array',
      of: [configureBlockContent({ variant: 'simpleBlock' })],
    }),
    defineField({
      name: 'action',
      type: 'array',
      title: 'CTA',
      of: [
        { type: 'linkSelector', title: 'Link' },
        { type: 'downloadableImage', title: 'Call to action: Download image' },
        { type: 'downloadableFile', title: 'Call to action: Download file' },
      ],
      validation: (Rule: Rule) => Rule.max(1).error('Only 1'),
    }),
    {
      name: 'keyInfoTitle',
      title: 'Key figures title',
      description:
        'Used for context for screen readers.Not visible and optional, but if empty then textsnippet for Key figures will be used',
      type: 'string',
    },
    defineField({
      type: 'array',
      name: 'keyInfo',
      description: 'Up to 4 key information bits',
      title: 'Key information',
      of: [
        {
          name: 'keyInfo',
          title: 'Key figure',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'keyFigure',
              title: 'Figure',
              type: 'string',
            },
            {
              name: 'explanation',
              title: 'Short explanation or unit',
              type: 'text',
            },
          ],
          preview: {
            select: {
              title: 'title',
              keyFigure: 'keyFigure',
              explanation: 'explanation',
            },
            prepare(selection: Record<string, string | number>) {
              const { title, keyFigure, explanation } = selection
              return {
                title: `${title ?? ''} ${keyFigure ?? ''}`,
                subtitle: `${explanation ?? ''}`,
                media: HiOutlineInformationCircle,
              }
            },
          },
        },
      ].filter(e => e),
      validation: (Rule: Rule) => Rule.max(4),
    }),
  ],
}
