import markDefs from './common/blockEditorMarks'
import linkSelectorFields from './common/actions/linkSelectorFields'
import downloadableFileFields from './common/actions/downloadableFileFields'
import downloadableImageFields from './common/actions/downloadableImageFields'

const localizedSlugsFromEnglish = /* groq */ `
  "allSlugs": {
    "en_GB": slug.current,
    "nb_NO": *[_type == "event" && _id == ^._id + "__i18n_nb_NO"][0].slug.current,
  }
`

const localizedSlugsFromNorwegian = /* groq */ `
  "allSlugs": {
    "en_GB": *[_type == "event" && ^._id in _langRefs[]._key][0].slug.current,
    "nb_NO": slug.current,
  }
`

export const eventFields = /* groq */ `
  "id": _id,
  "slug": slug.current,
  $lang == "en_GB" => {
    ${localizedSlugsFromEnglish}
  },
  $lang == "nb_NO" => {
    ${localizedSlugsFromNorwegian}
  },
  title[]{
    ...,
    ${markDefs},
  },
  location,
`

export const eventQuery = /* groq */ `
  *[_type == "event" && slug.current == $slug && _lang == $lang][0]{
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
