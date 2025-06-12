import markDefs from './common/blockEditorMarks'

export const tableV2Fields = /* groq */ `
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
