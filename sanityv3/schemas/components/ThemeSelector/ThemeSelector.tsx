import { Box, Card, Flex, Stack, Tooltip, Text } from '@sanity/ui'
import { useCallback, useId } from 'react'
import { set } from 'sanity'
import type { ObjectInputProps, PreviewProps } from 'sanity'
import styled from 'styled-components'
import { getColorForTheme } from './themeColors'
import { EdsIcon } from '../../../icons'
import { text_field } from '@equinor/eds-icons'

/** Variant circles */
const Circle = styled.div<{ $active: boolean }>`
  display: inline-block;
  border: solid 2px ${({ $active }) => ($active ? 'var(--card-focus-ring-color)' : 'transparent')};
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

/** Variant cards */
const Container = styled.div<{ $active?: boolean; color: string; $preview?: any; $isThumbnail?: any }>`
  width: ${({ $isThumbnail }) => ($isThumbnail ? '2.0625rem' : 'fit-content')};
  height: ${({ $isThumbnail }) => ($isThumbnail ? '2.0625rem' : 'fit-content')};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ $isThumbnail }) => ($isThumbnail ? '2px' : '4px')};
  background-color: ${({ color }) => color};
  outline: solid 2px
    ${({ $preview, $active }) => ($active && !$preview ? 'var(--card-focus-ring-color)' : 'transparent')};
  outline-offset: 2px;
  border-radius: 5%;
  border: 1px solid lightgrey;
  padding: ${({ $isThumbnail }) => ($isThumbnail ? '0px' : '6px 12px')};
  cursor: ${({ $isThumbnail }) => ($isThumbnail ? 'default' : 'pointer')};
`

const ThemeCard = styled.div<{ color: string; $isThumbnail?: any }>`
  display: flex;
  width: fit-content;
  background-color: ${({ color }) => color};
  padding: ${({ $isThumbnail }) => ($isThumbnail ? '0.25em' : '15px')};
  border-radius: 5%;
`

export type ThemeSelectorColor = {
  background: {
    value: string
    key: string
  }
  foreground: {
    value: string
    key: string
  }
}

export type ThemeSelectorValue = {
  /** Used in web component theme mapping function */
  title: string
  /** Used in studio selector to match in getColorForThemeHandler switch */
  value: number
}

/** Variant circles */
type ColorCircleProps = {
  color: ThemeSelectorValue
  active: boolean
  onClickHandler: (val: ThemeSelectorValue) => void
  getColorForThemeHandler: (val: ThemeSelectorValue) => ThemeSelectorColor
}

const ColorCircle = ({ color, active, getColorForThemeHandler, onClickHandler }: ColorCircleProps) => {
  const { background, foreground } = getColorForThemeHandler(color)
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
        <Circle $active={active} onClick={() => onClickHandler(color)}>
          <InnerCircle color={background.value} fillColor={foreground.value}>
            <EdsIcon {...text_field} />
          </InnerCircle>
        </Circle>
      </Tooltip>
    </Card>
  )
}

/** Variant cards */
export type CardThemeProps = {
  color: ThemeSelectorValue
  active?: boolean
  preview?: boolean
  thumbnail?: boolean
  onClickHandler?: (val: ThemeSelectorValue) => void
  getColorForThemeHandler: (val: ThemeSelectorValue) => ThemeSelectorColor
}

export const CardTheme = ({
  color,
  active,
  getColorForThemeHandler,
  onClickHandler,
  preview,
  thumbnail,
}: CardThemeProps) => {
  const { background, foreground } = getColorForThemeHandler(color)
  return (
    <Flex
      direction={preview ? 'row' : 'column'}
      justify="flex-start"
      align={'center'}
      gap={thumbnail ? 2 : 4}
      padding={0}
    >
      <Container
        $active={active}
        {...(onClickHandler && {
          onClick: () => onClickHandler(color),
        })}
        color={background.value}
        $isThumbnail={!!thumbnail}
        $preview={!!preview}
      >
        <ThemeCard $isThumbnail={!!thumbnail} color={foreground.value} />
        <ThemeCard $isThumbnail={!!thumbnail} color={foreground.value} />
      </Container>
      {!thumbnail && (
        <Text muted size={1}>
          {color.title}
        </Text>
      )}
    </Flex>
  )
}

export type ThemePreviewProps = {
  getColorForThemeHandler: (val: ThemeSelectorValue) => ThemeSelectorColor
} & PreviewProps

export function ThemePreview(props: ThemePreviewProps) {
  //@ts-ignore: todo
  const { value, title, getColorForThemeHandler } = props
  const color: ThemeSelectorValue = {
    title: title as string,
    value: parseInt(value, 10),
  }
  return (
    <>
      <CardTheme color={color} preview getColorForThemeHandler={getColorForThemeHandler} />
    </>
  )
}

type ThemeSelectorProps = {
  variant?: 'cards' | 'circles'
  /* use directly in the object or with themelist options color */
  themeColors?: ThemeSelectorValue[]
  /** Send in the theme handler for the specific component
   * Follow pattern with switch on ThemeSelectorValue[].value that returns object
   * e.g.
   * {
   * background:{
   *  value: the hex to use in studio
   *  key: the tailwind color key - e.g. moss-green-100
   * },
   * foreground:{
   *  value: the hex to use in studio
   *  key: the tailwind color key - e.g. white-100
   * }
   * }
   */
  getColorForThemeHandler: (val: ThemeSelectorValue) => ThemeSelectorColor
} & ObjectInputProps

/*  
See example of use in textTeaser, tabsBackground, homepageBanner
*/
export const ThemeSelector = ({
  variant = 'circles',
  getColorForThemeHandler,
  themeColors,
  value,
  onChange,
  schemaType,
}: ThemeSelectorProps) => {
  const { options } = schemaType
  const colorThemes = themeColors ?? options?.colors ?? undefined

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
      {themeColors && themeColors?.length > 0 && (
        <Card>
          <Flex direction={'row'} wrap={'wrap'} gap={2}>
            {colorThemes.map((colorItem: ThemeSelectorValue) => {
              const { background, foreground } = getColorForThemeHandler(colorItem)
              return variant === 'circles' ? (
                <ColorCircle
                  key={`${theSelectorUniqueId}_${background.value}_${foreground.key}`}
                  color={colorItem}
                  active={colorItem.value === value?.value}
                  onClickHandler={handleSelect}
                  getColorForThemeHandler={getColorForThemeHandler}
                />
              ) : (
                <CardTheme
                  key={`${theSelectorUniqueId}_${background.value}_${foreground.key}`}
                  color={colorItem}
                  active={colorItem.value === value?.value}
                  onClickHandler={handleSelect}
                  getColorForThemeHandler={getColorForThemeHandler}
                />
              )
            })}
          </Flex>
        </Card>
      )}
      {(!colorThemes || colorThemes?.length === 0) && <Text>Missing themeColors</Text>}
      {!getColorForThemeHandler && <Text>Missing function getColorForThemeHandler </Text>}
    </Stack>
  )
}

export default ThemeSelector
