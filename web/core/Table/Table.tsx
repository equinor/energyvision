import { forwardRef } from 'react'
import type { TableHTMLAttributes } from 'react'
import envisTwMerge from '../../twMerge'

export type Variants = 'zebra' | 'border'
export type ThemeVariants = 'grey' | 'blue' | 'green' | 'orange'

export type TableProps = TableHTMLAttributes<HTMLTableElement>

/**
 * Table component, used to display tabular data.
 *
 * @example
 * <Table>
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
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table({ className, children, ...rest }, ref) {
  return (
    <table className={envisTwMerge('table-auto w-full border-collapse', className)} ref={ref} {...rest}>
      {children}
    </table>
  )
})
