import { useState, useEffect } from 'react'
import { 
  DocumentActionConfirmDialogProps, 
  DocumentActionProps, 
  useDocumentOperation, 
  useValidationStatus, 
  isValidationErrorMarker,
  SanityDocument,
} from 'sanity'

const FIRST_PUBLISHED_AT_FIELD_NAME = 'firstPublishedAt'
const LAST_MODIFIED_AT_FIELD_NAME = 'lastModifiedAt'

export function SetAndPublishAction(props: DocumentActionProps) {
  const { patch, publish } = useDocumentOperation(props.id, props.type)
  const [isPublishing, setIsPublishing] = useState(true)
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
  }, [props.draft, isPublishing])

  // check if the document is already published (default publish action is disabled if it is)
  const isDisabled = hasValidationErrors || publish.disabled === 'ALREADY_PUBLISHED' || dialogOpen || isPublishing
  return {
    disabled: isDisabled,
    label: isPublishing ? 'Publishing.. ' : 'Publish',
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
          patch.execute(
            [
              { setIfMissing: { [FIRST_PUBLISHED_AT_FIELD_NAME]: currentTimeStamp } },
              { set: { [LAST_MODIFIED_AT_FIELD_NAME]: currentTimeStamp } },
            ],
            props.published as SanityDocument | undefined,
          )
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
