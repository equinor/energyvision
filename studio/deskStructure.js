import S from '@sanity/desk-tool/structure-builder'
import NewsPreview from './src/previews/news/NewsPreview'
import PagePreview from './src/previews/page/PagePreview'
import FilePreview from './src/previews/file/filePreview'
import NewsroomPreview from './src/previews/news/NewsroomPreview'
import * as I18nS from '@sanity/document-internationalization/lib/structure'
import DocumentsPane from 'sanity-plugin-documents-pane'
import Structure from './src/lib/structure'
import { HAS_EVENT, HAS_LANDING_PAGE, HAS_LOCAL_NEWS, HAS_NEWS } from './src/lib/datasetHelpers'
import { getCurrentUserRoles, hasPermission, PERMISSIONS } from './src/lib/permissions'

const items = [
  HAS_NEWS && Structure.News,
  HAS_LOCAL_NEWS && Structure.LocalNews,
  Structure.TopicContent,
  HAS_LANDING_PAGE && Structure.LandingPage,
  HAS_EVENT && Structure.Event,
  hasPermission(PERMISSIONS.ACCESS_SETTINGS) && Structure.Misc,
  hasPermission(PERMISSIONS.ACCESS_SETTINGS) && S.divider(),
  hasPermission(PERMISSIONS.ACCESS_SETTINGS) && Structure.Homepage,
  hasPermission(PERMISSIONS.ACCESS_SETTINGS) && Structure.Routes,
  hasPermission(PERMISSIONS.ACCESS_SETTINGS) && S.divider(),
  hasPermission(PERMISSIONS.ACCESS_SETTINGS) && Structure.Menu,
  hasPermission(PERMISSIONS.ACCESS_SETTINGS) && Structure.Footer,
  S.divider(),
  Structure.AssetLibrary,
  hasPermission(PERMISSIONS.ACCESS_SETTINGS) && S.divider(),
  hasPermission(PERMISSIONS.ACCESS_SETTINGS) && Structure.Settings,
].filter((e) => e)

const itemsForLocalNewsEditor = [HAS_LOCAL_NEWS && Structure.LocalNews]

/** @TODO refactor datasets from public to private, then this code will be no longer needed */
const listItems = getCurrentUserRoles().includes('local-news-editor') ? itemsForLocalNewsEditor : items

export default () => S.list().title('Content').items(listItems)

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
    return S.document().views([
      ...I18nS.getDocumentNodeViewsForSchemaType(schemaType),
      S.view.component(NewsPreview).title('News preview'),
    ])
  } else if (schemaType === 'landingPage') {
    return S.document().views([
      ...I18nS.getDocumentNodeViewsForSchemaType(schemaType),
      S.view.component(PagePreview).title('Preview'),
    ])
  } else if (schemaType === 'pageNotFound') {
    return S.document().views([...I18nS.getDocumentNodeViewsForSchemaType(schemaType)])
  } else if (schemaType === 'internalServerError') {
    return S.document().views([...I18nS.getDocumentNodeViewsForSchemaType(schemaType)])
  } else if (schemaType === 'newsroom') {
    return S.document().views([
      ...I18nS.getDocumentNodeViewsForSchemaType(schemaType),
      S.view.component(NewsroomPreview).title('Preview'),
    ])
  } else if (schemaType === 'event') {
    return S.document().views([
      ...I18nS.getDocumentNodeViewsForSchemaType(schemaType),
      S.view.component(PagePreview).title('Preview'),
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id) && _type match "route_*"]`,
          params: { id: `_id` },
          useDraft: false,
        })
        .title('Connected routes'),
    ])
  } else if (schemaType === 'page') {
    return S.document().views([
      ...I18nS.getDocumentNodeViewsForSchemaType(schemaType),
      S.view.component(PagePreview).title('Preview'),
      /* S.view
        .component(Iframe)
        .options({
          url: (doc) => resolveProductionUrl(doc),
        })
        .title('Preview'), */
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
