import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import { loadJson } from './fileStorage'
import { fail } from '../common/jestUtils'


describe('fileStorage', () => {
  describe('loadJson tests', () => {
    describe('Fails gracefully with empty path', () => {
      const sut = loadJson
      it('Error is returned as expected', () => {
        return T.map(
          E.fold((error) => {
            expect(error).toBeInstanceOf(Error)
          }, fail),
        )(sut(''))().catch((error) => fail(error))
      })
    })
  })
})
