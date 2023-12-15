import { linkSelectorFields } from './common/actions/linkSelectorFields'
import markDefs from './common/blockEditorMarks'

export const promoCardsArrayFields = /* groq */ `
    "id": _key,
    "type": _type,
    spacing,
    "group": group[]{
        "id": _key,
        ingress[]{..., ${markDefs}},
        "action": ${linkSelectorFields},
        isLink,
        "designOptions": {
            "background": coalesce(background.title, 'none'),
        },
    },
`
