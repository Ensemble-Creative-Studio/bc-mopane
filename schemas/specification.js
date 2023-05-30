export default {
  type: "document",
  name: "specification",

  i18n: true,
  title: "Spécifications techniques",
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
      name: "specificationsTosca",
      type: "array",
      title: "Spécifications Tosca",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "titre",
              type: "string",
              title: "Titre",
            },
            {
              name: "text",
              type: "blockContent",
              title: "Détails techniques",
              rows: 4,
            },
          ],
        },
      ],
    },
    {
      name: "specificationsLegende",
      type: "array",
      title: "Spécifications Légende",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "titre",
              type: "string",
              title: "Titre",
            },
            {
              name: "text",
              type: "blockContent",
              title: "Détails techniques",
              rows: 4,
            },
          ],
        },
      ],
    },
    {
      name: "specificationsR13",
      type: "array",
      title: "Spécifications R13",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "titre",
              type: "string",
              title: "Titre",
            },
            {
              name: "text",
              type: "blockContent",
              title: "Détails techniques",
              rows: 4,
            },
          ],
        },
      ],
    },
    {
      name: "suite",
      type: "string",
      title: "bouton Lire la suite",
    },
    {
      name: "moins",
      type: "string",
      title: "bouton Reduire",
    },
    {
        name: "button",
        type: "string",
        title: "Texte bouton 'En Savoir Plus'",
      },
    {
        name: "buttonUrl",
        type: "url",
        title: "url du bouton",
      },
  ],
};
