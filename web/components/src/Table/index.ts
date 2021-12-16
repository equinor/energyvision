import { Table as TableWrapper, TableProps } from './Table'
import { Head, TableHeadProps } from './Head'
import { Row, TableRowProps } from './Row'
import { Cell, TableCellProps } from './Cell'

type TableCompoundProps = typeof TableWrapper & {
  Head: typeof Head
  Row: typeof Row
  Cell: typeof Cell
}

const Table = TableWrapper as TableCompoundProps

Table.Head = Head
Table.Row = Row
Table.Cell = Cell

export { Table }
export type { TableProps, TableHeadProps, TableRowProps, TableCellProps }
