export const pageNotFoundQuery = /* groq */ `
  *[_type match "pageNotFound"][0] {
    ...,
    }
 `
