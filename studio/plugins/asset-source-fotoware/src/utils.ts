export const HAS_ENV_VARS =
  process.env.SANITY_STUDIO_FOTOWARE_CLIENT_ID && process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL

export const getAuthURL = (requestState: string): string | false => {
  const CLIENT_ID = process.env.SANITY_STUDIO_FOTOWARE_CLIENT_ID
  const TENANT_URL = process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL

  if (!CLIENT_ID || !TENANT_URL) {
    console.warn('Required Fotoware .env variables are not defined. Make sure they are set in the .env file(s)')
    return false
  }

  return `${TENANT_URL}/fotoweb/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&state=${requestState}`
}

export const getAccessToken = (): string | false => {
  const accessToken = localStorage.getItem('FotowareToken')

  if (!accessToken) return false

  const tokenData = JSON.parse(accessToken)

  const now = Math.floor(new Date().getTime() / 1000.0)

  if (parseInt(tokenData.expires) <= now) {
    localStorage.removeItem('FotowareToken')
    return false
  }

  return tokenData.access_token
}

type FotowareAuthData = {
  access_token: string
  expires_in: string
  state: string
}

export const storeAccessToken = (data: FotowareAuthData): void => {
  const now = Math.floor(new Date().getTime() / 1000.0)

  const tokenData = {
    access_token: data.access_token,
    expires: now + parseInt(data.expires_in),
  }

  localStorage.setItem('FotowareToken', JSON.stringify(tokenData))
}

export const checkAuthData = (data: any): boolean => {
  return (
    typeof data === 'object' &&
    ['access_token', 'expires_in', 'state'].every((key: string) => data[key] && typeof data[key] === 'string')
  )
}

export const getExportURL = (uri: string): string =>
  `${process.env.SANITY_STUDIO_FOTOWARE_AF_EXPORT_URL}?code=${process.env.SANITY_STUDIO_FOTOWARE_AF_EXPORT_KEY}&uri=${uri}`
