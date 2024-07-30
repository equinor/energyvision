import gridContentFields from '../gridContentFields'
import { iframeCarouselFields } from '../iframeCarouselFields'
import { tableFields } from '../table'
import { videoPlayerCarouselFields } from '../videoPlayerCarouselFields'
import { videoPlayerFields } from '../videoPlayerFields'
import downloadableFileFields from './actions/downloadableFileFields'
import downloadableImageFields from './actions/downloadableImageFields'
import linkSelectorFields, { linkReferenceFields } from './actions/linkSelectorFields'
import background from './background'
import markDefs from './blockEditorMarks'
import { eventPromotionFields, futureEventsQuery, pastEventsQuery } from './promotions/eventPromotion'
import { imageCarouselFields } from './imageCarouselFields'
import { keyNumbersFields } from './keyNumbersFields'
import { noDrafts, sameLang } from './langAndDrafts'
import promoteMagazine from './promotions/promoteMagazine'
import { lastUpdatedTimeQuery, publishDateTimeQuery } from './publishDateTime'

const pageContentFields = /* groq */ `
_type == "keyNumbers" =>{
    ${keyNumbersFields}
  },
  _type == "teaser" => {
    "type": _type,
    "id": _key,
    overline,
    title,
    isBigText,
    "text": select(
      isBigText =>
        bigText[]{..., ${markDefs}},
        text[]{..., ${markDefs}}
      ),
    "designOptions": {
      ${background},
      "imagePosition": coalesce(imagePosition, 'left'),
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
    //Deprecate big text after a while
    isBigText,
    "title": select(
      isBigText =>
        bigTitle[]{..., ${markDefs}},
        title[]{..., ${markDefs}}
      ),
    'useBrandTheme': coalesce(useBrandTheme, false),
    ingress[]{..., ${markDefs}},
    text[]{..., ${markDefs}},
    "callToActions": action[]{
      ${linkSelectorFields},
      ${downloadableFileFields},
      ${downloadableImageFields},
    },
    splitList,
    overrideButtonStyle,
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
    spacing,
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
    "designOptions": {
      ${background},
    },
  },
  _type == "textWithIconArray"=>{
    "type": _type,
    "id": _key,
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
      content[]{
        ...,
        ${markDefs},
      }
    },
    anchor,
    "designOptions": {
      ${background},
    }
  },
  _type == "promoTileArray"=>{
    "type": _type,
    "id": _key,
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
        "ariaLabel": link.ariaLabel,
        "anchorReference": link.anchorReference,
        "link": select(
          link.linkToOtherLanguage == true =>
            link.referenceToOtherLanguage->${linkReferenceFields},
            link.reference->${linkReferenceFields},
        ),
        "href": link.url,
        "type": select(
          defined(link.url) => "externalUrl",
          "internalUrl"
        ),
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
    frameTitle,
    "action": action[0]{
      ${linkSelectorFields},
    },
    url,
    "cookiePolicy": coalesce(cookiePolicy, 'none'),
    "designOptions": {
      "aspectRatio": coalesce(aspectRatio, '16:9'),
      ${background},
      height,
    },
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
        "link":viewAllLink->${linkReferenceFields},
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
          && ${sameLang} && ${noDrafts}
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
          isLink => {
            "cv": {
              "id": _key,
              "type": select(
                defined(url) => "externalUrl", "internalUrl"
               ),
              label,
              ariaLabel,
              "link": select(
                linkToOtherLanguage == true =>
                referenceToOtherLanguage->${linkReferenceFields},
                reference->${linkReferenceFields},
                ),
              "href": url,
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
          promoteSingleUpcomingEvent
        },
        !manuallySelectEvents => {
          tags,
         // @TODO: This query is not done yet
          (!promotePastEvents || !defined(promotePastEvents)) => {
            !useTags => {
              "promotions": ${futureEventsQuery(false)}[0...3]{
                ${eventPromotionFields}
              },
            },
            useTags => {
              "promotions": ${futureEventsQuery(true)}[0...3]{
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
    isHumanRightsRequest
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
    && ${sameLang} && ${noDrafts}
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
  },

  _type == "stockValuesApi"=>{
    "type": _type,
    "id": _key,
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
  _type == "table" => {
    ${tableFields}
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
`

export default pageContentFields
