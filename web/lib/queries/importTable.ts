import markDefs from './common/blockEditorMarks'

export const importTableFields = /* groq */ `
  "type": _type,
  "id": _key,
  title[]{
    ...,
    ${markDefs},
  },
  ingress[]{
    ...,
    ${markDefs},
  },
  tableCaption,
  "rows": importedTable.rows,
  useBorder,
  theme
`
