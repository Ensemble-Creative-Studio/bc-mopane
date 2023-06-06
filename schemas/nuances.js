export default {
  type: 'document',
  name: 'nuances',

  i18n: true,
  title: 'Nuances',
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
      name: 'texte',
      type: 'text',
      title: 'Texte',
    },
    {
      name: 'slider',
      type: 'array',
      title: 'Slider',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'mediaType',
              type: 'string',
              title: 'Media Type',
              options: {
                list: ['image', 'video'],
              },
              initialValue: 'image',
            },
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              hidden: ({ parent }) => parent.mediaType !== 'image',
            },
            {
              name: 'video',
              type: 'url',
              title: 'Video URL',
              description: 'URL of the video',
              hidden: ({ parent }) => parent.mediaType !== 'video',
            },
          ],
        //   preview: {
        //     select: {
        //       media: 'image',
        //       videoUrl: 'video',
        //     },
        //     prepare(selection) {
        //       const { media, videoUrl } = selection;
        //       return {
        //         title: media ? 'Image' : 'Video',
        //         media: media || `<iframe src="${videoUrl}" width="100%" height="auto" frameborder="0" allowfullscreen></iframe>`,
        //       };
        //     },
        //   },
        },
      ],
    },
  ],
};
