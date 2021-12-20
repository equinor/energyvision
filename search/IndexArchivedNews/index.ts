import { AzureFunction, Context } from '@azure/functions'
// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'
import { flow } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import * as T from 'fp-ts/lib/Task'
import { init, getClient, getDocuments } from './blobStorage'
import { BlobItem } from '@azure/storage-blob'

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
  const timeStamp = new Date().toISOString()

  await new DotenvAzure().config()

  if (myTimer.isPastDue) {
    context.log('Timer function is running late!')
  }
  context.log('Timer trigger function ran!', timeStamp)
  // Check that we have connection to Azure blob
  test().catch((error) => console.log(error.toString()))
}

type GetBlobsType = () => TE.TaskEither<string | Error, BlobItem[]>
const getBlobs: GetBlobsType = flow(
  init,
  E.map(getClient),
  TE.fromEither,
  TE.chainW(getDocuments),
)

const test =
  flow(
    getBlobs,
    T.map(
      E.fold(
        (_) => console.log('Error happened'),
        (blobItems) => console.log(`Number of blob items: ${blobItems.length}`),
      ),
    ),
  )()

export default timerTrigger
