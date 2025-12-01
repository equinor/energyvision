import { BsNewspaper } from 'react-icons/bs'
import { GiNewspaper } from 'react-icons/gi'
import { defaultLanguage } from '../../../../languages'
import { apiVersion } from '../../../../sanity.client'
import { Flags } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'
import { singletonListItem } from './SingletonItem'

export const News = S =>
  Flags.HAS_NEWS
    ? S.listItem()
        .title('Newspage')
        .icon(BsNewspaper)
        .schemaType('news')
        .child(
          S.documentTypeList('news')
            .apiVersion(apiVersion)
            .id('news')
            .title('Newspages')
            .filter(' _type == "news" && (!defined(lang) || lang == $baseLang)')
            .params({ baseLang: defaultLanguage.name })
            .canHandleIntent((_name, params) => {
              // Assume we can handle all intents (actions) regarding post documents
              return params.type === 'news'
            }),
        )
    : EmptyItem

export const NewsRoom = S =>
  Flags.HAS_NEWSROOM
    ? singletonListItem(S, 'newsroom', 'Newsroom').icon(GiNewspaper)
    : EmptyItem
