/* eslint-disable import/no-unresolved */
// Important items to allow form fields to work properly and patch the dataset.
import { PatchEvent, set } from 'part:@sanity/form-builder/patch-event'
import FormField from 'part:@sanity/components/formfields/default'
import { Box, Inline } from '@sanity/ui'
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

// @TODO: Refactor this to a more generic component in line with positionedInlineImage?

type Props = {
  children: React.ReactNode
}

const StyledBox = ({ children }: Props) => (
  <Box padding={[2, 2, 3, 3]} display="flex" style={{ outline: '1px solid #cad1dc', cursor: 'pointer' }}>
    {children}
  </Box>
)

type ImageSizeSelectorProps = {
  value: 'full' | 'small'
  type: { title: 'string'; description: string }
  onChange: any
}

const StyledRadio = styled.input`
  opacity: 0;
  position: absolute;

  &:focus + label {
    outline: #2276fc auto 1px;
    border-radius: 0;
  }

  &:checked + label div {
    background-color: rgba(34, 118, 252, 0.15);
  }
`

export const ImageSizeSelector = function Layout({
  value: defaultValue = 'full',
  type,
  onChange,
}: ImageSizeSelectorProps) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = useCallback((event) => {
    const newValue = event.currentTarget.value
    setValue(newValue)
    onChange(PatchEvent.from(set(newValue)))
  }, [])

  return (
    <FormField label={type.title} description={type.description}>
      <Inline space={3}>
        <div>
          <StyledRadio
            type="radio"
            checked={value === 'full'}
            onChange={handleChange}
            name="imageSize"
            value="full"
            id="full"
          />
          <label htmlFor="full">
            <StyledBox>
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby="fullSizeTitle"
              >
                <title id="fullSizeTitle">Full size</title>

                <path d="M43 15H27" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M43 21H27" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M43 27H27" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M43 33H27" stroke="#3D3D3D" strokeWidth="2" />
                <path
                  d="M23.5 14H4.5C4.22386 14 4 14.4477 4 15V33C4 33.5523 4.22386 34 4.5 34H23.5C23.7761 34 24 33.5523 24 33V15C24 14.4477 23.7761 14 23.5 14Z"
                  fill="#3D3D3D"
                />
              </svg>
            </StyledBox>
          </label>
        </div>
        <div>
          <StyledRadio
            type="radio"
            checked={value === 'small'}
            onChange={handleChange}
            name="imageSize"
            value="small"
            id="small"
          />
          <label htmlFor="small">
            <StyledBox>
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby="smallSizeTitle"
              >
                <title id="smallSizeTitle">Small size</title>
                <path d="M43 15H27" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M43 21H27" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M43 27H27" stroke="#3D3D3D" strokeWidth="2" />
                <path d="M43 33H27" stroke="#3D3D3D" strokeWidth="2" />
                <path
                  d="M18.7 18H7.3C7.13432 18 7 18.2686 7 18.6V29.4C7 29.7314 7.13432 30 7.3 30H18.7C18.8657 30 19 29.7314 19 29.4V18.6C19 18.2686 18.8657 18 18.7 18Z"
                  fill="#3D3D3D"
                />
              </svg>
            </StyledBox>
          </label>
        </div>
      </Inline>
    </FormField>
  )
}
