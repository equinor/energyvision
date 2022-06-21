/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useCallback, forwardRef, useState, useRef } from 'react'
// @ts-ignore
import { createPortal } from 'react-dom'
import { Dialog } from '@sanity/ui'
import styled from 'styled-components'
import { uuid } from '@sanity/uuid'
import { getAuthURL, storeAccessToken, getAccessToken } from './utils'
import type { FWAsset } from './types'

const TENANT_URL = process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL
const REDIRECT_ORIGIN = process.env.SANITY_STUDIO_FOTOWARE_REDIRECT_ORIGIN

const Content = styled.div`
  margin: 2em;
`

const StyledIframe = styled.iframe`
  display: block;
  width: 100%;
  height: 100%;
  min-height: 70vh;
  border: none;
`

const FotowareAssetSource = forwardRef<HTMLDivElement>((props: any, ref) => {
  const { onSelect, onClose } = props

  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const [requestState, setRequestState] = useState<string>(uuid())
  const [accessToken, setAccessToken] = useState<string | false>(getAccessToken())

  const newWindow = useRef<Window | null>(null)

  // Login & store access token
  const handleAuthEvent = useCallback(
    (event: any) => {
      if (!newWindow.current || !event || !event.data) return false

      if (event.origin !== REDIRECT_ORIGIN) {
        console.log('Fotoware: invalid event origin')
        return false
      }

      if (event.data.state !== requestState) {
        console.log('Fotoware: redirect state did not match request state')
        return false
      }

      storeAccessToken(event.data)
      setAccessToken(event.data.access_token)
      newWindow.current.close()
    },
    [requestState],
  )

  const handleSelectEvent = useCallback(
    (event: any) => {
      if (!event || !event.data) return false
      console.log('Fotoware: event received', event)

      if (event.origin !== TENANT_URL) {
        console.log('Fotoware: invalid event origin', event.origin)
        return false
      }

      // if (!data.event || data.event !== 'assetSelected' || !data.asset) return false

      // https://learn.fotoware.com/Integrations_and_APIs/001_The_FotoWare_API/FotoWare_API_Overview/Asset_representation
      // const asset = data.asset as FWAsset

      // onSelect([
      //   {
      //     kind: 'url',
      //     value: asset.href,
      //     assetDocumentProps: {
      //       originalFileName: asset.filename,
      //       source: {
      //         id: asset.uniqueid,
      //         name: 'fotoware',
      //       },
      //     },
      //   },
      // ])
    },
    [onSelect],
  )

  useEffect(() => {
    setContainer(document.createElement('div'))
  }, [])

  useEffect(() => {
    const requestURL = getAuthURL(requestState)

    if (!accessToken && container && requestURL) {
      newWindow.current = window.open(requestURL, 'Fotoware', 'width=1200,height=800,left=200,top=200')

      if (newWindow.current) {
        newWindow.current.document.body.appendChild(container)
        window.addEventListener('message', handleAuthEvent)
      }

      return () => {
        window.removeEventListener('message', handleAuthEvent)
        if (newWindow.current) {
          newWindow.current.close()
        }
      }
    }
  }, [container, requestState, handleAuthEvent, accessToken])

  return (
    <Dialog id="fotowareAssetSource" header="Select image from Fotoware" onClose={onClose} ref={ref}>
      {container && !accessToken && createPortal(props.children, container)}

      {accessToken ? (
        <Content>
          <StyledIframe
            src={`${TENANT_URL}/fotoweb/widgets/selection#access_token=${accessToken}`}
            title="Fotoware"
            frameBorder="0"
          ></StyledIframe>
        </Content>
      ) : (
        <Content>
          <p>Authentication required, please login to Fotoware using the popup window.</p>
        </Content>
      )}
    </Dialog>
  )
})

FotowareAssetSource.displayName = 'FotowareAssetSource'

export default FotowareAssetSource
