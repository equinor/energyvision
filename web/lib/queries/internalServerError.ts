export const internalServerErrorQuery = /* groq */ `
  *[_type == "internalServerError"  && _lang == $lang][0] {
    ...,
    }
 `
