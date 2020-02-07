'use strict'

const { sanitizeEntity } = require('strapi-utils')

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities

    ctx.query = {
      ...ctx.query,
      status: 'published',
    }

    if (ctx.query._q) {
      entities = await strapi.services.page.search(ctx.query)
    } else {
      entities = await strapi.services.page.find(ctx.query)
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.page }),
    )
  },
  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      status: 'published',
    }

    const entity = await strapi.services.page.find(ctx.query)

    return sanitizeEntity(entity[0], { model: strapi.models.page })
  },
}
