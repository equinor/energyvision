import { Box, Card, Flex, Stack, Tooltip, Text } from '@sanity/ui'
import { useCallback, useId } from 'react'
import { set } from 'sanity'
import type { ObjectInputProps } from 'sanity'
import styled from 'styled-components'
import { themeColors, getColorForTheme } from './themeColors'
import { EdsIcon } from '../../../icons'
import { text_field } from '@equinor/eds-icons'

const Circle = styled.div<{ active: boolean }>`
  display: inline-block;
  border: solid 2px ${({ active }) => (active ? 'var(--card-focus-ring-color)' : 'transparent')};
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
`

const InnerCircle = styled.div<{ color: string; fillColor?: string }>`
  display: flex;
  background-color: ${({ color }) => color};
  border: 1px solid var(--card-hairline-soft-color);
  padding: 15px;
  border-radius: 50%;
  color: ${({ fillColor }) => fillColor || 'black'};
`

export type ThemeSelectorValue = {
  title: string
  value: number
}

type ColorCircleProps = {
  color: ThemeSelectorValue
  active: boolean
  onClickHandler: (val: ThemeSelectorValue) => void
}

const ColorCircle = ({ color, active, onClickHandler }: ColorCircleProps) => {
  const { background, highlight } = getColorForTheme(color.value)
  return (
    <Card paddingY={1}>
      <Tooltip
        content={
          <Box padding={2}>
            <Text muted size={1}>
              {color.title}
            </Text>
          </Box>
        }
        fallbackPlacements={['right', 'left']}
        placement="top"
        portal
      >
        <Circle active={active} onClick={() => onClickHandler(color)}>
          <InnerCircle color={background.value} fillColor={highlight.value}>
            <EdsIcon {...text_field} />
          </InnerCircle>
        </Circle>
      </Tooltip>
    </Card>
  )
}

type ThemeSelectorProps = ObjectInputProps

export const ThemeSelector = ({ value, onChange, schemaType }: ThemeSelectorProps) => {
  const { options } = schemaType
  const colors = (options?.colors as ThemeSelectorValue[]) || themeColors
  const theSelectorUniqueId = useId()

  const handleSelect = useCallback(
    (selected: ThemeSelectorValue) => {
      if (selected === value) return

      onChange(set(selected.title, ['title']))
      onChange(set(selected.value, ['value']))
    },
    [onChange, value],
  )

  return (
    <Stack space={3}>
      {colors && (
        <Card>
          <Flex direction={'row'} wrap={'wrap'}>
            {colors.map((colorItem: ThemeSelectorValue) => {
              const { background, highlight } = getColorForTheme(colorItem.value)
              return (
                <ColorCircle
                  key={`${theSelectorUniqueId}_${background.value}_${highlight.key}`}
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

export default ThemeSelector
