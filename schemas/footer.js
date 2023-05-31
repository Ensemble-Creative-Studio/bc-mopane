export default {
    type: 'document',
    name: 'footer',
    i18n: true,
    title: 'Footer',
    initialValue: {
      __i18n_lang: 'fr',
    },
    i18n: {
      base: 'fr',
      languages: ['fr', 'en', 'de', 'ja'],
      fieldNames: {
        lang: '__i18n_lang',
        references: '__i18n_refs',
        baseReference: '__i18n_base',
      },
    },
    fields: [
      // Other fields in the footer document schema...
      {
        type: 'array',
        name: 'pageFooters',
        title: 'Page Footer',
        of: [{ type: 'reference', to: [{ type: 'pageFooter' }] }],
      },
          {
      name: 'texte',
      type: 'text',
      title: 'Texte',
    },
    ],
  };
  