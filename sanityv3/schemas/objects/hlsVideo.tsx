import VideoSelector from '../components/VideoSelector'

export type HLSVideo = {
  id: string
  title: string
  url: string
}

export default {
  title: 'Video',
  name: 'hlsVideo',
  type: 'object',
  fields: [
    {
      name: 'id',
      type: 'string',
      // hidden: true,
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
    input: VideoSelector,
  },
}
