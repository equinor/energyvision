import downloadableFileFields from './common/actions/downloadableFileFields'
import downloadableImageFields from './common/actions/downloadableImageFields'
import { linkReferenceFields } from './common/actions/linkSelectorFields'
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
        }
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
    "designOptions": {
      "aspectRatio": coalesce(aspectRatio, '16:9'),
      "background": coalesce(background.title, 'none'),
      height,
    },

`
