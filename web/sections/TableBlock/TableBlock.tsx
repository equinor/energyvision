import { Heading, Paragraph } from '../../core/Typography'
import { twMerge } from 'tailwind-merge'
import { forwardRef, useMemo } from 'react'
import { PortableTextBlock } from '@portabletext/types'
import { useReactTable, createColumnHelper, flexRender, getCoreRowModel } from '@tanstack/react-table'
import { toPlainText } from '@portabletext/react'
import { Table } from '@core/Table'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { ThemeVariants } from '@core/Table/Table'
import { FormattedDate } from 'react-intl'
import { isValid, parse } from 'date-fns'
import { renderCellByType } from './deprecatedRenderCellByType'

export type TableTheme = {
  title?: ThemeVariants
}

export type TableBlockProps = {
  variant?: 'default' | 'import' | 'deprecated'
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
  tableCaption?: string
  tableHeaders?: any[]
  rows: any
  theme?: TableTheme
  useBorder?: boolean
  id?: string
  anchor?: string
  className?: string
}

const TableBlock = forwardRef<HTMLDivElement, TableBlockProps>(function TableBlock(
  {
    variant = 'default',
    title,
    ingress,
    tableCaption,
    tableHeaders,
    theme,
    useBorder,
    rows,
    id,
    anchor,
    className = '',
  },
  ref,
) {
  const headerKeys = useMemo(() => {
    if (variant === 'import') {
      return rows?.[0]?.isHeader ? rows?.[0]?.cells.map((cell: any) => cell) : []
    }
    return tableHeaders?.map((header) => toPlainText(header.headerCell))
  }, [variant, tableHeaders, rows])

  const columnData = useMemo(() => {
    if (variant === 'import') {
      //First row of import table rows is header row
      return rows?.slice(1)?.map((tableRow: any) => {
        return Object.fromEntries(headerKeys?.map((key: any, index: number) => [key, tableRow?.cells[index]]))
      })
    }
    if (variant === 'deprecated') {
      return rows?.map((tableRow: any) => {
        return Object.fromEntries(headerKeys?.map((key: any, index: number) => [key, tableRow?.cells[index]]))
      })
    }
    return rows?.map((tableRow: any) => {
      return Object.fromEntries(headerKeys?.map((key: any, index: number) => [key, tableRow?.cells[index]?.content]))
    })
  }, [variant, rows, headerKeys])

  const columnHelper = createColumnHelper<any>()

  const columns = useMemo(() => {
    return headerKeys?.map((headerKey: any, index: number) => {
      return columnHelper.accessor(headerKey, {
        header: () => {
          return variant === 'import' ? (
            headerKey
          ) : (
            <Blocks value={tableHeaders?.[index].headerCell} className="prose-simple" />
          )
        },
        id: `headercell_${index}_${headerKey}`,
        cell: (info: any) => {
          if (variant === 'deprecated') {
            const value = info.getValue()
            return renderCellByType(value)
          } else {
            const value = info.getValue()
            const isPortableText = Array.isArray(value)
            if (variant === 'default' && tableHeaders?.[index]?.formatAsDate) {
              const plainDateString = toPlainText(value)
              const formatString = 'dd/MM/yyyy' // Define the format explicitly
              const formatStringAlternative = 'yyyy-MM-dd'
              const dateObj = parse(plainDateString, formatString, new Date()) // The third arg is a reference date
              const dateObjAlternative = parse(plainDateString, formatStringAlternative, new Date()) // The third arg is a reference date
              if (isValid(dateObj)) {
                return (
                  <time suppressHydrationWarning dateTime={dateObj.toDateString()}>
                    <FormattedDate value={dateObj} day="numeric" year="numeric" month="short" />
                  </time>
                )
              }
              if (isValid(dateObjAlternative)) {
                return (
                  <time suppressHydrationWarning dateTime={dateObjAlternative.toDateString()}>
                    <FormattedDate value={dateObjAlternative} day="numeric" year="numeric" month="short" />
                  </time>
                )
              }
              return <Blocks value={value} className="prose-simple" />
            }
            if (isPortableText) {
              return <Blocks value={info.getValue()} className="prose-simple" />
            }
            return info.getValue()
          }
        },
      })
    })
  }, [columnHelper, headerKeys, tableHeaders, variant])

  const reactTable = useReactTable({
    data: columnData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div
      ref={ref}
      id={anchor}
      className={twMerge(`max-w-viewport mx-auto pb-page-content ${id ? 'scroll-mt-topbar' : ''}`, className)}
    >
      {title && (
        <div className="px-layout-sm xl:px-layout-lg">
          {title && <Heading value={title} variant="h3" as="h2" className={'pb-lg'} />}
          {ingress && <Paragraph value={ingress} className="max-w-text text-pretty pb-xl" />}
        </div>
      )}
      <div className="w-full px-layout-sm xl:px-layout-md flex justify-center">
        <div
          className="overflow-x-auto"
          // Scrollable, needs to be keyboard accessible
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
        >
          <Table>
            {tableCaption && <Table.Caption>{tableCaption}</Table.Caption>}
            <Table.Head variant={useBorder ? 'border' : 'zebra'} themeVariant={theme?.title}>
              {reactTable?.getHeaderGroups().map((headerGroup: any) => (
                <Table.Row key={headerGroup.id}>
                  {headerGroup.headers.map((header: any) => (
                    <Table.Cell key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Head>
            <Table.Body variant={useBorder ? 'border' : 'zebra'} themeVariant={theme?.title}>
              {reactTable?.getRowModel().rows.map((row: any) => (
                <Table.Row key={row.id}>
                  {row.getVisibleCells().map((cell: any) => (
                    <Table.Cell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  )
})

export default TableBlock
