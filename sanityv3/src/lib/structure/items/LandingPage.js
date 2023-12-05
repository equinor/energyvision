import { TopicDocuments } from '../../../../icons'
import { i18n } from '../../../../schemas/documentTranslation'
import { Flags } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'

export const LandingPage = (S) =>
  Flags.HAS_LANDING_PAGE
    ? S.listItem()
        .title('Landing page')
        .icon(TopicDocuments)
        .schemaType('landingPage')
        .child(
          S.documentTypeList('landingPage')
            .apiVersion('v2023-12-05')
            .id('landingPages')
            .title('Landing page')
            .filter('_type == "landingPage" && (!defined(_lang) || _lang == $baseLang)')
            .params({ baseLang: i18n.base })
            .canHandleIntent((_name, params) => {
              // Assume we can handle all intents (actions) regarding post documents
              return params.type === 'landingPage'
            }),
        )
    : EmptyItem
