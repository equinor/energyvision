const newsFields = /* groq */ `
  "id": _id,
  "updatedAt": _updatedAt,
  title,
  heroImage,
  "publishDateTime": coalesce(publishDateTime, _createdAt),
  "slug": slug.current,
  ingress,
`

const pageContentFields = /* groq */ `
_type == "teaser"=>{
          "type": _type,
          "id": _key,
          overline,
          title,
          text,
          "designOptions": {
            "background": coalesce(background.title, 'White'),
            "imagePosition": coalesce(imagePosition, 'left'),
            imageSize,
          },
          "action": {
            "label": link.label,
            "link": link.reference-> {
              "type": _type,
              "slug": slug.current
            },
            "href": link.url,
          },
          "image": image{
            ...,
            "extension": asset-> extension
          }  
        },
        _type == "textBlock"=>{
          "type": _type,
          "id": _key,
          overline,
          title,
          ingress,
          text,
          "callToActions": action[]{
              _type == "internalUrl" => {
                "type": _type,
                "id": _key,
                label,
                "link": reference-> {
                  "type": _type,
                  "slug": slug.current
                },
              },
              _type == "externalUrl" => {
                "id": _key,
                "type": _type,
                label,
                "href": url,
              },
              _type == "downloadableFile" => {
                "id": _key,
                "type": _type,
                "label": filename,
                "href": file.asset-> url,
                "extension": file.asset-> extension 
              },
              _type == "downloadableImage" => {
                "id": _key,
                "type": _type,
                label,
                "href": image.asset-> url, 
                "extension": image.asset-> extension 
              },
            },
      
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
            text,
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
            "imagePosition": coalesce(imagePosition, 'right'),
          }
        },
        _type == "accordion" => {
          "type": _type,
          "id": _key,
          title,
          ingress[]{
            ...,
            "markDefs": markDefs[]{
              ...,
              _type == "internalLink" => {
                "internalLink": reference->{
                  name,
                  "id": slug.current,
                  "type": _type,
                },
              },
            }, 
          },
          "accordion": accordion[]{
            "id": _key,
            title,
            content[]{
              ...,
              "markDefs": markDefs[]{
                ...,
                _type == "internalLink" => {
                  "internalLink": reference->{
                    name,
                    "id": slug.current,
                    "type": _type,
                  },
                },
              }, 
            }
          },
          "designOptions": {
            "background": coalesce(background.title, 'none'),
          }
        }
`

export const allNewsQuery = /* groq */ `
*[_type == "news"] | order(publishDateTime desc, _updatedAt desc) {
  ${newsFields}
}`

export const newsQuery = /* groq */ `
{
  "news": *[_type == "news" && slug.current == $slug] | order(_updatedAt desc)[0] {
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    openGraphImage,
    "content": content[]{
      ...,
      _type == "pullQuote" => {
        "type": _type,
        "id": _key,
        author,
        authorTitle,
        image,
        quote,
        "designOptions": {
          "imagePosition": coalesce(imagePosition, 'right'),
        }
      },
      _type == "positionedInlineImage" => {
        ...,
        // For these images, we don't want crop and hotspot
        // because we don't know the aspect ratio
        "image": image{
          _type,
          "asset": asset,
          "alt": alt
        }
      },
      "markDefs": markDefs[]{
        ...,
        _type == "internalLink" => {
          "internalLink": reference->{
            name,
            "id": slug.current,
            "type": _type,
          },
        },
      }, 
    },
    "relatedLinks": relatedLinks{
      title,
      heroImage,
      "links": links[]{
        _type == "internalUrl" => {
        "type": _type,
        "id": _key,
        label,
        "link": reference-> {
          "type": _type,
          "slug": slug.current
        },
      },
      _type == "externalUrl" => {
          "id": _key,
          "type": _type,
          label,
          "href": url,
        },
      _type == "downloadableFile" => {
        "id": _key,
        "type": _type,
        "label": filename,
        "href": file.asset-> url,
        "extension": file.asset-> extension 
      },
      _type == "downloadableImage" => {
        "id": _key,
        "type": _type,
        label,
        "href": image.asset-> url, 
        "extension": image.asset-> extension 
      },
    }
  },
    ${newsFields}
  },
  "latestNews": *[_type == "news" && slug.current != $slug] | order(publishDateTime desc, _updatedAt desc)[0...3] {
    ${newsFields}
  }
}`

export const newsSlugsQuery = /* groq */ `
*[_type == "news" && defined(slug.current)][].slug.current
`

// @TODO: why does the 'match' filter in groq not work here?
// "&& _id match $id" where $id = the base id without __i18n
export const queryLocalizedNewsById = /* groq */ `
*[_type == "news" && !(_id in path("drafts.**")) && _id == $id_en || _id == $id_no] {
  "slug": slug.current,
  "lang": _lang,
}
`

export const pageQueryById = /* groq */ `
  *[_type == "page" && _id == $id][0] {
    "title": title,
    "seoAndSome": {
      "documentTitle": seo.documentTitle,
          "metaDescription": seo.metaDescription,
          openGraphImage,
    },
    "heroImage": heroFigure,
    "content": content[]{
        
      ${pageContentFields}
    }
  }
`

// @TODO: This should definitely not be duplicated across languages like this, but we are working with Sanity to figure
// out why the preview plugin doesn't work with param locale
export const pageQueryEn = /* groq */ ` 
   *[_type == "route" && slug.en_GB.current == $slug][0] {
    "slug": slug.en_GB.current,
    "allSlugs": slug,
    "title": content.en_GB->title,
    "seoAndSome": content.en_GB->{
      "documentTitle": seo.documentTitle,
          "metaDescription": seo.metaDescription,
          openGraphImage,
    },
    "heroImage": content.en_GB->heroFigure,
    "content": content.en_GB->content[]{
        
      ${pageContentFields}
    }
  }
`

export const pageQueryNo = /* groq */ ` 
   *[_type == "route" && slug.nb_NO.current == $slug][0] {
    "slug": slug.nb_NO.current,
    "allSlugs": slug,
    "title": content.nb_NO->title,
    "seoAndSome": content.nb_NO->{
      "documentTitle": seo.documentTitle,
          "metaDescription": seo.metaDescription,
          openGraphImage,
    },
    "heroImage": content.nb_NO->heroFigure,
    "content": content.nb_NO->content[]{
        
      ${pageContentFields}
    }
  }
`
