export default {
    type: 'document',
    name: 'hero',
  
    i18n: true,
    title: 'Hero',
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
      {
        name: 'herotext',
        type: 'string',
        title: 'Edition limitée Mopane',
      },
      {
        name: 'instruments',
        type: 'array',
        title: 'Instruments',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'instrument',
                type: 'string',
                title: 'Instrument',
              },
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
  }
  