// Or "topLevelGroups": group[reference._ref == ^.^._id]
export const landingPageContentFields = /* groq */ `
 "ingress": content->ingress,
  "id": _id,
  "groupWithReference": *[_type == "siteMenu" && references(^._id)]{ // Verify that the menu has a reference to this landing page
    "topicPageGroup": group[reference->.slug.current match $slug]{ // Find the menu group with the top level link as this slug
      "subGroups": group[]{
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
    }[0] // There should only be one
 }[0]
`

// This query should be changed if we select the sub menu directly from the landing page
export const landingPageById = /* groq */ `
 "ingress": ingress,
  "id": _id,
  "groupWithReference": *[_type == "siteMenu" && _lang == $lang]{ // Verify that the menu has a reference to this landing page
    "topicPageGroup": group[reference->content->._id match $id]{ // Find the menu group with the top level link as this slug
      "subGroups": group[]{
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
    }[0] // There should only be one
 }[0]
`
