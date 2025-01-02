/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useCallback, forwardRef, useState, useRef, useMemo } from 'react'
import { Card, Dialog, Text, Flex, Box, Spinner } from '@sanity/ui'
import { uuid } from '@sanity/uuid'
import {
  getAuthURL,
  storeAccessToken,
  getAccessToken,
  checkAuthData,
  HAS_ENV_VARS,
  getSelectionWidgetURL,
  FotowareEvents,
  getRenditionURL,
  handleRequestError,
  getApiAccessURL,
  checkAPIAuthData,
} from '../utils/utils'
import { StyledIframe, StyledButton } from './components'
import { FWAttributeField, FWAsset } from '../../types'
import { createPortal } from 'react-dom'
import { ImageContainer, StyledImage } from '../../../asset-source-fotoware/src/components'

const TENANT_URL = process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL
const REDIRECT_ORIGIN = process.env.SANITY_STUDIO_FOTOWARE_REDIRECT_ORIGIN

const FotowareAssetSource = forwardRef<HTMLDivElement>((props: any, ref) => {
  const { onSelect, onClose } = props
  const [selectionToken, setSelectionToken] = useState<string | false>(getAccessToken('SelectionFotowareToken'))
  const [apiToken, setApiToken] = useState<string | false>(getAccessToken('ApiFotowareToken'))
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
  const handleAuthEvent = useCallback((event: any) => {
    const validateAuthEvent = () => {
      console.log('running validation')
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
      console.log('auth event validated')
      return true
    }

    if (!newWindow.current || !event || !event.data) return false

    if (event.data) {
      const validateEvent = validateAuthEvent()
      console.log('validateEvent', validateEvent)
      if (validateEvent) {
        console.log('Set token', event.data)
        storeAccessToken('SelectionFotowareToken', event.data)
        setSelectionToken(event.data.access_token)
        console.log('set is login false')
        setIsLogin(false)
        console.log('set show selection iframe true')
        setShowSelectionIframe(true)
        console.log('close auth window')
        newWindow.current.close()
      } else {
        return false
      }
    } else {
      return false
    }
  }, [])

  // Login API & store access token
  const getApiAccessToken = async () => {
    if (apiToken) return

    const apiUrl = getApiAccessURL()

    const response = await fetch(apiUrl)
      .catch((error) => {
        console.error('An error occured while api access', error)
        setHasError(true)
        setErrorText(`Api error: ${error}`)
      })
      .then((res) => {
        if (res && res.status !== 200) {
          console.error('An error occured while retrieving api access', res.statusText)
          setHasError(true)
          setErrorText(`Api error: ${res.statusText}`)
        }
        return res
      })

    if (!response || response.status !== 200) return

    const data = await response.json()

    if (!data?.access_token) {
      setHasError(true)
      setErrorText('Missing api access token. Make sure you have permission to access Fotoware and try again.')
      return
    }

    if (!checkAPIAuthData(data)) {
      setHasError(true)
      setErrorText('Invalid event data.')
      return
    }
    console.log('store access token', data.access_token)
    storeAccessToken('ApiFotowareToken', data)
    setApiToken(data.access_token)
  }

  //REvalidate expirationDate /fotoweb/archives/{archiveid}/{folderid}/{asset}

  const downloadRenditionAsset = async (url: string) => {
    try {
      const response = await fetch(url)
      //if (!response || response.status !== 200) return
      console.log('response', response)
      const data = await response.json()

      // kall tilbake til export bag <date Sanity:dataset> -> Metadata field 870
      // PATCH /fotoweb/archives/{archiveid}/{folderid}/{asset}
      // kan vi bruke archiveHREF fra asset representation to /{archiveid}/{folderid}/
      //Use the "href" or "linkstance" property value and store it. This url is used for getting the asset representation and update metadata.

      console.log('data', data)
      return data
    } catch (error) {
      console.error('An error occured while downloading asset', error)
      return null
    }
  }

  const getRenditionServiceUrl = async () => {
    try {
      const renditionServiceUrl = getRenditionURL()
      const response = await fetch(renditionServiceUrl)
      console.log('response', response)
      const data = await response.json()
      console.log('data', data)
      return data?.services?.rendition_requests
    } catch (error) {
      console.error('An error occured retrieving rendition service url', error)
      return null
    }
  }

  const getRendition = async (renditionHref: string) => {
    const serviceUrl = await getRenditionServiceUrl()
    if (serviceUrl) {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          href: renditionHref,
        }),
      }
      try {
        const response = await fetch(serviceUrl, options)
        const data = await response.json()
        if (data?.href) {
          const asset = await downloadRenditionAsset(data?.href)
          console.log('asset', asset)
          return asset
        }
      } catch (error) {
        console.error('Error fetching rendition:', error)
        return null
      }
    }
  }

  const handleWidgetEvent = useCallback(
    (event: any) => {
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

        const assetExpirationDate = selectedAsset?.metadata?.[428]?.value //valid to date
        console.log('event.data.asset.renditions', event.data.asset.renditions)
        const renditionUrl = event.data.asset.renditions?.find((rendition: any) => rendition.original).href
        console.log('renditionUrl', renditionUrl)
        if (!apiToken) {
          setHasError(true)
          setErrorText('Missing api access token,downloading is not possible. Please check api access')
        }
        setShowSelectionIframe(false)
        if (apiToken) {
          const asset = getRendition(renditionUrl)
          console.log('downloaded asset', asset)
          setIsLoading(true)
          setLoadingText(`Downloading ${assetTitle} from Fotoware... Please hold`)
          //await api rendition download and set
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
      }
    },
    [onSelect, onClose, asset],
  )

  const getAuthLink = async () => {
    const authURL = await getAuthURL(requestState)
    if (!authURL) {
      setHasError(true)
      setErrorText('Something went wrong when retrieving auth url')
    }
    console.log('authUrl', authURL)
    console.log('container', container)
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
    if (!apiToken) {
      getApiAccessToken()
    }
  }, [apiToken, getApiAccessToken])

  useEffect(() => {
    if (selectionToken) {
      window.removeEventListener('message', handleAuthEvent)
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
        {!apiToken && (
          <Flex direction="column" align={'center'} gap={6}>
            <Text align="center" size={[2, 2, 3, 3]}>
              Have not got access token for api from AF, please hold or try again.
              <br />
              If no luck, please contact support.
            </Text>
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
