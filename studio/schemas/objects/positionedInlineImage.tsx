/* eslint-disable import/no-unresolved */
import React from 'react'
import { SchemaType } from '../../types'

// Important items to allow form fields to work properly and patch the dataset.
// eslint-disable-next-line import/no-unresolved
import { PatchEvent, set } from 'part:@sanity/form-builder/patch-event'
import FormField from 'part:@sanity/components/formfields/default'
import { Box, Inline, Radio } from '@sanity/ui'

const LayoutInput = function Layout({ value: defaultValue = 'full', type, onChange }) {
  const [value, setValue] = React.useState(defaultValue)

  const handleChange = React.useCallback((event) => {
    const newValue = event.currentTarget.value
    console.log('new value', newValue)
    setValue(newValue)
    onChange(PatchEvent.from(set(newValue)))
  }, [])

  return (
    <FormField label={type.title} description={type.description}>
      <Inline space={3}>
        <label htmlFor="first">
          <Box padding={[3, 3, 4, 4]} display="flex" style={{ outline: '1px solid #cad1dc', alignItems: 'center' }}>
            <Radio checked={value === 'full'} onChange={handleChange} name="layout" value="full" id="first" />

            <span aria-label="Full width">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 9H8" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M40 39H8" stroke="#3D3D3D" strokeWidth="2" />
                <path
                  d="M42.05 14H5.95C5.42533 14 5 14.4477 5 15V33C5 33.5523 5.42533 34 5.95 34H42.05C42.5747 34 43 33.5523 43 33V15C43 14.4477 42.5747 14 42.05 14Z"
                  fill="#3D3D3D"
                />
              </svg>
            </span>
          </Box>
        </label>
        <label htmlFor="second">
          <Box padding={[3, 3, 4, 4]} display="flex" style={{ outline: '1px solid #cad1dc', alignItems: 'center' }}>
            <Radio checked={value === 'left'} onChange={handleChange} name="layout" value="left" id="second" />

            <span aria-label="Left aligned">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43 9H8" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M43 15H27" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M43 21H27" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M43 27H27" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M43 33H27" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M43 39H8" stroke="#3D3D3D" strokeWidth="2" />
                <path
                  d="M23.525 14H5.475C5.21267 14 5 14.4477 5 15V33C5 33.5523 5.21267 34 5.475 34H23.525C23.7873 34 24 33.5523 24 33V15C24 14.4477 23.7873 14 23.525 14Z"
                  fill="#3D3D3D"
                />
              </svg>
            </span>
          </Box>
        </label>
        <label htmlFor="third">
          <Box padding={[3, 3, 4, 4]} display="flex" style={{ outline: '1px solid #cad1dc', alignItems: 'center' }}>
            <Radio checked={value === 'right'} onChange={handleChange} name="layout" value="right" id="third" />

            <span aria-label="Right aligned">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 9H5" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M21 15H5" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M21 21H5" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M21 27H5" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M21 33H5" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M40 39H5" stroke="#3D3D3D" strokeWidth="2" />
                <path
                  d="M42.525 14H24.475C24.2127 14 24 14.4477 24 15V33C24 33.5523 24.2127 34 24.475 34H42.525C42.7873 34 43 33.5523 43 33V15C43 14.4477 42.7873 14 42.525 14Z"
                  fill="#3D3D3D"
                />
              </svg>
            </span>
          </Box>
        </label>
      </Inline>
    </FormField>
  )
}
type PreviewProps = {
  imageUrl: string
  alt: string
  caption: string
}

export default {
  name: 'positionedInlineImage',
  title: '🚧 Image',
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
      type: 'string',
      title: 'Attribution',
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      inputComponent: LayoutInput,
    },
  ],

  preview: {
    select: {
      imageUrl: 'image.asset.url',
      alt: 'image.alt',
      caption: 'caption',
    },
    prepare({ imageUrl, caption, alt }: PreviewProps): SchemaType.Preview {
      return {
        title: alt,
        subtitle: caption,
        media: <img src={imageUrl} alt={alt} style={{ height: '100%' }} />,
      }
    },
  },
}
