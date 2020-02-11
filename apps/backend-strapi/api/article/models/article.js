'use strict'

const slugify = require('slugify')

/**
 * Lifecycle callbacks for the `article` model.
 */

module.exports = {
  beforeSave: async (model, attrs, options) => {
    if (attrs.slug === '' || !attrs.slug) {
      if (options.method === 'insert') {
        model.set('slug', slugify(attrs.title, { lower: true }))
      } else if (options.method === 'update') {
        attrs.slug = slugify(attrs.title, { lower: true })
      }
    }
  },
}
