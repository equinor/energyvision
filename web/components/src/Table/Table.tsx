import { forwardRef } from 'react'
import { Table as EdsTable, TableProps as EdsTableProps } from '@equinor/eds-core-react'
import { TableThemes } from '../../../types/index'
import { twMerge } from 'tailwind-merge'
import { getColorForTableTheme } from './tabletheme'

export type TableProps = EdsTableProps & { theme?: TableThemes }

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table({ children, style, theme, ...rest }, ref) {
  const tableTheme = getColorForTableTheme(theme)
  return (
    <EdsTable
      ref={ref}
      style={style}
      {...rest}
      className={twMerge(`
        overflow-x-auto block max-w-full sm:w-full sm:block sm:table
        ${tableTheme.headerBackground} ${tableTheme.headerBand}
        ${tableTheme.headerBorderLeftBand}
        ${tableTheme.rowBackground}
        ${tableTheme.coloumnBorderLeftBand}
        ${tableTheme.coloumnBorderBottomBand}
        ${tableTheme.coloumnLastChildBorderBottomBand}
      `)}
    >
      {children}
    </EdsTable>
  )
})
