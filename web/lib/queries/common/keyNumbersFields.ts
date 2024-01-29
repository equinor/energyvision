import downloadableFileFields from './actions/downloadableFileFields'
import downloadableImageFields from './actions/downloadableImageFields'
import linkSelectorFields from './actions/linkSelectorFields'
import markDefs from './blockEditorMarks'

export const keyNumbersFields = /*groq*/ ` 
    "type": _type,
    "id" : _key,
    title,
    ingress[]{..., ${markDefs}},
    disclaimer[]{..., ${markDefs}},
    useHorizontalScroll,
    "designOptions": {
        "background": coalesce(background.title, 'White'),
      },
    "action": action[0]{
        ${linkSelectorFields},
        ${downloadableFileFields},
        ${downloadableImageFields},
      },
      "items" : keyNumberItems[]{
        "id": _key,
        keyNumber,
        unit,
        description,
      },
   `
