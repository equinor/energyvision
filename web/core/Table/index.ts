'use client'
import { Table as TableRoot } from './Table'
import type { TableProps } from './Table'
import { TableBody } from './TableBody'
import type { TableBodyProps } from './TableBody'
import { TableCell } from './Cell/TableCell'
import type { TableCellProps } from './Cell/TableCell'
import { TableFoot } from './TableFoot'
import type { TableFootProps } from './TableFoot'
import { TableHead } from './TableHead'
import type { TableHeadProps } from './TableHead'
import { TableCaption } from './TableCaption'
import type { TableCaptionProps } from './TableCaption'
import { TableRow } from './TableRow'
import type { TableRowProps } from './TableRow'

/**
 * Table component, used to display tabular data. Renders a native HTML table element.
 *
 * @example
 * <Table>
 * <Table.Caption> Table caption </Table.Caption>
 *   <Table.Head>
 *     <Table.Row>
 *       <Table.HeaderCell>Name</Table.HeaderCell>
 *       <Table.HeaderCell>Age</Table.HeaderCell>
 *     </Table.Row>
 *   </Table.Head>
 *   <Table.Body>
 *     <Table.Row>
 *       <Table.Cell>John</Table.Cell>
 *       <Table.Cell>25</Table.Cell>
 *     </Table.Row>
 *   </Table.Body>
 *   <Table.Foot>
 *     <Table.Row>
 *       <Table.Cell>Total</Table.Cell>
 *       <Table.Cell>2</Table.Cell>
 *     </Table.Row>
 *   </Table.Foot>
 * </Table>
 */
const Table = Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  Foot: TableFoot,
  Caption: TableCaption,
})

Table.displayName = 'Table'
Table.Head.displayName = 'Table.Head'
Table.Body.displayName = 'Table.Body'
Table.Row.displayName = 'Table.Row'
Table.Cell.displayName = 'Table.Cell'
Table.Foot.displayName = 'Table.Foot'
Table.Caption.displayName = 'Table.Caption'

export { Table, TableHead, TableBody, TableRow, TableCell, TableFoot, TableCaption }
export type {
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TableFootProps,
  TableCaptionProps,
}
