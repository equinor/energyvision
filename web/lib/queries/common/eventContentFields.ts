import markDefs from './blockEditorMarks'
import linkSelectorFields from './actions/linkSelectorFields'
import downloadableFileFields from './actions/downloadableFileFields'
import downloadableImageFields from './actions/downloadableImageFields'
import background from './background'

export const eventContentFields = /* groq */ `
  location,
  eventDate,
  ingress[]{
    ...,
    ${markDefs},
  },
  content[]{
    ...,
    ${markDefs},
    _type == "basicIframe" =>{
      "type": _type,
      "id": _key,
      title,
      frameTitle,
      url,
      "cookiePolicy": coalesce(cookiePolicy, 'none'),
      "designOptions": {
        "aspectRatio": coalesce(aspectRatio, '16:9'),
        height,
        ${background}
      },
    },
  },
  "promotedPeople": {
    "title": promotedPeopleTitle[]{
      ...,
      ${markDefs},
    },
    "people": promotedPeople.peopleList[]{
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
  },
  "relatedLinks": relatedLinks{
    title,
    heroImage,
    "links": links[]{
      ${linkSelectorFields},
      ${downloadableFileFields},
      ${downloadableImageFields},
    },
  },
  "contactList": contactList{
      _type,
      title,
      ingress,
      "contacts": contacts[]{
        _key,
        _type,
        phone,
        location
        }
    }
  `
