import { flow, pipe } from 'fp-ts/lib/function'
import { flatten } from 'fp-ts/Array'
import { ap } from 'fp-ts/lib/Identity'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import {
  update,
  sanityClient,
  generateIndexName,
  getEnvironment,
  languageFromIso,
  languageOrDefault,
} from '../../common'
import { fetchData } from './sanity'
import { indexSettings } from './algolia'
import { mapData } from './mapper'

const indexIdentifier = 'NEWS'
// TODO: From where to get language?
const language = pipe(languageFromIso('nb-NO'), languageOrDefault)

const indexName = flow(getEnvironment, E.map(generateIndexName(indexIdentifier)(language.isoCode)))
const updateAlgolia = flow(indexName, E.map(flow(update, ap(indexSettings))))

// TODO: Change to work with news articles
export const indexNews = pipe(
  fetchData(sanityClient)(language),
  TE.map((pages) => pipe(pages.map(mapData), flatten)),
  TE.chainW((data) => pipe(updateAlgolia(), E.ap(E.of(data)), TE.fromEither)),
  TE.flatten,
  T.map(E.fold(console.error, console.log)),
)
