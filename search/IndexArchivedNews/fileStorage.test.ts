import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import { loadJson, SearchMetadataEntry } from './fileStorage'
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

    describe('Loads valid file into right type', () => {
      const sut = loadJson
      it('Loading the file does not fail', () => {
        return T.map(E.fold(fail, (data) => expect(data).toBeTruthy))(sut(`${__dirname}/sampleData/search-metadata.json`))().catch(
          (error) => fail(error),
        )
      })
      it('File has correct number of entries', () => {
        return T.map(E.fold(fail, (data: SearchMetadataEntry[]) => expect(data).toHaveLength(60)))(sut(`${__dirname}/sampleData/search-metadata.json`))().catch(
          (error) => fail(error),
        )
      })
      it('Sample entry has the right properties', () => {
        return T.map(E.fold(fail, (data: SearchMetadataEntry[]) => {
          const toTest = data[0]
          expect(toTest.category).toEqual('Stock market announcements')
          expect(new Date(toTest.publishedDate)).toEqual(new Date('2016-05-29T18:30Z'))
          expect(toTest.description).toEqual('Executive Vice President for Technology, Digital \u0026 Innovation (TDI) Carri Lockhart has decided to resign from Equinor to return to the US.')
          expect(toTest.link).toEqual('/en/news/archive/scrip-dividend-programme-outside-norway')
          expect(toTest.tags.topics).toHaveLength(1)
          expect(toTest.tags.country).toEqual('')
          expect(toTest.thumbnailURL).toEqual('/content/dam/statoil/image/news/2016-january/volve-detail-16-9.jpg.transform/list/image.png')
        }))(sut(`${__dirname}/sampleData/search-metadata.json`))().catch(
          (error) => fail(error),
        )
      })
    })
  })
})
