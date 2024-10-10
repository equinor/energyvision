import { at, defineMigration, unset, insertBefore } from 'sanity/migrate'

export default defineMigration({
  title: 'Issue 2533',
  documentTypes: ['page', 'magazine'],

  migrate: {
    array(node, path, _context) {
      if (path[0] === 'content')
        return node
          .filter((it) => (it._type === 'textBlock' || it._type === 'accordion') && it.anchor != null)
          .filter((e) => !!e)
          .map((item) => {
            return [
              insertBefore([{ _type: 'anchorLink', anchorReference: item.anchor }], { _key: item._key }),
              at([{ _key: item._key }, 'anchor'], unset()),
            ]
          })
    },
  },
})
