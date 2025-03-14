import { Card, Flex, Stack, Text } from '@sanity/ui'
import { useCallback, useId } from 'react'
import { set } from 'sanity'
import type { ObjectInputProps } from 'sanity'
import styled from 'styled-components'
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

const Container = styled.div<{ active?: boolean; color: string; $preview?: any; $isThumbnail?: any }>`
  width: ${({ $isThumbnail }) => ($isThumbnail ? '2.0625rem' : 'fit-content')};
  height: ${({ $isThumbnail }) => ($isThumbnail ? '2.0625rem' : 'fit-content')};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ $isThumbnail }) => ($isThumbnail ? '2px' : '4px')};
  background-color: ${({ color }) => color};
  outline: solid 2px ${({ $preview, active }) => (active && !$preview ? 'var(--card-focus-ring-color)' : 'transparent')};
  outline-offset: 2px;
  border-radius: 5%;
  padding: ${({ $isThumbnail }) => ($isThumbnail ? '0px' : '6px 12px')};
  cursor: ${({ $isThumbnail }) => ($isThumbnail ? 'default' : 'pointer')};
`

const TabThemeCard = styled.div<{ color: string; $isThumbnail?: any }>`
  display: flex;
  width: fit-content;
  background-color: ${({ color }) => color};
  padding: ${({ $isThumbnail }) => ($isThumbnail ? '0.25em' : '15px')};
  border-radius: 5%;
`

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
      <Container
        active={active}
        {...(onClickHandler && {
          onClick: () => onClickHandler(color),
        })}
        color={background.value}
        $isThumbnail={!!thumbnail}
        $preview={!!preview}
      >
        <TabThemeCard $isThumbnail={!!thumbnail} color={card.value} />
        <TabThemeCard $isThumbnail={!!thumbnail} color={card.value} />
      </Container>
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
