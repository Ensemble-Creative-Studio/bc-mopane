export default {
    type: 'document',
    name: 'editionLimite',
  
    i18n: true,
    title: 'Edition',
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

      
        name: 'editionText',
        type: 'blockContent',
        title: 'Edition texte',
        rows: 5,
    
      },
    ],
  }
  