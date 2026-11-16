import { HlsVideoInput } from '../components/HlsVideoInput';

export default {
  title: 'Video',
  name: 'hlsVideo',
  type: 'object',
  readOnly: true,
  fields: [
    {
      name: 'id',
      type: 'string',
      hidden: true,
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'url',
      type: 'string',
      title: 'Video',
    },
  ],
  components: {
    input: HlsVideoInput,
  },
};
