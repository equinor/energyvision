import axios from 'axios'
import type { NextRequest } from 'next/server'
import type z from 'zod'
import type { Level2Keys } from '@/lib/helpers/typescriptTyping'
import { subscribeSchema } from '@/lib/zodSchemas/zodSchemas'
import { validateFormRequest } from '../../forms/validateFormRequest'

export type SubscribeFormParameters = z.infer<typeof subscribeSchema>

const MAKE_SUBSCRIBER_API_BASE_URL = process.env.MAKE_SUBSCRIBER_API_BASE_URL
const MAKE_API_KEY = process.env.MAKE_API_KEY || ''
const SUBSCRIBER_LIST_ID_EN = process.env.MAKE_SUBSCRIBER_LIST_ID_EN
const SUBSCRIBER_LIST_ID_NO = process.env.MAKE_SUBSCRIBER_LIST_ID_NO
const MAKE_API_USER = process.env.MAKE_API_USERID || ''

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
export const signUp = async (
  data: SubscribeFormParameters,
  languageCode: newsletterCategoryLocale,
) => {
  const { email, categories } = data
  console.log('categories', categories)
  try {
    const tags = categories?.map(
      category => newsletterCategoryMap[languageCode][category],
    )
    console.log('newsletter tags', tags)

    const response = await subscriberApi.post(
      `/subscribers?subscriber_list_id=${
        languageCode === 'no' ? SUBSCRIBER_LIST_ID_NO : SUBSCRIBER_LIST_ID_EN
      }&tag=merge`,
      {
        email,
        tags,
      },
    )
    console.log('Response from Make subscriber api', response.statusText)

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

export async function POST(req: NextRequest) {
  //const signature = req.headers.get(SIGNATURE_HEADER_NAME)
  const body = await req.json()
  const { frcCaptchaSolution, languageCode, data } = body

  const captchaResult = await validateFormRequest(
    frcCaptchaSolution,
    'subscription form',
  )
  if (captchaResult.status !== 200) {
    return Response.json(
      { msg: captchaResult.message },
      { status: captchaResult.status },
    )
  }

  const validatedData = subscribeSchema.safeParse(data)

  if (!validatedData.success) {
    return Response.json({ msg: 'Invalid data' }, { status: 400 })
  }

  await signUp(data, languageCode)
    .then(isSuccessful => {
      if (!isSuccessful) {
        console.log('Signup was not successfull while newsletter subscription')
        return Response.json(
          { msg: 'Error during subscription' },
          { status: 500 },
        )
      }
      return Response.json({ msg: 'Successfully subscribed' }, { status: 200 })
    })
    .catch(error => {
      console.log('Error occured while newsletter subscription', error)
      return Response.json(
        { msg: 'Error during subscription' },
        { status: 500 },
      )
    })
}
