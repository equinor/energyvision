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
  tableHeaders[]{
    "id": _key,
    formatAsDate,
    headerCell[]{
      ...,
      ${markDefs},
    }
  },
  rows[]{
    "id": _key,
    cells[] {
      "type": _type,
      "id": _key,
      content[]{
        ...,
        ${markDefs}
      },
    },
  },
  useBorder,
  theme,
  useFullContainerWidth,
  useInnerContentWidth,
  reducePaddingBottom,
  noPaddingTop
`
