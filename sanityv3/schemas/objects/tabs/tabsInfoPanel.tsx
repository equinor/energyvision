import { defineField, PortableTextBlock, Role, Rule, set, StringInputProps, useCurrentUser } from 'sanity'
import { configureBlockContent } from '../../editors'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import { useCallback, useState } from 'react'
import { Badge, Card, Flex, Grid, Radio, Stack, Text } from '@sanity/ui'

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

  const user = useCurrentUser()
  const [error, setError] = useState(false)

  const handleChange = useCallback(
    (event: any) => {
      const nextValue = event.currentTarget.value
      if (nextValue === 'backgroundImage') {
        const isDesigner = user && user.roles.some((userRole: Role) => userRole.name === 'designer')
        if (isDesigner) {
          onChange(set(nextValue))
        } else {
          setError(true)
        }
      } else if (nextValue === 'sideImage') {
        if (error) {
          setError(false)
        }
        onChange(set(nextValue))
      }
    },
    [onChange, user, error],
  )

  return (
    <Stack space={3}>
      <Grid columns={schemaType?.options?.list?.length} rows={1} gap={2}>
        {schemaType?.options?.list?.map((option: any) => {
          return (
            <Card key={option.value} paddingY={2} paddingX={3} radius={2} shadow={1}>
              <Flex direction="row" align="flex-start" gap={2}>
                <Radio
                  checked={value === option.value}
                  name={option.value}
                  id={option.value}
                  onChange={handleChange}
                  value={option.value}
                />
                <Flex direction="column" align={'flex-start'} gap={2}>
                  <Text as="label" htmlFor={option.value}>
                    {option.title}
                  </Text>
                  {option?.description && (
                    <Badge tone="primary" fontSize={1}>
                      {option?.description}
                    </Badge>
                  )}
                </Flex>
              </Flex>
            </Card>
          )
        })}
      </Grid>
      {error && (
        <Card padding={[2]} radius={2} shadow={1} tone="caution">
          <Text align="center" size={[1]}>
            Cannot perform change, missing designer role!
          </Text>
        </Card>
      )}
    </Stack>
  )
}

export default {
  title: 'Information Panel',
  type: 'object',
  name: 'tabsInfoPanel',
  fields: [
    defineField({
      name: 'image',
      title: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageVariant',
      title: 'Select image variant',
      description: 'Use same image variant for all information panels.',
      type: 'string',
      options: {
        list: [
          { title: 'Background image', description: 'Designer only', value: 'backgroundImage' },
          { title: 'Side image', value: 'sideImage' },
        ],
        layout: 'radio',
      },
      initialValue: 'sideImage',
      components: {
        input: ImageVariantInput,
      },
    }),
    defineField({
      name: 'title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [titleContentType],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => (!value ? 'A title is recommended' : true)).warning(),
    }),
    defineField({
      name: 'text',
      title: 'Text content',
      type: 'array',
      of: [blockContentType],
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
    }),
    defineField({
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
              title: 'Key figure highlighted',
              type: 'string',
            },
            {
              name: 'explanation',
              title: 'Short explanation or unit',
              type: 'text',
            },
          ],
        },
      ].filter((e) => e),
      validation: (Rule: Rule) => Rule.max(4),
    }),
  ],
}
