import { AzureFunction, Context, HttpRequest } from '@azure/functions'
// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'
import { indexEvents } from './events'
import { indexTopic } from './topic'
import { indexNews } from './news'
import { indexMagazine } from './magazine'
import { languageFromIso, languageOrDefault } from '../common'
import { pipe } from 'fp-ts/lib/function'
import { indexLocalNews } from './localNews'
import * as O from 'fp-ts/Option'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await new DotenvAzure().config({
    allowEmptyValues: true,
    debug: false,
  })

  const logger = context.log
  const language = pipe(languageFromIso(req.body.language), languageOrDefault)
  const index: string = req.body.index
  const isDev: boolean = req.body.isDev || false
  await pipe(
    index,
    O.fromNullable,
    O.match(
      () => {
        indexEvents(language)(false)().catch(logger.error)
        indexTopic(language)(false)().catch(logger.error)
        indexNews(language)(false)().catch(logger.error)
        indexMagazine(language)(false)().catch(logger.error)
        indexLocalNews(language)(false)().catch(logger.error)
      },
      (index) => {
        index.includes('EVENTS')
          ? indexEvents(language)(isDev)().catch(logger.error)
          : index.includes('TOPICS')
          ? indexTopic(language)(isDev)().catch(logger.error)
          : index.includes('MAGAZINE')
          ? indexMagazine(language)(isDev)().catch(logger.error)
          : index.includes('NEWS')
          ? indexNews(language)(isDev)().catch(logger.error)
          : index.includes('LOCALNEWS')
          ? indexLocalNews(language)(isDev)().catch(logger.error)
          : O.none
      },
    ),
  )
}

export default httpTrigger
