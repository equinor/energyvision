import { Box, Card, Flex, Stack, Tooltip, Text } from '@sanity/ui'
import { useCallback, useEffect, useId, useState } from 'react'
import { set, useFormValue } from 'sanity'
import type { ObjectInputProps } from 'sanity'
import styled from 'styled-components'
import { ColorType } from '../../objects/colorList'
import { defaultColors } from '../../defaultColors'
import { getHighlightColorsForBackground } from './themeColors'

const Circle = styled.div<{ active: boolean }>`
  display: inline-block;
  border: solid 2px ${({ active }) => (active ? 'var(--card-focus-ring-color)' : 'transparent')};
  margin: 4px;
  cursor: pointer;
  border-radius: 8px;
`

const InnerCircle = styled.div`
  display: flex;
  border: 1px solid var(--card-hairline-soft-color);
  padding: 15px;
  margin: 2px;
  border-radius: 8px;
`

type ColorCircleProps = {
  color: ColorType
  active: boolean
  highlight: ColorType
  onClickHandler: (val: ColorType) => void
}

const ColorCircle = ({ color, active, onClickHandler, highlight }: ColorCircleProps) => {
  return (
    <Card paddingY={1}>
      <Tooltip
        content={
          <Box padding={2}>
            <Text muted size={1}>
              {highlight.title}
            </Text>
          </Box>
        }
        fallbackPlacements={['right', 'left']}
        placement="top"
        portal
      >
        <Circle active={active} onClick={() => onClickHandler(highlight)}>
          <InnerCircle style={{ background: color.value, color: color.title == 'Mid Blue' ? '#ffffff' : 'inherit' }}>
            <Box>
              Title <span style={{ color: highlight.value }}> highlight</span> theme
            </Box>
          </InnerCircle>
        </Circle>
      </Tooltip>
    </Card>
  )
}

type HighlightSelectorProps = ObjectInputProps

export const HighlightSelector = ({ value, path, onChange }: HighlightSelectorProps) => {
  const [colors, setColors] = useState<ColorType[]>()
  const theSelectorUniqueId = useId()
  const [isUserUpdated, setIsUserUpdated] = useState(false)

  const objectPath = path.slice(0, -1) // Removes the last element to target the object
  const currentObject: any = useFormValue(objectPath)

  useEffect(() => {
    const colors = getHighlightColorsForBackground(currentObject.background || defaultColors[0])
    setColors(colors)
    const defaultColor = colors.filter((it) => ['White', 'Black'].includes(it.title)).at(0) || defaultColors[0]
    console.log(defaultColor.title + ' == ' + value?.title)
    setIsUserUpdated(false)
    update(defaultColor)
  }, [currentObject])

  const update = useCallback(
    (selected: ColorType) => {
      if (selected.title === value?.title || isUserUpdated) return
      onChange(set(selected.title, ['title']))
      onChange(set(selected.value, ['value']))
      onChange(set(selected.key, ['key']))
    },
    [onChange, value],
  )

  const handleSelect = (selected: ColorType) => {
    setIsUserUpdated(true)
    update(selected)
  }

  return (
    <Stack space={3}>
      {colors && (
        <Card>
          <Flex direction={'row'} wrap={'wrap'}>
            {colors.map((colorItem: ColorType) => {
              return (
                <ColorCircle
                  key={`${theSelectorUniqueId}_${currentObject.background._key}_${colorItem.key}`}
                  color={currentObject.background || defaultColors[0]}
                  highlight={colorItem}
                  active={colorItem.title === value?.title}
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

export default HighlightSelector
