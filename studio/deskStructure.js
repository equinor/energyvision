/* eslint-disable no-unused-vars */
import S from '@sanity/desk-tool/structure-builder'
import { EdsList } from './icons'
import NewsPreview from './src/previews/news/NewsPreview'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => {
  const listItems = [S.documentTypeListItem('news').icon(EdsList).title('News')]

  return S.list().title('Content').items(listItems)
}

export const getDefaultDocumentNode = (props) => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */
  const { schemaType } = props
  if (schemaType === 'news') {
    return S.document().views([S.view.form(), S.view.component(NewsPreview).title('News preview')])
  }

  return S.document().views([S.view.form()])
}
