import { Outlined } from '@ui/Icons'
import { StructureBuilder } from 'sanity/desk'

const SettingsStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Settings')
    .icon(Outlined.WrenchIcon)
    .child(S.document().schemaType('siteSettings').documentId('siteSettings'))

export default SettingsStructure
