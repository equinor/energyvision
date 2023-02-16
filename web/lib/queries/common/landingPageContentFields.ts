// Or "topLevelGroups": group[reference._ref == ^.^._id]

import { Flags } from '../../../common/helpers/datasetHelpers'

export const landingPageContentFields = /* groq */ `
 "ingress": content->ingress,
  "id": _id,
  "subGroups": content->tocContent->group[]{
    "links": links[]{
      "id": _key,
      label,
      href,
      "link": route->{
        "type": _type,
        "slug": slug.current,
      },
      "image": ${
        Flags.IS_DEV
          ? `select(
            route->content->heroType == 'loopingVideo' => route->content->heroLoopingVideo->thumbnail,
            coalesce(route->content->heroFigure.image, route->content->openGraphImage))`
          : `coalesce(route->content->heroFigure.image, route->content->openGraphImage)`
      },
    },
    "id": _key,
    label,
  },
`

// This query should be changed if we select the sub menu directly from the landing page
export const landingPageById = /* groq */ `
 "ingress": ingress,
  "id": _id,
  "subGroups": tocContent->group[]{
    "links": links[]{
      "id": _key,
      label,
      href,
      "link": route->{
        "type": _type,
        "slug": slug.current,
      },
      "image": ${
        Flags.IS_DEV
          ? `select(
            route->content->heroType == 'loopingVideo' => route->content->heroLoopingVideo->thumbnail,
            coalesce(route->content->heroFigure.image, route->content->openGraphImage))`
          : `coalesce(route->content->heroFigure.image, route->content->openGraphImage)`
      },
    },
    "id": _key,
    label,
  },
`
