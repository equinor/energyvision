import * as E from 'fp-ts/lib/Either'
import { languageFromIso, languageOrDefault } from "."

describe('Language function tests', () => {
  describe('languageFromIso tests', () => {
    const sut = languageFromIso

    describe('With english iso code', () => {
      const english = { isoCode: 'en-GB' }
      const res = sut('en-GB')
      it('english language object is returned', () => {
        E.foldW(
          () => fail('Language object not returned'),
          (right) => expect(right).toEqual(english),
        )(res)
      })
    })

    describe('With invalid iso code', () => {
      const res = sut('en_GB')
      it('Gives an error', () => {
        E.foldW(
          (left) => expect(left).toBeDefined(),
          () => fail('No object expected'),
        )(res)
      })
    })
  })

  describe('languageOrDefault tests', () => {
    const sut = languageOrDefault

    describe('With english iso code', () => {
      const norwegian = { isoCode: 'nb-NO' }
      const languageResult = languageFromIso('nb-NO')
      const res = sut(languageResult)
      it('english language object is returned', () => {
          expect(res).toEqual(norwegian)
      })
    })

    describe('With invalid iso code', () => {
      const english = { isoCode: 'en-GB' }
      const languageResult = languageFromIso('foobar')
      const res = sut(languageResult)
      it('Gives default language', () => {
          expect(res).toEqual(english)
      })
    })
  })
})
