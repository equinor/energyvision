/* eslint-disable consistent-return */
import { Box, Button, Card, Stack, Flex, Inline, Text } from '@sanity/ui'
import { uuid } from '@sanity/uuid'
import { type FormEvent, useState } from 'react'
import { type ObjectInputProps, set, unset } from 'sanity'
import Papa from 'papaparse'

import { TableInput } from './TableInput'
import { TableMenu } from './TableMenu'

const deepClone: <T>(data: T) => T = globalThis.structuredClone ?? ((data) => JSON.parse(JSON.stringify(data)))

export interface TableValue {
  _type: 'table'
  rows: TableRow[]
}

export type TableProps = ObjectInputProps<TableValue>

export type TableRow = {
  _type: string
  _key: string
  isHeader?: boolean
  cells: string[]
}

// TODO refactor deeplone stuff to use proper patches
// TODO use callback all the things

export const TableComponent = (props: TableProps & { rowType?: string }) => {
  const { rowType = 'tableRow', value, onChange } = props
  const [dialog, setDialog] = useState<{
    type: string
    callback: () => void
  } | null>(null)

  const updateValue = (v?: Omit<TableValue, '_type'>) => {
    return onChange(set(v))
  }

  const resetValue = () => {
    return onChange(unset())
  }

  const createTable = (data: any) => {
    if (!data) {
      return
    }
    const headerCells = Object.keys(data?.[0])
    const cellRows = data?.map((dataRow: any) => Object.values(dataRow))
    const mappedCellRows = cellRows.map((cellRow: any) => {
      return {
        _type: rowType,
        _key: uuid(),
        cells: [...cellRow],
      }
    })
    const newValue: Omit<TableValue, '_type'> = {
      rows: [
        {
          _type: rowType,
          isHeader: true,
          _key: uuid(),
          cells: [...headerCells],
        },
        ...mappedCellRows,
      ],
    }
    console.log('newValue', newValue)
    return updateValue({ ...value, ...newValue })
  }

  const confirmRemoveTable = () => {
    setDialog({ type: 'table', callback: removeTable })
  }

  const removeTable = () => {
    resetValue()
    setDialog(null)
  }

  const addRows = (count = 1) => {
    if (!value) {
      return
    }
    const newValue = deepClone(value)
    // Calculate the column count from the first row
    const columnCount = value?.rows[0].cells.length ?? 0
    for (let i = 0; i < count; i++) {
      // Add as many cells as we have columns
      newValue.rows.push({
        _type: rowType,
        _key: uuid(),
        cells: Array(columnCount).fill(''),
      })
    }
    // eslint-disable-next-line consistent-return
    return updateValue(newValue)
  }
  const addHeaderRow = (row: any) => {
    if (!value) {
      console.log('Table value is not initialized')
      return
    }
    const newValue = deepClone(value)
    // Calculate the column count from the first row
    const columnCount = value?.rows[0].cells.length ?? 0
    for (let i = 0; i < columnCount; i++) {
      // Add as many cells as we have columns
      newValue.rows.push({
        _type: rowType,
        _key: uuid(),
        cells: Array(columnCount).fill(''),
      })
    }
    // eslint-disable-next-line consistent-return
    return updateValue(newValue)
  }

  const addRowAt = (index = 0) => {
    if (!value) {
      return
    }
    const newValue = deepClone(value)
    // Calculate the column count from the first row
    const columnCount = value.rows[0].cells.length

    newValue.rows.splice(index, 0, {
      _type: rowType,
      _key: uuid(),
      cells: Array(columnCount).fill(''),
    })

    // eslint-disable-next-line consistent-return
    return updateValue(newValue)
  }

  const removeRow = (index: number) => {
    if (!value) {
      return
    }
    const newValue = deepClone(value)
    newValue.rows.splice(index, 1)
    updateValue(newValue)
    setDialog(null)
  }

  const confirmRemoveRow = (index: number) => {
    if (!value) {
      return
    }
    if (value.rows.length <= 1) return confirmRemoveTable()
    return setDialog({ type: 'row', callback: () => removeRow(index) })
  }

  const confirmRemoveColumn = (index: number) => {
    if (!value) {
      return
    }
    if (value.rows[0].cells.length <= 1) return confirmRemoveTable()
    return setDialog({ type: 'column', callback: () => removeColumn(index) })
  }

  const addColumns = (count: number) => {
    if (!value) {
      return
    }
    const newValue = deepClone(value)
    // Add a cell to each of the rows
    newValue.rows.forEach((_, i) => {
      for (let j = 0; j < count; j++) {
        newValue.rows[i].cells.push('')
      }
    })
    return updateValue(newValue)
  }

  const addColumnAt = (index: number) => {
    if (!value) {
      return
    }
    const newValue = deepClone(value)

    newValue.rows.forEach((_, i) => {
      newValue.rows[i].cells.splice(index, 0, '')
    })

    return updateValue(newValue)
  }

  const removeColumn = (index: number) => {
    if (!value) {
      return
    }
    const newValue = deepClone(value)
    newValue.rows.forEach((row) => {
      row.cells.splice(index, 1)
    })
    updateValue(newValue)
    setDialog(null)
  }

  const updateCell = (e: FormEvent<HTMLInputElement>, rowIndex: number, cellIndex: number) => {
    if (!value) {
      return
    }
    const newValue = deepClone(value)
    newValue.rows[rowIndex].cells[cellIndex] = (e.target as HTMLInputElement).value
    return updateValue(newValue)
  }

  const handleFileUpload = (e: any) => {
    const files = e.target.files
    if (files) {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results: any) {
          console.log('Finished, set spreadsheet data', results.data)
          createTable(results.data)
        },
      })
    }
  }

  return (
    <div>
      {!value && (
        <Card>
          <Stack padding={4} space={[3, 3, 4, 5]}>
            <Text size={3}> Select spreadsheet that should be imported</Text>
            <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
          </Stack>
        </Card>
      )}
      <Box>
        <Flex justify="flex-end">
          {value?.rows?.length && (
            <TableMenu
              addColumns={addColumns}
              addColumnAt={addColumnAt}
              addRows={addRows}
              addRowAt={addRowAt}
              remove={confirmRemoveTable}
              placement="left"
            />
          )}
        </Flex>
      </Box>
      {value?.rows?.length && (
        <TableInput
          rows={value.rows}
          removeRow={confirmRemoveRow}
          removeColumn={confirmRemoveColumn}
          updateCell={updateCell}
        />
      )}
    </div>
  )
}

export function createTableComponent(rowType: string) {
  return function Table(props: TableProps) {
    return <TableComponent {...props} rowType={rowType} />
  }
}
