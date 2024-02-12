import { LocalNewsArticle } from './sanity'
import { NewsIndex } from '../../common'
import { mapData } from './mapper'

describe('Local News', () => {
  describe('mapper tests', () => {
    describe('Vanilla version works', () => {
      // Hei fremtids-Nils Magne, vi bør ikke ha en en-til-en type mot Sanity?
      const newsArticle: LocalNewsArticle = {
        title: 'title',
        ingress: 'ingress',
        slug: '/a/slug',
        _id: 'id',
        publishDateTime: '2021-11-26T07:00:00.000Z',
        localNewsTag: 'Germany',
        // tags: ['Oil', 'Norway'],
        blocks: [
          {
            blockKey: 'blockKey',
            children: [
              {
                childKey: 'childKey',
                text: 'Some text',
              },
            ],
          },
        ],
        factboxes: [
          {
            blockKey: 'factboxkey',
            title: 'Facts',
            text: 'Factbox text',
          },
        ],
      }

      const sut = mapData
      const result = sut(newsArticle)

      it('contains one entry', () => {
        expect(result).toHaveLength(2)
      })

      it('entry looks as expected', () => {
        expect(result[1]).toEqual({
          slug: '/a/slug',
          objectID: 'id-factboxkey',
          pageTitle: 'title',
          ingress: 'ingress',
          type: 'localNews',
          text: 'Facts: Factbox text',
          publishDateTime: '2021-11-26T07:00:00.000Z',
          year: 2021,
          localNewsTag: 'Germany',
        } as NewsIndex)

        expect(result[0]).toEqual({
          slug: '/a/slug',
          objectID: 'id-blockKey-childKey',
          pageTitle: 'title',
          ingress: 'ingress',
          type: 'localNews',
          text: 'Some text',
          publishDateTime: '2021-11-26T07:00:00.000Z',
          year: 2021,
          localNewsTag: 'Germany',
        } as NewsIndex)
      })
    })

    describe('Multiple children works (advanced version)', () => {
      const newsArticle: LocalNewsArticle & { year: number } = {
        title: 'title',
        ingress: 'ingress',
        slug: '/a/slug',
        _id: 'id',
        publishDateTime: '2021-11-26T07:00:00.000Z',
        year: 2021,
        localNewsTag: 'Germany',
        blocks: [
          {
            blockKey: 'blockKey',
            children: [
              {
                childKey: 'childKey',
                text: 'Some text',
              },
              {
                childKey: 'childKey2',
                text: 'Some more text',
              },
            ],
          },
          {
            blockKey: 'blockKey2',
            children: [
              {
                childKey: 'childKey3',
                text: 'Some text 3',
              },
              {
                childKey: 'childKey4',
                text: 'Some more text 4',
              },
            ],
          },
        ],
        factboxes: [
          {
            blockKey: 'factboxkey',
            title: 'Facts',
            text: 'Factbox text',
          },
          {
            blockKey: 'factboxkey1',
            title: 'Facts1',
            text: 'Factbox text1',
          },
        ],
      }

      const sut = mapData
      const result = sut(newsArticle)

      it('contains one entry', () => {
        expect(result).toHaveLength(6)
      })

      it('entry looks as expected', () => {
        expect(result[0]).toEqual({
          slug: '/a/slug',
          objectID: 'id-blockKey-childKey',
          pageTitle: 'title',
          ingress: 'ingress',
          type: 'localNews',
          text: 'Some text',
          publishDateTime: '2021-11-26T07:00:00.000Z',
          year: 2021,
          localNewsTag: 'Germany',
        } as NewsIndex)
        expect(result[1]).toEqual({
          slug: '/a/slug',
          objectID: 'id-blockKey-childKey2',
          pageTitle: 'title',
          ingress: 'ingress',
          type: 'localNews',
          text: 'Some more text',
          publishDateTime: '2021-11-26T07:00:00.000Z',
          year: 2021,
          localNewsTag: 'Germany',
        })
        expect(result[2]).toEqual({
          slug: '/a/slug',
          objectID: 'id-blockKey2-childKey3',
          pageTitle: 'title',
          ingress: 'ingress',
          type: 'localNews',
          text: 'Some text 3',
          publishDateTime: '2021-11-26T07:00:00.000Z',
          year: 2021,
          localNewsTag: 'Germany',
        })
        expect(result[3]).toEqual({
          slug: '/a/slug',
          objectID: 'id-blockKey2-childKey4',
          pageTitle: 'title',
          ingress: 'ingress',
          type: 'localNews',
          text: 'Some more text 4',
          publishDateTime: '2021-11-26T07:00:00.000Z',
          year: 2021,
          localNewsTag: 'Germany',
        })
      })
    })

    describe('Empty children works', () => {
      const newsArticle: LocalNewsArticle = {
        title: 'title',
        ingress: 'ingress',
        slug: '/a/slug',
        _id: 'id',
        localNewsTag: 'UK',
        blocks: [
          {
            blockKey: 'blockKey',
            children: [],
          },
        ],
        factboxes: [],
      }

      const sut = mapData
      const result = sut(newsArticle)

      it('Does not contain entries', () => {
        expect(result).toHaveLength(0)
      })
    })

    describe('Empty blocks works', () => {
      const newsArticle: LocalNewsArticle = {
        title: 'title',
        ingress: 'ingress',
        slug: '/a/slug',
        localNewsTag: 'USA',
        _id: 'id',
        blocks: [],
        factboxes: [],
      }

      const sut = mapData
      const result = sut(newsArticle)

      it('Does not contain entries', () => {
        expect(result).toHaveLength(0)
      })
    })
  })
})
