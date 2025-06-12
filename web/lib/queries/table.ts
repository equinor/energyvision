import downloadableFileFields from './common/actions/downloadableFileFields'
import downloadableImageFields from './common/actions/downloadableImageFields'
import { linkReferenceFields } from './common/actions/linkSelectorFields'
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
  "rows": tableRows[]{
    "id": _key,
    "cells":row[] {
      "type": _type,
      "id": _key,
      "text": tableRichText[] {
        ...,
        ${markDefs}
      },
      label,
      "link": select(
        linkToOtherLanguage == true =>
          referenceToOtherLanguage->${linkReferenceFields},
          reference->${linkReferenceFields},
      ),
      "href": url,
      ${downloadableFileFields},
      ${downloadableImageFields},
      ...
    },
  },
    "theme": coalesce(lower(theme.title), 'grey'),
  "designOptions": {
    "theme": coalesce(lower(theme.title), 'grey'),
    height,
    ${background}
  }
`
