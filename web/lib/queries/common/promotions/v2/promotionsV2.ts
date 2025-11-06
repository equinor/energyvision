import markDefs from '../../blockEditorMarks'
import { sameLang } from '../../langAndDrafts'
import { lastUpdatedTimeQuery, publishDateTimeQuery } from '../../publishDateTime'

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
    ingress[]{...,${markDefs},},
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
    ingress[]{...,${markDefs}},
    image,
    link,
},
`

export const newsPromotion = /* groq */ `
${commonPromotionFields},
    "tags": tags[]->{
        "id": _id,
        key,
        title,
    },
    "countryTags": countryTags[]->{
        "id": _id,
        _type,
        title,
    },
    "localNewsTags": localNewsTags[]->{
        "id": _id,
        _type,
    },
    "promotions": *[
        (_type == "news" || _type == "localNews")
        && (
        count(tags[_ref in ^.^.tags[]._ref]) > 0
        ||
        count(countryTags[_ref in ^.^.countryTags[]._ref]) > 0
        ||
        localNewsTag._ref in ^.localNewsTags[]._ref
        )
        && ${sameLang}
    ] | order(${publishDateTimeQuery} desc)[0...3]{
        "type": _type,
        "id": _id,
        "updatedAt":  ${lastUpdatedTimeQuery},
        title,
        heroImage,
        "publishDateTime": ${publishDateTimeQuery},
        "slug": slug.current,
        ingress[]{
        ...,
        ${markDefs},
        },
    }
`
