import { TopicDocuments } from '../../../../icons'
import { defaultLanguage } from '../../../../languages'
import { apiVersion } from '../../../../sanity.client'
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
            .apiVersion(apiVersion)
            .id('landingPages')
            .title('Landing page')
            .filter('_type == "landingPage" && (!defined(lang) || lang == $baseLang)')
            .params({ baseLang: defaultLanguage.name })
            .canHandleIntent((_name, params) => {
              // Assume we can handle all intents (actions) regarding post documents
              return params.type === 'landingPage'
            }),
        )
    : EmptyItem
