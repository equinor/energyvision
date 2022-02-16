import { pipe } from 'fp-ts/lib/function'
import { flatten } from 'fp-ts/Array'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { update, sanityClient, generateIndexName, getEnvironment, languageFromIso, languageOrDefault } from '../../common'
import { fetchData, TopicPage } from './sanity'
import { indexSettings } from './algolia'
import { mapData } from './mapper'

const indexIdentifier = 'TOPICS'
// TODO: From where to get language?
const language = pipe(languageFromIso('en-GB'), languageOrDefault)

const indexName = pipe(getEnvironment(), E.map(generateIndexName(indexIdentifier)(language.isoCode)))
const updateAlgolia = update(E.getOrElse(() => indexIdentifier)(indexName))(indexSettings)

const logSanity = (items: TopicPage[]) => {
  const numberOfItems = items.reduce((acc, curr) => acc + (curr?.textBlocks?.length || 0), 0)
  console.log('items from Sanity: ', numberOfItems)
  return items
}

const logMapper = (items: Readonly<Record<string, string>>[]) => {
  console.log('Number of fields being sent to Algolia', items.length)
  return items
}

export const indexTopic = pipe(
  fetchData(sanityClient)(language),
  TE.map(logSanity),  // Log what we got from Sanity
  TE.map((pages) => pipe(pages.map(mapData), flatten)),
  TE.map(logMapper),  // Log what we got from Mapper
  TE.chain(updateAlgolia),
  T.map(E.fold(console.error, console.log)),
)
