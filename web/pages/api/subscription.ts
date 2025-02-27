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

export type NewsDistributionParameters = {
  newsletterId: number
  senderId: number
  segmentId?: number
  timeStamp: string
  title: string
  ingress: string
  link: string
  newsType: string
  languageCode: string
}

const MAKE_SUBSCRIBER_API_BASE_URL = process.env.MAKE_SUBSCRIBER_API_BASE_URL
const MAKE_NEWSLETTER_API_BASE_URL = process.env.MAKE_NEWSLETTER_API_BASE_URL
const MAKE_API_KEY = process.env.MAKE_API_KEY || ''
const SUBSCRIBER_LIST_ID = process.env.MAKE_SUBSCRIBER_LIST_ID
const MAKE_API_USER = process.env.MAKE_API_USERID || ''

//  Axios instance for Subscribers API
const subscriberApi = axios.create({
  baseURL: MAKE_SUBSCRIBER_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(`${MAKE_API_USER}:${MAKE_API_KEY}`).toString('base64')}`,
  },
})

//  Axios instance for Newsletters API
const newsletterApi = axios.create({
  baseURL: MAKE_NEWSLETTER_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(`${MAKE_API_USER}:${MAKE_API_KEY}`).toString('base64')}`,
  },
})

/**
 *  Fetch all available subscriber tags
 */
const fetchTags = async () => {
  try {
    console.log('📤 Fetching subscriber tags...')
    const response = await subscriberApi.get(`/subscriber_tags`)
    console.log('✅ Tags fetched:', response.data)
    return response.data
  } catch (error: any) {
    console.error('❌ Error fetching subscriber tags:', error.response?.data || error.message)
    return []
  }
}

/**
 *  Ensure tags exist before assigning them to a subscriber
 */
const ensureTagsExist = async (requestedTags: string[]) => {
  const existingTags = await fetchTags()
  const finalTags: string[] = []

  for (const tagTitle of requestedTags) {
    const existingTag = existingTags.find((tag: any) => tag.title.toLowerCase() === tagTitle.toLowerCase())

    if (existingTag) {
      console.log(`✅ Using existing tag: ${existingTag.title}`)
      finalTags.push(existingTag.title)
    } else {
      console.log(`📤 Creating tag: ${tagTitle}`)
      try {
        const response = await subscriberApi.post(`/subscriber_tags`, { title: tagTitle })
        console.log(`✅ Tag created: ${response.data.title}`)
        finalTags.push(response.data.title)
      } catch (error: any) {
        console.error(`❌ Error creating tag (${tagTitle}):`, error.response?.data || error.message)
      }
    }
  }

  return finalTags
}

/**
 *  Subscribe a user using subscriber_list_id and tags
 */
export const signUp = async (formParameters: SubscribeFormParameters) => {
  try {
    console.log('🔹 signUp() called with:', formParameters)

    const requestedTags: string[] = []
    if (formParameters.stockMarketAnnouncements) requestedTags.push('Stock Market')
    if (formParameters.generalNews) requestedTags.push('General News')
    if (formParameters.crudeOilAssays) requestedTags.push('Crude Oil Assays')
    if (formParameters.magazineStories) requestedTags.push('Magazine')

    console.log('📤 Ensuring subscriber tags exist...')
    const finalTags = await ensureTagsExist(requestedTags)

    console.log('🔹 Final Tags:', finalTags)

    const requestBody = {
      email: formParameters.email,
      firstname: formParameters.firstName || '',
      lastname: '',
      address: '',
      zip: '',
      city: '',
      phone: '',
      company: '',
      birthday: new Date().toISOString().split('T')[0],
      tags: finalTags,
      external_id: `ext-${formParameters.email}`,
      gender: '',
    }

    console.log('📤 Sending subscription request:', {
      url: `/subscribers?subscriber_list_id=${SUBSCRIBER_LIST_ID}`,
      headers: subscriberApi.defaults.headers,
      body: requestBody,
    })

    const response = await subscriberApi.post(`/subscribers?subscriber_list_id=${SUBSCRIBER_LIST_ID}`, requestBody)

    console.log('✅ Successfully subscribed:', response.data)
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

/**
 *  Distribute a newsletter
 */
export const distribute = async (parameters: NewsDistributionParameters) => {
  try {
    console.log('🔹 distribute() called with:', parameters)

    const requestBody = {
      segment_id: parameters.segmentId ?? null,
      sender_id: parameters.senderId,
      scheduled_at: new Date(parameters.timeStamp).toISOString(),
    }

    console.log('📤 Sending request to newsletter API:', {
      url: `/newsletters/${parameters.newsletterId}/send`,
      headers: newsletterApi.defaults.headers,
      body: requestBody,
    })

    const response = await newsletterApi.post(`/newsletters/${parameters.newsletterId}/send`, requestBody)

    console.log('✅ Success! API response:', response.status, response.data)
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
