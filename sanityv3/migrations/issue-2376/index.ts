import { defineMigration, set } from 'sanity/migrate'

export default defineMigration({
  title: 'Issue 2376',
  documentTypes: ['page', 'event', 'news', 'magazine'],
  migrate: {
    string(node, path, context) {
      if (['none', 'marketing', 'statistics'].includes(node) && path[path.length - 1] === 'cookiePolicy')
        return set([node])
    },
  },
})
