import { RiPagesLine } from 'react-icons/ri'
import { defaultLanguage } from '../../../../languages'
import { apiVersion } from '../../../../sanity.client'

export const DeveloperContent = S =>
  S.listItem()
    .title('Developer shortcuts')
    .icon(RiPagesLine)
    .schemaType('page')
    .child(
      S.documentTypeList('page')
        .id('pages')
        .title('Shortcuts')
        .apiVersion(apiVersion)
        .filter(
          '_type == "page" && (!defined(lang) || lang == $baseLang) && (_id == "36ab2e1b-77c5-4127-b201-334b6e4e93a2" || _id == "77815ae5-8886-4ba8-80a4-2e47adc83859")',
        )
        .params({ baseLang: defaultLanguage.name })
        .canHandleIntent((_name, params) => {
          // Assume we can handle all intents (actions) regarding post documents
          return params.type === 'page'
        }),
    )
