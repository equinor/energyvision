import gridContentFields from '../gridContentFields'
import { iframeCarouselFields } from '../iframeCarouselFields'
import { importTableFields, tableV2Fields } from '../table'
import { videoPlayerCarouselFields } from '../videoPlayerCarouselFields'
import { videoPlayerFields } from '../videoPlayerFields'
import downloadableFileFields from './actions/downloadableFileFields'
import downloadableImageFields from './actions/downloadableImageFields'
import linkSelectorFields from './actions/linkSelectorFields'
import { anchorLinkReferenceFields } from './anchorLinkReferenceFields'
import background from './background'
import markDefs from './blockEditorMarks'
import homepageContentFields from './homepageContentFields'
import { imageCarouselFields } from './imageCarouselFields'
import { keyNumbersFields } from './keyNumbersFields'
import { sameLang } from './langAndDrafts'
import {
  eventPromotion,
  magazinePromotion,
  newsPromotion,
  peoplePromotion,
  topicsPromotion,
} from './promotions/allPromotions'
import {
  eventPromotionFields,
  futureEventsQuery,
  pastEventsQuery,
} from './promotions/eventPromotion'
import promoteMagazine from './promotions/promoteMagazine'
import {
  externalLinksPromotionV2,
  promotionsV2,
  topicsPromotionV2,
} from './promotions/v2/promotionsV2'
import { lastUpdatedTimeQuery, publishDateTimeQuery } from './publishDateTime'
import { tabsComponentFields } from './tabsComponentFields'

