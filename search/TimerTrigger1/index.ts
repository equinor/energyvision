import { AzureFunction, Context, Timer } from '@azure/functions'
import axios from 'axios'

// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'

const timerTrigger: AzureFunction = async function (context: Context, myTimer: Timer): Promise<void> {
  const timeStamp = new Date().toISOString()

  await new DotenvAzure().config({
    allowEmptyValues: true,
    debug: false,
  })

  if (myTimer.isPastDue) {
    context.log('Timer function is running late!')
  }

  const sanityFunctionUrl: string = process.env.SANITY_FUNCTION_URL || 'https://equinor.com'
  const bodyNorwegian = { language: 'nb-NO' }
  const bodyEnglish = { language: 'en-GB' }
  await axios.post(sanityFunctionUrl, bodyNorwegian)
  await axios.post(sanityFunctionUrl, bodyEnglish)

  context.log('Timer trigger function ran!', timeStamp)
}

export default timerTrigger
