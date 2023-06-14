/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useCallback, forwardRef, useState, useRef } from 'react'
// @ts-ignore
import { createPortal } from 'react-dom'
import { Dialog, Spinner } from '@sanity/ui'
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
import { Content, ErrorMessage, LoadingContent, FotowareWidget } from './components'
import type { FWAsset, FWAttributeField } from './types'
import { Flags } from '../../../src/lib/datasetHelpers'

const TENANT_URL = process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL
const REDIRECT_ORIGIN = process.env.SANITY_STUDIO_FOTOWARE_REDIRECT_ORIGIN

const FotowareAssetSource = forwardRef<HTMLDivElement>((props: any, ref) => {
  const { onSelect, onClose } = props

  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const [requestState] = useState<string>(uuid())
  const [accessToken, setAccessToken] = useState<string | false>(getAccessToken())
  const [asset, setAsset] = useState<FWAsset | null>(null)
  const [iframeURL, setIframeURL] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const newWindow = useRef<Window | null>(null)
  const iframeRef = useRef(null)

  const validateAuthEvent = useCallback(
    (event: any) => {
      const handleError = (msg: string) => {
        console.warn('Fotoware:', msg)
        setError(
          `<p>An error occured authenticating with Fotoware.</p> <p>The following message was received:</p> <pre><code>${msg}</code></pre>`,
        )

        if (newWindow.current) {
          newWindow.current.close()
        }

        return false
      }

      delete event.data.access_token

      if (event.origin !== REDIRECT_ORIGIN) {
        return handleError(`Invalid event origin: ${event.origin}`)
      }

      if (!event?.data?.access_token) {
        return handleError(
          'Missing access token. Make sure you have permission to access Fotoware and try again. If this keeps happening, please contact support.',
        )
      }

      if (!checkAuthData(event.data)) {
        return handleError('Invalid event data')
      }

      if (event.data.state !== requestState) {
        return handleError('Redirect state did not match request state')
      }

      return true
    },
    [requestState, setError],
  )

  // Login & store access token
  const handleAuthEvent = useCallback(
    (event: any) => {
      if (!newWindow.current || !event || !event.data) return false

      if (!validateAuthEvent(event)) return false

      storeAccessToken(event.data)
      setAccessToken(event.data.access_token)
      newWindow.current.close()
    },
    [validateAuthEvent],
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

          const response = await fetch(url).catch((error) => {
            console.error('An error occured while retrieving base64 image', error)
            setError('An error occured while retrieving the image. If this keeps happening, please contact support.')
          })

          if (response) {
            const data = await response.json()

            const assetTitle = asset && asset?.builtinFields.find((item: FWAttributeField) => item.field === 'title')
            const assetDescription =
              asset && asset?.builtinFields.find((item: FWAttributeField) => item.field === 'description')

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
                  ...(assetTitle?.value && { title: assetTitle.value }),
                  ...(assetDescription?.value && { description: assetDescription.value }),
                },
              },
            ])
          }
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
    window.addEventListener('message', handleWidgetEvent)
    window.addEventListener('message', handleAuthEvent)

    setContainer(document.createElement('div'))

    return () => {
      window.removeEventListener('message', handleWidgetEvent)
      window.removeEventListener('message', handleAuthEvent)
    }
  }, [handleWidgetEvent, handleAuthEvent])

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

  if (!HAS_ENV_VARS) {
    return (
      <ErrorMessage onClose={onClose} ref={ref}>
        <p>
          The plugin could not be loaded because one or more required enviroment variables are not defined. Please
          contact support.
        </p>
      </ErrorMessage>
    )
  }

  if (error) {
    return (
      <ErrorMessage onClose={onClose} ref={ref}>
        <div dangerouslySetInnerHTML={{ __html: error }}></div>
      </ErrorMessage>
    )
  }

  if (accessToken && iframeURL && !loading) {
    return <FotowareWidget onClose={onClose} url={iframeURL} iframeRef={iframeRef} />
  }

  return (
    <Dialog width={0} id="fotowareAssetSource" header="Select image from Fotoware" onClose={onClose} ref={ref}>
      {container && !accessToken && createPortal(props.children, container)}

      <Content>
        {loading ? (
          <LoadingContent>
            <Spinner muted />
            <p>Retrieving image...</p>
          </LoadingContent>
        ) : (
          <p>Authentication required, please login to Fotoware using the popup window.</p>
        )}
      </Content>
    </Dialog>
  )
})

FotowareAssetSource.displayName = 'FotowareAssetSource'

export default FotowareAssetSource
