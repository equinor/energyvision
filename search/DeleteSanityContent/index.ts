import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { deleteIndex } from './common'
import { languageFromIso, languageOrDefault } from '../common'
import { pipe } from 'fp-ts/lib/function'
import { loadEnv } from '../common/env'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const logger = context.log
  await loadEnv(logger)
  const language = pipe(languageFromIso(req.body.language), languageOrDefault)
  const index: string = req.body.index
  const slug: string = req.body.slug
  logger.info(`Requesting to delete ${slug} from ${index}`)

  await deleteIndex(language)(index)(slug)().catch(logger)
}

export default httpTrigger
