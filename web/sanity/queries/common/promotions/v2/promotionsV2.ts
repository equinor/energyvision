import markDefs from '../../blockEditorMarks'

const commonPromotionFields = /* groq */ `
    "type": _type,
    "id": _key,
    title[]{...,${markDefs}},
    ingress[]{...,${markDefs}},
    "designOptions": {
        "background": {
            "backgroundUtility": theme.theme.background.key,
        },
        "foreground": theme.theme.foreground.key,
        layoutGrid,
        gridColumns,
        layoutDirection,
    }
`
export const promotionsV2 = /* groq */ `
${commonPromotionFields},
"promoteList": promoteList[]{
    "id": _key,
    "type": link[0]._type,
    "href": coalesce(
        link[0].href,
        link[0].anchorReference,
        link[0]->slug.current,
    ),
    "image": coalesce(
    link[0]->content->heroFigure.image,
    link[0]->heroImage.image, 
    link[0]->heroFigure.image,
    image),
    "label": coalesce(
    label,
    link[0]->content->title,
    link[0]->title,
    link[0].title,
    )
}
`

export const topicsPromotionV2 = /* groq */ `
${commonPromotionFields},
"promoteList": promoteList[]{
    "id": _key,
    "type": _type,
    "href": reference->slug.current,
    reference->_type == 'route_' + $lang => {
    "label": reference->content->title,
    "image": select(reference->content->heroType == 'loopingVideo' => reference->content->heroLoopingVideo->thumbnail,
    reference->content->heroFigure.image),
    },
}
`
export const externalLinksPromotionV2 = /* groq */ `
${commonPromotionFields},
"promoteList": promoteList[]{
    "id": _key,
    "type": _type,
    "label": title[]{...,${markDefs}},
    image,
    "href":link.href,
}
`
