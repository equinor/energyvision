import { useToast } from '@sanity/ui'
import { DocumentActionComponent, DocumentActionDescription, DocumentActionProps, DocumentActionsContext } from 'sanity'
import { defaultLanguage } from '../languages'
import { apiVersion } from '../sanity.client'

export function createCustomDuplicateAction(originalAction: DocumentActionComponent, context: DocumentActionsContext) {
  const CustumDuplicateAction = (props: DocumentActionProps) => {
    const originalResult = originalAction(props) as DocumentActionDescription
    const toast = useToast()
    return {
      ...originalResult,
      onHandle: () => {
        context
          .getClient({ apiVersion: apiVersion })
          .fetch(/* groq */ `*[_id match '*'+$id][0]{lang}`, { id: context.documentId })
          .then((result) => {
            if (result?.lang == defaultLanguage.name) {
              // allow duplicate action only on bas language
              originalResult.onHandle && originalResult.onHandle()
            } else {
              toast.push({
                duration: 7000,
                status: 'error',
                title: 'Cannot duplicate the translation.',
              })
            }
          })
          .catch((error) => {
            console.log(error)
            toast.push({
              duration: 7000,
              status: 'error',
              title: 'Failed to duplicate',
            })
          })
      },
    }
  }
  return CustumDuplicateAction
}
