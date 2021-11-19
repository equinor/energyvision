import { AzureFunction, Context } from '@azure/functions'
// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
  const timeStamp = new Date().toISOString()

  await new DotenvAzure().config()

  if (myTimer.isPastDue) {
    context.log('Timer function is running late!')
  }
  context.log('Timer trigger function ran!', timeStamp)
}

export default timerTrigger
