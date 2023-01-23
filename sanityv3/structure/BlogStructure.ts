import { useFlag } from '@studio/helpers/useFlag'
import { Outlined } from '@ui/Icons'
import { StructureBuilder } from 'sanity/desk'
import { Flags } from 'settings'

const ArticleStructure = (S: StructureBuilder) =>
  S.listItem()
    .icon(Outlined.DocumentTextIcon)
    .title('Articles')
    .schemaType('article')
    .child(S.documentTypeList('article').title('Articles'))

const AuthorStructure = (S: StructureBuilder) =>
  useFlag(
    Flags.HAS_AUTHOR,
    Flags.HAS_AUTHOR &&
      S.listItem()
        .icon(Outlined.IdentificationIcon)
        .title('Authors')
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),
  )

const CategoryStructure = (S: StructureBuilder) =>
  S.listItem()
    .icon(Outlined.TagIcon)
    .title('Categories')
    .schemaType('category')
    .child(S.documentTypeList('category').title('Categories'))

const HomeStructure = (S: StructureBuilder) =>
  S.listItem()
    .icon(Outlined.HomeModernIcon)
    .title('Home')
    .schemaType('blogHome')
    .child(S.document().schemaType('blogHome').documentId('blogHome'))

const BlogStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Blog')
    .icon(Outlined.NewspaperIcon)
    .child(
      S.list()
        .id('blog')
        .title('Blog')
        .items([
          ArticleStructure(S),
          ...AuthorStructure(S),
          CategoryStructure(S),
          HomeStructure(S),
        ]),
    )

export default BlogStructure
