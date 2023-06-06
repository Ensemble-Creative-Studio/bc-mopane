export default {
    type: 'document',
    name: 'bois',
  
    i18n: true,
    title: 'Le bois',
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
        name: 'boisTitre',
        type: 'string',
        title: 'Le bois titre',
      },
      {
        name: 'boisPhrase',
        type: 'string',
        title: 'Le bois sous-titre',
      },
      {
        name: 'bois',
        type: 'array',
        title: 'Bois',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'type',
                type: 'string',
                title: 'Type de bois',
              },
              {
                name: 'densite',
                type: 'string',
                title: 'Densité du bois',
              },
              {
                name: 'unite',
                type: 'string',
                title: 'Unité de densité',
              },
            ],
          },
        ],
      },
    ],
  }
  