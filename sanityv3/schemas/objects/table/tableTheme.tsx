import { defineField, defineType } from 'sanity'
import TableThemeSelector, { TableThemeSelectorValue, TableTheme } from './tableThemes'
import { PreviewProps } from 'sanity'

export function TableThemePreview(props: PreviewProps) {
  //@ts-ignore: todo
  const { value } = props
  return (
    <>
      <TableTheme value={value} preview />
    </>
  )
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
