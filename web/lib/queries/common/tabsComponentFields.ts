import downloadableFileFields from './actions/downloadableFileFields'
import downloadableImageFields from './actions/downloadableImageFields'
import linkSelectorFields from './actions/linkSelectorFields'
import markDefs from './blockEditorMarks'

export const tabsComponentFields = /*groq*/ ` 
    "type": _type,
    "id" : _key,
    title[]{..., ${markDefs}},
    hideTitle,
    ingress[]{..., ${markDefs}},
    "designOptions":{
        "theme":tabsBackground.background[0]{...},
    },
    tabList[]{
      "id": _key,
      "type": _type,
      title,
      "panel":tabPanel.panel[0]{
          "id": _key,
          "type": _type,
          _type == "tabsKeyNumbers" => {
            "items": keyNumberItems[]{
              "id": _key,
              keyNumber,
              unit,
              description,
            },
            disclaimer[]{..., ${markDefs}},
          },
          _type == "tabsInfoPanel" => {
            image,
            imageVariant,
            title[]{..., ${markDefs}},
            text[]{..., ${markDefs}},
            keyInfo[]{
              "id": _key,
              "type": _type,
              title,
              keyFigure,
              explanation,
            },
            "action": action[0]{
              ${linkSelectorFields},
              ${downloadableFileFields},
              ${downloadableImageFields},
            },
          },
      },
    },
   `
