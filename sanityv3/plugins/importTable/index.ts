import { definePlugin, defineType } from 'sanity'
import { createTableComponent, TableComponent } from './src/TableComponent'
import { TablePreview } from './src/TablePreview'

export type { TableProps, TableRow, TableValue } from './src/TableComponent'

export { TableComponent, TablePreview }

export interface TableConfig {
  rowType?: string
}

export const table = definePlugin<TableConfig | void>((config) => {
  const tableRowSchema = defineType({
    title: 'Table Row',
    name: config?.rowType || 'tableRow',
    type: 'object',
    fields: [
      {
        name: 'isHeader',
        type: 'boolean',
      },
      {
        name: 'cells',
        type: 'array',
        of: [{ type: 'string' }],
      },
    ],
  })

  const tableSchema = defineType({
    title: 'Table',
    name: 'csvTable',
    type: 'object',
    fields: [
      {
        name: 'rows',
        type: 'array',
        of: [
          {
            type: tableRowSchema.name,
          },
        ],
      },
    ],
    components: {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      input: createTableComponent(tableRowSchema.name) as any,
      preview: TablePreview as any,
      /* eslint-enable @typescript-eslint/no-explicit-any */
    },
    preview: {
      select: {
        rows: 'rows',
        title: 'title',
      },
      prepare: ({ title, rows = [] }) => ({
        title,
        rows,
      }),
    },
  })

  return {
    name: 'csvTable',
    schema: {
      types: [tableRowSchema, tableSchema],
    },
  }
})
