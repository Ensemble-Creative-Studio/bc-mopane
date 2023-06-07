export default {
  type: "document",
  name: "pageFooter",

  i18n: true,
  title: "Page légales",
  initialValue: {
    __i18n_lang: "fr",
  },
  i18n: {
    base: "fr",
    languages: ['fr', 'en','de','es', 'Chinese','ja'],
    fieldNames: {
      lang: "__i18n_lang",
      references: "__i18n_refs",
      baseReference: "__i18n_base",
    },
  },
  fields: [
    {
      name: 'titre',
      type: 'string',
      title: 'Titre',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'titre',
        maxLength: 96,
      },
    },
    {
      name: "editionText",
      type: "blockContent",
      title: "Texte",
      description:'Only use H3, p and Bold to style the text',
      rows: 5,
    },
  ],
};
