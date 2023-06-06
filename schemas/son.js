export default {
  type: "document",
  name: "son",

  i18n: true,
  title: "Le son",
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
      name: "sonText",
      type: "blockContent",
      title: "Son texte",
    },
    {
        name: 'videoSon',
        type: 'array',
        title: 'Video url',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'url',
                type: 'url',
                title: 'Video URL',
              },
            ],
          },
        ],
      },
  ],
};
