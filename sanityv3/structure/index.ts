import { StructureBuilder } from 'sanity/desk'
import BlogStructure from './BlogStructure'
import PageStructure from './PageStructure'
import SettingsStructure from './SettingsStructure'

export default (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      BlogStructure(S),
      PageStructure(S),
      S.divider(),
      SettingsStructure(S),
    ])
