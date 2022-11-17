import { AzureFunction, Context, HttpRequest } from '@azure/functions'
// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'
import { indexEvents } from './events'
import { indexTopic } from './topic'
import { indexNews } from './news'
import { indexMagazine } from './magazine'
import { Language, languageFromIso, languageOrDefault } from '../common'
import { pipe } from 'fp-ts/lib/function'
import { indexLocalNews } from './localNews'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'

const indexes = ['EVENTS', 'TOPICS', 'MAGAZINE', 'NEWS', 'LOCALNEWS']

const indexTasks: {
  [key: string]: (language: Language) => (docId: string) => (isDev: boolean) => T.Task<void>
} = {
  EVENTS: indexEvents,
  MAGAZINE: indexMagazine,
  NEWS: indexNews,
  LOCALNEWS: indexLocalNews,
  TOPICS: indexTopic,
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await new DotenvAzure().config({
    allowEmptyValues: true,
    debug: false,
  })

  const logger = context.log
  const language = pipe(languageFromIso(req.body.language), languageOrDefault)

  const getIndex = pipe(
    req.body?.index as string[],
    E.fromNullable('no index specified'),
    E.getOrElse(() => indexes),
  )
  const getEnvironment = () => O.fromNullable(req.body?.isDev)
  const getDocId = O.getOrElse(() => 'no id')(O.fromNullable(req.body?.docToClear))
  const isDev = O.getOrElse(() => false)(getEnvironment())

  pipe(getIndex, (indexArray) =>
    indexArray.map((index) => indexTasks[index](language)(getDocId)(isDev)().catch(logger.error)),
  )
}

export default httpTrigger
