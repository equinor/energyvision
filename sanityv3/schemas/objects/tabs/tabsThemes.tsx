import { Card, Flex, Stack, Text, Box } from '@sanity/ui'
import { useCallback, useId } from 'react'
import { set } from 'sanity'
import type { ObjectInputProps } from 'sanity'
import { defaultColors } from '../../defaultColors'

export const tabsThemes = [
  { title: 'Mist Blue', value: 0 },
  { title: 'Mid Orange', value: 1 },
  { title: 'Moss Green Light', value: 2 },
]

//Keep in sync with web/sections/TabBlock/tabsThemes
export const getColorForTabTheme = (pattern: number) => {
  switch (pattern) {
    case 1:
      return {
        background: {
          value: defaultColors[10].value,
          key: defaultColors[10].key,
        },
        card: {
          value: defaultColors[5].value,
          key: defaultColors[5].key,
        },
      }
    case 2:
      return {
        background: {
          value: defaultColors[11].value,
          key: defaultColors[11].key,
        },
        card: {
          value: defaultColors[7].value,
          key: defaultColors[7].key,
        },
      }
    case 0:
    default:
      return {
        background: {
          value: defaultColors[3].value,
          key: defaultColors[3].key,
        },
        card: {
          value: defaultColors[0].value,
          key: defaultColors[0].key,
        },
      }
  }
}

export type TabsThemeSelectorValue = {
  title: string
  value: number
}

export type TabsThemeProps = {
  color: TabsThemeSelectorValue
  active?: boolean
  preview?: boolean
  thumbnail?: boolean
  onClickHandler?: (val: TabsThemeSelectorValue) => void
}

export const TabTheme = ({ color, active, onClickHandler, preview, thumbnail }: TabsThemeProps) => {
  const { background, card } = getColorForTabTheme(color.value)
  return (
    <Flex
      direction={preview ? 'row' : 'column'}
      justify="flex-start"
      align={'center'}
      gap={thumbnail ? 2 : 4}
      padding={0}
    >
      <Box
        as="span"
        style={{
          width: thumbnail ? '2.0625rem' : 'fit-content',
          height: thumbnail ? '2.0625rem' : 'fit-content',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: thumbnail ? 2 : 4,
          backgroundColor: background.value,
          outline: active && !preview ? '2px solid var(--card-focus-ring-color)' : '2px solid transparent',
          outlineOffset: 2,
          borderRadius: '5%',
          padding: thumbnail ? 0 : '6px 12px',
          cursor: thumbnail ? 'default' : 'pointer',
        }}
        {...(onClickHandler && {
          onClick: () => onClickHandler(color),
        })}
      >
        <Box
          as="span"
          style={{
            display: 'flex',
            width: 'fit-content',
            backgroundColor: card.value,
            padding: thumbnail ? '0.25em' : 15,
            borderRadius: '5%',
          }}
        />
        <Box
          as="span"
          style={{
            display: 'flex',
            width: 'fit-content',
            backgroundColor: card.value,
            padding: thumbnail ? '0.25em' : 15,
            borderRadius: '5%',
          }}
        />
      </Box>
      {!thumbnail && (
        <Text muted size={1}>
          {color.title}
        </Text>
      )}
    </Flex>
  )
}

type TabsThemeSelectorProps = ObjectInputProps

export const TabsThemeSelector = ({ value, onChange, schemaType }: TabsThemeSelectorProps) => {
  const { options } = schemaType
  const colors = tabsThemes
  const theSelectorUniqueId = useId()

  const handleSelect = useCallback(
    (selected: TabsThemeSelectorValue) => {
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
          <Flex direction={'row'} wrap={'wrap'} gap={4}>
            {colors.map((colorItem: TabsThemeSelectorValue) => {
              const { background, card } = getColorForTabTheme(colorItem.value)
              return (
                <TabTheme
                  key={`${theSelectorUniqueId}_${background.value}_${card.key}`}
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

export default TabsThemeSelector
