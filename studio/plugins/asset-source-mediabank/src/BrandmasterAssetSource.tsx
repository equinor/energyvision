import React, { useEffect, useCallback, forwardRef, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Dialog } from '@sanity/ui'
import styled from 'styled-components'

const BM_URL = process.env.SANITY_STUDIO_MEDIABANK_URL || ''
const BM_SOURCE = BM_URL + process.env.SANITY_STUDIO_MEDIABANK_PLUGIN_SOURCE || ''
const BM_TYPE = 'dam:assets-imported'

const Content = styled.div`
  margin: 2em;
`

const BrandmasterAssetSource = forwardRef<HTMLDivElement>((props: any, ref) => {
  const { onSelect, onClose } = props

  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const newWindow = useRef<Window | null>(null)

  const handleBrandmasterEvent = useCallback(
    (event) => {
      if (!event || !event.data || event.origin !== BM_URL) return false

      const data = JSON.parse(event.data)

      console.log('Mediabank data:', data)

      if (!data.type || data.type !== BM_TYPE) return false

      const selectedFile = data.data.assets[0]
      // link to the origial, non-resized, version of the file
      const downloadUrl = BM_URL + data.data.files[0].fileRef

      onSelect([
        {
          kind: 'url',
          value: downloadUrl,
          assetDocumentProps: {
            originalFileName: selectedFile.fileName,
            source: {
              id: selectedFile.assetId,
              name: 'mediabank',
            },
            ...(selectedFile?.title && { title: selectedFile.title }),
            // ...(selectedFile?.description && { description: selectedFile.description }),
            // ...(selectedFile?.photographer && { creditLine: selectedFile.photographer }),
          },
        },
      ])
    },
    [onSelect],
  )

  useEffect(() => {
    setContainer(document.createElement('div'))
  }, [])

  useEffect(() => {
    if (container) {
      newWindow.current = window.open(BM_SOURCE, 'Brandmaster', 'width=1200,height=800,left=200,top=200')

      if (newWindow.current) {
        newWindow.current.document.body.appendChild(container)
        window.addEventListener('message', handleBrandmasterEvent)
      }

      const currentWindow = newWindow.current

      return () => {
        window.removeEventListener('message', handleBrandmasterEvent)

        if (currentWindow) {
          currentWindow.close()
        }
      }
    }
  }, [container, handleBrandmasterEvent])

  return (
    <Dialog id="brandmasterAssetSource" header="Select image from Brandmaster" onClose={onClose} ref={ref}>
      {container && createPortal(props.children, container)}

      {BM_SOURCE ? (
        <Content>
          <p>Select an image from Brandmaster in the popup window.</p>
          <p>Once selected, the upload process should start automatically.</p>
        </Content>
      ) : (
        <Content>
          <p>
            No Brandmaster source URL found. Please define the URL and path in the enviromental variables to load the
            iframe.
          </p>
        </Content>
      )}
    </Dialog>
  )
})

BrandmasterAssetSource.displayName = 'BrandmasterAssetSource'

export default BrandmasterAssetSource
