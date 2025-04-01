/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useCallback, forwardRef, useState, useRef, useMemo } from 'react'
import { Card, Dialog, Button, Text, Flex, Box, Spinner } from '@sanity/ui'
import { uuid } from '@sanity/uuid'
import {
  getAuthURL,
  storeAccessToken,
  getAccessToken,
  checkAuthData,
  HAS_ENV_VARS,
  getSelectionWidgetURL,
  FotowareEvents,
} from '../utils/utils'
import { FWAttributeField, FWAsset } from '../../types'
import { createPortal } from 'react-dom'
import { ImageContainer, StyledImage } from '../../../asset-source-fotoware/src/components'
import mime from 'mime'
import { arrayBufferToBlob } from 'blob-util'
import styled from 'styled-components'

const TENANT_URL = process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL

export const StyledButton = styled(Button)`
  width: fit-content;
`

export const StyledIframe = styled.iframe`
  display: block;
  width: 100%;
  height: 100%;
  min-height: 80vh;
  border: none;
`

const FotowareAssetSource = forwardRef<HTMLDivElement>((props: any, ref) => {
  const { onSelect, onClose } = props
  const [selectionToken, setSelectionToken] = useState<string | false>(getAccessToken('SelectionFotowareToken'))
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const requestState = useMemo(() => uuid(), [])
  const [asset, setAsset] = useState<FWAsset | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [showSelectionIframe, setShowSelectionIframe] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [hasError, setHasError] = useState(!HAS_ENV_VARS)
  const [errorText, setErrorText] = useState(
    !HAS_ENV_VARS ? 'One or more required enviroment variables are not defined. Please contact support.' : '',
  )
  const newWindow = useRef<Window | null>(null)
  const selectionIframeUrl = useMemo(() => {
    if (selectionToken) {
      console.log('selection token', selectionToken)
      const url = getSelectionWidgetURL(selectionToken)
      console.log('has token, get selection widget url', url)
      return url
    } else {
      return null
    }
  }, [selectionToken])
  const selectionContainerRef = useRef<HTMLDivElement>(null)

  // Login & store access token
  const handleAuthEvent = useCallback(
    (event: any) => {
      const validateAuthEvent = () => {
        if (event.data?.error) {
          const { error, error_description } = event.data
          setHasError(true)
          setErrorText(`Error: ${error} - description: ${error_description}`)
          return false
        }

        if (!event?.data?.access_token) {
          setHasError(true)
          setErrorText('Missing access token. Make sure you have permission to access Fotoware and try again.')
          return false
        }

        if (!checkAuthData(event.data)) {
          setHasError(true)
          setErrorText('Invalid event data.')
          return false
        }

        if (event.data.state !== requestState) {
          setHasError(true)
          setErrorText('Redirect state did not match request state')
          return false
        }
        return true
      }

      if (!newWindow.current || !event || !event.data) return false

      if (event.data) {
        const validateEvent = validateAuthEvent()
        if (validateEvent) {
          storeAccessToken('SelectionFotowareToken', event.data)
          setSelectionToken(event.data.access_token)
          setIsLogin(false)
          setShowSelectionIframe(true)
          newWindow.current.close()
        } else {
          return false
        }
      } else {
        return false
      }
    },
    [requestState],
  )

  const getAsset = async (renditionHref: string, mimeType: string) => {
    const serviceUrl = `${process.env.SANITY_STUDIO_FOTOWARE_AF_EXPORT_URL}?code=${process.env.SANITY_STUDIO_FOTOWARE_AF_EXPORT_KEY}`
    if (serviceUrl) {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          href: renditionHref,
          mimeType: mimeType,
        }),
      }
      try {
        const response = await fetch(serviceUrl, options)
        const arrayBuffer = await response.arrayBuffer()
        setIsLoading(false)
        return arrayBuffer
      } catch (error) {
        console.error('Error fetching rendition:', error)
        setErrorText('Error downloading image')
        setHasError(true)
        return null
      }
    }
  }

  const handleWidgetEvent = useCallback(
    async (event: any) => {
      if (isLogin) return false
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

      if (data.event === 'assetSelected' && data.asset) {
        const selectedAsset = data.asset
        setAsset(selectedAsset)
        const assetTitle = selectedAsset?.builtinFields.find((item: FWAttributeField) => item.field === 'title')
        const assetDescription = selectedAsset?.builtinFields.find(
          (item: FWAttributeField) => item.field === 'description',
        )
        const assetId = selectedAsset?.metadata?.[187]?.value
        const personShownInTheImage = selectedAsset?.metadata?.[368]?.value?.join(', ')
        const description = assetDescription?.value
          ? [assetDescription?.value, personShownInTheImage].join('\n')
          : personShownInTheImage

        const assetExpirationDate = selectedAsset?.metadata?.[428]?.value ?? undefined //valid to date
        const renditionUrl =
          event.data.asset.renditions?.length > 1
            ? event.data.asset.renditions?.find(
                (rendition: any, i: number) => String(rendition?.display_name).includes('Large') || i === 3,
              ).href
            : event.data.asset.renditions[0]?.href

        setShowSelectionIframe(false)

        if (selectedAsset) {
          setIsLoading(true)
          setLoadingText(`Downloading ${assetTitle?.value} from Fotoware... Please hold`)
          const assetMimeType = mime.getType(selectedAsset.filename) || 'application/octet-stream'
          const arrayBuffer = await getAsset(renditionUrl, assetMimeType)
          //@ts-ignore: TODO
          const blob = arrayBufferToBlob(arrayBuffer)

          if (blob) {
            const file = new File([blob], selectedAsset?.filename || 'image.jpg', {
              type: assetMimeType,
            })
            onSelect([
              {
                kind: 'file',
                value: file,
                assetDocumentProps: {
                  originalFilename: selectedAsset?.filename || '',
                  source: {
                    name: `fotoware${assetExpirationDate ? `_${assetExpirationDate}` : ''}`,
                    id: assetId || selectedAsset?.uniqueid,
                    url: process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL + selectedAsset?.linkstance,
                  },
                  metadata: {
                    expirationDate: assetExpirationDate,
                  },
                  title: assetTitle?.value,
                  description: description,
                },
              },
            ])
          }
        }
      }
    },
    [onSelect, onClose, asset, isLogin],
  )

  const getAuthLink = async () => {
    const authURL = await getAuthURL(requestState)
    if (!authURL) {
      setHasError(true)
      setErrorText('Something went wrong when retrieving auth url')
    }
    if (authURL && container) {
      console.log('open auth url in window', authURL)
      newWindow.current = window.open(authURL, 'Fotoware', 'width=1200,height=800,left=200,top=200')
      if (newWindow.current) {
        newWindow.current.document.body.appendChild(container)
      }
    }
  }

  const login = () => {
    setContainer(document.createElement('div'))
    setIsLogin(true)
    getAuthLink()
  }

  useEffect(() => {
    window.addEventListener('message', handleAuthEvent)
    return () => {
      window.removeEventListener('message', handleAuthEvent)
    }
  }, [handleAuthEvent])

  useEffect(() => {
    if (selectionToken) {
      window.removeEventListener('message', handleAuthEvent)
      setShowSelectionIframe(true)
    }
  }, [selectionToken, handleAuthEvent])

  useEffect(() => {
    if (selectionToken && newWindow.current) {
      setIsLogin(false)
      newWindow.current.close()
    }
  }, [selectionToken])

  useEffect(() => {
    window.addEventListener('message', handleWidgetEvent)
    setContainer(document.createElement('div'))
    return () => {
      window.removeEventListener('message', handleWidgetEvent)
    }
  }, [handleWidgetEvent])

  return (
    <Dialog
      id="fotoware_import_dialog"
      header="Import image from Fotoware"
      onClose={onClose}
      open
      width={selectionToken ? 4 : 1}
      height={800}
      ref={ref}
      zOffset={9999}
    >
      <Box padding={4}>
        {hasError && (
          <Card padding={[3, 3, 4]} radius={2} shadow={1}>
            <Text align="center" size={[2, 2, 3, 4]}>
              {errorText}
            </Text>
          </Card>
        )}
        {!selectionToken && (
          <Flex direction="column" align={'center'} gap={6}>
            {!isLogin && (
              <>
                <Text align="center" size={[2, 2, 3, 3]}>
                  We could not find an access token for Fotoware,
                  <br />
                  please log in below and a new window will open to log you in.
                </Text>
                <StyledButton
                  fontSize={[2, 2, 3]}
                  padding={[3, 3, 4]}
                  text="Login"
                  tone="primary"
                  onClick={() => {
                    login()
                  }}
                />
              </>
            )}

            {container && createPortal(props.children, container)}
          </Flex>
        )}
        {isLoading && (
          <Flex direction="column" align={'center'} gap={6}>
            {asset && asset?.previews && (
              <ImageContainer>
                <StyledImage src={`${TENANT_URL}${asset.previews[0]?.href}`} />
              </ImageContainer>
            )}
            <Flex direction="row" align={'center'} gap={6}>
              <Spinner muted />
              <Text align="center" size={[2, 2, 3, 4]}>
                {loadingText}
              </Text>
            </Flex>
          </Flex>
        )}
      </Box>
      {selectionToken && selectionIframeUrl && showSelectionIframe && (
        <div ref={selectionContainerRef} id={`selectionIframe-${requestState}`}>
          <StyledIframe width="100%" title="Select assets from Fotoware" src={selectionIframeUrl} />
        </div>
      )}
    </Dialog>
  )
})

FotowareAssetSource.displayName = 'FotowareAssetSource'

export default FotowareAssetSource
