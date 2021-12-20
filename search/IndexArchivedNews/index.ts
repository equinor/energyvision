import { AzureFunction, Context } from '@azure/functions'
// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'
import { flow} from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { init, getClient, getDocuments } from './blobStorage'
import { BlobItem } from '@azure/storage-blob'

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
  const timeStamp = new Date().toISOString()

  await new DotenvAzure().config()

  if (myTimer.isPastDue) {
    context.log('Timer function is running late!')
  }
  context.log('Timer trigger function ran!', timeStamp)
}

type GetBlobsType = () => TE.TaskEither<string, TE.TaskEither<Error, BlobItem[]>>
export const getBlobs: GetBlobsType = flow(  // TODO: Remove export. Only used to make linter happy for now
  init,
  E.map(getClient),
  TE.fromEither,
  TE.map(getDocuments)
)


export default timerTrigger
