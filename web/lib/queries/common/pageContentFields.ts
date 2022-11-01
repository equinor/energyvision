import slugReference from './slugReference'
import markDefs from './blockEditorMarks'
import linkSelectorFields from './actions/linkSelectorFields'
import downloadableFileFields from './actions/downloadableFileFields'
import downloadableImageFields from './actions/downloadableImageFields'
import { publishDateTimeQuery } from '../news'
import { eventPromotionFields, pastEventsQuery, futureEventsQuery } from './eventPromotion'
import promoteMagazine from './promotions/promoteMagazine'

const pageContentFields = /* groq */ `
  _type == "teaser" =>{
    "type": _type,
    "id": _key,
    overline,
    title,
    text[]{
      ...,
      ${markDefs},
    },
    "designOptions": {
      "background": coalesce(background.title, 'White'),
      "imagePosition": coalesce(imagePosition, 'left'),
      imageSize,
    },
    "image": image{
      ...,
      "extension": asset-> extension
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
    overline,
    title,
    ingress[]{
      ...,
      ${markDefs},
    },
    text[]{
      ...,
      ${markDefs},
    },
    "callToActions": action[]{
      ${linkSelectorFields},
      ${downloadableFileFields},
      ${downloadableImageFields},
    },
    splitList,
    overrideButtonStyle,
    anchor,
    "designOptions": {
      "background": coalesce(background.title, 'White'),
    },
  },
  _type == "fullWidthImage"=>{
    "type": _type,
    "id": _key,
    image
  },
  _type == "figure"=>{
    "type": _type,
    "id": _key,
      // For these images, we don't want crop and hotspot
  // because we don't know the aspect ratio
    "figure": figure{
      _type,
        "image": {
          "asset": image.asset,
          "alt": image.alt,
        },
      attribution,
      caption
    },
    "designOptions": {
      "background": coalesce(background.title, 'White'),
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
      "background": coalesce(background.title, 'none'),
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
      "background": coalesce(background.title, 'White'),
      "imagePosition": coalesce(imagePosition, 'right'),
    }
  },
  _type == "accordion" => {
    "type": _type,
    "id": _key,
    title,
    ingress[]{
      ...,
      ${markDefs},
    },
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
      "background": coalesce(background.title, 'none'),
    }
  },
  _type == "promoTileArray"=>{
    "type": _type,
    "id": _key,
    "group": group[]{
      "id": _key,
      title,
      "image": {
        "asset": image.asset,
        "alt": image.alt,
      },
      "action": {
        "label": link.label,
        "ariaLabel": link.ariaLabel,
        "anchorReference": link.anchorReference,
        "link": link.reference-> {
          "type": _type,
          "slug": ${slugReference}
        },
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
        "background": coalesce(background.title, 'none'),
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
      "background": coalesce(background.title, 'none'),
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
          && _lang == $lang
          && (
            count(tags[_ref in ^.^.tags[]._ref]) > 0
            ||
            count(countryTags[_ref in ^.^.countryTags[]._ref]) > 0
            ||
            localNewsTag._ref in ^.localNewsTags[]._ref
          )
          && !(_id in path("drafts.**"))
        ] | order(${publishDateTimeQuery} desc)[0...3]{
          "type": _type,
          "id": _id,
          "updatedAt": _updatedAt,
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
        "promotions": references[]{
         "id": _key,
         "type": _type,
          ingress[]{
            ...,
            ${markDefs},
          },
          "slug": reference->slug.current,

          reference->_type == 'route_' + $lang => {
            "title": reference->content->title,
            "heroImage": reference->content->heroFigure,
            "openGraphImage": reference->content->openGraphImage,
          },

         reference->_type == 'magazine' => {
          "title": reference->title,
          "heroImage": reference->heroFigure,
          "openGraphImage": reference->openGraphImage,
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
              "link": reference-> {
                "type": _type,
                "slug": slug.current,
              },
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
        },
        !manuallySelectEvents => {
          tags,
         // @TODO: This query is not done yet
          (!promotePastEvents || !defined(promotePastEvents)) => {
            !useTags => {
              "promotions": ${futureEventsQuery(false)}{
                ${eventPromotionFields}
              },
            },
            useTags => {
              "promotions": ${futureEventsQuery(true)}{
                ${eventPromotionFields}
              },
            }
          },
          promotePastEvents=>{
            !defined(tags) => {
              "promotions": ${pastEventsQuery(false)}{
                ${eventPromotionFields}
              },
            },
            defined(tags) => {
              "promotions": ${pastEventsQuery()}{
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
      "background": coalesce(background.title, 'none'),
    },
  },
  _type == "table" => {
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
    tableHeaders[]{
      "id": _key,
      headerCell[]{
        ...,
        ${markDefs},
      }

    },
    tableRows[]{
      "id": _key,
       row[]{
         "type": _type,
        "id": _key,
        label,
  	    "link": reference-> {
        "type": _type,
        "slug": slug.current,
      },
       "href": url,

      ${downloadableFileFields},
      ${downloadableImageFields}, ...},

    },
    "designOptions": {
      "aspectRatio": coalesce(aspectRatio, '16:9'),
      "background": coalesce(background.title, 'none'),
      height,
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
      && _lang == $lang
      && (
        count(tags[_ref in ^.^.selectedTags.tags[]._ref]) > 0
      ||
        count(countryTags[_ref in ^.^.selectedTags.countryTags[]._ref]) > 0
      ||
        localNewsTag._ref in ^.selectedTags.localNewsTags[]._ref
    )
    && !(_id in path("drafts.**"))
    ] | order(${publishDateTimeQuery} desc){
      "type": _type,
      "id": _id,
      "updatedAt": _updatedAt,
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
      "background": coalesce(background.title, 'White'),
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
      "background": coalesce(background.title, 'White'),
    },
  },

  _type == "anchorLink" =>{
    "type": _type,
    "id": _key,
    anchorReference
  },

  _type == "video" =>{
    "type": _type,
    "id": _key,
    title,
    ingress[]{
        ...,
        ${markDefs},
      },
	  "asset":video.asset->{
      playbackId,
			},
    "designOptions": {
      "background": coalesce(background.title, 'White'),
    },
  }

`

export default pageContentFields
