export const publishDateTimeQuery = /* groq */ `
  select(
    customPublicationDate == true =>
      publishDateTime,
      coalesce(firstPublishedAt, _createdAt)
  )
`

export const lastUpdatedTimeQuery = /* groq */ `
  coalesce(lastModifiedAt,_updatedAt)
`
