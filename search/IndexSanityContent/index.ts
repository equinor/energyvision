import { AzureFunction, Context } from '@azure/functions'
import { flow } from 'fp-ts/lib/function'
//import { reduce } from 'fp-ts/lib/Array'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { initIndex, sanityClient, updateIndex } from '../common/'
// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'
import { update } from '../common/algolia'

// Jada, bare dumper det her så lenge
const query = /* groq */ `*[_type match "route_" + $lang + "*" && content->_type == "event"] {
  "slug": slug.current,
  _id,
  "content": content->{
    "title": pt::text(title)
  }
}
`
const queryParams = { lang: 'en_GB' }
type Event = {
  slug: string
  content: {
    title: string
  }
  _id: string
}

const getData = async (): Promise<Event[]> => {
  console.log('Starting to fetch data')
  const result = await sanityClient.fetch(query, queryParams)
  console.log('Sanity data', result)
  return result
}

const mapData = (event: Event) => ({
  ...event.content,
  slug: event.slug,
  objectID: event._id,
  type: 'event',
})

/* const updateAlgolia = async (mappedData) => {
  return await updateIndex(mappedData)
} */

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

  const data = await getData()

  console.log(`Found ${data.length} events`)

  /* const mappedData = reduce(data, (acc, cur: Event) => {
    return acc.concat(mapData(cur))
  }) */

  const mappedData = data.map((event: Event) => {
    return mapData(event)
  })

  console.log('Mapped data', mappedData)

  const updateMyData = flow(
    initIndex,
    TE.fromEither,
    TE.chainW(updateIndex(mappedData)),
    T.map(
      E.fold(
        (error) => console.error(error),
        (res) => console.log('Hurrah!', res),
      ),
    ),
  )()

  updateMyData().catch(console.error)
}

export default timerTrigger
