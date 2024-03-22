import { Box, Heading, Inline, Text } from '@sanity/ui'
import { ReactNode, useCallback, useState } from 'react'
import { PatchEvent, set } from 'sanity'
import styled from 'styled-components'

type StyledBoxProps = {
  children: ReactNode
}

const StyledBox = ({ children }: StyledBoxProps) => (
  <Box
    padding={[2, 2, 3, 3]}
    display="flex"
    style={{
      outline: '1px solid #cad1dc',
      gap: '10px',
      cursor: 'pointer',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {children}
  </Box>
)

const StyledRadio = styled.input`
  opacity: 0;
  position: absolute;

  &:focus + label {
    outline: #2276fc auto 1px;
    border-radius: 0;
  }

  &:checked + label > div {
    background-color: rgba(34, 118, 252, 0.15);
  }
`

type RadioIconSelectorOption = {
  value: string
  title?: string
  icon: () => JSX.Element
}

type RadioIconSelectorProps = {
  name: string
  options: RadioIconSelectorOption[]
  currentValue: string
  defaultValue: string
  onChange?: any
  /** custom handler */
  customOnChange?: any
}

export const RadioIconSelector = ({
  name,
  options,
  currentValue,
  defaultValue,
  onChange,
  customOnChange,
}: RadioIconSelectorProps) => {
  const [value, setValue] = useState(currentValue || defaultValue)

  const handleChange = useCallback(
    (event: any) => {
      const newValue = event.currentTarget.value
      setValue(newValue)
      if (customOnChange) {
        customOnChange(newValue)
      } else {
        onChange(PatchEvent.from(set(String(newValue))))
      }
    },
    [onChange],
  )

  return (
    <Inline space={3}>
      {options.map((option: RadioIconSelectorOption) => (
        <div key={`container_${option.value}`}>
          <StyledRadio
            type="radio"
            checked={value === option.value}
            onChange={handleChange}
            name={name}
            value={option.value}
            id={`id_${option.value.replace(/ /g, '')}`}
          />
          <label htmlFor={`id_${option.value.replace(/ /g, '')}`} className="wrapper">
            <StyledBox>
              <Box style={{ width: 'auto', height: '100%', padding: '0' }}>{option.icon()}</Box>
              {option?.title && (
                <Heading size={1} style={{ width: '100%' }}>
                  {option?.title}
                </Heading>
              )}
            </StyledBox>
          </label>
        </div>
      ))}
    </Inline>
  )
}
