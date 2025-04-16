import { useState, useEffect } from 'react'
import { 
  DocumentActionConfirmDialogProps, 
  DocumentActionProps, 
  useDocumentOperation, 
  useValidationStatus, 
  isValidationErrorMarker 
} from 'sanity'

const FIRST_PUBLISHED_AT_FIELD_NAME = 'firstPublishedAt'
const LAST_MODIFIED_AT_FIELD_NAME = 'lastModifiedAt'

export function SetAndPublishAction(props: DocumentActionProps) {
  const { patch, publish } = useDocumentOperation(props.id, props.type)
  const [isPublishing, setIsPublishing] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Check for validation errors
  const validationStatus = useValidationStatus(props.id, props.type)
  const hasValidationErrors = validationStatus.validation.some(isValidationErrorMarker)

  useEffect(() => {
    // if the isPublishing state was set to true and the draft has changed
    // to become `null` the document has been published
    if (isPublishing && !props.draft) {
      setIsPublishing(false)
    }
  }, [props.draft])

  // Determine if the action should be disabled based on validation errors and publish status
  const isDisabled = hasValidationErrors || publish.disabled

  return {
    disabled: isDisabled || dialogOpen,
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
          const currentTimeStamp = new Date().toISOString()
          // set lastModifiedAt date.
          patch.execute([{ set: { [LAST_MODIFIED_AT_FIELD_NAME]: currentTimeStamp } }])

          //set firstPublishedAt date if not published.
          if (!props.published?.[FIRST_PUBLISHED_AT_FIELD_NAME])
            patch.execute([{ set: { [FIRST_PUBLISHED_AT_FIELD_NAME]: currentTimeStamp } }])

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
