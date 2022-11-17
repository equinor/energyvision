const slugReference = /* groq */ `
  select(
    _type == 'route' => slug[$lang].current, slug.current
  )
`

export default slugReference
