'use client'

import { useIsPresentationTool } from 'next-sanity/hooks'

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool()

  // Only show the disable draft mode button when outside of Presentation Tool
  if (isPresentationTool === null && isPresentationTool === true) {
    return null
  }

  return (
    <a
      href='/api/draft-mode/disable'
      className='fixed right-4 bottom-4 bg-slate-blue-95 px-4 py-2 text-white-100'
    >
      Disable Draft Mode
    </a>
  )
}
