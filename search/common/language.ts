// Helper file for dealing with languages
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'

export type Language = {
  internalCode: string
  isoCode: string
}

const english = { internalCode: 'en_GB', isoCode: 'en-GB' }
const norwegian = { internalCode: 'nb_NO', isoCode: 'nb-NO' }

type LanguageMappingsType = Language[]
const languageMappings: LanguageMappingsType = [english, norwegian]

const DEFAULT_LANGUAGE = english

type MaybeLanguageType = (mappings: LanguageMappingsType) => (code: string) => E.Either<string, Language>

const findLanguageFromIso: MaybeLanguageType = (mappings) => (isoCode) =>
  E.fromNullable(`${isoCode} not defined in languages.ts`)(mappings?.find((mapping) => mapping.isoCode === isoCode))

const findLanguageFromInternalCode: MaybeLanguageType = (mappings) => (internalCode) =>
  E.fromNullable(`${internalCode} not defined in languages.ts`)(
    mappings?.find((mapping) => mapping.internalCode === internalCode),
  )

// Can be moved some place central as it is generic
const logIt =
  (message: string) =>
  <T>(value: T) => {
    console.log(message)
    return value
  }

export const languageOrDefault = E.getOrElse(() => pipe(DEFAULT_LANGUAGE, logIt('Language not found! Using default language.')))

export const languageFromIso = findLanguageFromIso(languageMappings)
export const languageFromInternalCode = findLanguageFromInternalCode(languageMappings)
