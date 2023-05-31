export default {
  type: "document",
  name: "showroom",

  i18n: true,
  title: "Showroom",
  initialValue: {
    __i18n_lang: "fr",
  },
  i18n: {
    base: "fr",
    languages: ["fr", "en", "de", "ja"],
    fieldNames: {
      lang: "__i18n_lang",
      references: "__i18n_refs",
      baseReference: "__i18n_base",
    },
  },
  fields: [
    {
      name: "titre",
      type: "string",
      title: "Titre",
    },
    {
      name: "image",
      type: "image",
      title: "Image",
    },
    {
      name: "buttonText",
      type: "string",
      title: 'Texte du bouton "Trouver un showroom"',
    },
    {
      name: "buttonUrl",
      type: "url",
      title: 'url du bouton "Trouver un showroom"',
    },
  ],
};
