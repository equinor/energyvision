//import { mapData } from './mapper'

import { SearchMetadataEntry } from './fileStorage'
import { mapData } from './mapper'

describe('fileStorage', () => {
  describe('mapper tests', () => {
    describe('Vanilla version works', () => {
      const newsArticle: SearchMetadataEntry = {
        title: 'title',
        description: 'description',
        publishedDate: '2022-04-02T14:40Z',
        link: '/some/interesting/link',
        thumbnailURL: '/link/to/url/of/image.png',
        category: 'General news',
        tags: {
          topics: ['tag1', 'tag2'],
          country: 'Norway',
        },
        content: 'A lot of \n content',
      }

      const sut = mapData
      const res = sut(newsArticle)

      it('default', () => {
        expect(res).toBeTruthy
      })

      it('Maps all fields', () => {
        expect(res.objectID).toEqual('2022-04-02T14:40Z-/some/interesting/link')
        expect(res.pageTitle).toEqual('title')
        expect(res.ingress).toEqual('description')
        expect(res.publishDateTime).toEqual('2022-04-02T14:40Z')
        expect(res.slug).toEqual('/some/interesting/link')
        expect(res.year).toEqual(2022)
        expect(res.topicTags).toEqual(['tag1', 'tag2', 'General news'])
        expect(res.countryTags).toEqual(['Norway'])
        expect(res.text).toEqual('A lot of \n content')
        expect(res.thumbnailUrl).toEqual(
          'https://envisstoragedev.blob.core.windows.net/equinor-archive-content/link/to/url/of/image.png',
        )
      })
    })

    describe('Empty thumbNailUrl gives empty result', () => {
      const newsArticle: SearchMetadataEntry = {
        title: 'title',
        description: 'description',
        publishedDate: '2022-04-02T14:40Z',
        link: '/some/interesting/link',
        thumbnailURL: '',
        category: 'General news',
        tags: {
          topics: ['tag1', 'tag2'],
          country: 'Norway',
        },
        content: 'A lot of \n content',
      }

      const sut = mapData
      const res = sut(newsArticle)

      it('default', () => {
        expect(res).toBeTruthy
      })

      it('Maps all fields', () => {
        expect(res.thumbnailUrl).toBeNull()
      })
    })
  })
})
