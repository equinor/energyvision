import S from '@sanity/desk-tool/structure-builder'
import { LibraryIcon, FileIcon, TagMoreIcon } from '../../../../icons'
import { AssetExtensionFilters } from './AssetExtensionFilters'
import { AssetTagFilters } from './AssetTagFilters'

const assetLibraryItems = [
  S.listItem()
    .title('Show all asset files')
    .icon(FileIcon)
    .child(S.documentTypeList('assetFile').id('allFiles').title('All files')),
  S.divider(),
  AssetExtensionFilters,
  AssetTagFilters,
  S.divider(),
  S.listItem()
    .title('Manage file tags')
    .icon(TagMoreIcon)
    .child(S.documentTypeList('assetTag').id('manageAssetTags').title('Manage asset tags')),
]

export const AssetLibrary = S.listItem()
  .title('Asset library')
  .icon(LibraryIcon)
  .child(S.list('assets').id('assets').title('Asset library').items(assetLibraryItems))
