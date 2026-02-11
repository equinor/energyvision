import axios from 'axios'
import type { Level2Keys } from '@/lib/helpers/typescriptTyping'

type NewsletterCategories = {
  crudeOilAssays?: boolean
  generalNews?: boolean
  magazineStories?: boolean
  stockMarketAnnouncements?: boolean
}
export type SubscribeFormParameters = {
  email: string
  languageCode: string
} & NewsletterCategories

const MAKE_SUBSCRIBER_API_BASE_URL = process.env.MAKE_SUBSCRIBER_API_BASE_URL
const MAKE_API_KEY = process.env.MAKE_API_KEY || ''
const SUBSCRIBER_LIST_ID_EN = process.env.MAKE_SUBSCRIBER_LIST_ID_EN
const SUBSCRIBER_LIST_ID_NO = process.env.MAKE_SUBSCRIBER_LIST_ID_NO
const MAKE_API_USER = process.env.MAKE_API_USERID || ''

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

export const newsletterCategoryMap = {
  no: {
    generalNews: 'generelle nyheter',
    Company: 'generelle nyheter',
    crudeOilAssays: 'crude oil assays',
    Crude: 'crude oil assays',
    magazineStories: 'magasinsaker',
    stockMarketAnnouncements: 'børsmeldinger',
    Stock: 'børsmeldinger',
  },
  en: {
    generalNews: 'general news',
    Company: 'general news',
    crudeOilAssays: 'crude oil assays',
    Crude: 'crude oil assays',
    magazineStories: 'magazine stories',
    stockMarketAnnouncements: 'stock market announcements',
    Stock: 'stock market announcements',
  },
}

export type newsletterCategoryLocale = keyof typeof newsletterCategoryMap
export type newsletterCategoryKeys = Level2Keys<typeof newsletterCategoryMap>

/**
 *  Subscribe a user using subscriber_list_id and tags
 */
export const signUp = async (formParameters: SubscribeFormParameters) => {
  const {
    stockMarketAnnouncements,
    generalNews,
    crudeOilAssays,
    magazineStories,
    email,
    languageCode,
  } = formParameters
  const locale = languageCode as newsletterCategoryLocale
  try {
    const requestedTags: string[] = []
    if (stockMarketAnnouncements) {
      requestedTags.push(newsletterCategoryMap[locale].stockMarketAnnouncements)
    }
    if (generalNews) {
      requestedTags.push(newsletterCategoryMap[locale].generalNews)
    }
    if (crudeOilAssays) {
      requestedTags.push(newsletterCategoryMap[locale].crudeOilAssays)
    }
    if (magazineStories) {
      requestedTags.push(newsletterCategoryMap[locale].magazineStories)
    }

    const requestBody = {
      email: email,
      tags: requestedTags,
    }

    const response = await subscriberApi.post(
      `/subscribers?subscriber_list_id=${
        formParameters.languageCode === 'no'
          ? SUBSCRIBER_LIST_ID_NO
          : SUBSCRIBER_LIST_ID_EN
      }&tag=merge`,
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
