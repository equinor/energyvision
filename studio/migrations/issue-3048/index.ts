import { set } from 'sanity'
import { at, defineMigration, unset, insertBefore, replace } from 'sanity/migrate'

export default defineMigration({
  title: 'Issue 3048',
  documentTypes: ['page', 'magazine', 'homePage'],
  migrate: {
    array(node, path, _context) {
      if (path[0] === 'content')
        return node
          .filter((it) => it._type === 'fullWidthImage')
          .filter((e) => !!e)
          .map((item) => {
            const mappedValue = item.aspectRatio === 0.3 ? '10:3' : '2:1'
            return at([{ _key: item._key }, 'aspectRatio'], set(mappedValue))
          })
    },
  },
})
