import { useState } from 'react'
import {
  DocumentActionComponent,
  DocumentActionConfirmDialogProps,
  DocumentActionDescription,
  DocumentActionProps,
  DocumentActionsContext,
  SanityClient,
} from 'sanity'
import { apiVersion } from '../sanity.client'
import { useToast } from '@sanity/ui'
const FIRST_PUBLISHED_AT_FIELD_NAME = 'firstPublishedAt'
const LAST_MODIFIED_AT_FIELD_NAME = 'lastModifiedAt'

const requiresConfirm = ['news', 'localNews']
const requiresFirstPublished = ['news', 'localNews', 'magazine']

const updateCustomPublishFields = async (id: string, client: SanityClient, setFirstPublish: boolean) => {
  const currentTimeStamp = new Date().toISOString()
  const patch = client.patch(id).set({ [LAST_MODIFIED_AT_FIELD_NAME]: currentTimeStamp })
  if (setFirstPublish) patch.set({ [FIRST_PUBLISHED_AT_FIELD_NAME]: currentTimeStamp })

  await patch.commit().catch((e) => {
    throw e
  })
}

export function createCustomPublishAction(originalAction: DocumentActionComponent, context: DocumentActionsContext) {
  const client = context.getClient({ apiVersion: apiVersion })
  return (props: DocumentActionProps) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const originalResult = originalAction(props as DocumentActionProps) as DocumentActionDescription
    const toast = useToast()

    const handlePublish = async () => {
      try {
        if (requiresFirstPublished.includes(props.type)) {
          await updateCustomPublishFields(
            props.draft?._id || props.id,
            client,
            !props.published?.[FIRST_PUBLISHED_AT_FIELD_NAME],
          )
        }
        originalResult.onHandle && originalResult.onHandle()
      } catch (e) {
        console.error(e)
        toast.push({
          duration: 7000,
          status: 'error',
          title: 'Failed to publish, you probably miss the mutation token. Check console for details.',
        })
        setDialogOpen(false)
      }
    }

    const confirmationBox = requiresConfirm.includes(props.type)
      ? {
          onHandle: () => {
            setDialogOpen(true)
          },
          dialog:
            dialogOpen &&
            props.draft &&
            ({
              type: 'confirm',
              onCancel: () => {
                props.onComplete()
                setDialogOpen(false)
              },
              onConfirm: handlePublish,
              message: 'Are you sure you want to publish?',
            } as DocumentActionConfirmDialogProps),
        }
      : {}

    return {
      ...originalResult,
      onHandle: handlePublish,
      ...confirmationBox,
    }
  }
}
