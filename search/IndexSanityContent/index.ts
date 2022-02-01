
import { AzureFunction, Context } from '@azure/functions'
import { flow } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import { initIndex } from '../common/'
// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
  const timeStamp = new Date().toISOString()

  await new DotenvAzure().config({
    allowEmptyValues: true,
    debug: true,
  })

  if (myTimer.isPastDue) {
    context.log('Timer function is running late!')
  }
  context.log('Timer trigger function ran!', timeStamp)

  const test = flow(
    initIndex,
    E.fold(
      (error) => console.log(error),
      (index) => console.log('Connected successfully to index. Index name=', index.indexName)
    )
  )

  test()
}

export default timerTrigger
