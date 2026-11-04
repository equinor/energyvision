import type { ImageWithAlt } from './imageWithAlt';

export type ImageWithAltAndCaption = {
  _type: 'imageWithAltAndCaption';
  image: ImageWithAlt;
  caption?: string;
  attribution?: string;
};

export default {
  name: 'imageWithAltAndCaption',
  title: 'Image',
  type: 'object',
  options: {
    collapsed: false,
  },
  fieldsets: [
    {
      name: 'captionAndCredit',
      title: 'Caption and credit',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
    },
    {
      name: 'caption',
      fieldset: 'captionAndCredit',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'attribution',
      fieldset: 'captionAndCredit',
      title: 'Credit',
      type: 'string',
    },
  ],
  preview: {
    select: {
      imageUrl: 'image.asset.url',
      alt: 'image.alt',
      caption: 'caption',
    },
    prepare({
      imageUrl,
      caption,
      alt,
    }: {
      imageUrl: string;
      alt: string;
      caption: string;
    }) {
      return {
        title: alt,
        subtitle: caption,
        media: <img src={imageUrl} alt={alt} style={{ height: '100%' }} />,
      };
    },
  },
};
