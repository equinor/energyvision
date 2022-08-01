import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { text_field } from '@equinor/eds-icons'
import textSnippets from '../../../../schemas/textSnippets'

const textSnippetItems = Object.keys(textSnippets).map((key) =>
  S.listItem({
    title: textSnippets[key].title,
    displayOptions: {
      showIcon: false,
    },
    id: `snippet-${key}`,
    child: () =>
      S.documentWithInitialValueTemplate(`text-snippet-${key}`, {
        defaultValue: textSnippets[key].defaultValue,
      })
        .documentId(`text_snippet_${key}`)
        .title(`Text Snippet: ${key} `)
        .schemaType('textSnippet'),
  }),
)

export const TextSnippet = S.listItem()
  .icon(() => EdsIcon(text_field))
  .title('Text Snippets')
  .child(() => S.list('textSnippet').id('textSnippet').title('Text Snippets').items(textSnippetItems))
