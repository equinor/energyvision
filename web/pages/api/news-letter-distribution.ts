import { distribute } from './subscription'
import { languages } from '../../languages'
import { NewsDistributionParameters } from '../../types/types'
import { NextApiRequest, NextApiResponse } from 'next'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import getRawBody from 'raw-body'
import getConfig from 'next/config'

const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN || ''
const SLACK_NEWSLETTER_WEBHOOK_URL = process.env.SLACK_NEWSLETTER_WEBHOOK_URL

// Next.js will by default parse the body, which can lead to invalid signatures
// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: false,
  },
}

const logRequest = (req: NextApiRequest, title: string) => {
  console.log('\n')
  console.log(title)
  console.log('Datetime: ' + new Date())
  console.log('Headers:\n', req.headers)
  console.log('Body:\n', req.body)
  console.log('\n')
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Sending newsletter...  ')
  console.log('Datetime: ' + new Date())
  const signature = req.headers[SIGNATURE_HEADER_NAME] as string
  const body = (await getRawBody(req)).toString()

  if (!isValidSignature(body, signature, SANITY_API_TOKEN)) {
    logRequest(req, 'Unauthorized request: Newsletter Distribution Endpoint')
    return res.status(401).json({ success: false, msg: 'Unauthorized!' })
  }

  const { publicRuntimeConfig } = getConfig()
  const data = JSON.parse(body)
  const locale = languages.find((lang) => lang.name == data.languageCode)?.locale || 'en'
  const newsDistributionParameters: NewsDistributionParameters = {
    timeStamp: data.timeStamp,
    title: data.title,
    ingress: data.ingress,
    link: `${publicRuntimeConfig.domain}/${locale}${data.link}`,
    newsType: data.newsType,
    languageCode: locale,
  }

  console.log('Newsletter link: ', newsDistributionParameters.link)

  await distributeWithRetry(newsDistributionParameters)
    .then((result) => {
      if (result.success) {
        res.status(200).json({ msg: result.message })
      } else {
        res.status(400).json({ msg: result.message })
      }
      console.log(result.message)
    })
    .catch((error) => {
      console.error('An unexpected error occurred:', error)
      res.status(500).json({ msg: 'Internal server error' })
    })
}

interface DistributionResult {
  success: boolean
  message: string
}

async function distributeWithRetry(
  newsDistributionParameters: NewsDistributionParameters,
  attempt = 1,
): Promise<DistributionResult> {
  let res: DistributionResult = {
    success: false,
    message: `Initial state: Distribution not started for *${newsDistributionParameters.title}* (${newsDistributionParameters.link})`,
  }

  const date = getDateWithMs()

  try {
    const isSuccessful = await distribute(newsDistributionParameters)
    if (!isSuccessful) throw new Error('Distribution was unsuccessful.')
    res = {
      success: true,
      message: 'Newsletter sent successfully!',
    }

    const message = `${date} :white_check_mark: *${newsDistributionParameters.title}*: Successfully distributed (${newsDistributionParameters.link})`
    await sendSlackNotification(message)
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    const message = `${date} :x: *${newsDistributionParameters.title}*: Distribution of (${newsDistributionParameters.link}) failed after attempt #${attempt}: ${errorMessage}`
    await sendSlackNotification(message)

    if (attempt < 3) {
      console.log(`Retrying... Attempt ${attempt + 1}`)
      return distributeWithRetry(newsDistributionParameters, attempt + 1)
    } else {
      res = {
        success: false,
        message: `Distribution failed for: ${newsDistributionParameters.title} (${newsDistributionParameters.link})`,
      }
    }
  }

  return res
}

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
