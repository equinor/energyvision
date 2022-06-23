/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useCallback, forwardRef, useState, useRef } from 'react'
// @ts-ignore
import { createPortal } from 'react-dom'
import { Dialog } from '@sanity/ui'
import styled from 'styled-components'
import { uuid } from '@sanity/uuid'
import { getAuthURL, storeAccessToken, getAccessToken, checkAuthData } from './utils'
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
  const [asset, setAsset] = useState<FWAsset | null>(null)
  const [iframeURL, setIframeURL] = useState<string | null>(null)

  const newWindow = useRef<Window | null>(null)
  const iframeRef = useRef(null)

  // Login & store access token
  const handleAuthEvent = useCallback(
    (event: any) => {
      if (!newWindow.current || !event || !event.data) return false

      if (event.origin !== REDIRECT_ORIGIN) {
        console.warn('Fotoware: invalid event origin')
        return false
      }

      if (!checkAuthData(event.data)) {
        console.warn('Fotoware: invalid event data')
        return false
      }

      if (event.data.state !== requestState) {
        console.warn('Fotoware: redirect state did not match request state')
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

      if (event.origin !== TENANT_URL) {
        console.log('Fotoware: invalid event origin', event.origin)
        return false
      }

      const { data } = event

      if (data.event === 'assetSelected') {
        setAsset(data.asset)
      }

      if (data.event === 'assetExported') {
        const exportedImage = event.data.export.export

        onSelect([
          {
            kind: 'url',
            value: exportedImage.image.normal,
            assetDocumentProps: {
              originalFileName: asset?.filename,
              source: {
                id: asset?.uniqueid,
                name: 'fotoware',
                url: exportedImage.source,
              },
            },
          },
        ])
      }

      if (!data.event || data.event !== 'assetSelected' || !data.asset) return false
    },
    [onSelect, asset],
  )

  useEffect(() => {
    if (accessToken) {
      if (!asset || !asset.href) {
        setIframeURL(`${TENANT_URL}/fotoweb/widgets/selection?access_token=${accessToken}`)
      } else {
        setIframeURL(
          `${TENANT_URL}/fotoweb/widgets/publish?access_token=${accessToken}&i=${encodeURI(asset.href as string)}`,
        )
      }
    }
  }, [accessToken, asset])

  useEffect(() => {
    window.addEventListener('message', handleSelectEvent)
    window.addEventListener('message', handleAuthEvent)

    setContainer(document.createElement('div'))

    return () => {
      window.removeEventListener('message', handleSelectEvent)
      window.removeEventListener('message', handleAuthEvent)
    }
  }, [handleSelectEvent, handleAuthEvent])

  useEffect(() => {
    const authURL = getAuthURL(requestState)

    if (!accessToken && container && authURL) {
      newWindow.current = window.open(authURL, 'Fotoware', 'width=1200,height=800,left=200,top=200')

      if (newWindow.current) {
        newWindow.current.document.body.appendChild(container)
      }

      return () => {
        if (newWindow.current) {
          newWindow.current.close()
        }
      }
    }

    if (accessToken && newWindow.current) {
      newWindow.current.close()
    }
  }, [container, requestState, handleAuthEvent, accessToken])

  return (
    <Dialog id="fotowareAssetSource" header="Select image from Fotoware" onClose={onClose} ref={ref}>
      {container && !accessToken && createPortal(props.children, container)}

      {accessToken && iframeURL ? (
        <Content>
          <StyledIframe src={iframeURL} title="Fotoware" frameBorder="0" ref={iframeRef}></StyledIframe>
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
