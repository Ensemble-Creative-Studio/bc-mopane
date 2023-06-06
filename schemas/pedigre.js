export default {
    type: 'document',
    name: 'pedigre',
  
    i18n: true,
    title: 'Pédigré',
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
        name: 'titre',
        type: 'string',
        title: 'Titre',
      },
 
      {
        name: 'item',
        type: 'array',
        title: 'Item',
        of: [
          {
            type: 'object',
            fields: [
                {
                    name: 'image',
                    type: 'image',
                    title: 'Image',
                
                  },
              {
                name: 'text',
                type: 'string',
                title: 'Texte',
              },
        
            ],
          },
        ],
      },
    ],
  }
  