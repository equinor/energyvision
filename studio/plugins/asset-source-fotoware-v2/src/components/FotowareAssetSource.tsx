/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Card, Dialog, Flex, Spinner, Text } from '@sanity/ui'
import { uuid } from '@sanity/uuid'
import { arrayBufferToBlob } from 'blob-util'
import mime from 'mime'
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import type { FWAsset, FWAttributeField } from '../../types'
import {
  checkAPIAuthData,
  checkAuthData,
  FotowareEvents,
  getAccessToken,
  getApiAccessURL,
  getAuthURL,
  getRenditionURL,
  getSelectionWidgetURL,
  HAS_ENV_VARS,
  storeAccessToken,
} from '../utils'
import { Button } from './Button'
import { Iframe } from './Iframe'

const TENANT_URL = process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL

const FotowareAssetSource = forwardRef<HTMLDivElement>((props: any, ref) => {
  const { onSelect, onClose } = props
  const [selectionToken, setSelectionToken] = useState<string | false>(
    getAccessToken('SelectionFotowareToken'),
  )
  const [apiToken, setApiToken] = useState<string | false>(
    getAccessToken('ApiFotowareToken'),
  )
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const requestState = useMemo(() => uuid(), [])
  const [asset, setAsset] = useState<FWAsset | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [showSelectionIframe, setShowSelectionIframe] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [hasError, setHasError] = useState(!HAS_ENV_VARS)
  const [errorText, setErrorText] = useState(
    !HAS_ENV_VARS
      ? 'One or more required enviroment variables are not defined. Please contact support.'
      : '',
  )
  const newWindow = useRef<Window | null>(null)

  const selectionIframeUrl = useMemo(() => {
    if (selectionToken) {
      console.log('selection token', selectionToken)
      const url = getSelectionWidgetURL(selectionToken)
      console.log('has token, get selection widget url', url)
      return url
    }
    return null
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
          setErrorText(
            'Missing access token. Make sure you have permission to access Fotoware and try again.',
          )
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
        console.log('selection widget auth event validated')
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
          //close selection widget auth window
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

  // Login API & store access token
  const getApiAccessToken = useCallback(async () => {
    if (apiToken) return

    const apiUrl = getApiAccessURL()
    console.log('getApiAccessToken apiUrl', apiUrl)
    const response = await fetch(apiUrl)
      .catch(error => {
        console.error('An error occured while api access', error)
        setHasError(true)
        setErrorText(`Api error: ${error}`)
      })
      .then(res => {
        console.log('getApiAccessToken res', res)
        if (res && res.status !== 200) {
          console.error(
            'An error occured while retrieving api access',
            res.statusText,
          )
          setHasError(true)
          setErrorText(`Api error: ${res.statusText}`)
        }
        return res
      })
    console.log('getApiAccessToken response', response)

    if (!response || response.status !== 200) return

    const data = await response.json()
    console.log('getApiAccessToken data', data)

    if (!data?.access_token) {
      setHasError(true)
      setErrorText(
        'Missing api access token. Make sure you have permission to access Fotoware and try again.',
      )
      return
    }

    if (!checkAPIAuthData(data)) {
      setHasError(true)
      setErrorText('Invalid event data.')
      return
    }
    console.log('Store api access token')
    storeAccessToken('ApiFotowareToken', data)
    setApiToken(data.access_token)
  }, [apiToken])

  //REvalidate expirationDate /fotoweb/archives/{archiveid}/{folderid}/{asset}

  const downloadRenditionAsset = useCallback(async (url: string) => {
    try {
      const response = await fetch(url)
      //if (!response || response.status !== 200) return
      console.log('downloadRenditionAsset response', response)
      const data = await response.json()

      // kall tilbake til export bag <date Sanity:dataset> -> Metadata field 870
      // PATCH /fotoweb/archives/{archiveid}/{folderid}/{asset}
      // kan vi bruke archiveHREF fra asset representation to /{archiveid}/{folderid}/
      //Use the "href" or "linkstance" property value and store it. This url is used for getting the asset representation and update metadata.

      console.log('downloadRenditionAsset data', data)
      return data
    } catch (error) {
      console.error('An error occured while downloading asset', error)
      return null
    }
  }, [])

  const getRenditionServiceUrl = useCallback(async () => {
    try {
      const renditionServiceUrl = getRenditionURL()
      const response = await fetch(renditionServiceUrl)
      console.log('getRenditionServiceUrl response', response)
      const data = await response.json()
      console.log('getRenditionServiceUrl data', data)
      return data?.services?.rendition_requests
    } catch (error) {
      console.error('An error occured retrieving rendition service url', error)
      return null
    }
  }, [])

  const getRendition = useCallback(
    async (renditionHref: string) => {
      const serviceUrl = await getRenditionServiceUrl()
      if (serviceUrl) {
        const options = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
          body: JSON.stringify({
            href: renditionHref,
          }),
        }
        try {
          console.log('getRendition fetch rendition at FW api')
          const response = await fetch(serviceUrl, options)
          //const arrayBuffer = await response.arrayBuffer()
          const data = await response.json()
          if (data?.href) {
            const asset = await downloadRenditionAsset(data?.href)
            console.log('getRendition asset', asset)
            return asset
          }
        } catch (error) {
          console.error('Error fetching rendition:', error)
          return null
        }
      }
    },
    [downloadRenditionAsset, getRenditionServiceUrl, apiToken],
  )

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
        console.log('Fotoware event assetSelected')

        const selectedAsset = data.asset
        console.log('selectedAsset', selectedAsset)
        setAsset(selectedAsset)
        const assetTitle = selectedAsset?.builtinFields.find(
          (item: FWAttributeField) => item.field === 'title',
        )
        const assetDescription = selectedAsset?.builtinFields.find(
          (item: FWAttributeField) => item.field === 'description',
        )
        const assetId = selectedAsset?.metadata?.[187]?.value
        const personShownInTheImage =
          selectedAsset?.metadata?.[368]?.value?.join(', ')
        const description = assetDescription?.value
          ? [assetDescription?.value, personShownInTheImage].join('\n')
          : personShownInTheImage

        const assetExpirationDate =
          selectedAsset?.metadata?.[428]?.value ?? undefined //valid to date
        const renditionUrl =
          event.data.asset.renditions?.length > 1
            ? event.data.asset.renditions?.find(
                (rendition: any, i: number) =>
                  String(rendition?.display_name).includes('Large') || i === 3,
              ).href
            : event.data.asset.renditions[0]?.href

        if (!apiToken) {
          setHasError(true)
          setErrorText(
            'Missing api access token,downloading is not possible. Please check api access',
          )
        }
        console.log('handleWidgetEvent put together renditionUrl', renditionUrl)
        setShowSelectionIframe(false)
        if (apiToken) {
          const asset = await getRendition(renditionUrl)
          //const arrayBuffer = await response.arrayBuffer()
          console.log('downloaded asset', asset)
          setIsLoading(true)
          setLoadingText(
            `Downloading ${assetTitle} from Fotoware... Please hold`,
          )

          if (asset) {
            const assetMimeType =
              mime.getType(selectedAsset.filename) || 'application/octet-stream'
            //@ts-ignore: TODO
            const blob = arrayBufferToBlob(asset)

            if (blob) {
              const file = new File(
                [blob],
                selectedAsset?.filename || 'image.jpg',
                {
                  type: assetMimeType,
                },
              )

              console.log('file', file)
              if (file) {
                console.log('onSelect sanity event')
                onSelect([
                  {
                    kind: 'file',
                    value: file,
                    assetDocumentProps: {
                      originalFilename: selectedAsset?.filename || '',
                      source: {
                        name: `fotoware${assetExpirationDate ? `_${assetExpirationDate}` : ''}`,
                        id: assetId || selectedAsset?.uniqueid,
                        url:
                          process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL +
                          selectedAsset?.linkstance,
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
          /*   
onSelect([
          {
            kind: 'url',
            value: exportedImage.image.highCompression,
            assetDocumentProps: {
              originalFilename: asset?.filename || '',
              source: {
                name: 'fotoware',
                id: assetId || asset?.uniqueid || exportedImage.image.highCompression,
                url: exportedImage.source,
              },
              title: assetTitle?.value,
              description: description,
              expirationDate: assetExpirationDate,
            },
          },
        ]) */
        }

        /*         if (selectedAsset) {
          setIsLoading(true)
          setLoadingText(
            `Downloading ${assetTitle?.value} from Fotoware... Please hold`,
          )
          console.log(
            `Downloading ${assetTitle?.value} from Fotoware... Please hold`,
          )
          const assetMimeType =
            mime.getType(selectedAsset.filename) || 'application/octet-stream'
          const arrayBuffer = await getAsset(renditionUrl, assetMimeType)
          //@ts-ignore: TODO
          const blob = arrayBufferToBlob(arrayBuffer)

          if (blob) {
            const file = new File(
              [blob],
              selectedAsset?.filename || 'image.jpg',
              {
                type: assetMimeType,
              },
            )
            onSelect([
              {
                kind: 'file',
                value: file,
                assetDocumentProps: {
                  originalFilename: selectedAsset?.filename || '',
                  source: {
                    name: `fotoware${assetExpirationDate ? `_${assetExpirationDate}` : ''}`,
                    id: assetId || selectedAsset?.uniqueid,
                    url:
                      process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL +
                      selectedAsset?.linkstance,
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
        } */
        /*             const assetMimeType = mime.getType(selectedAsset.filename) || 'application/octet-stream'
          const arrayBuffer = await getAsset(renditionUrl, assetMimeType)
          //@ts-ignore: TODO
          const blob = arrayBufferToBlob(arrayBuffer) */
      }
    },
    [onClose, apiToken, getRendition, isLogin, onSelect],
  )

  //For selection widget
  const getAuthLink = async () => {
    const authURL = await getAuthURL(requestState)
    if (!authURL) {
      setHasError(true)
      setErrorText('Something went wrong when retrieving auth url')
    }
    if (authURL && container) {
      console.log('open auth url in window', authURL)
      newWindow.current = window.open(
        authURL,
        'Fotoware',
        'width=1200,height=800,left=200,top=200',
      )
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
    if (!apiToken) {
      console.log('Missing api access token, get it')
      getApiAccessToken()
    }
  }, [apiToken, getApiAccessToken])

  useEffect(() => {
    if (selectionToken) {
      window.removeEventListener('message', handleAuthEvent)
      //setShowSelectionIframe(true)
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
      id='fotoware_import_dialog'
      header='Import image from Fotoware'
      onClose={onClose}
      open
      width={selectionToken ? 4 : 1}
      height={800}
      ref={ref}
      zOffset={9999}
    >
      <div className='px-4 py-2'>
        {hasError && (
          <Card padding={[3, 3, 4]} radius={2} shadow={1}>
            <Text align='center' size={[2, 2, 3, 4]}>
              {errorText}
            </Text>
          </Card>
        )}
        {!selectionToken && (
          <Flex direction='column' align={'center'} gap={6}>
            {!isLogin && (
              <>
                <Text align='center' size={[2, 2, 3, 3]}>
                  We could not find an access token for Fotoware,
                  <br />
                  please log in below and a new window will open to log you in.
                </Text>
                <Button
                  onClick={() => {
                    login()
                  }}
                >
                  Log in
                </Button>
              </>
            )}

            {container && createPortal(props.children, container)}
          </Flex>
        )}
        {!apiToken && (
          <Flex direction='column' align={'center'} gap={6}>
            <Text align='center' size={[2, 2, 3, 3]}>
              Have not got access token for api from AF, please hold or try
              again.
              <br />
              If no luck, please contact support.
            </Text>
          </Flex>
        )}
        {isLoading && (
          <div className=''>
            {asset?.previews && (
              <div className='aspect-video'>
                <img
                  alt=''
                  className='h-full w-full object-cover'
                  src={`${TENANT_URL}${asset.previews[0]?.href}`}
                />
              </div>
            )}
            <div className='mt-3 flex gap-2'>
              <Spinner muted />
              <div className='text-md'>{loadingText}</div>
            </div>
          </div>
        )}
      </div>
      {selectionToken && selectionIframeUrl && showSelectionIframe && (
        <div ref={selectionContainerRef} id={`selectionIframe-${requestState}`}>
          <Iframe
            title='Select assets from Fotoware'
            src={selectionIframeUrl}
          />
        </div>
      )}
    </Dialog>
  )
})

FotowareAssetSource.displayName = 'FotowareAssetSource'

export default FotowareAssetSource
