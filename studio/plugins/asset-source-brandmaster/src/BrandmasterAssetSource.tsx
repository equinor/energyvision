import React, { useEffect, useCallback, forwardRef } from 'react'
import { Dialog } from '@sanity/ui'
// eslint-disable-next-line import/no-unresolved
import styled from 'styled-components'

const BM_EVENT_NAME = 'dam:plugin-assets-selected-event'
const BM_URL = process.env.SANITY_STUDIO_BRANDMASTER_URL || ''
const BM_SOURCE = BM_URL + process.env.SANITY_STUDIO_BRANDMASTER_PLUGIN_SOURCE || ''

const StyledIframe = styled.iframe`
  display: block;
  width: 100%;
  height: 100%;
  min-height: 70vh;
  border: none;
`

const Warning = styled.p`
  margin: 4em;
  text-align: center;
`

const BrandmasterAssetSource = forwardRef<HTMLDivElement>((props: any, ref) => {
  const { onSelect, onClose } = props

  const handleBrandmasterEvent = useCallback(
    (event) => {
      if (!event || !event.data || event.origin !== BM_URL) return false

      const data = JSON.parse(event.data)

      console.log('Brandmaster data:', data)

      if (!data.eventName || data.eventName !== BM_EVENT_NAME) return false

      const file = data.eventData.selected[0]
      // @TODO: get this to work with brandmaster provided download URLs (cors issue)
      const downloadUrl = BM_URL + file.arrayfiles[0].file_ref

      onSelect([
        {
          kind: 'url',
          value: downloadUrl,
          assetDocumentProps: {
            originalFileName: file.uniqueId,
            source: {
              id: file.uniqueId,
              name: `brandmaster:${file.uniqueId}`,
            },
            title: file.title,
            description: file.description,
            creditLine: file.photographer,
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
    <Dialog id="brandmasterAssetSource" header="Select image from Brandmaster" onClose={onClose} ref={ref} width={80}>
      {BM_SOURCE ? (
        <StyledIframe title="Brandmaster" src={BM_SOURCE}></StyledIframe>
      ) : (
        <Warning>
          No Brandmaster source URL found. Please define the URL and path in the enviromental variables to load the
          iframe.
        </Warning>
      )}
    </Dialog>
  )
})

BrandmasterAssetSource.displayName = 'BrandmasterAssetSource'

export default BrandmasterAssetSource
