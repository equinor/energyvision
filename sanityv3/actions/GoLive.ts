/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useMemo, useEffect } from 'react'
import { useDocumentOperation } from '@sanity/react-hooks'
import { CheckmarkCircleIcon, CloseCircleIcon, HelpCircleIcon } from '@sanity/icons'

const requiresConfirm = ['news', 'localNews']

// @ts-ignore
export function GoLive({ id, type, draft, published, onComplete }) {
  // @ts-ignore
  const { patch, publish } = useDocumentOperation(id, type)
  const doc = useMemo(() => draft || published, [draft, published])
  const [isPublishing, setIsPublishing] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    if (isPublishing && !draft) {
      setIsPublishing(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft])

  const isLive = Boolean(published?.live)

  if (!requiresConfirm.includes(type) || draft) return null

  return {
    disabled: false,
    dialog: dialogOpen && {
      type: 'confirm',
      color: 'success',
      onCancel: () => onComplete(),
      onConfirm: () => {
        patch.execute([{ set: { live: !isLive } }])
        publish.execute()
        onComplete()
      },
      message: isLive
        ? `Remove ${`"${doc.title}"` ?? `this Document`} from being public?`
        : `Make ${`"${doc.title}"` ?? `this Document`} publicly available?`,
    },
    // eslint-disable-next-line no-nested-ternary
    label: isPublishing ? 'Please confirm.' : isLive ? `Remove from public` : `Make public`,
    icon: isPublishing ? HelpCircleIcon : isLive ? CloseCircleIcon : CheckmarkCircleIcon,
    onHandle: () => {
      setIsPublishing(true)
      setDialogOpen(true)
    },
  }
}
