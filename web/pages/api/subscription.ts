import axios from 'axios'

export type SubscribeFormParameters = {
  firstName: string
  email: string
  crudeOilAssays?: boolean
  generalNews?: boolean
  magazineStories?: boolean
  stockMarketAnnouncements?: boolean
  languageCode: string
}

const MAKE_SUBSCRIBER_API_BASE_URL = process.env.MAKE_SUBSCRIBER_API_BASE_URL
const MAKE_NEWSLETTER_API_BASE_URL = process.env.MAKE_NEWSLETTER_API_BASE_URL
const MAKE_API_KEY = process.env.MAKE_API_KEY || ''
const SUBSCRIBER_LIST_ID_EN = process.env.MAKE_SUBSCRIBER_LIST_ID_EN
const SUBSCRIBER_LIST_ID_NO = process.env.MAKE_SUBSCRIBER_LIST_ID_NO
const MAKE_API_USER = process.env.MAKE_API_USERID || ''
const MAKE_NEWSLETTER_ID_EN = process.env.MAKE_NEWSLETTER_ID_EN
const MAKE_NEWSLETTER_ID_NO = process.env.MAKE_NEWSLETTER_ID_NO

export type NewsDistributionParameters = {
  languageCode?: string
}

const subscriberApi = axios.create({
  baseURL: MAKE_SUBSCRIBER_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(`${MAKE_API_USER}:${MAKE_API_KEY}`).toString('base64')}`,
  },
})

/**
 *  Subscribe a user using subscriber_list_id and tags
 */
export const signUp = async (formParameters: SubscribeFormParameters) => {
  try {
    const requestedTags: string[] = []
    if (formParameters.stockMarketAnnouncements) {
      formParameters.languageCode === 'no' ? requestedTags.push('236529') : requestedTags.push('129253')
    }
    if (formParameters.generalNews) {
      formParameters.languageCode === 'no' ? requestedTags.push('236530') : requestedTags.push('123047')
    }
    if (formParameters.crudeOilAssays) {
      formParameters.languageCode === 'no' ? requestedTags.push('123050') : requestedTags.push('123050')
    }
    if (formParameters.magazineStories) {
      formParameters.languageCode === 'no' ? requestedTags.push('236531') : requestedTags.push('129256')
    }

    const requestBody = {
      email: formParameters.email,
      tags: requestedTags,
    }

    const response = await subscriberApi.post(
      `/subscribers?subscriber_list_id=${
        formParameters.languageCode === 'no' ? SUBSCRIBER_LIST_ID_NO : SUBSCRIBER_LIST_ID_EN
      }`,
      requestBody,
    )

    return response.status === 200
  } catch (error: any) {
    console.error('❌ Error in signUp:', {
      message: error.message,
      responseData: error.response?.data,
      responseStatus: error.response?.status,
      requestHeaders: error.config?.headers,
    })
    return false
  }
}

const newsletterApi = axios.create({
  baseURL: MAKE_NEWSLETTER_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(`${MAKE_API_USER}:${MAKE_API_KEY}`).toString('base64')}`,
  },
})

/**
 *  Distribute a newsletter
 */
export const distribute = async (newsDistributionParameters: NewsDistributionParameters) => {
  try {
    const url = `${MAKE_NEWSLETTER_API_BASE_URL}/recurring_actions/${
      newsDistributionParameters.languageCode === 'no' ? MAKE_NEWSLETTER_ID_NO : MAKE_NEWSLETTER_ID_EN
    }/trigger`

    const response = await newsletterApi.post(url)
    return response.status === 200
  } catch (error: any) {
    console.error('❌ Error in distribute:', {
      message: error.message,
      responseData: error.response?.data,
      responseStatus: error.response?.status,
      requestHeaders: error.config?.headers,
    })

    return false
  }
}
