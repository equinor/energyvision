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
import * as TE from 'fp-ts/lib/TaskEither'
import * as T from 'fp-ts/lib/Task'
import * as A from 'fp-ts/lib/Array'
import { loadEnv } from '../common/env'

const indexes = ['EVENTS', 'TOPICS', 'MAGAZINE', 'NEWS', 'LOCALNEWS']

const indexTasks: {
  [key: string]: (language: Language, logger: Logger) => (docId: string) => T.Task<number[]>
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

  const getDocId = pipe(
  O.fromNullable(req.body?.docToClear),
  O.getOrElse(() => 'no id')
)

const clearIndex = (index: string) =>
  pipe(
    TE.tryCatch(
      () => indexTasks[index](language, logger)(getDocId)(),
      err => { logger.error(err); return `Error indexing ${index}`; }
    ),
    TE.toUnion
  )
const run = pipe(
  T.of(getIndex),
  T.flatMap(indexes =>
    A.traverse(T.ApplicativePar)(clearIndex)(indexes)
  ),
)
const result = await run()
   context.res = {
         status: 200, /* The status defaults to 200 OK if not specified */
        body: result.flat()
    };
}
export default httpTrigger
