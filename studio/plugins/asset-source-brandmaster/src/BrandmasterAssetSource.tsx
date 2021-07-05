import React, { useEffect, useCallback } from 'react'
// eslint-disable-next-line import/no-unresolved
import Dialog from 'part:@sanity/components/dialogs/fullscreen'

const BM_EVENT_NAME = 'dam:plugin-assets-selected-event'
const BM_URL = process.env.SANITY_STUDIO_BRANDMASTER_URL
const BM_SOURCE = process.env.SANITY_STUDIO_BRANDMASTER_SOURCE

const BrandmasterAssetSource = (props: any) => {
  const { onSelect, onClose } = props

  const handleBrandmasterEvent = useCallback(
    (event) => {
      if (!event || !event.data || event.origin !== BM_URL) return false

      const data = JSON.parse(event.data)

      console.log('Brandmaster data:', data)

      if (!data.eventName || data.eventName !== BM_EVENT_NAME) return false

      const file = data.eventData.files[0]

      onSelect([
        {
          kind: 'url',
          value: file.fileURL,
          assetDocumentProps: {
            originalFileName: file.obtId,
            source: {
              id: file.obtId,
              name: `brandmaster:${file.obtId}`,
            },
          },
        },
      ])
    },
    [onSelect],
  )

  useEffect(() => {
    window.addEventListener('message', handleBrandmasterEvent)

    return () => {
      window.removeEventListener('message', handleBrandmasterEvent)
    }
  }, [handleBrandmasterEvent])

  return (
    <Dialog title="Select image from Brandmaster" onClose={onClose} isOpen>
      {BM_URL && BM_SOURCE ? (
        <iframe title="Brandmaster" src={BM_URL + BM_SOURCE}></iframe>
      ) : (
        <p>Brandmaster source URL not defined in environment variables.</p>
      )}
    </Dialog>
  )
}

export default BrandmasterAssetSource
