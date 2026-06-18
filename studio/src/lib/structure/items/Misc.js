import { FaRegWindowRestore } from 'react-icons/fa6'
import { FileIcon } from '../../../../icons'
import { singletonListItem } from './SingletonItem'

const miscPages = S =>
  [singletonListItem(S, 'settings', 'Common settings').icon(FileIcon)].filter(
    e => e,
  )

export const Misc = S =>
  S.listItem()
    .title('Misc')
    .icon(FaRegWindowRestore)
    .child(S.list('misc').id('misc').title('Misc').items(miscPages(S)))
