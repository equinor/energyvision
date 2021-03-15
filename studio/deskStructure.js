import S from '@sanity/desk-tool/structure-builder'
import { EdsList } from './icons'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () =>
  S.list()
    .title('Content')
    .items([S.listItem().icon(EdsList).title('News')])
