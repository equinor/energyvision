import { TokenType } from '../../types'

export const HAS_ENV_VARS =
  // process.env.SANITY_STUDIO_FOTOWARE_SELECTION_CLIENT_ID &&
  process.env.SANITY_STUDIO_FOTOWARE_CLIENT_ID && // OLD
  process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL &&
  process.env.SANITY_STUDIO_FOTOWARE_REDIRECT_ORIGIN &&
  process.env.SANITY_STUDIO_FOTOWARE_AF_EXPORT_URL &&
  process.env.SANITY_STUDIO_FOTOWARE_AF_EXPORT_KEY

export const FotowareEvents = ['selectionWidgetCancel', 'assetSelected', 'assetExported']

export const createCodeVerifier = async () => {
  // Create byte array and fill with 1 random number and get cryptographically strong random values
  const code_verifier = window.crypto.getRandomValues(new Uint8Array(1))
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', code_verifier) // hash to SHA-256
  return hashBuffer
}
const createCodeChallenge = async () => {
  const code_verifier = window.crypto.getRandomValues(new Uint8Array(1))
  const hash = await window.crypto.subtle.digest('SHA-256', code_verifier) // hash to SHA-256
  const toByte = window
    .btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
  return toByte
}
export const getAuthURL = async (requestState: string) => {
  if (!HAS_ENV_VARS) {
    console.warn('Required Fotoware .env variables are not defined. Make sure they are set in the .env file(s)')
    return false
  }

  const CLIENT_ID = process.env.SANITY_STUDIO_FOTOWARE_CLIENT_ID
  const TENANT_URL = process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL
  const REDIRECT_URI = process.env.SANITY_STUDIO_FOTOWARE_REDIRECT_URI
  const CODE_CHALLENGE = await createCodeChallenge()

  if (!CODE_CHALLENGE) {
    console.error('Failed to generate code challenge')
    return false
  }
  return `${TENANT_URL}/fotoweb/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&state=${requestState}&redirect_uri=${REDIRECT_URI}&code_challenge=${CODE_CHALLENGE}&code_challenge_method=S256`
}
export const getTokenURL = async (authorization_code: string, code_verifier: BufferSource) => {
  if (!HAS_ENV_VARS) {
    console.warn('Required Fotoware .env variables are not defined. Make sure they are set in the .env file(s)')
    return false
  }

  const CLIENT_ID = process.env.SANITY_STUDIO_FOTOWARE_CLIENT_ID
  const TENANT_URL = process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL
  const REDIRECT_URI = process.env.SANITY_STUDIO_FOTOWARE_REDIRECT_ORIGIN

  return `${TENANT_URL}/fotoweb/oauth2/token?grant_type=authorization_code&client_id=${CLIENT_ID}&code=${authorization_code}&redirect_uri=${REDIRECT_URI}&code_verifier=${code_verifier}`
}

export const getAccessToken = (tokenType: TokenType): string | false => {
  const accessToken = localStorage.getItem(tokenType)

  if (!accessToken) return false

  const tokenData = JSON.parse(accessToken)

  const now = Math.floor(new Date().getTime() / 1000.0)

  if (parseInt(tokenData.expires) <= now) {
    localStorage.removeItem(tokenType)
    return false
  }

  return tokenData.access_token
}

type FotowareAuthData = {
  access_token: string
  expires_in: string
  state: string
}

export const storeAccessToken = (tokenType: TokenType, data: FotowareAuthData): void => {
  const now = Math.floor(new Date().getTime() / 1000.0)

  const tokenData = {
    access_token: data.access_token,
    expires: now + parseInt(data.expires_in),
  }

  localStorage.setItem(tokenType, JSON.stringify(tokenData))
}

export const checkAuthData = (data: any): boolean => {
  return (
    typeof data === 'object' &&
    ['access_token', 'expires_in', 'state'].every((key: string) => data[key] && typeof data[key] === 'string')
  )
}
export const checkAPIAuthData = (data: any): boolean => {
  return (
    typeof data === 'object' &&
    ['access_token', 'expires_in'].every((key: string) => data[key] && typeof data[key] === 'string')
  )
}

export const getExportURL = (uri: string): string =>
  `${process.env.SANITY_STUDIO_FOTOWARE_AF_EXPORT_URL}?code=${process.env.SANITY_STUDIO_FOTOWARE_AF_EXPORT_KEY}&uri=${uri}`

export const getApiAccessURL = (): string =>
  `${process.env.SANITY_STUDIO_FOTOWARE_AF_API_ACCESS_URL}?code=${process.env.SANITY_STUDIO_FOTOWARE_AF_API_ACCESS_KEY}`

export const getSelectionWidgetURL = (accessToken: string) => {
  return `${process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL}/fotoweb/widgets/selection?access_token=${accessToken}`
}

export const getRenditionURL = () => {
  return `${process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL}/fotoweb/me`
}

export const getExportWidgetURL = (accessToken: string, href: string) => {
  const assetURI = encodeURI(href)
  const publicationText = encodeURI(`Sanity (Dataset: ${process.env.SANITY_STUDIO_API_DATASET})`)
  const params = `access_token=${accessToken}&i=${assetURI}&pub=${publicationText}&&caption=false&action=false&behaviour=false&publication=false&enhance=false`

  return `${process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL}/fotoweb/widgets/publish?${params}`
}

type ErrorTypes = 'generic' | 'auth' | 'export'

export const handleRequestError = (
  message: string,
  setError: (arg0: string) => void,
  type: ErrorTypes = 'generic',
  window: React.MutableRefObject<Window | null> | null = null,
): false => {
  const prefix = ((type) => {
    switch (type) {
      case 'auth':
        return `An error occured while authenticating with Fotoware.`
      case 'export':
        return `An error occured while attempting to retrieve the image.`
      default:
        return `An error occured with the Fotoware integration.`
    }
  })(type)

  console.error(`A Fotoware error occured`, message)
  setError(`<p>${prefix}</p><p>The following message was received:</p> <pre><code>${message}</code></pre>`)

  if (window && window?.current) {
    window.current.close()
  }

  return false
}

export const validateToken = (tokenType: TokenType, token: string) => {
  const tokenData = JSON.parse(token)
  const now = Math.floor(new Date().getTime() / 1000.0)

  if (parseInt(tokenData.expires) <= now) {
    localStorage.removeItem(tokenType)
    return false
  }
  return true
}

export const parseToken = (token: string) => {
  const tokenData = JSON.parse(token)
  return tokenData.access_token
}
