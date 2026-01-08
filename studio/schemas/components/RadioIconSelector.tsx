import { useCallback, useState } from 'react'
import { PatchEvent, set } from 'sanity'
import styled from 'styled-components'

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

type RadioIconSelectorOption = {
  value: string
  icon: () => JSX.Element
}

type RadioIconSelectorProps = {
  name: string
  options: RadioIconSelectorOption[]
  currentValue: string
  defaultValue: string
  onChange: any
}

export const RadioIconSelector = ({
  name,
  options,
  currentValue,
  defaultValue,
  onChange,
}: RadioIconSelectorProps) => {
  const [value, setValue] = useState(currentValue || defaultValue)

  const handleChange = useCallback(
    (event: any) => {
      const newValue = event.currentTarget.value
      setValue(newValue)
      onChange(PatchEvent.from(set(newValue)))
    },
    [onChange],
  )

  return (
    <div
      style={{
        display: 'grid',
        gridAutoColumns: 'minmax(0, 80px)',
        gridAutoFlow: 'column',
        gap: '8px',
        gridTemplateRows: 'repeat(1, minmax(0, min-content))',
      }}
    >
      {options.map((option: RadioIconSelectorOption) => {
        return (
          <div key={`container_${option.value}`}>
            <StyledRadio
              type='radio'
              checked={value === option.value}
              onChange={handleChange}
              name={name}
              value={option.value}
              id={`id_${option.value.replace(/ /g, '')}`}
            />
            <label htmlFor={`id_${option.value.replace(/ /g, '')}`}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  justifyContent: 'center',
                  height: 'fit-content',
                  alignItems: 'center',
                  outline: '1px solid #cad1dc',
                  cursor: 'pointer',

                  aspectRatio: '1',
                }}
              >
                <div
                  style={{
                    maxWidth: '33px',
                    maxHeight: '33px',
                  }}
                >
                  {typeof option.icon === 'function'
                    ? option.icon()
                    : option.icon}
                </div>
                <p style={{ margin: 0 }}>{option.value}</p>
              </div>
            </label>
          </div>
        )
      })}
    </div>
  )
}
