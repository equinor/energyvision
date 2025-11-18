import background from '../background'
import markDefs from '../blockEditorMarks'
import { sameLang } from '../langAndDrafts'
import { lastUpdatedTimeQuery, publishDateTimeQuery } from '../publishDateTime'
import { eventPromotionFields, futureEventsQuery, pastEventsQuery } from './eventPromotion'
import promoteMagazine from './promoteMagazine'

const commonPromotionFields = /* groq */ `
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
    "viewAllLink": {
    "label": viewAllLinkLabel,
    ...links::getLinkFields(viewAllLink),
    },
    "designOptions": {
      ${background},
    }
`
export const eventPromotion = /* groq */ `
    ${commonPromotionFields},
    promotionType,
    promotePastEvents,
    promotionType == "manual" => {
        "promotions": promotedEvents[]->{
            "type": "events",
            "id": _id,
            "slug": slug.current,
            "title": content->title,
            "location": content->location,
            "eventDate": content->eventDate,
            "ingress": content->ingress,
        },
    },
    promotionType == "automatic" => {
    "tags": tags[]->{
        "id": _id,
        key,
        title,
    },
    eventsCount,
    promotePastEvents,
    (!promotePastEvents) => {
        (!defined(tags) || count(tags) <= 0) => {
              "promotions": ${futureEventsQuery(false)}[]{
                 ${eventPromotionFields}
              },
        },
        (defined(tags) && count(tags) > 0) => {
              "promotions": ${futureEventsQuery(true)}[]{
                 ${eventPromotionFields}
              },
            },
    },
    (promotePastEvents) => {
        (!defined(tags) || count(tags) <= 0) => {
              "promotions": ${pastEventsQuery(false)}{
                 ${eventPromotionFields}
              },
        },
        (defined(tags) && count(tags) > 0) => {
              "promotions": ${pastEventsQuery(true)}{
                 ${eventPromotionFields}
              },
            },
    },
    }
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
export const peoplePromotion = /* groq */ `
    ${commonPromotionFields},
    "promotions": peopleList[]{
    "id": _key,
    "type": _type,
    image,
    name,
    title,
    department,
    enableStructuredMarkup,
    isLink,
    !isLink => {
        email,
        phone,
        },
    isLink => linkSelector{
        "cv": {
            label,
            "aria-label":ariaLabel,
            ...links::getLinkFields(link[0]),
            anchorReference,
        },
        },
    }
`
export const magazinePromotion = /* groq */ `
    ${commonPromotionFields},
    ${promoteMagazine}
`

export const topicsPromotion = /* groq */ `
${commonPromotionFields},
        "promotions": references[0...3]{
         "id": _key,
         "type": _type,
          ingress[]{
            ...,
            ${markDefs},
          },
          "slug": reference->slug.current,

          reference->_type == 'route_' + $lang => {
            "title": reference->content->title,
            "heroImage": select(
              reference->content->heroType == 'loopingVideo' =>
                { "image": reference->content->heroLoopingVideo->thumbnail },
                reference->content->heroFigure),
            "openGraphImage": reference->content->openGraphImage,
            "heroType": coalesce(reference->content->heroType, 'default'),
          },

         reference->_type == 'magazine' => {
          "title": reference->title,
          "heroImage": select(
              reference->heroType == 'loopingVideo' =>
                { "image": reference->heroLoopingVideo->thumbnail },
                reference->heroFigure),
          "openGraphImage": reference->openGraphImage,
          "heroType": coalesce(reference->content->heroType, 'default'),
         },
       },`
