export default {
  type: 'document',
  name: 'header-info',

  i18n: true,
    title: 'Header',
  initialValue: {
    __i18n_lang: 'fr',
  },
  i18n: {
    base: 'fr',
    languages: ['fr', 'en','de','es', 'Chinese','ja'],
    fieldNames: {
      lang: '__i18n_lang',
      references: '__i18n_refs',
      baseReference: '__i18n_base',
    },
  },
  fields: [
    {
      name: 'revendeur',
      type: 'string',
      title: 'Trouver un revendeur (desktop)'
    },
    {
      name: 'revendeurMobile',
      type: 'string',
      title: 'Trouver un revendeur (mobile)'
    },
    {
      name: 'urlRevendeur',
      type: 'url',
      title: 'URL revendeur'
    },
  ]
  }