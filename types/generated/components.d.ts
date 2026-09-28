import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsNavLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_nav_links';
  info: {
    description: 'Navigation link with category reference and external option';
    displayName: 'Navigation Link';
    icon: 'link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    url: Schema.Attribute.String;
  };
}

export interface ElementsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_social_links';
  info: {
    description: 'Social media platform link';
    displayName: 'Social Link';
    icon: 'share';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['linkedin', 'facebook', 'twitter', 'youtube', 'instagram']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTagItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_tag_items';
  info: {
    description: 'Tag or service capability item';
    displayName: 'Tag Item';
    icon: 'tag';
  };
  attributes: {
    link: Schema.Attribute.String;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SectionsCategoryArchive extends Struct.ComponentSchema {
  collectionName: 'components_sections_category_archives';
  info: {
    description: 'Category archive layout with lead story, feed, most read sidebar, and ads';
    displayName: 'Category Articles';
    icon: 'layer';
  };
  attributes: {
    category: Schema.Attribute.Relation<'oneToOne', 'api::category.category'>;
    leadArticle: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    postsPerPage: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<5>;
    showMostRead: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    sidebarAds: Schema.Attribute.Relation<
      'manyToMany',
      'api::advertisement.advertisement'
    >;
  };
}

export interface SectionsCategoryGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_category_grids';
  info: {
    description: 'Multi-column category feed';
    displayName: 'Category News';
    icon: 'grid';
  };
  attributes: {
    category: Schema.Attribute.Relation<'oneToMany', 'api::category.category'>;
    columns: Schema.Attribute.Enumeration<
      ['1_col', '2_cols', '3_cols', '4_cols']
    > &
      Schema.Attribute.DefaultTo<'4_cols'>;
    heading: Schema.Attribute.String;
    postLimit: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<4>;
    showMoreLink: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface SectionsCiceResearch extends Struct.ComponentSchema {
  collectionName: 'components_sections_cice_researches';
  info: {
    description: 'Corporate research capabilities card with service tags';
    displayName: 'CICE Research';
    icon: 'briefcase';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u4E86\u89E3\u66F4\u591A \u2192'>;
    ctaUrl: Schema.Attribute.String;
    features: Schema.Attribute.Component<'elements.tag-item', true>;
    subtitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u6D1E\u89C1\u67EC\u57D4\u5BE8 \u00B7 \u7814\u7A76\u521B\u9020\u4EF7\u503C'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CICE Research'>;
  };
}

export interface SectionsHeroDualFocus extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_dual_focuses';
  info: {
    description: 'Dual focus showcase with primary article and top articles list';
    displayName: 'Hero Dual Focus';
    icon: 'layer-group';
  };
  attributes: {
    featuredArticle: Schema.Attribute.Relation<
      'oneToMany',
      'api::article.article'
    >;
    sidebarTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u67EC\u57D4\u5BE8\u8981\u95FB'>;
    topArticles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
  };
}

export interface SectionsHeroSplit extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_splits';
  info: {
    description: 'Editorial split showcase card with article relation';
    displayName: 'Hero Split';
    icon: 'layout';
  };
  attributes: {
    article: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>;
    badgeLabel: Schema.Attribute.String;
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'READ MORE \u2192'>;
  };
}

export interface SectionsOpinionColumn extends Struct.ComponentSchema {
  collectionName: 'components_sections_opinion_columns';
  info: {
    description: 'Opinion column section with featured opinion articles';
    displayName: 'Title Column';
    icon: 'quote';
  };
  attributes: {
    sectionTitle: Schema.Attribute.String;
  };
}

export interface SectionsPromoBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_promo_banners';
  info: {
    description: 'Branded campaign or promotional banner';
    displayName: 'Ads Banner';
    icon: 'picture';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    tagline: Schema.Attribute.String;
    targetUrl: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'elements.nav-link': ElementsNavLink;
      'elements.social-link': ElementsSocialLink;
      'elements.tag-item': ElementsTagItem;
      'sections.category-archive': SectionsCategoryArchive;
      'sections.category-grid': SectionsCategoryGrid;
      'sections.cice-research': SectionsCiceResearch;
      'sections.hero-dual-focus': SectionsHeroDualFocus;
      'sections.hero-split': SectionsHeroSplit;
      'sections.opinion-column': SectionsOpinionColumn;
      'sections.promo-banner': SectionsPromoBanner;
    }
  }
}
