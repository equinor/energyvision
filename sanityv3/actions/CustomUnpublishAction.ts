import { UnpublishIcon } from '@sanity/icons'
import { useCallback, useMemo, useState } from 'react'
import {
  type DocumentActionComponent,
  type DocumentActionModalDialogProps,
  InsufficientPermissionsMessage,
  useCurrentUser,
  useDocumentOperation,
  useDocumentPairPermissions,
  useTranslation,
} from 'sanity'
import { structureLocaleNamespace } from 'sanity/structure'
import UnpublishDialog from './UnpublishDialog'
import { FIRST_PUBLISHED_AT_FIELD_NAME, LAST_MODIFIED_AT_FIELD_NAME } from './constants'

const DISABLED_REASON_KEY = {
  NOT_PUBLISHED: 'action.unpublish.disabled.not-published',
  NOT_READY: 'action.unpublish.disabled.not-ready',
  LIVE_EDIT_ENABLED: 'action.unpublish.disabled.live-edit-enabled',
}

export const CustomUnpublishAction: DocumentActionComponent = ({ id, type, draft, onComplete, liveEdit }) => {
  const { unpublish, patch } = useDocumentOperation(id, type)
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [permissions, isPermissionsLoading] = useDocumentPairPermissions({
    id,
    type,
    permission: 'unpublish',
  })
  const currentUser = useCurrentUser()
  const { t } = useTranslation(structureLocaleNamespace)

  const handleCancel = useCallback(() => {
    setConfirmDialogOpen(false)
    onComplete()
  }, [onComplete])

  const handleConfirm = useCallback(() => {
    setConfirmDialogOpen(false)
    unpublish.execute()
    patch.execute([{ unset: [FIRST_PUBLISHED_AT_FIELD_NAME, LAST_MODIFIED_AT_FIELD_NAME] }])
    onComplete()
  }, [onComplete, unpublish, patch, draft, FIRST_PUBLISHED_AT_FIELD_NAME, LAST_MODIFIED_AT_FIELD_NAME])

  const dialog: DocumentActionModalDialogProps | null = useMemo(() => {
    if (isConfirmDialogOpen) {
      return {
        type: 'dialog',
        onClose: onComplete,
        content: UnpublishDialog({
          id: draft?._id || id,
          onConfirm: handleConfirm,
          onCancel: handleCancel,
          action: 'unpublish',
          type,
        }),
      }
    }

    return null
  }, [draft, id, handleCancel, handleConfirm, isConfirmDialogOpen, onComplete, type])

  return useMemo(() => {
    if (liveEdit) {
      return null
    }

    if (!isPermissionsLoading && !permissions?.granted) {
      return {
        tone: 'critical',
        icon: UnpublishIcon,
        label: 'Unpublish',
        title: InsufficientPermissionsMessage({ context: 'unpublish-document', currentUser: currentUser }),
        disabled: true,
      }
    }

    return {
      tone: 'critical',
      icon: UnpublishIcon,
      disabled: Boolean(unpublish.disabled) || isPermissionsLoading,
      label: t('action.unpublish.label'),
      title: unpublish.disabled ? t(DISABLED_REASON_KEY[unpublish.disabled]) : '',
      onHandle: () => setConfirmDialogOpen(true),
      dialog,
    }
  }, [currentUser, dialog, isPermissionsLoading, liveEdit, permissions?.granted, t, unpublish.disabled])
}
