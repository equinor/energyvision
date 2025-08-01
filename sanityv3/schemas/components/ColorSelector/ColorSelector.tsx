import { Box, Card, Flex, Stack, Tooltip, Text } from '@sanity/ui'
import { useCallback } from 'react'
import { set } from 'sanity'
import type { ObjectInputProps } from 'sanity'
import { defaultColors } from '../../defaultColors'

export type ColorSelectorValue = {
  title: string
  value: string
  dark?: boolean
  key?: string
  onlyTextColor?: boolean
}

type ColorCircleProps = {
  color: ColorSelectorValue
  active: boolean
  onClickHandler: (val: ColorSelectorValue) => void
}

const ColorCircle = ({ color, active, onClickHandler }: ColorCircleProps) => (
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
      <Box
        as="span"
        style={{
          display: 'inline-block',
          border: `2px solid ${active ? 'var(--card-focus-ring-color)' : 'transparent'}`,
          borderRadius: '50%',
          padding: 4,
          width: 32,
          height: 32,
          cursor: 'pointer',
        }}
        onClick={() => onClickHandler(color)}
      >
        <Box
          as="span"
          style={{
            backgroundColor: color.value,
            border: '1px solid var(--card-hairline-soft-color)',
            padding: 15,
            borderRadius: '50%',
            display: 'inline-block',
          }}
        />
      </Box>
    </Tooltip>
  </Card>
)

type ColorSelectorProps = ObjectInputProps

export const ColorSelector = ({ value, onChange, schemaType }: ColorSelectorProps) => {
  const { options } = schemaType
  const colors = (options?.colors as ColorSelectorValue[]) || defaultColors

  const handleSelect = useCallback(
    (selected: ColorSelectorValue) => {
      if (selected === value) return

      onChange(set(selected.title, ['title']))
      onChange(set(selected.value, ['value']))
      onChange(set(selected.dark, ['dark']))
      onChange(set(selected.key, ['key']))
    },
    [onChange, value],
  )

  return (
    <Stack space={3}>
      {colors && (
        <Card>
          <Flex direction={'row'} wrap={'wrap'}>
            {colors
              .filter((colorItem: ColorSelectorValue) => !colorItem?.onlyTextColor)
              .map((colorItem: ColorSelectorValue) => {
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
