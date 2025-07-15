import { Box, Card, Flex, Stack, Tooltip, Text } from '@sanity/ui'
import { useCallback, useId } from 'react'
import { set } from 'sanity'
import type { ObjectInputProps } from 'sanity'
import { themeColors, getColorForTheme } from './themeColors'
import { EdsIcon } from '../../../icons'
import { text_field } from '@equinor/eds-icons'

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
        <Box
          as="span"
          style={{
            display: 'inline-block',
            border: `2px solid ${active ? 'var(--card-focus-ring-color)' : 'transparent'}`,
            borderRadius: '50%',
            width: 68,
            height: 68,
            padding: 4,
            cursor: 'pointer',
            boxSizing: 'border-box',
            verticalAlign: 'middle',
          }}
          onClick={() => onClickHandler(color)}
        >
          <Box
            as="span"
            style={{
              backgroundColor: background.value,
              border: '1px solid var(--card-hairline-soft-color)',
              borderRadius: '50%',
              padding: 15,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 'auto',
              color: highlight.value,
            }}
          >
            <EdsIcon {...text_field} />
          </Box>
        </Box>
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
