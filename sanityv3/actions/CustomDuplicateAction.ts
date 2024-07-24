import { useToast } from '@sanity/ui'
import { DocumentActionComponent, DocumentActionDescription, DocumentActionProps, DocumentActionsContext } from 'sanity'
import { defaultLanguage } from '../languages'
import { apiVersion } from '../sanity.client'
import { omit } from 'lodash'
import { useRouter, useRouterState } from 'sanity/router'
import { RouterPanes } from 'sanity/structure'
import { useMemo } from 'react'
import { uuid } from '@sanity/uuid'

export function createCustomDuplicateAction(originalAction: DocumentActionComponent, context: DocumentActionsContext) {
  const CustumDuplicateAction = (props: DocumentActionProps) => {
    const { draft, published } = props
    const originalResult = originalAction(props) as DocumentActionDescription
    const toast = useToast()
    const client = context.getClient({ apiVersion: apiVersion })

    const { navigate } = useRouter()
    const routerState = useRouterState()
    const schemaType = props.type as string
    const omitProps = ['_id', '_rev', '_createdAt', '_updatedAt', 'firstPublishedAt', 'lastModifiedAt']
    // omit the omitProps from either the draft or published document version passed down in the props
    const newDocProps = {
      _id: uuid(),
      ...omit(draft ? draft : published, omitProps),
    }
    const routerPaneGroups = useMemo<RouterPanes>(() => (routerState?.panes || []) as RouterPanes, [routerState?.panes])

    const openPane = (id: string) => {
      const nextPanes: RouterPanes = [
        // keep existing panes except the last one
        ...routerPaneGroups.splice(routerPaneGroups.length - 2, 1),
        [
          {
            id: id,
            params: {
              type: schemaType,
              ...newDocProps,
            },
          },
        ],
      ]

      navigate({
        panes: nextPanes,
      })
    }

    return {
      ...originalResult,
      onHandle: () => {
        client
          .fetch(/* groq */ `*[_id match '*'+$id][0]{lang}`, { id: context.documentId })
          .then((result) => {
            if (result?.lang == defaultLanguage.name) {
              // allow duplicate action only on base language
              const transaction = client.transaction()
              transaction.create(newDocProps)
              transaction
                .commit()
                .then((result) => {
                  openPane(result.documentIds[0])
                  toast.push({
                    duration: 7000,
                    status: 'success',
                    title: 'Duplicated the document ' + result,
                  })
                })
                .catch((error) => {
                  console.error('Error committing transaction:', error)
                  toast.push({
                    duration: 7000,
                    status: 'error',
                    title: 'Failed to duplicate.',
                  })
                })
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
