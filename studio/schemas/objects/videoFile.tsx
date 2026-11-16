import { play_circle } from '@equinor/eds-icons';
import type { Reference, Rule } from 'sanity';
import { EdsIcon } from '../../icons/edsIcons';
import type { ImageWithAlt } from './imageWithAlt';

export default {
  type: 'document',
  title: 'Video file',
  name: 'videoFile',
  icon: () => EdsIcon(play_circle),
  deprecated: {
    reason:
      'Media Bank videos are no longer supported. Upload the video as an Asset file (mp4) instead.',
  },
  fields: [
    {
      name: 'video',
      title: 'Video',
      description:
        'Legacy Media Bank video (read only). Replace this document with an Asset file.',
      type: 'hlsVideo',
    },
    {
      name: 'transcript',
      title: 'Video Transcript',
      type: 'transcript',
    },
    {
      name: 'thumbnail',
      type: 'imageWithAlt',
      title: 'Thumbnail',
      description:
        'Use the alt text below to describe the video content (for screenreaders).',
      initialValue: {
        isDecorative: true,
      },
      validation: (Rule: Rule) =>
        Rule.custom((value: ImageWithAlt) =>
          !value.asset ? 'Image is required' : true,
        ),
    },
  ],
  preview: {
    select: {
      title: 'video.title',
      image: 'thumbnail',
    },
    prepare({ title = '', image }: { title: string; image: Reference }) {
      return {
        title,
        media: image,
      };
    },
  },
};
