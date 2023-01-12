import S from '@sanity/desk-tool/structure-builder'
import Preview from './src/previews/Preview'
import FilePreview from './src/previews/file/filePreview'
import DocumentsPane from 'sanity-plugin-documents-pane'
import items from './src/lib/structure'

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
  const docsWithPreview = ['news', 'localNews', 'landingPage', 'magazine', 'newsroom', 'magazineIndex']
  const tagDocTypes = ['tag', 'localNewsTag', 'countryTag', 'magazineTag', 'eventTag']

  if (docsWithPreview.includes(schemaType)) {
    return S.document().views([S.view.form(), S.view.component(Preview).title('Preview')])
  } else if (['page', 'event'].includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view.component(Preview).title('Preview'),
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id) && _type match "route_*"]`,
          params: { id: `_id` },
          useDraft: false,
        })
        .title('Connected routes'),
    ])
  } else if (['assetFile', 'videoFile'].includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id) && _type in ["news", "event", "page","magazine"]]`,
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
  } else if (tagDocTypes.includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id) && _type in ["news", "localNews", "magazine", "event"]]`,
          params: { id: `_id` },
          useDraft: false,
        })
        .title(schemaType === 'eventTag' ? 'Connected event(s)' : 'Connected article(s)'),
    ])
  }

  return S.document().views([S.view.form()])
}
