import type { ArrayDefinition, Rule } from 'sanity'
import { SingleItemSelectorInput } from '../components/SingleItemSelector/SingleItemSelector'

const singleItemArray = (it: ArrayDefinition, required = false) => {
  const { options, components, preview } = it as ArrayDefinition

  const config = {
    ...it,
    validation: (Rule: Rule) =>
      required ? Rule.length(1).required() : Rule.length(1),
    components: {
      input: SingleItemSelectorInput,
      preview: components?.preview,
    },
    options: {
      ...options,
      sortable: false,
      disableActions: [
        'add',
        'addAfter',
        'addBefore',
        'duplicate',
        'duplicate',
        'copy',
        required && 'remove',
      ].filter(e => e),
    },
    preview,
  }
  return config
}

export default singleItemArray
