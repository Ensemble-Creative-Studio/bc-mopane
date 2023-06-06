export default {
  type: "document",
  name: "overlay",

  i18n: true,
  title: "Overlay",
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
      name: "text",
      type: "string",
      title: "Texte 'profiter de l'expérience'",
    },
    {
      name: "button",
      type: "string",
      title: "Texte bouton 'activer l'audio'",
    },
  ],
};
