import * as IO from 'fp-ts/lib/IO'
import * as E from 'fp-ts/lib/Either'
import { BlobServiceClient } from '@azure/storage-blob'

export type GetProcessEnvType = IO.IO<E.Either<string, string>>
export type BlobConfiguration = {
  client: BlobServiceClient,
  container: string
}
