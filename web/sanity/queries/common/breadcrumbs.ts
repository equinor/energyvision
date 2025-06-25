const home = /* groq */ `
  {
    "slug": '/',
    "label": coalesce(*[_id == 'text_snippet_breadcrumbs_home' && _type == "textSnippet"][0].[$lang],"Home")
  }
`

const currentPage = /* groq */ `
  {
    "slug": slug.current,
    "label": topicSlug
  }
`

export const breadcrumbsQuery = /* groq */ `
    "enableBreadcrumbs": coalesce(breadcrumbs.enableBreadcrumbs, false),
    "useCustomBreadcrumbs": coalesce(breadcrumbs.useCustomBreadcrumbs, false),
    "defaultBreadcrumbs": [
      ${home},
      {
        "slug": parent->slug.current,
        "label": parent->topicSlug
      },
      ${currentPage}
    ],
    "customBreadcrumbs": [
      ${home},
      ...breadcrumbs.customBreadcrumbs[]{
          _type == 'reference' => @->{
            "slug": slug.current,
            "label": topicSlug,
            "type": 'reference'
          },
        },
      ${currentPage}
    ],
`
