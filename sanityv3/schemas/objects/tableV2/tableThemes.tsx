import { Card, Flex, Stack, Text } from '@sanity/ui'
import { useCallback, useId } from 'react'
import { set } from 'sanity'
import type { ObjectInputProps } from 'sanity'
import styled from 'styled-components'
import { defaultColors } from '../../defaultColors'
import { capitalizeFirstLetter } from '../../../helpers/formatters'

type TableThemeColor = {
  title: string
  headerValue: string
  rowValue: string
}

//Keep in sync with web/core/TableThemes
export const tableThemes: TableThemeColor[] = [
  {
    title: 'grey',
    headerValue: defaultColors[13].value,
    rowValue: defaultColors[14].value,
  },
  {
    title: 'blue',
    headerValue: defaultColors[15].value,
    rowValue: defaultColors[16].value,
  },
  {
    title: 'green',
    headerValue: defaultColors[17].value,
    rowValue: defaultColors[18].value,
  },
]

const Container = styled.div<{ $active?: boolean; $preview?: any; $isThumbnail?: any }>`
  width: ${({ $isThumbnail }) => ($isThumbnail ? '2.0625rem' : '2.5rem')};
  height: ${({ $isThumbnail }) => ($isThumbnail ? '2.0625rem' : '2.5rem')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: solid 2px
    ${({ $preview, $active }) => ($active && !$preview ? 'var(--card-focus-ring-color)' : 'transparent')};
  outline-offset: 2px;
  border-radius: 5%;
  cursor: ${({ $isThumbnail }) => ($isThumbnail ? 'default' : 'pointer')};
`

const TableThemeRow = styled.div<{ $color?: string; $isThumbnail?: any }>`
  display: flex;
  width: ${({ $isThumbnail }) => ($isThumbnail ? '80%' : '100%')};
  min-height: 5px;
  background-color: ${({ $color }) => ($color ? $color : 'white')};
  border-radius: 5%;
`

export type TableThemeSelectorValue = {
  title: string
}

export type TableThemeProps = {
  value: TableThemeSelectorValue
  active?: boolean
  preview?: boolean
  thumbnail?: boolean
  onClickHandler?: (val: TableThemeSelectorValue) => void
}

export const TableTheme = ({ value, active, onClickHandler, preview, thumbnail }: TableThemeProps) => {
  const theme = tableThemes.find((theme) => theme.title === value?.title) ?? tableThemes[0]

  return (
    <Card padding={thumbnail ? 0 : 1} radius={2} shadow={1}>
      <Flex
        direction={preview ? 'row' : 'column'}
        justify="flex-start"
        align={'center'}
        gap={thumbnail ? 2 : 3}
        padding={0}
      >
        <Container
          $active={active}
          {...(onClickHandler && {
            onClick: () => onClickHandler(value),
          })}
          $isThumbnail={!!thumbnail}
          $preview={!!preview}
        >
          <TableThemeRow $color={theme.headerValue} $isThumbnail={!!thumbnail} />
          <TableThemeRow $isThumbnail={!!thumbnail} />
          <TableThemeRow $color={theme.rowValue} $isThumbnail={!!thumbnail} />
          <TableThemeRow $isThumbnail={!!thumbnail} />
          <TableThemeRow $color={theme.rowValue} $isThumbnail={!!thumbnail} />
        </Container>
        {!thumbnail && <Text size={1}>{capitalizeFirstLetter(theme.title)}</Text>}
      </Flex>
    </Card>
  )
}

type TableThemeSelectorProps = ObjectInputProps

export const TableThemeSelector = ({ value, onChange }: TableThemeSelectorProps) => {
  const colors = tableThemes
  const theSelectorUniqueId = useId()

  const handleSelect = useCallback(
    (selected: TableThemeSelectorValue) => {
      if (selected?.title === value?.title) return

      onChange(set(selected.title, ['title']))
    },
    [onChange, value],
  )

  return (
    <Stack space={3}>
      {colors && (
        <Flex direction={'row'} wrap={'wrap'} gap={4}>
          {colors.map((colorItem: TableThemeSelectorValue) => {
            return (
              <TableTheme
                key={`${colorItem?.toString()}_${theSelectorUniqueId}`}
                value={colorItem}
                active={colorItem.title === value?.title}
                onClickHandler={handleSelect}
              />
            )
          })}
        </Flex>
      )}
    </Stack>
  )
}

export default TableThemeSelector
