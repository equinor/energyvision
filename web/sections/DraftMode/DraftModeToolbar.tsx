'use client'
import { useIsPresentationTool } from 'next-sanity/hooks'
import { useMemo, useTransition } from 'react'
import { disableDraftMode } from '@/app/_actions/disableDraftMode'
import { commonButtonStyling } from '@/core/Button'

export default function DraftModeToolbar() {
  const [pending, startTransition] = useTransition()
  const isPresentationTool = useIsPresentationTool()

  const isInsideTool = useMemo(() => {
    return isPresentationTool
  }, [isPresentationTool])
  // Only show the disable draft mode button when outside of Presentation Tool

  const disable = () => startTransition(() => disableDraftMode())

  return isInsideTool ? null : (
    <div className='fixed bottom-5 left-1/2 z-50 rounded-card border border-white-100 bg-slate-blue-95 text-white-100 hover:bg-slate-600 hover:*:underline'>
      {pending ? (
        'Disabling draft mode...'
      ) : (
        <button type='button' onClick={disable} className={commonButtonStyling}>
          Disable draft mode
        </button>
      )}
    </div>
  )
}

/* export default function DraftModeToolbar() {
  const isPresentationTool = useIsPresentationTool()
  const env = useDraftModeEnvironment()
  const environment = useVisualEditingEnvironment()
  console.log('isPresentationTool', isPresentationTool)
  console.log('environment', environment)
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    if (isPresentationTool === false) {
      // We delay the toast in case we're inside Presentation Tool
      const toastId = toast('Draft Mode Enabled', {
        description:
          env === 'live'
            ? 'Content is live, refreshing automatically'
            : 'Refresh manually to see changes',
        duration: Infinity,
        action: {
          label: 'Disable',
          onClick: async () => {
            await disableDraftMode()
            startTransition(() => {
              router.refresh()
            })
          },
        },
      })
      return () => {
        toast.dismiss(toastId)
      }
    }
  }, [env, router, isPresentationTool])

  useEffect(() => {
    if (pending) {
      const toastId = toast.loading('Disabling draft mode...')
      return () => {
        toast.dismiss(toastId)
      }
    }
  }, [pending])

  return null
} */
