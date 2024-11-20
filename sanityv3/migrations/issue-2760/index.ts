import { defineMigration, set } from 'sanity/migrate'

export default defineMigration({
  title: 'Issue 2760git',
  documentTypes: ['page', 'news', 'magazine', 'event'],

  migrate: {
    string(node, path, context) {
      if (node.startsWith('https://careers.peopleclick.eu.com')) {
        return set(node.replace('http:', 'https://equinor.wd3.myworkdayjobs.com/EQNR'))
      }
    },
  },
})
