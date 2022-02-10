import { pipe } from 'fp-ts/lib/function'
import { flatten } from 'fp-ts/Array'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { update, sanityClient, generateIndexName, getEnvironment } from '../../common'
import { query, queryParams, mapData, fetchData } from './sanity'

const indexIdentifier = 'TOPIC'
const language = 'en-GB' // From where to get?

const indexName = pipe(getEnvironment(), E.map(generateIndexName(indexIdentifier)(language)))


const indexSettings = {
  searchableAttributes: ['title', 'ingress', 'text'],
  attributesToSnippet: ['ingress'],
  attributeForDistinct: 'slug',
  distinct: 1,
}

// TODO: Using EVENTS as default name for now. To be changed
const updateAlgolia = update(E.getOrElse(() => 'TOPIC')(indexName))(indexSettings)

export const indexTopic = pipe(
  fetchData(query)(queryParams)(sanityClient), // TODO: Make these parameters to make this function reusable
  TE.map((pages) => pipe(pages.map(mapData), flatten)),
  TE.chain(updateAlgolia),
  T.map(E.fold(console.error, console.log)),
)
