import { useState, useEffect } from 'react'
import { DocumentActionConfirmDialogProps, DocumentActionProps, useDocumentOperation } from 'sanity'

export function SetAndPublishAction(props: DocumentActionProps) {
  const { publish } = useDocumentOperation(props.id, props.type)
  const [isPublishing, setIsPublishing] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    // if the isPublishing state was set to true and the draft has changed
    // to become `null` the document has been published
    if (isPublishing && !props.draft) {
      setIsPublishing(false)
    }
  }, [props.draft])

  return {
    disabled: publish.disabled || dialogOpen,
    label: isPublishing ? 'Publishing…' : `Publish`,
    onHandle: () => {
      // This will update the button text
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
        onConfirm: () => {
          // Perform the publish
          publish.execute()

          // Signal that the action is completed
          props.onComplete()

          setDialogOpen(false)
        },
        message: 'Are you sure you want to publish?',
      } as DocumentActionConfirmDialogProps),
  }
}
