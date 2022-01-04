import { AzureFunction, Context } from '@azure/functions'
// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'
import { flow } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import * as T from 'fp-ts/lib/Task'
import { init, getClient, getDocuments } from './blobStorage'
import { BlobItem } from '@azure/storage-blob'

type GetBlobsType = () => TE.TaskEither<string | Error, BlobItem[]>
const getBlobs: GetBlobsType = flow(init, E.map(getClient), TE.fromEither, TE.chainW(getDocuments))

const test = flow(
  getBlobs,
  T.map(
    E.fold(
      (error) => console.log('Error happened!', error),
      (blobItems) => console.log(`Number of blob items: ${blobItems.length}`),
    ),
  ),
)

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

  // Check that we have connection to Azure blob
  console.log('Testing blob connection…')
  await test()().catch((error) => console.log(error.toString()))
  console.log('Test function called!')
}

export default timerTrigger
