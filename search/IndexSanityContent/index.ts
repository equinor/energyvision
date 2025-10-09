import { AzureFunction, Context, HttpRequest, Logger } from '@azure/functions'
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
import { loadEnv } from '../common/env'

const indexes = ['EVENTS', 'TOPICS', 'MAGAZINE', 'NEWS', 'LOCALNEWS']

const indexTasks: {
  [key: string]: (language: Language, logger: Logger) => (docId: string) => T.Task<void>
} = {
  EVENTS: indexEvents,
  MAGAZINE: indexMagazine,
  NEWS: indexNews,
  LOCALNEWS: indexLocalNews,
  TOPICS: indexTopic,
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const logger = context.log
  logger.info(JSON.stringify(req.body))
  await loadEnv(logger)

  const language = pipe(languageFromIso(req.body.language), languageOrDefault)

  const getIndex = pipe(
    req.body?.index as string[],
    E.fromNullable('no index specified'),
    E.getOrElse(() => indexes),
  )

  const getDocId = O.getOrElse(() => 'no id')(O.fromNullable(req.body?.docToClear))

  pipe(getIndex, (indexArray) =>
    indexArray.map((index) => indexTasks[index](language, logger)(getDocId)().catch(logger.error)),
  )
}

export default httpTrigger
