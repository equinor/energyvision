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
    <div className='fixed bottom-5 left-1/2 z-50 rounded-card border border-white-100 text-white-100 hover:bg-slate-600'>
      {pending ? (
        <div className='rounded-card bg-grey-50 px-4 py-3'>
          Disabling draft mode...
        </div>
      ) : (
        <button
          type='button'
          onClick={disable}
          className={`${commonButtonStyling} rounded-card bg-slate-blue-95 hover:underline`}
        >
          Disable draft mode
        </button>
      )}
    </div>
  )
}
