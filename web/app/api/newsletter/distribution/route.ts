import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import axios from 'axios'
import type { NextRequest } from 'next/server'
import { domain, languages } from '@/languageConfig'
import { distributeOld } from './old-distribution'

const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN || ''
const SLACK_NEWSLETTER_WEBHOOK_URL = process.env.SLACK_NEWSLETTER_WEBHOOK_URL
const MAKE_NEWSLETTER_API_BASE_URL = process.env.MAKE_NEWSLETTER_API_BASE_URL
const MAKE_NEWSLETTER_ID_EN = process.env.MAKE_NEWSLETTER_ID_EN
const MAKE_NEWSLETTER_ID_NO = process.env.MAKE_NEWSLETTER_ID_NO
const MAKE_API_USER = process.env.MAKE_API_USERID || ''
const MAKE_API_KEY = process.env.MAKE_API_KEY || ''

//  NEeded?
//Next.js will by default parse the body, which can lead to invalid signatures
// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
/* export const config = {
  api: {
    bodyParser: false,
  },
} */

async function sendSlackNotification(message: string): Promise<void> {
  if (!SLACK_NEWSLETTER_WEBHOOK_URL) return

  try {
    await fetch(SLACK_NEWSLETTER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: message }),
    })
    console.log('Slack notification sent sucessfully!')
  } catch (error) {
    console.error('Failed to send Slack notification:', error)
  }
}

function getDateWithMs(): string {
  const date = new Date()
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0')
  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
  const dateTime = formatter.format(date)

  return `${dateTime}:${milliseconds}`
}

export type NewsDistributionParameters = {
  title: string
  link: string
  languageCode?: string
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
export const distribute = async (
  newsDistributionParameters: NewsDistributionParameters,
) => {
  try {
    const url = `${MAKE_NEWSLETTER_API_BASE_URL}/recurring_actions/${
      newsDistributionParameters.languageCode === 'no'
        ? MAKE_NEWSLETTER_ID_NO
        : MAKE_NEWSLETTER_ID_EN
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

interface DistributionResult {
  success: boolean
  message: string
}

async function distributeWithRetry(
  newsDistributionParameters: NewsDistributionParameters,
  oldNewsDistributionParameters: any,
  attempt = 1,
): Promise<DistributionResult> {
  let res: DistributionResult = {
    success: false,
    message: `Initial state: Distribution not started for *${newsDistributionParameters.title}* (${newsDistributionParameters.link})`,
  }

  const date = getDateWithMs()

  try {
    //For migration period just log.
    const isNewSuccessful = await distribute(newsDistributionParameters)
    console.log(`New distribution was successful: ${isNewSuccessful}`)

    const isSuccessful = await distributeOld(oldNewsDistributionParameters)

    if (!isSuccessful) throw new Error('Distribution was unsuccessful.')
    res = {
      success: true,
      message: 'Newsletter sent successfully!',
    }

    const message = `${date} :white_check_mark: *${newsDistributionParameters.title}*: Successfully distributed (${newsDistributionParameters.link})`
    await sendSlackNotification(message)
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'
    const message = `${date} :x: *${newsDistributionParameters.title}*: Distribution of (${newsDistributionParameters.link}) failed after attempt #${attempt}: ${errorMessage}`
    await sendSlackNotification(message)

    if (attempt < 3) {
      console.log(`Retrying... Attempt ${attempt + 1}`)
      return distributeWithRetry(newsDistributionParameters, attempt + 1)
    }
    res = {
      success: false,
      message: `Distribution failed for: ${newsDistributionParameters.title} (${newsDistributionParameters.link})`,
    }
  }

  return res
}

export async function POST(req: NextRequest) {
  console.log('Sending newsletter...  ')
  console.log('Datetime: ' + new Date())
  const signature = req.headers.get(SIGNATURE_HEADER_NAME)
  const body = await req.text()

  if (!isValidSignature(body, signature || '', SANITY_API_TOKEN)) {
    console.log(req, 'Unauthorized request: Newsletter Distribution Endpoint')
    return new Response(
      JSON.stringify({ success: false, msg: 'Unauthorized!' }),
      { status: 401 },
    )
  }
  const data = JSON.parse(body)
  const locale =
    languages.find(lang => lang.name === data.languageCode)?.locale || 'en'

  //To be removed after migration period
  const oldNewsDistributionParameters: any = {
    timeStamp: data.timeStamp,
    title: data.title,
    ingress: data.ingress,
    link: `${domain}/${locale}${data.link}`,
    newsType: data.newsType,
    languageCode: locale,
  }
  // END

  const newsDistributionParameters: NewsDistributionParameters = {
    title: data.title,
    link: `${domain}/${locale}${data.link}`,
    languageCode: locale,
  }
  console.log('Newsletter link: ', newsDistributionParameters.link)

  await distributeWithRetry(
    newsDistributionParameters,
    oldNewsDistributionParameters,
  )
    .then(result => {
      if (result.success) {
        return new Response(JSON.stringify({ message: result.message }), {
          status: 200,
        })
      }
      return new Response(JSON.stringify({ message: result.message }), {
        status: 400,
      })
    })
    .catch(error => {
      console.log(error)
      return new Response(
        JSON.stringify({ message: 'Internal server error' }),
        {
          status: 500,
        },
      )
    })
}
