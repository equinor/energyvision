import { Outlined } from '@ui/Icons'
import { StructureBuilder } from 'sanity/desk'

const PageStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Pages')
    .icon(Outlined.RectangleGroupIcon)
    .child(S.documentTypeList('article').title('Pages'))

export default PageStructure
