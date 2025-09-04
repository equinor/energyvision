import linkFunction from './link'
import { markDefsFunction } from './portableText'
import tableFunction from './table'

export const functions = /* groq */ `
${linkFunction}
${markDefsFunction}
${tableFunction}

`
