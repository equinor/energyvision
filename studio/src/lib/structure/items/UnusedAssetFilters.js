import S from '@sanity/desk-tool/structure-builder'
import { play_circle_outlined } from '@equinor/eds-icons'
import { EdsIcon, FileIcon } from '../../../../icons'

export const UnusedAssetFilters = () =>
  S.listItem()
    .title('Unused files')
    .icon()
    .child(S.list('unusedAssets').title('Unused Files').items(unusedTypesListItems))
    .id('unusedFiles')

const getUnusedPublishedAssets = (docType) =>
  S.documentTypeList(docType)
    .apiVersion('2023-01-13')
    .filter(
      /* groq */ ` _type in [$docType] && (
        (!(_id in path("drafts.**"))&& count(*[references(^._id)]) == 0)
        )`,
    )
    .params({ docType })
    .id(`unusedPublishedAssets-${docType}`)

const getUnpublishedDraftAssets = (docType) =>
  S.documentTypeList(docType)
    .apiVersion('2023-01-13')
    .filter(
      /* groq */ ` _type in [$docType] && (
        (_id in path("drafts.**") && count(*[^._id == "drafts." + _id]) == 0)
        )`,
    )
    .params({ docType })
    .id(`unpublishedDrafts-${docType}`)

const unusedTypesListItems = [
  S.listItem().icon(FileIcon).child(getUnpublishedDraftAssets('assetFile')).id('draftAssets').title('Draft Assets'),
  S.listItem()
    .icon(FileIcon)
    .child(getUnusedPublishedAssets('assetFile'))
    .id('publishedAssets')
    .title('Published Assets'),
  S.divider(),
  S.listItem()
    .icon(() => EdsIcon(play_circle_outlined))
    .child(getUnpublishedDraftAssets('videoFile'))
    .id('draftVideos')
    .title('Draft Videos'),
  S.listItem()
    .icon(() => EdsIcon(play_circle_outlined))
    .child(getUnusedPublishedAssets('videoFile'))
    .id('publishedVideos')
    .title('Published Videos'),
]
