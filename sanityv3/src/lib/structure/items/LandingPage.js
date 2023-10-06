import { TopicDocuments } from '../../../../icons'
import { languages } from '../../../../languages'
import { Flags } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'

const documentList = (S, lang) =>
  S.documentTypeList('landingPage')
    .id('landingPages')
    .title('Landing page')
    .filter('_type == "landingPage" && (!defined(lang) || lang == $baseLang)')
    .params({ baseLang: lang.iso })
    .canHandleIntent((_name, params) => {
      // Assume we can handle all intents (actions) regarding post documents
      return params.type === 'landingPage'
    })
export const LandingPage = (S) =>
  Flags.HAS_LANDING_PAGE
    ? S.listItem()
        .title('Landing page')
        .icon(TopicDocuments)
        .schemaType('landingPage')
        .child(
          S.list()
            .title('Landing Pages')
            .items(
              languages.map((it) =>
                S.listItem(`${it.title} landing page`)
                  .title(`${it.title} landing page`)
                  .id(`${it.iso}_landing_page`)
                  .icon(TopicDocuments)
                  .child(() => documentList(S, it)),
              ),
            ),
        )
    : EmptyItem
