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
    ...links::getLinkFields(linkSelector.link[0]),
    "label": coalesce(
        linkSelector.label,
        select(
        linkSelector.link[0]._type =="reference" || linkSelector.link[0]._type =="referenceToOtherLanguage" => 
            coalesce(linkSelector.link[0]->content->title, linkSelector.link[0]->title),
            "",
        ),
        ),
    "image": coalesce(
    linkSelector.link[0]->content->heroFigure.image,
    linkSelector.link[0]->heroImage.image, 
    linkSelector.link[0]->heroFigure.image,
    image),
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
