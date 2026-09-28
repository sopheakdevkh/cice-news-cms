/**
 * page router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::page.page', {
  config: {
    create: {
      policies: ['api::page.protect-slug'],
    },
    update: {
      policies: ['api::page.protect-slug'],
    },
  },
});
