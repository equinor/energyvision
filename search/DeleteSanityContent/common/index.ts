import { flow, pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import { remove, generateIndexName, getEnvironment, Language } from '../../common'

export const deleteIndex = (language: Language, indexIdentifier: string, slug: string) => {
  const indexName = flow(getEnvironment, E.map(generateIndexName(indexIdentifier)(language.isoCode)))
  const removeIndexFromAlgolia = flow(indexName, E.map(remove))
  return pipe(pipe(removeIndexFromAlgolia(), E.ap(E.of(slug)))), T.map(E.fold(console.error, console.log))
}
