import { useState } from 'react'
import { CheckmarkIcon, PublishIcon } from '@sanity/icons'
import { useDocumentOperation } from 'sanity'

export function createConfirmDialogAction(originalAction: any): any {
  return (props: any) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const { publish } = useDocumentOperation(props.id, props.type)
    const originalResult = originalAction(props)
    return {
      ...originalResult,
      onHandle: () => {
        setDialogOpen(true)
      },
      dialog: dialogOpen &&
        props.draft && {
          type: 'confirm',
          onCancel: () => {
            props.onComplete
            setDialogOpen(false)
          },
          onConfirm: () => {
            publish.execute()
            props.onComplete()
          },
          message: 'Are you sure you want to publish?',
        },
    }
  }
}
