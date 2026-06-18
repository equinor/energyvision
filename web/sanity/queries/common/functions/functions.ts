import linkFunction from './link'
import { markDefsFunction } from './portableText'
import tableFunction from './table'

export const functions = /* groq */ `
${linkFunction}
${markDefsFunction}
`

/**
 *  These functions are specific to topic, magazine or home page content sections.
 *  Add these only when necessary.
 */
export const pageContentFunctions = /* groq */ `
${tableFunction}
`
