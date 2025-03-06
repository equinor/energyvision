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
const SUBSCRIBER_LIST_ID = process.env.MAKE_SUBSCRIBER_LIST_ID
const MAKE_API_USER = process.env.MAKE_API_USERID || ''
const MAKE_NEWSLETTER_ID = process.env.MAKE_NEWSLETTER_ID

export type NewsDistributionParameters = {
  link: string
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
    if (formParameters.stockMarketAnnouncements) requestedTags.push('Stock')
    if (formParameters.generalNews) requestedTags.push('Company')
    if (formParameters.crudeOilAssays) requestedTags.push('Crude')
    if (formParameters.magazineStories) requestedTags.push('Magazine')
    if (formParameters.languageCode === 'en') requestedTags.push('en_gb')
    if (formParameters.languageCode === 'no') requestedTags.push('nb_no')

    const requestBody = {
      email: formParameters.email,
      tags: requestedTags,
    }

    console.log('📤 Sending subscription request:', {
      url: `/subscribers?subscriber_list_id=${SUBSCRIBER_LIST_ID}`,
      headers: subscriberApi.defaults.headers,
      body: requestBody,
    })

    const response = await subscriberApi.post(`/subscribers?subscriber_list_id=${SUBSCRIBER_LIST_ID}`, requestBody)

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
    const url = `${MAKE_NEWSLETTER_API_BASE_URL}/recurring_actions/${MAKE_NEWSLETTER_ID}/trigger`
    const requestBody = {
      guids: [newsDistributionParameters.link],
    }
    const response = await newsletterApi.post(url, requestBody)
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
