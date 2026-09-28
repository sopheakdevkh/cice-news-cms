import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const localesService = strapi.plugin('i18n')?.service('locales');
      if (localesService) {
        const existingLocales = await localesService.find();
        const codes = (existingLocales || []).map((l: any) => l.code);

        // Ensure default 'en' exists
        if (!codes.includes('en')) {
          await localesService.create(
            { name: 'English (en)', code: 'en' },
            { isDefault: true }
          );
          strapi.log.info('i18n: Created default locale English (en)');
        }

        // Ensure 'zh' exists
        if (!codes.includes('zh')) {
          await localesService.create(
            { name: 'Chinese (zh)', code: 'zh' },
            { isDefault: false }
          );
          strapi.log.info('i18n: Created locale Chinese (zh)');
        }
      }
    } catch (error) {
      strapi.log.warn('Could not auto-initialize i18n locales:', error);
    }
  },
};

