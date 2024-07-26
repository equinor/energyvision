import { useState } from 'react'
import {
  DocumentActionComponent,
  DocumentActionConfirmDialogProps,
  DocumentActionDescription,
  DocumentActionProps,
} from 'sanity'

const requiresConfirm = ['news', 'localNews']

export function createCustomPublishAction(originalAction: DocumentActionComponent) {
  return (props: DocumentActionProps) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const originalResult = originalAction(props as DocumentActionProps) as DocumentActionDescription
    const handlePublish = async () => {
      originalResult.onHandle && originalResult.onHandle()
      setDialogOpen(false)
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
