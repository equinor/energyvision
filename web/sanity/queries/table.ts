import downloadableFileFields from './common/actions/downloadableFileFields'
import downloadableImageFields from './common/actions/downloadableImageFields'
import background from './common/background'
import markDefs from './common/blockEditorMarks'

export const tableFields = /* groq */ `
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
  tableHeaders[]{
    "id": _key,
    headerCell[]{
      ...,
      ${markDefs},
    }
  },
  tableRows[]{
    "id": _key,
    row[] {
      "type": _type,
      "id": _key,
      "text": tableRichText[] {
        ...,
        ${markDefs}
      },
      label,
      ...links::getLinkFields(link[0]),
      ${downloadableFileFields},
      ${downloadableImageFields},
      ...
    },
  },
  "designOptions": {
    "theme": coalesce(lower(theme.title), 'grey'),
    height,
    ${background}
  }
`
