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
        "theme":coalesce(tabsBackground.background[0]{value}.value, 0),
    },
    layoutGrid,
    tabList[]{
      "id": _key,
      "type": _type,
      title,
      "panel":select(
        tabPanel.panelType == "tabsKeyNumbers" => tabPanel.keyNumbersPanel{
          "id": _key,
          "type": _type,
          "items": keyNumberItems[]{
            "id": _key,
            keyNumber,
            unit,
            description,
          },
          disclaimer[]{..., ${markDefs}},
        },
        tabPanel.panelType == "tabsInfoPanel" => tabPanel.infoPanel{
          "id": _key,
          "type": _type,
          image,
          caption,
          imageVariant,
          backgroundPosition,
          title[]{..., ${markDefs}},
          text[]{..., ${markDefs}},
          keyInfoTitle,
          keyInfo[]{
            "id": _key,
            "type": _type,
            title,
            keyFigure,
            explanation,
          },
          "actions": action[]{
            ${linkSelectorFields},
            ${downloadableFileFields},
            ${downloadableImageFields},
          },
        },
        tabPanel.panel[0]{
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
            caption,
            imageVariant,
            backgroundPosition,
            title[]{..., ${markDefs}},
            text[]{..., ${markDefs}},
            keyInfoTitle,
            keyInfo[]{
              "id": _key,
              "type": _type,
              title,
              keyFigure,
              explanation,
            },
            "actions": action[]{
              ${linkSelectorFields},
              ${downloadableFileFields},
              ${downloadableImageFields},
            },
          },
        }
      ),
    },
   `
