// TODO: Rewrite fp-ts imports perhaps
import { promises as fs } from 'fs'
import * as TE  from 'fp-ts/lib/TaskEither'
import * as IOE from 'fp-ts/lib/IOEither'
import { toError } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'


// TODO: Read from files in bulks


// 1. Parse json file (need a type for the json)
type SearchMetadataEntry = {
  title: string
  description: string
  link: string
  thumbnailURL: string
  category: string
  tags: {
    topics: string[]
    country: string
  }
  content: string
}

type ParseStringifiedDataType = (data: string) => IOE.IOEither<Error, SearchMetadataEntry[]>
const parseStringifiedData: ParseStringifiedDataType = (data) =>
  IOE.tryCatch(() => JSON.parse(data), toError);

type GetFileContentsType = (path: string) => TE.TaskEither<Error, string>
const getFileContents: GetFileContentsType = (path) => TE.tryCatch(() => fs.readFile(path, 'utf-8'), toError)

type LoadJsonType = (path: string) => TE.TaskEither<Error, SearchMetadataEntry[]>
export const loadJson: LoadJsonType = flow(
  getFileContents,
  TE.chain((rawFileContent: string) => TE.fromIOEither(parseStringifiedData(rawFileContent)))
)

// 2. Massage the data to our needs (potentially not handled by this file)

// 3. Upload to Algolia (not handled by this file)



