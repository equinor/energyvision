import { Box, Button, Card, Flex, Stack, Text, Tooltip } from '@sanity/ui'
import { useCallback } from 'react'
import type { ObjectInputProps } from 'sanity'
import { set, unset, useCurrentUser } from 'sanity'
import { defaultBackgroundColors } from '../../defaultColors'
import styles from './ColorSelector.module.css'

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
      placement='top'
      portal
    >
      <button
        type='button'
        className={`${styles.circle}${active ? ` ${styles.circleActive}` : ''}`}
        onClick={() => onClickHandler(color)}
        aria-label={color.title}
        aria-pressed={active}
      >
        <div
          className={styles.innerCircle}
          style={{ backgroundColor: color.value }}
        />
      </button>
    </Tooltip>
  </Card>
)

type ColorSelectorProps = ObjectInputProps

export const ColorSelector = ({
  value,
  onChange,
  schemaType,
}: ColorSelectorProps) => {
  const { options } = schemaType
  const colors =
    (options?.colors as ColorSelectorValue[]) || defaultBackgroundColors

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

  const handleClear = useCallback(() => {
    onChange(unset(['title']))
    onChange(unset(['value']))
    onChange(unset(['dark']))
    onChange(unset(['key']))
  }, [onChange])

  const isDeveloper = useCurrentUser()?.roles.some(
    role => role.name === 'Developer',
  )

  return (
    <Stack space={3}>
      {colors && (
        <Card>
          <Flex direction={'row'} wrap={'wrap'}>
            {colors
              .filter(
                (colorItem: ColorSelectorValue) => !colorItem?.onlyTextColor,
              )
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
            {isDeveloper && (
              <Button
                onClick={handleClear}
                mode='ghost'
                fontSize={1}
                paddingY={1}
                paddingX={1}
                text='Clear'
                disabled={!value?.value}
                style={{
                  marginLeft: '6px',
                }}
              />
            )}
          </Flex>
        </Card>
      )}
    </Stack>
  )
}

export default ColorSelector
