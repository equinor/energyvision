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
          '_type == "page" && (!defined(lang) || lang == $baseLang) && (_id == "bf4743a9-fbdb-48dd-9323-74c12b76e412" || _id == "ac2db606-1b57-492b-8c52-e0e292176d56")',
        )
        .params({ baseLang: defaultLanguage.name })
        .canHandleIntent((_name, params) => {
          // Assume we can handle all intents (actions) regarding post documents
          return params.type === 'page'
        }),
    )
