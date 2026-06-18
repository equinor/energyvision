import { Box, Button, Card, Flex, Select, Stack, Text } from '@sanity/ui'
import { useCallback } from 'react'
import type { ObjectInputProps, PreviewProps } from 'sanity'
import { set, unset } from 'sanity'

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
  const isClickable = Boolean(onClickHandler)

  return (
    <Flex
      direction={preview ? 'row' : 'column'}
      justify='flex-start'
      align={'center'}
      gap={thumbnail ? 2 : 4}
      padding={0}
    >
      <Box
        as={isClickable ? 'button' : 'div'}
        {...(isClickable && {
          type: 'button',
          onClick: () => onClickHandler?.(color),
        })}
        style={{
          width: thumbnail ? '2.0625rem' : 'fit-content',
          height: thumbnail ? '2.0625rem' : 'fit-content',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: thumbnail ? '2px' : '4px',
          backgroundColor: background.value,
          outline:
            active && !preview
              ? 'solid 2px var(--card-focus-ring-color)'
              : 'solid 2px transparent',
          outlineOffset: '2px',
          borderRadius: '5%',
          border: '1px solid lightgrey',
          padding: thumbnail ? '0px' : '6px 12px',
          cursor: isClickable ? 'pointer' : 'default',
          appearance: isClickable ? 'none' : undefined,
        }}
      >
        <Box
          style={{
            display: 'flex',
            width: 'fit-content',
            backgroundColor: foreground.value,
            padding: thumbnail ? '0.25em' : '15px',
            borderRadius: '5%',
          }}
        />
        <Box
          style={{
            display: 'flex',
            width: 'fit-content',
            backgroundColor: foreground.value,
            padding: thumbnail ? '0.25em' : '15px',
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
      <CardTheme
        color={color}
        preview
        getColorForThemeHandler={getColorForThemeHandler}
      />
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
  variant: _variant = 'circles',
  getColorForThemeHandler,
  themeColors,
  value,
  onChange,
  schemaType,
}: ThemeSelectorProps) => {
  const { options } = schemaType
  const colorThemes = themeColors ?? options?.colors ?? undefined
  const selectedTheme = colorThemes?.find(
    (color: ThemeSelectorValue) => String(color.value) === String(value?.value),
  )

  const handleSelect = useCallback(
    (event: any) => {
      const nextValue = event.currentTarget.value

      if (!nextValue) {
        onChange(unset(['title']))
        onChange(unset(['value']))
        return
      }

      const selected = colorThemes?.find(
        (color: ThemeSelectorValue) =>
          String(color.value) === String(nextValue),
      )

      if (!selected) return
      if (selected.value === value?.value) return

      onChange(set(selected.title, ['title']))
      onChange(set(selected.value, ['value']))
    },
    [colorThemes, onChange, value?.value],
  )

  const handleClear = useCallback(() => {
    if (!value?.value && !value?.title) return

    onChange(unset(['title']))
    onChange(unset(['value']))
  }, [onChange, value?.title, value?.value])

  return (
    <Stack space={3}>
      {colorThemes && colorThemes.length > 0 && (
        <Card padding={2}>
          <Flex align={'center'} gap={3}>
            <CardTheme
              color={selectedTheme ?? colorThemes[0]}
              thumbnail
              preview
              getColorForThemeHandler={getColorForThemeHandler}
            />
            <Flex flex={1} direction={'column'} gap={2}>
              <Flex align={'center'} gap={2}>
                <Select
                  aria-label={schemaType.title ?? 'Select theme'}
                  onChange={handleSelect}
                  value={value?.value ?? ''}
                >
                  <option value=''>Select theme</option>
                  {colorThemes.map((colorItem: ThemeSelectorValue) => {
                    return (
                      <option key={colorItem.value} value={colorItem.value}>
                        {colorItem.title}
                      </option>
                    )
                  })}
                </Select>
                <Button
                  mode='ghost'
                  text='Clear'
                  onClick={handleClear}
                  disabled={!value?.value && !value?.title}
                />
              </Flex>
            </Flex>
          </Flex>
        </Card>
      )}
      {(!colorThemes || colorThemes?.length === 0) && (
        <Text>Missing themeColors</Text>
      )}
      {!getColorForThemeHandler && (
        <Text>Missing function getColorForThemeHandler </Text>
      )}
    </Stack>
  )
}

export default ThemeSelector
