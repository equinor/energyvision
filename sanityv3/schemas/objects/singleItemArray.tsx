import { ArrayDefinition, Rule } from 'sanity'
import { SingleItemSelectorInput } from '../components/SingleItemSelector/SingleItemSelector'

const singleItemArray = (it: ArrayDefinition, required = false) => {
  const { options } = it as ArrayDefinition

  const config = {
    ...it,
    validation: (Rule: Rule) => (required ? Rule.length(1).required() : Rule.length(1)),
    components: {
      input: SingleItemSelectorInput,
    },
    options: {
      ...options,
      sortable: false,
      disableActions: ['add', 'addAfter', 'addBefore', 'duplicate', 'duplicate', 'copy', required && 'remove'].filter(
        (e) => e,
      ),
    },
  }
  return config
}

export default singleItemArray
