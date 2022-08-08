import { AzureFunction, Context, HttpRequest } from '@azure/functions'
// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'
import { indexEvents } from './events'
import { indexTopic } from './topic'
import { indexNews } from './news'
import { indexMagazine } from './magazine'
import { languageFromIso, languageOrDefault } from '../common'
import { pipe } from 'fp-ts/lib/function'

const timerTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await new DotenvAzure().config({
    allowEmptyValues: true,
    debug: false,
  })

  const logger = context.log
  const language = pipe(languageFromIso(req.body.language), languageOrDefault)

  await indexEvents(language)().catch(logger.error)
  await indexTopic(language)().catch(logger.error)
  await indexNews(language)().catch(logger.error)
  await indexMagazine(language)().catch(logger.error)
}

export default timerTrigger
