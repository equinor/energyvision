'use server'
import { getTranslations } from 'next-intl/server'
import type z from 'zod'
import { subscribeSchema } from '@/lib/zodSchemas/zodSchemas'
import {
  type newsletterCategoryLocale,
  newsletterCategoryMap,
} from '@/types/newsLetterTypes'
import verifyCaptcha from './verifyCaptcha'

const REQUEST_TIMEOUT_MS = 10_000

type SubscribeProps = {
  locale: newsletterCategoryLocale
  frcCaptchaSolution: unknown
  formData: z.infer<ReturnType<typeof subscribeSchema>>
}

export async function subscribe({
  locale,
  frcCaptchaSolution,
  formData,
}: SubscribeProps) {
  const captchaResult = await verifyCaptcha(frcCaptchaSolution)
  if (captchaResult !== true) {
    return {
      status: false,
      message: captchaResult,
    }
  }

  const t = await getTranslations()
  const validatedData = subscribeSchema(t).safeParse(formData)

  if (!validatedData.success) {
    return { status: false, errors: validatedData.error }
  }

  const { email, categories } = validatedData.data

  try {
    const baseUrl = process.env.MAKE_SUBSCRIBER_API_BASE_URL
    const apiKey = process.env.MAKE_API_KEY
    const apiUser = process.env.MAKE_API_USERID
    const subscriberListIdEn = process.env.MAKE_SUBSCRIBER_LIST_ID_EN
    const subscriberListIdNo = process.env.MAKE_SUBSCRIBER_LIST_ID_NO

    if (
      !baseUrl ||
      !apiKey ||
      !apiUser ||
      !subscriberListIdEn ||
      !subscriberListIdNo
    ) {
      console.error('Missing newsletter subscription configuration')
      return {
        status: false,
        message: 'Error during subscription',
      }
    }

    const parsedBaseUrl = new URL(baseUrl)

    if (
      parsedBaseUrl.protocol !== 'https:' ||
      parsedBaseUrl.username ||
      parsedBaseUrl.password ||
      parsedBaseUrl.search ||
      parsedBaseUrl.hash
    ) {
      console.error('Invalid newsletter subscription base URL configuration')
      return {
        status: false,
        message: 'Error during subscription',
      }
    }

    const subscriberListId =
      locale === 'no' ? subscriberListIdNo : subscriberListIdEn
    const endpoint = new URL('/api/public/v2/subscribers', parsedBaseUrl)
    endpoint.searchParams.set('subscriber_list_id', subscriberListId)
    endpoint.searchParams.set('tag', 'merge')

    const tags = categories
      ?.map(category => newsletterCategoryMap[locale][category])
      .filter((tag): tag is string => Boolean(tag))

    if (!tags || tags.length === 0) {
      return {
        status: false,
        message: 'Error during subscription',
      }
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${apiUser}:${apiKey}`).toString('base64')}`,
      },
      body: JSON.stringify({
        email,
        tags,
      }),
    })

    if (response.status === 200) {
      return {
        status: true,
        message: 'Successfully subscribed',
      }
    }

    console.error(
      'Error occurred while newsletter subscription',
      response.status,
    )

    return {
      status: false,
      message: 'Error during subscription',
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error in newsletter subscription action', message)

    return {
      status: false,
      message: 'Error during subscription',
    }
  }
}
