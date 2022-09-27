import { AzureFunction, Context, HttpRequest } from '@azure/functions'
// eslint-disable-next-line import/no-named-as-default
import DotenvAzure from 'dotenv-azure'
import { deleteIndex } from './common'
import { languageFromIso, languageOrDefault } from '../common'
import { pipe } from 'fp-ts/lib/function'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await new DotenvAzure().config({
    allowEmptyValues: true,
    debug: false,
  })

  const logger = context.log
  const language = pipe(languageFromIso(req.body.language), languageOrDefault)
  const index: string = req.body.index
  const slug: string = req.body.slug
  logger.info(`Requesting to delete ${slug} from ${index}`)

  await deleteIndex(language)(index)(slug)().catch(logger)
}

export default httpTrigger
