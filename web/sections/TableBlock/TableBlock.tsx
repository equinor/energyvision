import { twMerge } from 'tailwind-merge'
import { forwardRef, useMemo } from 'react'
import { PortableTextBlock } from '@portabletext/types'
import { useReactTable, createColumnHelper, flexRender, getCoreRowModel } from '@tanstack/react-table'
import { toPlainText } from '@portabletext/react'
import { FormattedDate } from '@/core/FormattedDateTime'
import { isValid, parse } from 'date-fns'
import Blocks from '@/portableText/Blocks'
import { ThemeVariants } from '@/core/Table/Table'
import { Table } from '@/core/Table'

export type TableTheme = {
  title?: ThemeVariants
}

export type TableBlockProps = {
  variant?: 'default' | 'import'
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
  tableCaption?: string
  tableHeaders?: any[]
  rows: any
  theme?: TableTheme
  useBorder?: boolean
  useFullContainerWidth?: boolean
  useInnerContentWidth?: boolean
  reducePaddingBottom?: boolean
  noPaddingTop?: boolean
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
    useBorder = false,
    rows,
    anchor,
    className = '',
    useFullContainerWidth = false,
    useInnerContentWidth = false,
    reducePaddingBottom = false,
    noPaddingTop = false,
  },
  ref,
) {
  const headerKeys = useMemo(() => {
    if (variant === 'import') {
      return rows?.[0]?.isHeader ? rows?.[0]?.cells.map((cell: any) => cell) : []
    }
    return Array.isArray(tableHeaders) ? tableHeaders.map((header) => toPlainText(header.headerCell)) : []
  }, [variant, tableHeaders, rows])

  const columnData = useMemo(() => {
    if (!Array.isArray(rows) || !Array.isArray(headerKeys) || headerKeys.length === 0) {
      console.warn('TableBlock: rows or headerKeys missing or empty, returning empty columnData')
      return []
    }
    if (variant === 'import') {
      //First row of import table rows is header row
      return rows?.slice(1)?.map((tableRow: any) => {
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
          return variant === 'import' ? headerKey : <Blocks value={tableHeaders?.[index].headerCell} />
        },
        id: `headercell_${index}_${headerKey}`,
        cell: (info: any) => {
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
                <time suppressHydrationWarning dateTime={dateObj.toDateString()} className="text-base">
                  <FormattedDate datetime={dateObj.toDateString()} day="numeric" year="numeric" month="short" />
                </time>
              )
            }
            if (isValid(dateObjAlternative)) {
              return (
                <time suppressHydrationWarning dateTime={dateObjAlternative.toDateString()} className="text-base">
                  <FormattedDate
                    datetime={dateObjAlternative.toDateString()}
                    day="numeric"
                    year="numeric"
                    month="short"
                  />
                </time>
              )
            }
            return <Blocks value={value} />
          }
          if (isPortableText) {
            return <Blocks value={info.getValue()} />
          }
          return info.getValue()
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
      className={twMerge(
        `${anchor ? 'scroll-mt-topbar' : ''}`,
        className,
        `${noPaddingTop ? 'pt-0' : ''} ${reducePaddingBottom ? 'pb-12' : 'pb-page-content'} `,
      )}
    >
      {title && (
        <div className="px-layout-sm xl:px-layout-lg">
          {title && <Blocks value={title} variant="h2" />}
          {ingress && <Blocks value={ingress} variant="ingress" />}
        </div>
      )}
      <div
        className={`w-full px-layout-sm ${
          useInnerContentWidth ? 'xl:px-layout-lg' : 'xl:px-layout-md'
        } flex justify-center`}
      >
        <div
          className="w-full overflow-x-auto"
          // Scrollable, needs to be keyboard accessible
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
        >
          <Table className={`${useFullContainerWidth ? 'w-full' : 'w-fit'}`}>
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
