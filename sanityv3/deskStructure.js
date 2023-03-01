import items from './src/lib/structure'
import FilePreview from './src/previews/file/filePreview'
import Preview from './src/previews/Preview'
import DocumentsPane from 'sanity-plugin-documents-pane'

export default (S, context) => S.list().title('Content').items(items(S, context))

const docsWithNormalPreview = [
  'news',
  'localNews',
  'landingPage',
  'magazine',
  'newsroom',
  'magazineIndex',
  'page',
  'event',
  'pageNotFound',
  'internalServerError',
]
const docsWithRoute = ['page', 'event']
const tagDocTypes = ['tag', 'localNewsTag', 'countryTag', 'magazineTag', 'eventTag', 'assetTag']
const fileDocTypes = ['assetFile', 'videoFile']

export const defaultDocumentNodeResolver = (S, { schemaType }) => {
  const views = [S.view.form()]

  if (docsWithNormalPreview.includes(schemaType)) views.push(S.view.component(Preview).title('Preview'))

  if (docsWithRoute.includes(schemaType))
    views.push(
      S.view
        .component(DocumentsPane)
        .options({
          query: /* groq */ `*[!(_id in path("drafts.**")) && references($id) && _type match "route_*"]`,
          params: { id: `_id` },
          useDraft: false,
        })
        .title('Connected routes'),
    )

  if (fileDocTypes.includes(schemaType))
    views.push(
      S.view
        .component(DocumentsPane)
        .options({
          query: /* groq */ `*[!(_id in path("drafts.**")) && references($id) && _type in ["news", "event", "page", "magazine"]]`,
          params: { id: `_id` },
          useDraft: false,
        })
        .title('References'),
      S.view.component(FilePreview).title('Preview'),
    )

  if (tagDocTypes.includes(schemaType)) {
    const query =
      schemaType === 'assetTag'
        ? /* groq */ `*[!(_id in path("drafts.**")) && references($id) && _type match "assetFile"]`
        : /* groq */ `*[!(_id in path("drafts.**")) && references($id) && _type in ["news", "localNews", "magazine", "event"]]`

    const title =
      schemaType === 'assetTag'
        ? 'References'
        : schemaType === 'eventTag'
        ? 'Connected event(s)'
        : 'Connected article(s)'

    views.push(
      S.view
        .component(DocumentsPane)
        .options({
          query: query,
          params: { id: `_id` },
          useDraft: false,
        })
        .title(title),
    )
  }

  return S.document().views(views)
}
