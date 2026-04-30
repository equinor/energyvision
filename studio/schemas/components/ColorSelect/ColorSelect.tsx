import { Card, Flex, Select, Stack } from '@sanity/ui'
import { useCallback } from 'react'
import type { StringInputProps } from 'sanity'
import { set } from 'sanity'
import styled from 'styled-components'
import type { Color } from '../../defaultColors'
import { defaultBackgroundColors } from '../../defaultColors'

export type ColorValueField = 'key' | 'title' | 'value'

type ColorSelectOptions = {
  colors?: Color[]
  colorValueField?: ColorValueField
}

type ColorSelectProps = StringInputProps & {
  schemaType: StringInputProps['schemaType'] & {
    options?: ColorSelectOptions
  }
}

const Square = styled.div`
  display: inline-block;
  border-radius: 0.375rem;
  padding: 1px;
  border: solid 1px var(--card-hairline-soft-color);
`

const InnerSquare = styled.div<{ $color: string }>`
  background-color: ${({ $color }) => $color};
  padding: 15px;
  border-radius: 0.25rem;
`

export const getColorOptionValue = (
  color: Color,
  valueField: ColorValueField = 'key',
) => color[valueField]

export const getSelectableColors = (
  colors: Color[] = defaultBackgroundColors,
) => colors.filter(color => !color.onlyTextColor)

export const ColorSelect = ({
  value,
  onChange,
  schemaType,
}: ColorSelectProps) => {
  const colors = getSelectableColors(schemaType.options?.colors)
  const valueField = schemaType.options?.colorValueField ?? 'key'
  const selectedColor =
    colors.find(color => getColorOptionValue(color, valueField) === value) ??
    colors[0]

  const handleSelect = useCallback(
    (event: any) => {
      const nextValue = event.currentTarget.value

      if (nextValue === value) return

      onChange(set(nextValue))
    },
    [onChange, value],
  )

  return (
    <Stack space={3}>
      <Card padding={2}>
        <Flex align={'center'} gap={3}>
          <Square>
            <InnerSquare
              $color={selectedColor?.value ?? defaultBackgroundColors[0].value}
            />
          </Square>
          <Flex flex={1} direction={'column'} gap={2}>
            <Select
              aria-label={schemaType.title ?? 'Select color'}
              onChange={handleSelect}
              value={value ?? getColorOptionValue(colors[0], valueField)}
            >
              {colors.map(color => {
                const optionValue = getColorOptionValue(color, valueField)

                return (
                  <option key={optionValue} value={optionValue}>
                    {color.title}
                  </option>
                )
              })}
            </Select>
          </Flex>
        </Flex>
      </Card>
    </Stack>
  )
}
