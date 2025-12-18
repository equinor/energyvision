import { Card, Flex, Grid, Radio, Text } from '@sanity/ui'
import { useCallback } from 'react'
import { type Rule, type StringInputProps, set } from 'sanity'
import { filterByRoute } from '../../../helpers/referenceFilters'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import { configureBlockContent } from '../../editors'
import routes from '../../routes'

const titleVariantOptions = {
  h2: false,
  h3: false,
  internalLink: false,
  externalLink: false,
  lists: false,
}

export const title = {
  title: 'Title',
  name: 'title',
  type: 'array',
  components: {
    input: CompactBlockEditor,
  },
  of: [configureBlockContent(titleVariantOptions)],
  validation: (Rule: Rule) => Rule.required().warning('In most cases you should add a title'),
}
const ingressStylesOptions = {
  lists: false,
  h2: false,
  h3: false,
  h4: false,
  smallText: true,
}

export const ingress = {
  name: 'ingress',
  title: 'Ingress',
  type: 'array',
  of: [configureBlockContent(ingressStylesOptions)],
}

export const viewAllLink = {
  name: 'viewAllLink',
  title: 'View all internal link',
  description: 'Use this if you want a "View all ..." link to e.g. all news',
  type: 'reference',
  to: routes,
  options: {
    filter: filterByRoute,
  },
}

export const viewAllLinkLabel = {
  name: 'viewAllLinkLabel',
  title: 'Label for the View all link',
  type: 'string',
}

export const background = {
  title: 'Background',
  description: 'Pick a colour for the background. Default is white.',
  name: 'background',
  type: 'colorlist',
  fieldset: 'design',
}

export const theme = {
  title: 'Theme',
  description: 'Theme consisting of an background color and a foreground color for cards or similar',
  name: 'theme',
  type: 'themeSelector',
  fieldset: 'design',
}

type LayoutGridInputProps = {
  options: any[]
} & StringInputProps

export const LayoutGridInput = (props: LayoutGridInputProps) => {
  const { onChange, schemaType, value = '' } = props

  const handleChange = useCallback(
    (event: any) => {
      const nextValue = event.currentTarget.value
      onChange(set(nextValue))
    },
    [onChange],
  )

  return (
    <Grid columns={schemaType?.options?.list?.length} rows={1} gap={2}>
      {schemaType?.options?.list?.map((option: any) => {
        return (
          <Card key={option.value} paddingY={2} paddingX={3} radius={2} shadow={1}>
            <Flex direction="row" align="center" width="100%" height="stretch" gap={2}>
              <Radio
                checked={value === option.value}
                name={option.value}
                id={option.value}
                onChange={handleChange}
                value={option.value}
              />
              <Flex gap={2} width="100%" align="center">
                <Text as="label" htmlFor={option.value}>
                  {option.title}
                </Text>
                <div
                  style={{
                    marginLeft: 'auto',
                    border: '1px solid lightgrey',
                    height: '33px',
                    width: '33px',
                    padding: '4px',
                    borderRadius: '5px',
                    display: 'flex',
                    gap: '5px',
                  }}
                >
                  <div
                    style={{
                      width: '2px',
                      height: '100%',
                      backgroundColor: option.value === 'sm' ? 'black' : 'lightgrey',
                    }}
                  />
                  <div
                    style={{
                      width: '2px',
                      height: '100%',
                      backgroundColor: option.value === 'md' ? 'black' : 'lightgrey',
                    }}
                  />
                  <div
                    style={{
                      width: '2px',
                      height: '100%',
                      backgroundColor: option.value === 'lg' ? 'black' : 'lightgrey',
                      marginRight: '2px',
                    }}
                  />
                  <div
                    style={{
                      width: '2px',
                      height: '100%',
                      backgroundColor: option.value === 'lg' ? 'black' : 'lightgrey',
                      marginLeft: '2px',
                    }}
                  />
                  <div
                    style={{
                      width: '2px',
                      height: '100%',
                      backgroundColor: option.value === 'md' ? 'black' : 'lightgrey',
                    }}
                  />
                  <div
                    style={{
                      width: '2px',
                      height: '100%',
                      backgroundColor: option.value === 'sm' ? 'black' : 'lightgrey',
                    }}
                  />
                </div>
              </Flex>
            </Flex>
          </Card>
        )
      })}
    </Grid>
  )
}

export const layoutGrid = {
  title: 'Layout grid',
  name: 'layoutGrid',
  type: 'string',
  description: 'Select content grid column',
  options: {
    list: [
      { title: 'Third outer', value: 'sm' },
      { title: 'Second outer', value: 'md' },
      { title: 'Innermost', value: 'lg' },
    ],
  },
  initialValue: 'lg',
  fieldset: 'design',
  components: {
    input: LayoutGridInput,
  },
}
export const gridColumns = {
  title: 'Number of grid columns',
  name: 'gridColumns',
  type: 'string',
  description: 'Select number of grid column. Mobile it will only be 1 column.',
  options: {
    list: [
      { title: '2', value: '2' },
      { title: '3', value: '3' },
      { title: '4', value: '4' },
    ],
  },
  initialValue: '3',
  hidden: ({ parent }: DocumentType) => {
    return parent?.layoutGrid === 'lg'
  },
  fieldset: 'design',
}
export const layoutDirection = {
  title: 'Layout direction',
  name: 'layoutDirection',
  type: 'string',
  description: 'Select layout direction. ',
  options: {
    list: [
      { title: 'Stack in column', value: 'col' },
      { title: 'Stack in row', value: 'row' },
    ],
    layout: 'radio',
  },
  fieldset: 'design',
  initialValue: 'col',
}
