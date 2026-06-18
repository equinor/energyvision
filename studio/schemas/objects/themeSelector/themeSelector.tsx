import { Button, Card, Flex, Select, Stack } from '@sanity/ui'
import { useCallback } from 'react'
import { type ObjectInputProps, set, unset } from 'sanity'
import { capitalizeFirstLetter } from '../../../helpers/formatters'
import { type Color, defaultColors } from '../../defaultColors'

const availableColors: Color[] = [
  //[0] - White
  defaultColors[0],
  //[1] - Light spruce wood
  defaultColors[19],
  //[2] - Light yellow
  defaultColors[20],
  //[3] - Light blue
  defaultColors[21],
  //[4] - Light gray
  defaultColors[22],
]

type Theme = {
  title: string
  background: Color
  foreground: Color
}

export const themes: Theme[] = [
  {
    title: 'Light grey on white',
    background: availableColors[0],
    foreground: availableColors[4],
  },
  {
    title: 'White on light spruce wood',
    background: availableColors[1],
    foreground: availableColors[0],
  },
  {
    title: 'White on light blue',
    background: availableColors[3],
    foreground: availableColors[0],
  },
  {
    title: 'Yellow on white',
    background: availableColors[0],
    foreground: availableColors[2],
  },
]

export type ThemeSelectorValue = {
  theme: Theme
}

export type ThemeComponentProps = {
  theme: Theme
  thumbnail?: boolean
}

export const ThemeComponent = ({ theme, thumbnail }: ThemeComponentProps) => {
  return (
    <div
      style={{
        width: thumbnail ? '2.0625rem' : '120px',
        height: thumbnail ? '2.0625rem' : '100px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid hsl(0, 0%, 86%)',
        borderRadius: '3px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: '2rem',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '25%',
            top: '10%',
            marginLeft: 'auto',
            width: '50%',
            height: '50%',
            border: '1px solid hsl(0, 0%, 86%)',
            zIndex: '10',
            backgroundColor: theme?.foreground?.value,
          }}
        />
        <div
          style={{
            width: '100%',
            height: '100%',
            minHeight: '2rem',
            backgroundColor: theme?.background?.value,
          }}
        />
      </div>
    </div>
  )
}

type ThemeSelectorProps = ObjectInputProps

export const ThemeSelector = ({ value, onChange }: ThemeSelectorProps) => {
  const { theme } = value || {}
  const selectedTheme = themes.find(
    themeItem => themeItem.title === theme?.title,
  )

  const handleSelect = useCallback(
    (event: any) => {
      const nextThemeTitle = event.currentTarget.value

      if (!nextThemeTitle) {
        onChange(unset(['theme']))
        return
      }

      const selected = themes.find(
        themeItem => themeItem.title === nextThemeTitle,
      )

      if (!selected) return
      if (selected.title === value?.theme?.title) return

      onChange(set(selected, ['theme']))
    },
    [onChange, value?.theme?.title],
  )

  const handleClear = useCallback(() => {
    if (!theme?.title) return

    onChange(unset(['theme']))
  }, [onChange, theme?.title])

  return (
    <Stack space={3}>
      <Card padding={2}>
        <Flex align={'center'} gap={3}>
          <ThemeComponent theme={selectedTheme ?? themes[0]} thumbnail />
          <Flex flex={1} direction={'column'} gap={2}>
            <Flex align={'center'} gap={2}>
              <Select
                aria-label='Select theme'
                onChange={handleSelect}
                value={theme?.title ?? ''}
              >
                <option value=''>Select theme</option>
                {themes.map(themeItem => {
                  return (
                    <option key={themeItem.title} value={themeItem.title}>
                      {capitalizeFirstLetter(themeItem.title)}
                    </option>
                  )
                })}
              </Select>
              <Button
                mode='ghost'
                text='Clear'
                onClick={handleClear}
                disabled={!theme?.title}
              />
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Stack>
  )
}

export default {
  type: 'object',
  name: 'themeSelector',
  fields: [
    {
      name: 'theme',
      type: 'object',
      fields: [
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'background',
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
            },
            {
              name: 'key',
              type: 'string',
            },
          ],
        },
        {
          name: 'foreground',
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
            },
            {
              name: 'key',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  initialValue: {
    theme: themes[0],
  },
  components: {
    input: (props: any) => {
      return <ThemeSelector {...props} />
    },
  },
  preview: {
    select: {
      theme: 'theme',
    },
  },
}
