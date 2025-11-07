import markDefs from '../../blockEditorMarks'

const commonPromotionFields = /* groq */ `
    "type": _type,
    "id": _key,
    title[]{...,${markDefs}},
    ingress[]{...,${markDefs}},
    "designOptions": {
        "background": {
            "backgroundUtility": theme.theme.background.key
        },
        "foreground": theme.theme.foreground.key,
        layoutGrid,
        gridColumns,
        layoutDirection
    }
`

export const topicsPromotionV2 = /* groq */ `
${commonPromotionFields},
"promoteList": promoteList[]{
    "id": _key,
    "type": _type,
    "slug": reference->slug.current,
    reference->_type == 'route_' + $lang => {
    "title": reference->content->title,
    "image": select(reference->content->heroType == 'loopingVideo' => reference->content->heroLoopingVideo->thumbnail,
    reference->content->heroFigure.image),
    },
},
`
export const externalLinksPromotionV2 = /* groq */ `
${commonPromotionFields},
"promoteList": promoteList[]{
    "id": _key,
    "type": _type,
    title[]{...,${markDefs}},
    image,
    link,
},
`
