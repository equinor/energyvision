import { AzureFunction, Context } from '@azure/functions'
// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'
import { indexEvents } from './events'

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
  const timeStamp = new Date().toISOString()

  // NML workaround because of codespace. To be deleted
  delete process.env.AZURE_APP_CONFIG_CONNECTION_STRING
  await new DotenvAzure().config({
    allowEmptyValues: true,
    debug: true
  })

  if (myTimer.isPastDue) {
    context.log('Timer function is running late!')
  }
  context.log('Timer trigger function ran!', timeStamp)


  await indexEvents().catch(console.error)

  console.log('DONE!')
}

export default timerTrigger
