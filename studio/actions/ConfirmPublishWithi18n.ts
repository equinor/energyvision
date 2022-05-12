/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * This is a modified version of Sanity's i18n publish action
 * Original file here: @sanity/document-internationalization/src/actions/PublishWithi18nAction.ts
 * Most of the code is copy-pasted and unchanged. The only thing this file does is provide a confirmation dialog
 * for specific document types (listed in the array 'requiresConfirm')
 */
import * as React from 'react'
import { useDocumentOperation, useEditState, useSyncState, useValidationStatus } from '@sanity/react-hooks'
import { useToast } from '@sanity/ui'
import { CheckmarkIcon, PublishIcon } from '@sanity/icons'
import {
  getBaseIdFromId,
  getConfig,
  getSchema,
  updateIntlFieldsForDocument,
} from '@sanity/document-internationalization/lib/utils'
import { ReferenceBehavior, UiMessages } from '@sanity/document-internationalization/lib/constants'
import type {
  IEditState,
  IResolverProps,
  IUseDocumentOperationResult,
  Ti18nSchema,
} from '@sanity/document-internationalization/lib/types'
//eslint-disable-next-line
import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({ apiVersion: '2022-05-12' })

// Copied from @sanity/document-internationalization/src/hooks/useDelayedFlag.ts
function useDelayedFlag(value = false, timeout = 500, delayedOn = false, delayedOff = true) {
  const [lastUpdate, setLastUpdate] = React.useState(Date.now())
  const [flag, setFlag] = React.useState(value)

  React.useEffect(() => {
    if (flag !== value) {
      if (value) {
        if (delayedOn) {
          const timeoutId = setTimeout(() => setFlag(true), timeout)
          return () => clearTimeout(timeoutId)
        } else {
          setFlag(true)
        }
      } else if (!value) {
        if (delayedOff) {
          const timeoutId = setTimeout(() => setFlag(false), timeout)
          return () => clearTimeout(timeoutId)
        } else {
          setFlag(false)
        }
      }
    }
  }, [value, timeout, delayedOn, delayedOff])

  return flag
}

// Add the _type of the documents that need a publish confirmation here
const requiresConfirm = ['news', 'localNews']
// Add the _type of the documents that need a firstPublished field here
const requiresFirstPublished = ['news', 'localNews']

const FIRST_PUBLISHED_AT_FIELD_NAME = 'firstPublishedAt'

export const ConfirmPublishWithi18nAction = ({ type, id, onComplete }: IResolverProps) => {
  const toast = useToast()
  const baseDocumentId = getBaseIdFromId(id)
  const [publishState, setPublishState] = React.useState<'publishing' | 'published' | null>(null)
  const [updatingIntlFields, setUpdatingIntlFields] = React.useState(false)
  const { draft, published } = useEditState(id, type) as IEditState
  const baseDocumentEditState = useEditState(baseDocumentId, type) as IEditState
  const { publish } = useDocumentOperation(id, type) as IUseDocumentOperationResult
  const { isValidating, markers } = useValidationStatus(id, type)
  const syncState = useSyncState(id, type)
  const baseDocumentSyncState = useSyncState(baseDocumentId, type)
  const disabled = useDelayedFlag(
    !!(
      publishState === 'published' ||
      publishState === 'publishing' ||
      updatingIntlFields ||
      publish.disabled ||
      syncState.isSyncing ||
      baseDocumentSyncState.isSyncing ||
      isValidating ||
      markers.some((marker) => marker.level === 'error')
    ),
  )
  // Handle confirm dialog state
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const label = React.useMemo(() => {
    if (publishState === 'publishing') return UiMessages.publishing
    if (updatingIntlFields) return UiMessages.updatingIntlFields
    return UiMessages.publish
  }, [publishState, updatingIntlFields])

  const doUpdateIntlFields = React.useCallback(async () => {
    setUpdatingIntlFields(true)
    try {
      const document = draft || published
      if (document) {
        await updateIntlFieldsForDocument(document, baseDocumentEditState.published)
      }

      toast.push({
        closable: true,
        status: 'success',
        title: UiMessages.intlFieldsUpdated,
      })
    } catch (err) {
      console.error(err)
      toast.push({
        closable: true,
        status: 'error',
        // @ts-ignore
        title: err.toString(),
      })
    }
    setUpdatingIntlFields(false)
  }, [toast, draft, published, baseDocumentEditState.published])

  const onHandle = React.useCallback(() => {
    setPublishState('publishing')
    const schema = getSchema<Ti18nSchema>(type)
    const config = getConfig(schema)
    const isTranslation = id !== baseDocumentId
    const document = draft || published

    if (isTranslation && !baseDocumentEditState.published && config.referenceBehavior === ReferenceBehavior.STRONG) {
      throw new Error(UiMessages.errors.baseDocumentNotPublished)
    } else {
      // Add firstPublishedField
      if (document && requiresFirstPublished.includes(type) && !document?.[FIRST_PUBLISHED_AT_FIELD_NAME]) {
        client
          .patch(document._id)
          .setIfMissing({ [FIRST_PUBLISHED_AT_FIELD_NAME]: new Date().toISOString() })
          .commit()
          .then(() => {
            publish.execute()
          })
          .catch((err: any) => console.error(err))
      } else {
        publish.execute()
      }
    }
  }, [type, id, baseDocumentId, draft, published, baseDocumentEditState.published, publish])

  React.useEffect(() => {
    const didPublish = publishState === 'publishing' && !draft

    const nextState = didPublish ? 'published' : null
    const delay = didPublish ? 200 : 4000
    const timer = setTimeout(() => {
      setPublishState(nextState)
    }, delay)
    return () => clearTimeout(timer)
  }, [publishState, draft])

  React.useEffect(() => {
    if (publishState === 'published') {
      doUpdateIntlFields().then(() => {
        if (onComplete) onComplete()
      })
    }
  }, [publishState])

  if (requiresConfirm.includes(type)) {
    return {
      label,
      disabled,
      icon: publishState === 'published' ? CheckmarkIcon : PublishIcon,
      shortcut: disabled ? null : 'Ctrl+Alt+P',
      onHandle: () => {
        setDialogOpen(true)
      },
      dialog: dialogOpen && {
        type: 'confirm',
        onCancel: onComplete,
        onConfirm: () => {
          onHandle()
        },
        message: 'Are you sure you want to publish?',
      },
    }
  }

  return {
    disabled,
    label,
    icon: publishState === 'published' ? CheckmarkIcon : PublishIcon,
    shortcut: disabled ? null : 'Ctrl+Alt+P',
    onHandle,
  }
}
