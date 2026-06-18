import { defineField, type PreviewProps } from 'sanity'
import TableThemeSelector, { TableTheme } from './tableThemes'

export function TableThemePreview(props: PreviewProps) {
  //@ts-ignore: todo
  const { value } = props
  return <TableTheme value={value} preview />
}

export default {
  type: 'object',
  name: 'tableTheme',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
  ],
  components: {
    input: (props: any) => {
      return <TableThemeSelector {...props} />
    },
    preview: TableThemePreview,
  },
  preview: {
    select: {
      title: 'title',
    },
  },
}
