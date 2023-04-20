import { Card, Flex, Stack } from '@sanity/ui'
import { useCallback } from 'react'
import { ObjectInputProps, set } from 'sanity'
import styled from 'styled-components'
import { defaultColors } from './defaultColors'

const Circle = styled.div<{ active: boolean }>`
  display: inline-block;
  border: solid 2px ${({ active }) => (active ? 'var(--card-focus-ring-color)' : 'transparent')};
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
`

const InnerCircle = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  border: 1px solid var(--card-hairline-soft-color);
  padding: 15px;
  border-radius: 50%;
`

export type ColorSelectorValue = {
  title: string
  value: string
}

type ColorCircleProps = {
  color: ColorSelectorValue
  active: boolean
  onClickHandler: (val: ColorSelectorValue) => void
}

const ColorCircle = ({ color, active, onClickHandler }: ColorCircleProps) => (
  <Card paddingY={1}>
    <Circle active={active} onClick={() => onClickHandler(color)}>
      <InnerCircle color={color.value} />
    </Circle>
  </Card>
)

type ColorSelectorProps = ObjectInputProps & {
  list: ColorSelectorValue[]
  value: ColorSelectorValue
}

export const ColorSelector = ({ value, onChange, list = defaultColors }: ColorSelectorProps) => {
  const handleSelect = useCallback(
    (selected: ColorSelectorValue) => {
      if (selected === value) return

      onChange(set(selected))
    },
    [onChange, value],
  )

  return (
    <Stack space={3}>
      {list && (
        <Card
          style={{
            transform: 'translateX(-4px)',
          }}
        >
          <Flex direction={'row'} wrap={'wrap'}>
            {list.map((colorItem) => {
              return (
                <ColorCircle
                  key={colorItem.value}
                  color={colorItem}
                  active={colorItem.value === value?.value}
                  onClickHandler={handleSelect}
                />
              )
            })}
          </Flex>
        </Card>
      )}
    </Stack>
  )
}

export default ColorSelector
