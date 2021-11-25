import markDefs from './common/blockEditorMarks'
import linkSelectorFields from './common/actions/linkSelectorFields'
import downloadableFileFields from './common/actions/downloadableFileFields'
import downloadableImageFields from './common/actions/downloadableImageFields'

export const eventFields = /* groq */ `
  "id": _id,
  "slug": slug.current,
  title[]{
    ...,
    ${markDefs},
  },
  location,
`

export const eventQuery = /* groq */ `
  *[_type == "event" && _lang == $lang][0]{
    "template": "event",
    "documentTitle": seo.documentTitle,
    "metaDescription": seo.metaDescription,
    openGraphImage,

    ${eventFields}

    ingress[]{
      ...,
      ${markDefs},
    },
    content[]{
      ...,
      ${markDefs},
    },
    "iframe": iframe{
      title,
      frameTitle,
      url,
      "designOptions": {
        "aspectRatio": coalesce(aspectRatio, '16:9'),
        "background": coalesce(background.title, 'none'),
        height,
      },
    },
    "promotedPeople": promotedPeople.peopleList[]{
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
          },
        },
    },
    "relatedLinks": relatedLinks{
      title,
      heroImage,
      "links": links[]{
        ${linkSelectorFields},
        ${downloadableFileFields},
        ${downloadableImageFields},
      }
    }
  }
`

export const eventSlugsQuery = /* groq */ `
*[_type == "event" && defined(slug.current)][].slug.current
`
