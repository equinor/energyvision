import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import { loadJson } from './fileStorage'

describe('fileStorage', () => {
  describe('loadJson tests', () => {
    describe('Fails gracefully with empty path', () => {
      const sut = loadJson
      /*  it('Does not crash', async () => {
        try {
          await T.map(
            E.fold(
              (error) => {
                expect(error).toBe('fdjkaldf')
              },
              (right) => {
                expect(right).toBe('left')
              },
            ),
          )(sut(''))()
        } catch (e) {
          expect(e).toMatch('error')
        }
      }) */
      it('Error is returned as expected', () => {
        return T.map(
          E.fold(
            (error) => {
              expect(error).toBeInstanceOf(Error)
            },
            (right) => {
              fail(right)
            },
          ),
        )(sut(''))().catch((error) => fail(error))
      })
    })
  })
})
