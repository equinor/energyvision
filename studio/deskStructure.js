/* eslint-disable no-unused-vars */
import S from '@sanity/desk-tool/structure-builder'
import { EdsList } from './icons'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => {
  const listItems = [
    S.listItem()
      .icon(EdsList)
      .title('News')
      .schemaType('news')
      .child(
        S.documentList()
          .id('news')
          .title('News articles')
          .filter('_type == "news"')
          .canHandleIntent((_name, params, _context) => {
            return params.type === 'news'
          }),
      ),
  ]

  return S.list().title('Content').items(listItems)
}
