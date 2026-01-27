import { Flex, Stack } from '@sanity/ui'
import { useCallback, useId } from 'react'
import { type ObjectInputProps, set } from 'sanity'
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
  active?: boolean
  onClickHandler?: (val: Theme) => void
}

export const ThemeComponent = ({
  theme,
  active,
  onClickHandler,
}: ThemeComponentProps) => {
  return (
    <div
      style={{
        width: '120px',
        height: '100px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid hsl(0, 0%, 86%)',
        outline: active ? 'solid 2px var(--card-focus-ring-color)' : 'none',
        outlineOffset: '2px',
        borderRadius: '3px',
        margin: '2px',
      }}
      {...(onClickHandler && {
        onClick: () => onClickHandler(theme),
      })}
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
      <div
        style={{
          padding: '4px 2px',
          maxWidth: '150px',
          textWrap: 'pretty',
          display: 'flex',
          justifyContent: 'start',
          width: 'fit-content',
          height: 'fit-content',
          fontSize: '0.8125rem',
        }}
      >
        {capitalizeFirstLetter(theme?.title)}
      </div>
    </div>
  )
}

type ThemeSelectorProps = ObjectInputProps

export const ThemeSelector = ({ value, onChange }: ThemeSelectorProps) => {
  const theSelectorUniqueId = useId()
  const { theme } = value || {}

  const handleSelect = useCallback(
    (selected: Theme) => {
      if (selected?.title === value?.title) return

      onChange(set(selected, ['theme']))
    },
    [onChange, value],
  )

  return (
    <Stack space={3}>
      {themes && (
        <Flex direction={'row'} wrap={'wrap'} gap={4}>
          {themes.map((themeItem: Theme) => {
            return (
              <ThemeComponent
                key={`${themeItem?.title?.toString()}_${theSelectorUniqueId}`}
                theme={themeItem}
                active={themeItem.title === theme?.title}
                onClickHandler={handleSelect}
              />
            )
          })}
        </Flex>
      )}
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
