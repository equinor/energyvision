import { CopyIcon } from '@sanity/icons'
import { useToast } from '@sanity/ui'
import { useCallback } from 'react'

import { defineDocumentFieldAction, useTranslation, useCopyPaste, useGetFormValue } from 'sanity'
import { type FormDocumentValue } from 'sanity'

export const copyAction = defineDocumentFieldAction({
  name: 'copyField',
  useAction({ path }) {
    const getFormValue = useGetFormValue()
    const { onCopy } = useCopyPaste()
    const { t } = useTranslation('copy-paste')

    const isDocument = path.length === 0

    const documentTitle = t('copy-paste.field-action-copy-button.document.title')
    const fieldTitle = t('copy-paste.field-action-copy-button.field.title')
    const title = isDocument ? documentTitle : fieldTitle
    const toast = useToast()

    const onAction = useCallback(() => {
      if (path.length === 0) {
        toast.push({
          title: 'Cannot copy document',
          description: 'Cannot copy document. Use duplicate instead.',
        })
        return
      } else if (path[0] === 'lang') {
        toast.push({
          title: 'Cannot copy language',
          description: 'Copying language is not allowed.',
        })
        return
      }
      const value = getFormValue([]) as FormDocumentValue
      onCopy(path, value, {
        context: { source: isDocument ? 'documentFieldAction' : 'fieldAction' },
      })
    }, [path, isDocument, onCopy, getFormValue])

    return {
      type: 'action',
      icon: CopyIcon,
      onAction,
      title,
    }
  },
})
