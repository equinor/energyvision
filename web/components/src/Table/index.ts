import { Table as TableWrapper, TableProps } from './Table'
import { Head, TableHeadProps } from './Head'
import { Row, TableRowProps } from './Row'
import { Cell, TableCellProps } from './Cell'
import { Body, TableBodyProps } from './Body'

type TableCompoundProps = typeof TableWrapper & {
  Head: typeof Head
  Row: typeof Row
  Cell: typeof Cell
  Body: typeof Body
}

const Table = TableWrapper as TableCompoundProps

Table.Head = Head
Table.Row = Row
Table.Cell = Cell
Table.Body = Body

export { Table }
export type { TableProps, TableHeadProps, TableRowProps, TableCellProps, TableBodyProps }
