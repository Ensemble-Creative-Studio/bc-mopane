export default {
    type: 'document',
    name: 'video360',
  
    i18n: true,
      title: 'Video 360',
    initialValue: {
      __i18n_lang: 'fr',
    },
    i18n: {
      base: 'fr',
      languages: ['fr', 'en','de','ja'],
      fieldNames: {
        lang: '__i18n_lang',
        references: '__i18n_refs',
        baseReference: '__i18n_base',
      },
    },
    fields: [
      {
        name: 'titre',
        type: 'string',
        title: 'Titre'
      },
      {
        name: 'bulletPoint',
        type: 'array',
        title: 'Bullet points',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'point',
                type: 'string',
                title: 'Point',
              },
     
            ],
          },
        ],
      },
    ]
    }