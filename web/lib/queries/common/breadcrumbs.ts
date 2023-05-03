const home = /* groq */ `
  {
    "slug": '/',
    "label": 'Home'
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
      ...breadcrumbs.customBreadcrumbs[]->{
        "slug": slug.current,
        "label": topicSlug
      },
      ${currentPage}
    ]
`
