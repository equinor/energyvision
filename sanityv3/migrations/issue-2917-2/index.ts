import { defineMigration, at, insertBefore, set } from 'sanity/migrate'
import { defaultColors } from '../../schemas/defaultColors'

/**
 * To migrate theme from text teaser and use background
 */

const getColorValueByTitle = (title: string) => {
  let color: string
  switch (title) {
    case 'Moss Green':
      color = 'Moss Green Light'
      break
    case 'Slate Blue':
      color = 'Mid Blue'
      break
    default:
      color = title
  }

  return defaultColors
    .map((it) => {
      return { title: it.title, key: it.key, value: it.value }
    })
    .find((it) => it.title == color)
}
export default defineMigration({
  title: 'Issue 2917',
  documentTypes: ['page', 'news', 'magazine', 'event'],
  migrate: {
    object(node, path, _context) {
      if (node._type === 'colorlist' && (!node.key || !node.dark)) {
        const value = getColorValueByTitle(node.title as string)
        if (!value) {
          console.log('The following color not found - ')
          console.log(JSON.stringify(node))
          console.log('at')
          console.log(path)
        }
        return
      }
    },
  },
})
