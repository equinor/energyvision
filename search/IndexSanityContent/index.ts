import { AzureFunction, Context, HttpRequest } from '@azure/functions'
// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'
import { indexEvents } from './events'
import { indexTopic } from './topic'
import { indexNews } from './news'
import { languageFromIso, languageOrDefault } from '../common'
import { pipe } from 'fp-ts/lib/function'

const timerTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await new DotenvAzure().config({
    allowEmptyValues: true,
    debug: false
  })

  const language = pipe(languageFromIso(req.body.language), languageOrDefault)

  await indexEvents(language)().catch(context.log)
  await indexTopic(language)().catch(context.log)
  await indexNews(language)().catch(context.log)
}

export default timerTrigger
