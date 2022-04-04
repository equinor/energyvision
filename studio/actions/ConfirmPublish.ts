import { useState } from 'react'
import { useDocumentOperation, useValidationStatus } from '@sanity/react-hooks'
import { PublishIcon } from '@sanity/icons'
import type { ValidationMarker } from '@sanity/types'

// Add the _type of the documents that need a publish confirmation here
const requiresConfirm = ['news', 'localNews']

// Publishing via useDocumentOperation allows us to bypass validation
// so we need to manually check if the document is valid or not
const isDocumentValid = (markers: ValidationMarker[]): boolean => {
  // No errors or warnings
  if (markers.length === 0) return true

  // Check if any errors in array
  const errors = markers.filter((mark: ValidationMarker) => mark.level === 'error')
  // No errors, only warnings, document is valid
  if (errors.length === 0) return true

  return false
}

export function ConfirmPublishAction(props: any) {
  const { onComplete, id, type, draft } = props
  const [dialogOpen, setDialogOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { publish } = useDocumentOperation(id, type)
  const { markers } = useValidationStatus(id, type)

  const isDisabled = !draft || !isDocumentValid(markers)

  if (!requiresConfirm.includes(type)) {
    return {
      label: 'Publish',
      icon: PublishIcon,
      disabled: isDisabled,
      onHandle: () => {
        publish.execute()
        onComplete()
      },
    }
  }

  return {
    label: 'Publish',
    icon: PublishIcon,
    disabled: isDisabled,
    onHandle: () => {
      setDialogOpen(true)
    },
    dialog: dialogOpen && {
      type: 'confirm',
      onCancel: onComplete,
      onConfirm: () => {
        publish.execute()
        onComplete()
      },
      message: 'Are you sure you want to publish?',
    },
  }
}
