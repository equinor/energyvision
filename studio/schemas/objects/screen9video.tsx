import VideoSelector from '../components/VideoSelector'

export default {
  title: 'Video',
  name: 'screen9video',
  type: 'object',
  fields: [
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
  inputComponent: VideoSelector,
}
