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
            "label": linkLabel,
            "link": reference-> {
              "type": _type,
              "slug": slug.current
            },
            "href": url,
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
          figure,
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
