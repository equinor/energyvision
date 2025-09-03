
const tableFunction = /* groq */ `
fn table::getTablefields($table) = $table{
  "type": _type,
  "id": _key,
  title[]{
    ...,
    "markDefs": portableText::markDefs(@),
  },
  ingress[]{
    ...,
    "markDefs": portableText::markDefs(@),
  },
  tableCaption,
  tableHeaders[]{
    "id": _key,
    formatAsDate,
    headerCell[]{
      ...,
      "markDefs": portableText::markDefs(@),
    }
  },
  rows[]{
    "id": _key,
    cells[] {
      "type": _type,
      "id": _key,
      content[]{
        ...,
        "markDefs": portableText::markDefs(@),
      },
    },
  },
  useBorder,
  theme,
  useFullContainerWidth,
  useInnerContentWidth,
  reducePaddingBottom,
  noPaddingTop
};
`
export default tableFunction
