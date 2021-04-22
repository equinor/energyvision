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

type AlignmentSelectorProps = {
  value: 'left' | 'right'
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

export const AlignmentSelector = function Layout({ value: defaultValue = 'left', type, onChange }: AlignmentSelectorProps) {
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
            checked={value === 'left'}
            onChange={handleChange}
            name="layout"
            value="left"
            id="left"
          />
          <label htmlFor="left">
            <StyledBox>
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                aria-labelledby="leftAlignedTitle"
                fill="#3d3d3d"
                stroke="#3d3d3d"
                strokeWidth="2"
              >
                <title id="leftAlignedTitle">Left aligned</title>
                <path d="M43 15H27" />
                <path d="M43 21H27" />
                <path d="M43 27H27" />
                <path d="M43 33H27" />
                <path
                  d="M23.525 14H5.475C5.21267 14 5 14.4477 5 15V33C5 33.5523 5.21267 34 5.475 34H23.525C23.7873 34 24 33.5523 24 33V15C24 14.4477 23.7873 14 23.525 14Z"
                />
              </svg>
            </StyledBox>
          </label>
        </div>
        <div>
          <StyledRadio
            type="radio"
            checked={value === 'right'}
            onChange={handleChange}
            name="layout"
            value="right"
            id="right"
          />
          <label htmlFor="right">
            <StyledBox>
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                aria-labelledby="rightAlignedTitle"
                fill="#3d3d3d"
                stroke="#3d3d3d"
                strokeWidth="2"
              >
                <title id="rightAlignedTitle">Right aligned</title>
                <path d="M21 15H5" />
                <path d="M21 21H5" />
                <path d="M21 27H5" />
                <path d="M21 33H5" />
                <path
                  d="M42.525 14H24.475C24.2127 14 24 14.4477 24 15V33C24 33.5523 24.2127 34 24.475 34H42.525C42.7873 34 43 33.5523 43 33V15C43 14.4477 42.7873 14 42.525 14Z"
                />
              </svg>
            </StyledBox>
          </label>
        </div>
      </Inline>
    </FormField>
  )
}
