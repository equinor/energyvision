import {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
  DocumentActionsContext,
  SanityClient,
} from 'sanity'
import { apiVersion } from '../sanity.client'
import { useToast } from '@sanity/ui'

const FIRST_PUBLISHED_AT_FIELD_NAME = 'firstPublishedAt'
const LAST_MODIFIED_AT_FIELD_NAME = 'lastModifiedAt'

const requiresFirstPublished = ['news', 'localNews', 'magazine']

const clearCustomPublishFields = async (id: string, client: SanityClient) => {
  await client
    .patch(id)
    .unset([LAST_MODIFIED_AT_FIELD_NAME, FIRST_PUBLISHED_AT_FIELD_NAME])
    .commit()
    .catch((e) => {
      throw e
    })
}

export function createCustomUnPublishAction(originalAction: DocumentActionComponent, context: DocumentActionsContext) {
  const client = context.getClient({ apiVersion: apiVersion })
  return (props: DocumentActionProps) => {
    const originalResult = originalAction(props as DocumentActionProps) as DocumentActionDescription
    const toast = useToast()
    const handleUnPublish = async () => {
      try {
        if (requiresFirstPublished.includes(props.type)) {
          await clearCustomPublishFields(props.draft?._id || props.id, client)
        }
        originalResult.onHandle && originalResult.onHandle()
      } catch (e) {
        console.error(e)
        toast.push({
          duration: 7000,
          status: 'error',
          title: 'Failed to publish, you probably miss the mutation token. Check console for details.',
        })
      }
    }
    return {
      ...originalResult,
      onHandle: handleUnPublish,
    }
  }
}
