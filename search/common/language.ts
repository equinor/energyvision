// Helper file for dealing with languages

const languages = ['en-GB', 'nb-NO'] as const
export type Language = (typeof languages)[number]

const DEFAULT_LANGUAGE: Language = 'en-GB'

export const languageOrDefault = (isoCode: string): Language => {
  const language = languages.find((supportedLanguage) => supportedLanguage === isoCode)
  if (language) return language

  console.log('Language not found! Using default language.')
  return DEFAULT_LANGUAGE
}
