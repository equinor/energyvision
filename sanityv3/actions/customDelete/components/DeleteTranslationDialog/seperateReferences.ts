import type { SanityDocument } from 'sanity'

export function separateReferences(data: SanityDocument[] | null = []): {
  translations: SanityDocument[]
  translatedDocs: SanityDocument[]
  otherReferences: SanityDocument[]
} {
  const translations: SanityDocument[] = []
  const otherReferences: SanityDocument[] = []
  const translatedDocs: SanityDocument[] = []

  if (data && data.length > 0) {
    data.forEach((translationMetadata: SanityDocument) => {
      translations.push(translationMetadata)
      ;(translationMetadata.translations as SanityDocument[]).forEach((translation: SanityDocument) => {
        if (translation.doc) translatedDocs.push(translation.doc as SanityDocument)
        otherReferences.push(...(translation.dependants as SanityDocument[]))
      })
    })
  }

  return { translations, otherReferences, translatedDocs }
}
