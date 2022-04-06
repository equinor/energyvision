// Or "topLevelGroups": group[reference._ref == ^.^._id]
export const landingPageContentFields = /* groq */ `
 "ingress": content->ingress,
  "id": _id,
  "subGroups": content->tocContent->group[]{
    "links": links[]{
      "id": _key,
      label,
      isStatic,
      href,
      staticUrl,
      "link": route->{
        "type": _type,
        "slug": slug.current,            
      },
        "image": coalesce(route->content->
          heroFigure.image, route->content->openGraphImage)
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
      isStatic,
      href,
      staticUrl,
      "link": route->{
        "type": _type,
        "slug": slug.current,            
      },
        "image": route->content->
          heroFigure.image,
    },
    "id": _key,
    label,
  },
`
