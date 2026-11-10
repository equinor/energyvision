import type { TokenType } from '../types';

export const HAS_ENV_VARS =
  process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL &&
  process.env.SANITY_STUDIO_FOTOWARE_REDIRECT_ORIGIN &&
  process.env.SANITY_STUDIO_FOTOWARE_AF_EXPORT_URL &&
  process.env.SANITY_STUDIO_FOTOWARE_AF_EXPORT_KEY;

export const FotowareEvents = [
  'selectionWidgetCancel',
  'assetSelected',
  'assetExported',
];

const encodeBase64Url = (value: Uint8Array): string =>
  window
    .btoa(String.fromCharCode(...value))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

export const createOAuthState = (): string =>
  encodeBase64Url(window.crypto.getRandomValues(new Uint8Array(32)));

export const getAuthURL = (requestState: string): string | false => {
  const redirectOrigin = process.env.SANITY_STUDIO_FOTOWARE_REDIRECT_ORIGIN;
  if (!redirectOrigin) {
    console.warn('SANITY_STUDIO_FOTOWARE_REDIRECT_ORIGIN is not defined.');
    return false;
  }

  const startUrl = new URL('/api/fotoware/oauth/start', redirectOrigin);
  startUrl.searchParams.set('state', requestState);
  return startUrl.toString();
};

export const getAccessToken = (tokenType: TokenType): string | false => {
  const accessToken = localStorage.getItem(tokenType);

  if (!accessToken) return false;

  const tokenData = JSON.parse(accessToken);

  const now = Math.floor(Date.now() / 1000.0);

  if (parseInt(tokenData.expires, 10) <= now) {
    localStorage.removeItem(tokenType);
    return false;
  }

  return tokenData.access_token;
};

type FotowareAuthData = {
  access_token: string;
  expires_in: string;
  state: string;
};

export const storeAccessToken = (
  tokenType: TokenType,
  data: FotowareAuthData,
): void => {
  const now = Math.floor(Date.now() / 1000.0);

  const tokenData = {
    access_token: data.access_token,
    expires: now + parseInt(data.expires_in, 10),
  };

  localStorage.setItem(tokenType, JSON.stringify(tokenData));
};

export const checkAuthData = (data: any): boolean => {
  return (
    typeof data === 'object' &&
    ['access_token', 'expires_in', 'state'].every(
      (key: string) => data[key] && typeof data[key] === 'string',
    )
  );
};

export const getSelectionWidgetURL = (accessToken: string) => {
  return `${process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL}/fotoweb/widgets/selection?access_token=${accessToken}`;
};

export const getRenditionURL = () => {
  return `${process.env.SANITY_STUDIO_FOTOWARE_TENANT_URL}/fotoweb/me`;
};

type ErrorTypes = 'generic' | 'auth' | 'export';

export const handleRequestError = (
  message: string,
  setError: (arg0: string) => void,
  type: ErrorTypes = 'generic',
  window: React.MutableRefObject<Window | null> | null = null,
): false => {
  const prefix = ((type) => {
    switch (type) {
      case 'auth':
        return `An error occured while authenticating with Fotoware.`;
      case 'export':
        return `An error occured while attempting to retrieve the image.`;
      default:
        return `An error occured with the Fotoware integration.`;
    }
  })(type);

  console.error(`A Fotoware error occured`, message);
  setError(
    `<p>${prefix}</p><p>The following message was received:</p> <pre><code>${message}</code></pre>`,
  );

  if (window?.current) {
    window.current.close();
  }

  return false;
};

export const validateToken = (tokenType: TokenType, token: string) => {
  const tokenData = JSON.parse(token);
  const now = Math.floor(Date.now() / 1000.0);

  if (parseInt(tokenData.expires, 10) <= now) {
    localStorage.removeItem(tokenType);
    return false;
  }
  return true;
};

export const parseToken = (token: string) => {
  const tokenData = JSON.parse(token);
  return tokenData.access_token;
};
