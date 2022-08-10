import S from '@sanity/desk-tool/structure-builder'
import NewsPreview from './src/previews/news/NewsPreview'
import Preview from './src/previews/Preview'
import PagePreview from './src/previews/page/PagePreview'
import FilePreview from './src/previews/file/filePreview'
import NewsroomPreview from './src/previews/news/NewsroomPreview'
import DocumentsPane from 'sanity-plugin-documents-pane'
import items from './src/lib/structure'
import { IS_TEST } from './src/lib/datasetHelpers'

export default () => S.list().title('Content').items(items)

export const getDefaultDocumentNode = (props) => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */
  const { schemaType } = props
  if (schemaType === 'news' || schemaType === 'localNews') {
    return S.document().views([S.view.form(), S.view.component(IS_TEST ? Preview : NewsPreview).title('Preview')])
  } else if (schemaType === 'landingPage' || schemaType === 'magazine') {
    return S.document().views([S.view.form(), S.view.component(IS_TEST ? Preview : PagePreview).title('Preview')])
  } else if (schemaType === 'newsroom' || schemaType === 'magazineIndex') {
    return S.document().views([S.view.form(), S.view.component(IS_TEST ? Preview : NewsroomPreview).title('Preview')])
  } else if (['page', 'event'].includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view.component(IS_TEST ? Preview : PagePreview).title('Preview'),
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id) && _type match "route_*"]`,
          params: { id: `_id` },
          useDraft: false,
        })
        .title('Connected routes'),
    ])
  } else if (schemaType === 'assetFile') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id) && _type in ["news", "event", "page"]]`,
          params: { id: `_id` },
          useDraft: false,
        })
        .title('References'),
      S.view.component(FilePreview).title('Preview'),
    ])
  } else if (schemaType === 'assetTag') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id) && _type match "assetFile"]`,
          params: { id: `_id` },
          useDraft: false,
        })
        .title('References'),
    ])
  }

  return S.document().views([S.view.form()])
}
