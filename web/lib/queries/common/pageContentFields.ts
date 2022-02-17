import slugReference from './slugReference'
import markDefs from './blockEditorMarks'
import linkSelectorFields from './actions/linkSelectorFields'
import downloadableFileFields from './actions/downloadableFileFields'
import downloadableImageFields from './actions/downloadableImageFields'

const pageContentFields = /* groq */ `
  _type == "teaser"=>{
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
        "isStatic": coalesce(link.isStatic, false),
        "link": link.reference-> {
          "type": _type,
          "slug": ${slugReference}
        },
        "href": link.url,
        "staticUrl": link.staticUrl,
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
  _type == "remitTable" => {
    "type": _type,
    "id": _key,
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
        "promotions": *[_type == "news" && _lang == $lang && count(tags[_ref in ^.^.tags[]._ref]) > 0] | order(publishDateTime desc, _updatedAt desc)[0...3]{
          "type": _type,
          "id": _id,
          "updatedAt": _updatedAt,
          title,
          heroImage,
          "publishDateTime": coalesce(publishDateTime, _createdAt),
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
         "title": reference->content->title,
         "heroImage": reference->content->heroFigure,
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

        manuallySelectEvents,
        !manuallySelectEvents => {
          tags,
         // @TODO: This query is not done yet
          "promotions": *[_type match "route_" + $lang + "*" && content->_type == "event"  && content->eventDate.date >= $date ]{
            "type": "events",
            "id": _id,
            "slug": slug.current,
            "title": content->title,
            "location": content->location,
            "eventDate": content->eventDate,
          },
        },
        manuallySelectEvents => {
          "promotions": promotedEvents[]->{
            "type": "events",
            "id": _id,
            "slug": slug.current,
            "title": content->title,
            "location": content->location,
            "eventDate": content->eventDate,

          },
        },
      },
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
        "isStatic": coalesce(isStatic, false),
  	    "link": reference-> {
        "type": _type,
        "slug": slug.current,
      },
       "href": url,
      "staticUrl": staticUrl,
     
      ${downloadableFileFields},
      ${downloadableImageFields}, ...},
     
    },
    "designOptions": {
      "aspectRatio": coalesce(aspectRatio, '16:9'),
      "background": coalesce(background.title, 'none'),
      height,
    },
  },
  _type == "subscribeForm" => {
    "type": _type,
    "id": _key,
    title,
  },
  _type == "cookieDeclaration" => {
    "type": _type,
    "id": _key,
  },
`

export default pageContentFields
