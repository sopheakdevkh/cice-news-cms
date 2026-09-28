import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    // Set a custom page title and favicon
    head: {
      title: 'CICE News Admin',
      favicon: 'favicon.png',
    },
    // Replace the Strapi logo in the auth screen
    auth: {
      logo: null,
    },
    // Add a new locale, other than 'en'
    locales: ['zh', 'en'],
    // Replace the existing translations
    translations: {
      en: {
        'app.name': 'CICE News Admin',
        'app.page.title': 'CICE News Admin',
        'Auth.form.welcome.title': 'CICE News Admin Panel',
        'Auth.form.welcome.subtitle': 'Sign in to manage your website content',
      },
      'zh': {
        'app.name': '普恩特管理后台',
        'app.page.title': '普恩特管理后台',
        'Auth.form.welcome.title': '普恩特管理后台',
        'Auth.form.welcome.subtitle': '登录以管理您的网站内容',
      },
    },
    // Disable the tutorial video
    tutorials: false,
    // Disable notifications about new Strapi releases
    notifications: { releases: false },
  },

  bootstrap(app: StrapiApp) {
    // Override document title on initial load and route changes
    if (typeof window !== 'undefined') {
      // Function to fix the title
      const fixTitle = () => {
        let title = document.title;

        // If title contains "Strapi", replace it properly
        if (title.includes('Strapi')) {
          // First, check if "CICE News Admin" is already in the title to prevent duplication
          const hasThePointAdmin = title.includes('CICE News Admin');

          if (hasThePointAdmin) {
            // If "CICE News Admin" is already there, just remove "Strapi" and "Admin" duplicates
            title = title.replace(/Strapi\s*Admin/gi, ''); // Remove "Strapi Admin"
            title = title.replace(/Strapi/gi, ''); // Remove any remaining "Strapi"
            title = title.replace(/AdminAdmin/gi, 'Admin'); // Fix "AdminAdmin" -> "Admin"
          } else {
            // Handle format: "Home | Strapi" -> "Home | CICE News Admin"
            if (title.includes('|')) {
              title = title.replace(/\|\s*Strapi\s*(Admin)?/gi, '| CICE News Admin');
              title = title.replace(/Strapi\s*(Admin)?\s*\|\s*/gi, 'CICE News Admin | ');
            } else {
              // Handle format: "Strapi" or "Strapi Admin" -> "CICE News Admin"
              title = title.replace(/Strapi\s*Admin/gi, 'CICE News Admin');
              title = title.replace(/Strapi/gi, 'CICE News Admin');
            }
          }

          // Clean up any double spaces or trailing/leading separators
          title = title.replace(/\s*\|\s*$/g, ''); // Remove trailing " | "
          title = title.replace(/^\s*\|\s*/g, ''); // Remove leading " | "
          title = title.replace(/\s+/g, ' ').trim(); // Clean up multiple spaces
          title = title.replace(/CICE News\s+Admin\s+Admin/gi, 'CICE News Admin'); // Fix "CICE News Admin Admin"
          title = title.replace(/Admin\s+Admin/gi, 'Admin'); // Fix "Admin Admin"

          // If title is empty or just separators, set default
          if (!title || title === '|') {
            title = 'CICE News Admin';
          }

          document.title = title;
        }
      };

      // Set initial title
      fixTitle();

      // Override title whenever it changes (monitor DOM changes)
      const observer = new MutationObserver(() => {
        fixTitle();
      });

      // Observe title changes
      const titleElement = document.querySelector('title');
      if (titleElement) {
        observer.observe(titleElement, {
          childList: true,
          characterData: true,
          subtree: true,
        });
      }

      // Also listen for route changes
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;

      history.pushState = function (...args) {
        originalPushState.apply(history, args);
        setTimeout(fixTitle, 0);
      };

      history.replaceState = function (...args) {
        originalReplaceState.apply(history, args);
        setTimeout(fixTitle, 0);
      };

      // Listen for popstate events
      window.addEventListener('popstate', () => {
        setTimeout(fixTitle, 0);
      });
    }
  },
};
