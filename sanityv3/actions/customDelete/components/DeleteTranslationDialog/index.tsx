import { Card, Flex, Spinner, Stack, Text } from '@sanity/ui'
import { useEffect, useMemo, useState } from 'react'
import { SanityDocument } from 'sanity'
import { useClient } from 'sanity'
import { separateReferences } from './seperateReferences'
import { apiVersion } from '../../../../sanity.client'
import { defaultLanguage } from '../../../../languages'
import DocumentPreview from './DocumentPreview'

type DeleteTranslationDialogProps = {
  doc: SanityDocument
  documentId: string
  setTranslations: (translations: SanityDocument[]) => void
  setHasOtherReferences: (hasOtherReferences: boolean) => void
}

export default function DeleteTranslationDialog(props: DeleteTranslationDialogProps) {
  const { doc, documentId, setTranslations, setHasOtherReferences } = props

  const client = useClient({ apiVersion: apiVersion })
  const [data, setData] = useState<SanityDocument[]>()

  const getData = async () => {
    const data = await client.fetch<SanityDocument[]>(
      /* groq */ `*[_type == "translation.metadata" && references($id)]{
        ...,
        _id,
        translations[]{
          "id":@.value._ref,
          "doc": @.value->
        }
      }{
        ...,
          translations[]{
          ...,
          "dependants": *[references(^.id) && _type!= "translation.metadata"]
        }
      }`,
      { id: documentId },
    )
    setLoading(false)
    setData(data)
  }
  const [loading, setLoading] = useState<Boolean>(true)
  // Get all references and check if any of them are translations metadata

  if (loading) getData()
  const { translations, otherReferences, translatedDocs } = useMemo(() => separateReferences(data), [data])

  useEffect(() => {
    setTranslations(translations)
  }, [setTranslations, translations])
  useEffect(() => {
    setHasOtherReferences(otherReferences.length > 0)
  }, [setHasOtherReferences, otherReferences])

  if (loading) {
    return (
      <Flex padding={4} align="center" justify="center">
        <Spinner />
      </Flex>
    )
  }

  return (
    <Stack space={4}>
      {translations && translations.length > 0 && doc.lang === defaultLanguage.name ? (
        <>
          <Text>Delete this document and its translations?</Text>
          {translatedDocs.length > 0 &&
            translatedDocs.map((it) => <DocumentPreview key={it._id} value={it} type={it._type} />)}
        </>
      ) : (
        <Text>Delete this document?</Text>
      )}
      {otherReferences.length > 0 && (
        <>
          <Card borderTop />
          <>
            You may not be able to delete this document as there are other published references to this document (or its
            translations).
          </>
          {otherReferences.map((it) => (
            <DocumentPreview key={it._id} value={it} type={it._type} />
          ))}
        </>
      )}
    </Stack>
  )
}
