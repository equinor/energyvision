import { AzureFunction, Context } from '@azure/functions'
import { pipe } from 'fp-ts/lib/function'
//import { reduce } from 'fp-ts/lib/Array'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { initIndex, sanityClient, updateIndex, updateSettings } from '../common/'
import { mapData, fetchData } from './sanity'
// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'

const query = /* groq */ `*[_type match "route_" + $lang + "*" && content->_type == "event"] {
  "slug": slug.current,
  _id,
  "content": content->{
    "title": pt::text(title),
    "ingress": pt::text(ingress)
  }
}
`
const queryParams = { lang: 'en_GB' }

const indexSettings = {
  searchableAttributes: ['title', 'ingress'],
  attributesToSnippet: ['ingress'],
  attributeForDistinct: 'slug',
  distinct: 1,
}

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
  const timeStamp = new Date().toISOString()

  await new DotenvAzure().config({
    allowEmptyValues: true,
    debug: true,
  })

  if (myTimer.isPastDue) {
    context.log('Timer function is running late!')
  }
  context.log('Timer trigger function ran!', timeStamp)

  type UpdateAlgoliaType = (mappedData: Readonly<Record<string, string>>[]) => TE.TaskEither<string | Error, string>
  const updateAlgolia: UpdateAlgoliaType = (mappedData: Readonly<Record<string, string>>[]) =>
    pipe(initIndex(),
    TE.fromEither,
    TE.chainW(updateIndex(mappedData)),
    TE.chainW(updateSettings(indexSettings)),
    TE.map(() => 'Halleluja')
  )


  const getSanityDataAndUpdateAlgolia = pipe(
    fetchData(query)(queryParams)(sanityClient), // TODO: Make these parameters to make this function reusable
    TE.map((events) => events.map(mapData)),
    TE.chain(updateAlgolia),
    T.map(E.fold(console.error, console.log)),
  )

  await getSanityDataAndUpdateAlgolia().catch(console.error)

  console.log('DONE!')
}

export default timerTrigger
