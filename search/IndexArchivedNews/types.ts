import * as IO from 'fp-ts/lib/IO'
import * as E from 'fp-ts/lib/Either'

export type GetProcessEnvType = IO.IO<E.Either<string, string>>