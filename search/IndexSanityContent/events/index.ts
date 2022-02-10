import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { update, sanityClient, generateIndexName, getEnvironment, languageFromIso, languageOrDefault } from '../../common'
import { fetchData } from './sanity'
import { mapData } from './mapper'
import { indexSettings } from './algolia'

const indexIdentifier = 'EVENTS'
// TODO: From where to get language?
const language = pipe(languageFromIso('en-GB'), languageOrDefault)

const indexName = pipe(getEnvironment(), E.map(generateIndexName(indexIdentifier)(language.isoCode)))
const updateAlgolia = update(E.getOrElse(() => indexIdentifier)(indexName))(indexSettings)

export const indexEvents = pipe(
  fetchData(sanityClient)(language),
  TE.map((events) => events.map(mapData)),
  TE.chain(updateAlgolia),
  T.map(E.fold(console.error, console.log)),
)
