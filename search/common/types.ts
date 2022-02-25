import * as IO from 'fp-ts/lib/IO'
import * as E from 'fp-ts/lib/Either'
import { BlobServiceClient } from '@azure/storage-blob'

export type GetProcessEnvType = IO.IO<E.Either<string, string>>

// TODO: Should we move specific types to the place where they are
export type BlobConfiguration = {
  client: BlobServiceClient,
  container: string
}

export type BlockChildNode = {
    _key: string
    _type: string
    marks: string[]
    text: string
}

export type BlockNode = {
  _key: string
  _type: string
  children: BlockChildNode[]
  markDefs: string[]
  style: string
}
