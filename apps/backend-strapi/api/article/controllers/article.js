"use strict";

const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;

    ctx.query = {
      ...ctx.query,
      status: "published"
    };

    if (ctx.query._q) {
      entities = await strapi.services.article.search(ctx.query);
    } else {
      entities = await strapi.services.article.find(ctx.query);
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.article })
    );
  },
  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      status: "published"
    };

    const entity = await strapi.services.article.find(ctx.query);

    return sanitizeEntity(entity[0], { model: strapi.models.article });
  }
};
