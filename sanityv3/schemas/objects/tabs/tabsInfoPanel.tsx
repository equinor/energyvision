import { Card, Flex, Radio, Text } from '@sanity/ui'
import { useCallback } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { type PortableTextBlock, type Role, type Rule, type StringInputProps, set, useCurrentUser } from 'sanity'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import { configureBlockContent } from '../../editors'
import { backgroundPosition } from '../commonFields/commonFields'

const titleContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
  internalLink: false,
  externalLink: false,
  lists: false,
})
const blockContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

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
      ? roles.some((userRole: Role) => userRole.name === 'designer' || userRole.name === 'developer')
      : true
  })

  const handleChange = useCallback(
    (event: any) => {
      const nextValue = event.currentTarget.value
      onChange(set(nextValue))
    },
    [onChange],
  )

  return (
    <Flex gap={2}>
      {options?.map((option: any) => {
        return (
          <Card key={option.value} paddingY={2} paddingX={3} radius={2}>
            <Flex direction="row" align="center" gap={2}>
              <Radio
                checked={value === option.value}
                name={option.value}
                id={option.value}
                onChange={handleChange}
                value={option.value}
              />
              <Text as="label" htmlFor={option.value}>
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
    {
      name: 'imageVariant',
      title: 'Select image variant',
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
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    backgroundPosition(),
    {
      name: 'title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [titleContentType],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => (!value ? 'A title is recommended' : true)).warning(),
    },
    {
      name: 'text',
      title: 'Content',
      type: 'array',
      of: [blockContentType],
    },
    {
      name: 'action',
      type: 'array',
      title: 'CTA',
      of: [
        { type: 'linkSelector', title: 'Link' },
        { type: 'downloadableImage', title: 'Call to action: Download image' },
        { type: 'downloadableFile', title: 'Call to action: Download file' },
      ],
      validation: (Rule: Rule) => Rule.max(1).error('Only 1'),
    },
    {
      name: 'keyInfoTitle',
      title: 'Key figures title',
      description:
        'Used for context for screen readers.Not visible and optional, but if empty then textsnippet for Key figures will be used',
      type: 'string',
    },
    {
      type: 'array',
      name: 'keyInfo',
      description: 'Up to 4 key information bits',
      title: 'Summary keys',
      of: [
        {
          name: 'keyInfo',
          title: 'Summary key',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'keyFigure',
              title: 'Key figure',
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
      ].filter((e) => e),
      validation: (Rule: Rule) => Rule.max(4),
    },
  ],
}
