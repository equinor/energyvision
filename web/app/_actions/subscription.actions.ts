'use server'
import axios from 'axios'
import type z from 'zod'
//import type { Level2Keys } from '@/lib/helpers/typescriptTyping'
import { subscribeSchema } from '@/lib/zodSchemas/zodSchemas'
import { validateFormRequest } from '../api/forms/validateFormRequest'

const MAKE_SUBSCRIBER_API_BASE_URL = process.env.MAKE_SUBSCRIBER_API_BASE_URL
const MAKE_API_KEY = process.env.MAKE_API_KEY || ''
const SUBSCRIBER_LIST_ID_EN = process.env.MAKE_SUBSCRIBER_LIST_ID_EN
const SUBSCRIBER_LIST_ID_NO = process.env.MAKE_SUBSCRIBER_LIST_ID_NO
const MAKE_API_USER = process.env.MAKE_API_USERID || ''

const newsletterCategoryMap = {
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
//type newsletterCategoryKeys = Level2Keys<typeof newsletterCategoryMap>

const subscriberApi = axios.create({
  baseURL: MAKE_SUBSCRIBER_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(`${MAKE_API_USER}:${MAKE_API_KEY}`).toString('base64')}`,
  },
})

type SubscribeProps = {
  locale: newsletterCategoryLocale
  frcCaptchaSolution: any
  formData: z.infer<typeof subscribeSchema>
}

export async function subscribe({
  locale,
  frcCaptchaSolution,
  formData,
}: SubscribeProps) {
  const captchaResult = await validateFormRequest(
    frcCaptchaSolution,
    'subscription form',
  )
  if (captchaResult.status !== 200) {
    return {
      status: false,
      message: captchaResult.message,
    }
  }

  const validatedData = subscribeSchema.safeParse(formData)

  if (!validatedData.success) {
    return { status: false, errors: validatedData.error }
  }

  const { email, categories } = formData

  try {
    const tags = categories?.map(
      category => newsletterCategoryMap[locale][category],
    )
    //Leave for testing period
    console.log('newsletter tags', tags)

    const response = await subscriberApi.post(
      `/subscribers?subscriber_list_id=${
        locale === 'no' ? SUBSCRIBER_LIST_ID_NO : SUBSCRIBER_LIST_ID_EN
      }&tag=merge`,
      {
        email,
        tags,
      },
    )
    //Leave for testing period
    console.log('Response from Make subscriber api', response)

    if (response?.status === 200) {
      return {
        status: true,
        message: 'Successfully subscribed',
      }
    }
    //Leave for testing period
    console.log(
      'Error occured while newsletter subscription',
      response?.statusText,
    )
    return {
      status: false,
      message: 'Error during subscription',
    }
  } catch (error: any) {
    console.error('❌ Error in signUp:', {
      message: error.message,
      responseData: error.response?.data,
      responseStatus: error.response?.status,
      requestHeaders: error.config?.headers,
    })
    return {
      status: false,
      message: 'Error during subscription',
    }
  }
}
