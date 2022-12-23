import { play_circle_outlined } from '@equinor/eds-icons'
import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon, FileIcon, LibraryIcon, TagMoreIcon } from '../../../../icons'
import { Flags } from '../../datasetHelpers'
import { AssetExtensionFilters } from './AssetExtensionFilters'
import { AssetTagFilters } from './AssetTagFilters'

const assetLibraryItems = [
  S.listItem()
    .title('Show all asset files')
    .icon(FileIcon)
    .child(S.documentTypeList('assetFile').id('allFiles').title('All files')),
  S.divider(),
  AssetExtensionFilters(),
  AssetTagFilters(),
  S.divider(),
  S.listItem()
    .title('Manage file tags')
    .icon(TagMoreIcon)
    .child(S.documentTypeList('assetTag').id('manageAssetTags').title('Manage asset tags')),
  Flags.IS_DEV && S.divider(),
  Flags.IS_DEV &&
    S.listItem()
      .title('Video Assets')
      .icon(() => EdsIcon(play_circle_outlined))
      .child(S.documentTypeList('videoFile').id('videoFiles').title('Video Files')),
].filter((e) => e)

export const AssetLibrary = S.listItem()
  .title('Asset library')
  .icon(LibraryIcon)
  .child(S.list('assets').id('assets').title('Asset library').items(assetLibraryItems))
