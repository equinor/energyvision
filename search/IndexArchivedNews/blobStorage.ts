import { BlobServiceClient } from '@azure/storage-blob'

import * as IO from 'fp-ts/lib/IO'
import * as E from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import { GetProcessEnvType } from './types'

const getAzureConnectionString: GetProcessEnvType = () =>
  E.fromNullable('Unable to find Azure connection string')(process.env.AZ_CONNECTION_STRING)

type InitType = IO.IO<E.Either<string, BlobServiceClient>>
export const init: InitType = flow(getAzureConnectionString, E.map(BlobServiceClient.fromConnectionString))

// type GetDocumentsType = (client: BlobServiceClient, container: string) => string[]
// export const getDocuments: GetDocumentsType = (client, container) => client.getContainerClient(container).listBlobsFlat()

// let i = 1;
//   let iter = containerClient.listBlobsFlat();
//   for await (const blob of iter) {
//     console.log(`Blob ${i++}: ${blob.name}`);
//   }
