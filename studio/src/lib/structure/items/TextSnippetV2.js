import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { text_field, folder } from '@equinor/eds-icons'
import textSnippetsV2, { groups } from '../../../../schemas/textSnippetsV2'

const textSnippets = textSnippetsV2

const textSnippetGroups = Object.keys(groups)
  .filter((it) => !groups[it].hidden)
  .map((it) => S.listItem(createTextSnippetGroupItem(groups[it])))

const textSnippetItems = [...textSnippetGroups]

function createTextSnippetGroupItem(group) {
  return {
    title: group.title,
    icon: () => EdsIcon(folder),
    id: `snippet-group-${group.title.split(' ').join('-')}`,
    child: () =>
      S.list('textSnippet')
        .id('textSnippet')
        .title(group.title)
        .items(
          Object.keys(textSnippets)
            .filter((it) => textSnippets[it].group === group && !textSnippets[it].hidden)
            .map((it) => S.listItem(createTextSnippetItem(it))),
        ),
  }
}

function createTextSnippetItem(key) {
  return {
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
  }
}

export const TextSnippetV2 = S.listItem()
  .icon(() => EdsIcon(text_field))
  .title('Text Snippets')
  .child(() => S.list('textSnippet').id('textSnippet').title('Text Snippets').items(textSnippetItems))