const pageContentFields = /* groq */ `
_type == "keyNumbers" =>{
    ${keyNumbersFields}
  },
  _type == "teaser" => {
    "type": _type,
    "id": _key,
    overline,
    title,
    "content": text[]{..., ${markDefs}},
    "designOptions": {
      ${background},
      "imagePosition": coalesce(imagePosition, 'left'),
      containImage,
      imageSize,
    },
    "image": image {
      ...,
      "extension": asset-> extension
    },
    "actions": action[]{
      ${linkSelectorFields},
      ${downloadableFileFields},
      ${downloadableImageFields},
    },
    useResourceLinks
  },

  _type == "textTeaser" => {
    "type": _type,
    "id": _key,
    title,
    "text": text[]{..., ${markDefs}},
    "designOptions": {
      "theme": coalesce(theme.value, 0),
      "titlePosition": coalesce(titlePosition, 'left'),
    },
    "action": action[0]{
      ${linkSelectorFields},
      ${downloadableFileFields},
      ${downloadableImageFields},
    },
  },
  _type == "textBlock"=>{
    "type": _type,
    "id": _key,
    image,
    overline,
    title[]{..., ${markDefs}},
    'useBrandTheme': coalesce(useBrandTheme, false),
    ingress[]{..., ${markDefs}},
    text[]{..., ${markDefs}},
    "callToActions": action[]{
      ${linkSelectorFields},
      ${downloadableFileFields},
      ${downloadableImageFields},
    },
    splitList,
    "designOptions": {
      ${background},
    },
  },
  _type == "fullWidthImage"=>{
    "type": _type,
    "id": _key,
    image,
    "designOptions": {
      "aspectRatio": coalesce(aspectRatio, '10:3'),
    },
  },
  _type == "fullWidthVideo"=>{
    "type": _type,
    "id": _key,
    ${videoPlayerFields}
  },
  _type == "figure"=>{
    "type": _type,
    "id": _key,
    "figure": figure{
      _type,
      image,
      attribution,
      caption
    },
    "alignWithText": coalesce(alignWithText, false),
    "designOptions": {
      ${background},
      "aspectRatio": coalesce(aspectRatio, '16:9'),
    },
  },
  _type == "textWithIconArray"=>{
    "type": _type,
    "id": _key,
    title[]{
        ...,
        ${markDefs},
      },
    hideTitle,
    "group": group[]{
      "id": _key,
      title,
      text[]{
        ...,
        ${markDefs},
      },
      icon
    },

    "designOptions": {
      ${background},
    },
  },
  _type == "pullQuote" => {
    "type": _type,
    "id": _key,
    author,
    authorTitle,
    image,
    quote,
    "designOptions": {
      ${background},
      "imagePosition": coalesce(imagePosition, 'right'),
    }
  },
  _type == "accordion" => {
    "type": _type,
    "id": _key,
    title,
    image,
    ingress[]{
      ...,
      ${markDefs},
    },
    enableStructuredMarkup,
    "accordion": accordion[]{
      "id": _key,
      title,
      image,
      content[]{
        ...,
        ${markDefs},
      },
      links[]{
      ${linkSelectorFields},
    },
    },
    "designOptions": {
      ${background},
    }
  },
  _type == "promoTileArray"=>{
    "type": _type,
    "id": _key,
    title,
    "hideTitle":coalesce(hideTitle, false),
    ingress,
    "useHorizontalScroll": useHorizontalScroll,
    "group": group[]{
      "id": _key,
      title,
      linkLabelAsTitle,
      "image": {
        "asset": image.asset,
        "alt": image.alt,
      },
      "action": {
        "label": link.label,
        "aria-label": link.ariaLabel,
        ...links::getLinkFields(link.link[0])
      },
      "image": image{
        ...,
        "extension": asset-> extension
      },
      "designOptions": {
        ${background},
      },
    },
  },
  _type == "iframe" => {
    "type": _type,
    "id": _key,
    title,
    ingress[]{
      ...,
      ${markDefs},
    },
    description[]{
      ...,
      ${markDefs},
    },
    "transcript":transcript.text[]{
      ...,
      ${markDefs},
    },
    frameTitle,
    "action": action[0]{
      ${linkSelectorFields},
    },
    url,
   cookiePolicy,
    "designOptions": {
      "aspectRatio": coalesce(aspectRatio, '16:9'),
      ${background},
      height,
    },
  },
  _type == "promoteEvents" => {
    ${eventPromotion}
  },
  _type == "promoteNews" => {
    ${newsPromotion}
  },
  _type == "promoteMagazine" => {
    ${magazinePromotion}
  },
  _type == "promotePeople" => {
    ${peoplePromotion}
  },
    _type == "promoteTopics" => {
    ${topicsPromotion}
  },
  _type == "promotion" => {
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
    "useHorizontalScroll": useHorizontalScroll,
    "viewAllLink": {
        "label": viewAllLinkLabel,
        ...links::getLinkFields(viewAllLink),
    },
    "content": promotion[0]{
      "id": _key,
      "type": _type,
      _type == "promoteNews" => {
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
        },
      },
      _type == "promoteTopics" => {
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
       },
      },
      _type == "promotePeople" => {
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
        },
      },
      _type == "promoteEvents" => {
        "id": _key,
        "eventPromotionSettings":{
          manuallySelectEvents,
          promotePastEvents,
          pastEventsCount,
          upcomingEventsCount,
          promoteSingleUpcomingEvent
        },
        !manuallySelectEvents => {
          tags,
         // @TODO: This query is not done yet
          (!promotePastEvents || !defined(promotePastEvents)) => {
            !useTags => {
              "promotions": ${futureEventsQuery(false)}[]{
                ${eventPromotionFields}
              },
            },
            useTags => {
              "promotions": ${futureEventsQuery(true)}[]{
                ${eventPromotionFields}
              },
            },
          },
          promotePastEvents=>{
            !useTags => {
              "promotions": ${pastEventsQuery(false)}{
                ${eventPromotionFields}
              },
            },
            useTags => {
              "promotions": ${pastEventsQuery(true)}{
                ${eventPromotionFields}
              },
            }
          },
        },
        manuallySelectEvents => {
          "promotions": promotedEvents[]->{
            ${eventPromotionFields}
          },
        },
      },
      _type == "promoteMagazine" => {
        ${promoteMagazine}
      }
    },
    "designOptions": {
      ${background},
    },
  },
  _type == "cookieDeclaration" => {
    "type": _type,
    "id": _key,
    title,
  },
  _type == "form" => {
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
    "form": form,
    "downloads": downloads[]{${downloadableFileFields}},
  },

  _type == "newsList" => {
    "type": _type,
    "id": _key,
    title[]{
      ...,
      ${markDefs},
    },
    "tags": selectedTags.tags[]->{
      "id": _id,
    },
    "countryTags": selectedTags.countryTags[]->{
      "id": _id,
    },
    "localNewsTags": selectedTags.localNewsTags[]->{
      "id": _id,
    },
    "articles": *[
      (_type == "news" || _type == "localNews")
      && (
        count(tags[_ref in ^.^.selectedTags.tags[]._ref]) > 0
      ||
        count(countryTags[_ref in ^.^.selectedTags.countryTags[]._ref]) > 0
      ||
        localNewsTag._ref in ^.selectedTags.localNewsTags[]._ref
    )
    && ${sameLang}
    ] | order(${publishDateTimeQuery} desc){
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
    },
    "designOptions": {
        "background": {
            "backgroundUtility": selectedTags.theme.theme.background.key,
        },
        "foreground": selectedTags.theme.theme.foreground.key,
    }
  },

  _type == "stockValuesApi"=>{
    "type": _type,
    "id": _key,
    title, 
    hideTitle,
    "designOptions": {
      ${background},
    },
  },

  _type == "twitterEmbed"=>{
    "type": _type,
    "id": _key,
    embedType,
    embedValue,
    title,
    ingress[]{
        ...,
        ${markDefs},
      },
    "designOptions": {
      ${background},
    },
  },

  _type == "anchorLink" =>{
    "type": _type,
    "id": _key,
    anchorReference
  },

  _type == "imageCarousel" =>{
    ${imageCarouselFields}
  },
  _type == "iframeCarousel" =>{
    ${iframeCarouselFields}
  },
  _type == "videoPlayer" => {
    ${videoPlayerFields}
  },
  _type == "videoPlayerCarousel" => {
    ${videoPlayerCarouselFields}
  },
    _type == "tableV2" => {
    ${tableV2Fields}
  },
    _type == "importTable" => {
    ${importTableFields}
  },
  _type == "cardsList" => {
    "type": _type,
    "id": _key,
    title,
    "cards": cards[]{
        "type": _type,
        "id": _key,
        title,
        "content": defined(content[]){..., ${markDefs}},
        ...,
      },
    "designOptions": {
      ${background},
    },
  },
  _type == "grid" => {
    "type": _type,
    "id": _key,
    title,
    "gridRows": gridRows[]{
        "type": _type,
        "id": _key,
        _type == "span3" => {
          "type": _type,
        "id": _key,
        "content": content[0] {
          ${gridContentFields}
        },
        },
        _type == "span2and1" => {
          "type": _type,
        "id": _key,
          alignSpan2Right,
          "span2": {
          "content": span2[0] {
            ${gridContentFields}
          }
          },
          "singleColumn": {
          "content": singleColumn[0] {
            ${gridContentFields}
          },
        }
      },
      _type == "threeColumns" => {
        "type": _type,
        "id": _key,
          "columns": columns[]{
            ${gridContentFields}
          }
      }
      },
  },
  _type == "campaignBanner" => {
    "type": _type,
    "id": _key,
    "title": title[]{..., ${markDefs}},
    "designOptions":{
      "background": {
        "backgroundImage":{ 
          "image": backgroundImage 
        },
      "backgroundColor": coalesce(backgroundColor.title, 'White'),
      "dark": coalesce(backgroundColor.dark, false),
      "backgroundUtility":coalesce(backgroundColor.key, ""),
      }
    },
  },
  _type == "anchorLinkList" => {
    "type": _type,
    "id": _key,
    title,
    columns,
    "anchorList":anchorList[]{
     ${anchorLinkReferenceFields}
    }
  },
  _type == "imageForText" => {
    "type": _type,
    "id": _key,
    "content": content[]{..., ${markDefs}},
    "aspectRatio": coalesce(aspectRatio, '16:9'),
    "image": image {
      ...,
      "extension": asset-> extension
    },
  },
  _type == "tabs"=>{
    ${tabsComponentFields}
  },
  _type == "tableV2" => {"table": table::getTablefields(@)},
  //Remove from here and place with homepage template query only
  ${homepageContentFields},
  _type == "pieChartBlock" => {
    "type": _type,
    "id": _key,
    title,
    hideTitle,
    "chartData": chartData{
      "type": _type,
      "id": _key,
      ...,
    }
  },
    _type == "barChartBlock" ||  _type == "lineChartBlock" => {
    "type": _type,
    "id": _key,
    title,
    hideTitle,
    useLayoutMd,
    useTextWidth,
    "charts": charts[]{
      "type": _type,
      "id": _key,
      ...,
    }
  },
  //Remove promoteTopicsV2 and promoteExternalLinkV2 when the combined promotionsV2/promotiles is done testing
  _type == "promoteTopicsV2" => {
    ${topicsPromotionV2},
  },
  _type == "promoteExternalLinkV2" => {
    ${externalLinksPromotionV2},
  },
  _type == "promotionsV2" => {
       ${promotionsV2},
  },

`

export default pageContentFields
