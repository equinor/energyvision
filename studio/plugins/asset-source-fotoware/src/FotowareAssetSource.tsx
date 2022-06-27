/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useCallback, forwardRef, useState, useRef } from 'react'
// @ts-ignore
import { createPortal } from 'react-dom'
import { Dialog } from '@sanity/ui'
import { uuid } from '@sanity/uuid'
import {
  getAuthURL,
  storeAccessToken,
  getAccessToken,
  checkAuthData,
  getExportURL,
  HAS_ENV_VARS,
  getSelectionWidgetURL,
  getExportWidgetURL,
  FotowareEvents,
} from './utils'
import { Content, StyledIframe, ErrorMessage } from './components'
import type { FWAsset } from './types'
import { HAS_FOTOWARE } from '../../../src/lib/datasetHelpers'

const TENANT_URL = process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL
const REDIRECT_ORIGIN = process.env.SANITY_STUDIO_FOTOWARE_REDIRECT_ORIGIN

const FotowareAssetSource = forwardRef<HTMLDivElement>((props: any, ref) => {
  const { onSelect, onClose } = props

  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const [requestState, setRequestState] = useState<string>(uuid())
  const [accessToken, setAccessToken] = useState<string | false>(getAccessToken())
  const [asset, setAsset] = useState<FWAsset | null>(null)
  const [iframeURL, setIframeURL] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

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

  const handleWidgetEvent = useCallback(
    (event: any) => {
      if (!event || !event.data) return false

      if (event.origin !== TENANT_URL) {
        console.log('Fotoware: invalid event origin', event.origin)
        return false
      }

      const { data } = event

      if (!FotowareEvents.includes(data.event)) return false

      if (data.event === 'selectionWidgetCancel') {
        onClose()
      }

      if (data.event === 'assetSelected') {
        setAsset(data.asset)
      }

      if (data.event === 'assetExported') {
        const exportedImage = event.data.export.export

        const getBase64 = async (uri: string, source: string) => {
          const url = getExportURL(uri)
          setLoading(true)

          const response = await fetch(url)
          const data = await response.json()

          onSelect([
            {
              kind: 'base64',
              value: data.image,
              assetDocumentProps: {
                originalFileName: asset?.filename || '',
                source: {
                  id: asset?.uniqueid || uri,
                  name: 'fotoware',
                  url: source,
                },
              },
            },
          ])
        }

        getBase64(exportedImage.image.highCompression, exportedImage.source)
      }
    },
    [onSelect, onClose, asset],
  )

  useEffect(() => {
    if (accessToken) {
      if (!asset || !asset.href) {
        setIframeURL(getSelectionWidgetURL(accessToken))
      } else {
        setIframeURL(getExportWidgetURL(accessToken, asset.href as string))
      }
    }
  }, [accessToken, asset])

  useEffect(() => {
    if (HAS_FOTOWARE) {
      window.addEventListener('message', handleWidgetEvent)
      window.addEventListener('message', handleAuthEvent)

      setContainer(document.createElement('div'))
    }

    return () => {
      window.removeEventListener('message', handleWidgetEvent)
      window.removeEventListener('message', handleAuthEvent)
    }
  }, [handleWidgetEvent, handleAuthEvent])

  useEffect(() => {
    const authURL = getAuthURL(requestState)

    if (!accessToken && container && authURL && HAS_FOTOWARE) {
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

  if (!HAS_FOTOWARE || !HAS_ENV_VARS) {
    const message = !HAS_FOTOWARE
      ? 'This feature is not available.'
      : 'The required enviroment variables are not defined'
    return <ErrorMessage onClose={onClose} ref={ref} message={message} />
  }

  return (
    <Dialog width={2} id="fotowareAssetSource" header="Select image from Fotoware" onClose={onClose} ref={ref}>
      {container && !accessToken && createPortal(props.children, container)}

      {accessToken && iframeURL && !loading ? (
        <Content>
          <StyledIframe src={iframeURL} title="Fotoware" frameBorder="0" ref={iframeRef}></StyledIframe>
        </Content>
      ) : (
        <Content>
          {loading ? (
            <p>Retrieving image...</p>
          ) : (
            <p>Authentication required, please login to Fotoware using the popup window.</p>
          )}
        </Content>
      )}
    </Dialog>
  )
})

FotowareAssetSource.displayName = 'FotowareAssetSource'

export default FotowareAssetSource
