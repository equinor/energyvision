import { TrashIcon } from '@sanity/icons'
import { type ButtonTone, useToast } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { type DocumentActionComponent, type SanityDocument, useClient } from 'sanity'
import DeleteTranslationDialog from './components/DeleteTranslationDialog'
import DeleteTranslationFooter from './components/DeleteTranslationFooter'
import { useDocumentInternationalizationContext } from '@sanity/document-internationalization'
import { apiVersion } from '../../sanity.client'
import { defaultLanguage } from '../../languages'
import { Patch, Transaction } from '@sanity/client'

const TRANSLATIONS_ARRAY_NAME = 'translations'
export const DeleteTranslationAction: DocumentActionComponent = (props) => {
  const { languageField } = useDocumentInternationalizationContext()

  const doc = props.draft || props.published
  const documentLanguage = doc ? doc[languageField] : null
  const isDefaultLanguageDocument = defaultLanguage.name === documentLanguage

  const { id: documentId } = props
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [translations, setTranslations] = useState<SanityDocument[]>([])
  const [hasOtherReferences, setHasOtherReferences] = useState<boolean>(false)
  const onClose = useCallback(() => setDialogOpen(false), [])

  const toast = useToast()
  const client = useClient({ apiVersion: apiVersion })

  const unsetAndDeleteCurrentTranslation = (tx: Transaction) => {
    //unset current translation reference from metadata
    translations.forEach((translation) => {
      tx.patch(translation._id, (patch: Patch) =>
        patch.unset([`${TRANSLATIONS_ARRAY_NAME}[_key == "${documentLanguage}"]`]),
      )
    })

    // delete the current document
    tx.delete(documentId)
    tx.delete(`drafts.${documentId}`)
  }

  const unsetAndDeleteDefaultWithMetaData = (tx: Transaction) => {
    //unset translation references array in metadata
    translations.forEach((translation) => {
      tx.patch(translation._id, (patch) => patch.unset([TRANSLATIONS_ARRAY_NAME]))
    })

    // delete each of the translations and delete metadata
    if (translations.length > 0) {
      translations.forEach((translation: any) => {
        translation.translations.forEach((it: any) => {
          tx.delete(it.id)
          tx.delete(`drafts.${it.id}`)
        })
        tx.delete(translation._id)
        // Shouldn't exist as this document type is in liveEdit
        tx.delete(`drafts.${translation._id}`)
      })
    } else {
      //simply a doc without metadata.. so delete it.

      tx.delete(documentId)
      tx.delete(`drafts.${documentId}`)
    }
  }
  // Remove translation reference and delete document in one transaction
  const onProceed = useCallback(() => {
    const tx = client.transaction()
    if (isDefaultLanguageDocument) {
      unsetAndDeleteDefaultWithMetaData(tx)
    } else {
      unsetAndDeleteCurrentTranslation(tx)
    }

    tx.commit()
      .then(() => {
        onClose()
        toast.push({
          status: 'success',
          title: 'Deleted document and translations',
        })
      })
      .catch((err) => {
        toast.push({
          status: 'error',
          title: 'Failed to delete document and translations',
          description: err.message,
        })
      })
  }, [client, translations, documentId, onClose, toast])

  return {
    label: `Delete translation...`,
    disabled: !doc || !documentLanguage,
    icon: TrashIcon,
    tone: 'critical' as ButtonTone,
    onHandle: () => {
      setDialogOpen(true)
    },
    dialog: isDialogOpen && {
      type: 'dialog',
      onClose,
      header: 'Delete translation',
      content: doc ? (
        <DeleteTranslationDialog
          doc={doc}
          documentId={documentId}
          setTranslations={setTranslations}
          setHasOtherReferences={setHasOtherReferences}
        />
      ) : null,
      footer: (
        <DeleteTranslationFooter
          onClose={onClose}
          onProceed={onProceed}
          translations={translations}
          disable={hasOtherReferences}
        />
      ),
    },
  }
}
