import { useToast } from '@sanity/ui'
import { DocumentActionComponent, DocumentActionDescription, DocumentActionProps } from 'sanity'
import { defaultLanguage } from '../languages'

export function createCustomDuplicateAction(originalAction: DocumentActionComponent) {
  const CustumDuplicateAction = (props: DocumentActionProps) => {
    const originalResult = originalAction(props) as DocumentActionDescription
    const toast = useToast()
    const { draft, published } = props
    const lang = draft?.lang || published?.lang

    return {
      ...originalResult,
      onHandle: () => {
        if (!lang) {
          toast.push({
            duration: 7000,
            status: 'error',
            title: 'Failed to duplicate. Missing language.',
          })
          return null
        }

        if (lang == defaultLanguage.name) {
          // allow duplicate action only on base language
          originalResult.onHandle && originalResult.onHandle()
        } else {
          toast.push({
            duration: 7000,
            status: 'error',
            title: 'Cannot duplicate the translation.',
          })
        }
      },
    }
  }
  return CustumDuplicateAction
}
