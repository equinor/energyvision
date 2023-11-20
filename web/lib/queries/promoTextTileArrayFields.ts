import { linkSelectorFields } from './common/actions/linkSelectorFields'
import markDefs from './common/blockEditorMarks'

export const promoTextTileArrayFields = /* groq */ `
    "id": _key,
    "type": _type,
    spacing,
    "group": group[]{
        "id": _key,
        ingress[]{..., ${markDefs}},
        showLinkLabel,
        "action": ${linkSelectorFields},
        "designOptions": {
            "background": coalesce(background.title, 'none'),
        },
    },
`
