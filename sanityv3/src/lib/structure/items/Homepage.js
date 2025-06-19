import { TopicDocuments } from '../../../../icons'
import { defaultLanguage } from '../../../../languages'
import { apiVersion } from '../../../../sanity.client'

export const HomePage = (S) =>
  S.listItem()
    .title('Home Page')
    .icon(TopicDocuments)
    .schemaType('homePage')
    .child(
      S.documentTypeList('homePage')
        .id('pages')
        .title('Home Page')
        .apiVersion(apiVersion)
        .filter('_type == "homePage" && (!defined(lang) || lang == $baseLang)')
        .params({ baseLang: defaultLanguage.name })
        .canHandleIntent((_name, params) => {
          // Assume we can handle all intents (actions) regarding post documents
          return params.type === 'homePage'
        }),
    )
