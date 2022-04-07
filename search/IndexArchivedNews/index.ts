import { AzureFunction, Context } from '@azure/functions'
// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'
import { flow, pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import * as T from 'fp-ts/lib/Task'
import { init, getClient, getDocuments } from './blobStorage'
import { BlobItem } from '@azure/storage-blob'

type GetBlobsType = () => TE.TaskEither<string | Error, BlobItem[]>
const getBlobs: GetBlobsType = flow(init, E.map(getClient), TE.fromEither, TE.chainW(getDocuments))

const test = pipe(
  getBlobs(),
  T.map(
    E.fold(
      (error) => console.log('Error happened!', error),
      (blobItems) => console.log(`Number of blob items: ${blobItems.length}`),
    ),
  ),
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
  const timeStamp = new Date().toISOString()

  await new DotenvAzure().config({
    allowEmptyValues: true,
    debug: false,
  })

  if (myTimer.isPastDue) {
    context.log('Timer function is running late!')
  }
  context.log('Timer trigger function ran!', timeStamp)

  // Check that we have connection to Azure blob
  console.log('Testing blob connection…')
  await test().catch((error) => console.log(error.toString()))
  console.log('Test function called!')
}

//const trigger: AzureFunction = async function (context: Context, ): Promise<void> {
  // New trigger to be used from now on
  // TODO:
  // 1. Read list of files from somewhere. Could be httpTrigger or blobTrigger
  // 2. Read files from blobStorage and put in temporary file store for function. There should be a TempPath we can use for thos
  // 3. Parse files and make a note of which ones have been parsed. Use this later on to avoid reading same file twice


//}

export default timerTrigger
