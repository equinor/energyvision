import S from '@sanity/desk-tool/structure-builder'
import { EdsIcon } from '../../../../icons'
import { text_field, folder } from '@equinor/eds-icons'
import textSnippets, { groups } from '../../../../schemas/textSnippets'

const textSnippetGroups = Object.keys(groups)
  .filter((it) => !groups[it].hidden)
  .sort((a, b) => groups[a].title.localeCompare(groups[b].title))
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
            .sort((a, b) => textSnippets[a].title.localeCompare(textSnippets[b].title))
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

export const TextSnippet = S.listItem()
  .icon(() => EdsIcon(text_field))
  .title('Text Snippets')
  .child(() => S.list('textSnippet').id('textSnippet').title('Text Snippets').items(textSnippetItems))
