/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useCallback, forwardRef, useState, useRef } from 'react'
// @ts-ignore
import { createPortal } from 'react-dom'
import { Dialog } from '@sanity/ui'
import styled from 'styled-components'
import { uuid } from '@sanity/uuid'
import type { FWAsset } from './types'

const CLIENT_ID = process.env.SANITY_STUDIO_FOTOWARE_CLIENT_ID
const TENANT_URL = process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL
const REDIRECT_URI = process.env.SANITY_STUDIO_FOTOWARE_REDIRECT_URI

const Content = styled.div`
  margin: 2em;
`

const getRequestURL = () => {
  if (!CLIENT_ID || !TENANT_URL || !REDIRECT_URI) {
    console.warn('Required Fotoware .env variables are not defined. Make sure they are set in the .env file(s)')
    return false
  }

  const state = uuid()

  return `${TENANT_URL}/fotoweb/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&state=${state}`
}

const FotowareAssetSource = forwardRef<HTMLDivElement>((props: any, ref) => {
  const { onSelect, onClose } = props

  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const newWindow = useRef<Window | null>(null)

  const requestURL = getRequestURL()

  // TODO: handle close/cancel event
  // https://learn.fotoware.com/Integrations_and_APIs/01_Creating_Integrations_using_Embeddable_Widgets/Using_the_widgets
  const handleFotowareEvent = useCallback(
    (event: any) => {
      if (!event || !event.data || event.origin !== TENANT_URL) return false

      const data = JSON.parse(event.data)
      console.log('Fotoware data:', data)

      if (!data.event || data.event !== 'assetSelected' || !data.asset) return false

      // https://learn.fotoware.com/Integrations_and_APIs/001_The_FotoWare_API/FotoWare_API_Overview/Asset_representation
      const asset = data.asset as FWAsset

      onSelect([
        {
          kind: 'url',
          value: asset.href,
          assetDocumentProps: {
            originalFileName: asset.filename,
            source: {
              id: asset.uniqueid,
              name: 'fotoware',
            },
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
    if (container && requestURL) {
      newWindow.current = window.open(requestURL, 'Fotoware', 'width=1200,height=800,left=200,top=200')

      if (newWindow.current) {
        newWindow.current.document.body.appendChild(container)
        window.addEventListener('message', handleFotowareEvent)
      }

      const currentWindow = newWindow.current

      return () => {
        window.removeEventListener('message', handleFotowareEvent)

        if (currentWindow) {
          currentWindow.close()
        }
      }
    }
  }, [container, handleFotowareEvent, requestURL])

  return (
    <Dialog id="fotowareAssetSource" header="Select image from Fotoware" onClose={onClose} ref={ref}>
      {container && createPortal(props.children, container)}

      {requestURL ? (
        <Content>
          <p>Select an image from Fotoware in the popup window.</p>
          <p>Once selected, the upload process should start automatically.</p>
        </Content>
      ) : (
        <Content>
          <p>
            No Fotoware source URL found. Please define the URL and path in the enviromental variables to load the
            iframe.
          </p>
        </Content>
      )}
    </Dialog>
  )
})

FotowareAssetSource.displayName = 'FotowareAssetSource'

export default FotowareAssetSource
