import S from '@sanity/desk-tool/structure-builder'
import { play_circle_outlined } from '@equinor/eds-icons'
import { EdsIcon, FileIcon } from '../../../../icons'

export const UnusedAssetFilters = () =>
  S.listItem()
    .title('Unused files')
    .icon()
    .child(S.list('unusedAssets').title('Unused Files').items(unusedTypesListItems))

const unusedTypesListItems = [
  S.listItem()
    .title('Unused asset files')
    .icon(FileIcon)
    .child(
      S.documentTypeList('assetFile')
        .apiVersion('2022-05-12')
        .filter(
          /* groq */ ` _type in ["assetFile"] && (
            (!(_id in path("drafts.**"))&& count(*[references(^._id)]) == 0)
            ||
            (_id in path("drafts.**") && count(*[^._id == "drafts." + _id]) == 0)
            )`,
        )
        .id('allFiles')
        .title('All unused files'),
    ),
  S.listItem()
    .title('Unused video assets')
    .icon(() => EdsIcon(play_circle_outlined))
    .child(
      S.documentTypeList('videoFile')
        .apiVersion('2022-05-12')
        .filter(
          /* groq */ ` _type in ["videoFile"] && (
            (!(_id in path("drafts.**"))&& count(*[references(^._id)]) == 0)
            ||
            (_id in path("drafts.**") && count(*[^._id == "drafts." + _id]) == 0)
            )`,
        )
        .id('videoFiles')
        .title('Video Files'),
    ),
]
