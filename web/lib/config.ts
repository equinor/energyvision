export const algolia = {
  applicationId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  searchApiKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || '',
}

export const friendlyCaptcha = {
  siteKey: process.env.NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITEKEY || '',
}

export const host = {
  url: process.env.NEXT_PUBLIC_HOST || 'https://www.equinor.com',
}
