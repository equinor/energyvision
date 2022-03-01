import { NewsArticle } from './sanity'
import { NewsIndex } from './algolia'
import { mapData } from './mapper'

describe('News', () => {
  describe('mapper tests', () => {
    describe('Vanilla version works', () => {
      const newsArticle: NewsArticle = {
        title: 'title',
        slug: '/a/slug',
        _id: 'id',
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
      }

      const sut = mapData
      const result = sut(newsArticle)

      it('contains one entry', () => {
        expect(result).toHaveLength(1)
      })

      it('entry looks as expected', () => {
        expect(result[0]).toEqual({
          slug: '/a/slug',
          objectID: 'id-blockKey-childKey',
          pageTitle: 'title',
          type: 'news',
          text: 'Some text',
        } as NewsIndex)
      })
    })
  })
})
