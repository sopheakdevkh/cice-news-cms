/**
 * page controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::page.page', ({ strapi }) => ({
  async find(ctx) {
    // Add deep population for the dynamic zone and its components
    ctx.query.populate = {
      ...(typeof ctx.query.populate === 'object' ? ctx.query.populate : {}),
      sections: {
        populate: '*', // Populates all fields in components, including media and relations
      },
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async findOne(ctx) {
    // Add deep population for the dynamic zone and its components
    ctx.query.populate = {
      ...(typeof ctx.query.populate === 'object' ? ctx.query.populate : {}),
      sections: {
        populate: '*', // Populates all fields in components, including media and relations
      },
    };

    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  },
}));
