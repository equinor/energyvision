import { play_circle } from '@equinor/eds-icons'
import { getFileAsset } from '@sanity/asset-utils'
import type { Reference, Rule } from '@sanity/types'
import { EdsIcon } from '../../icons/edsIcons'
import { dataset, projectId } from '../../src/lib/datasetHelpers'
import VideoSelector from '../components/VideoSelector'
import { description } from './iframe/sharedIframeFields'

export default {
  type: 'document',
  title: 'Video file',
  name: 'videoFile',
  icon: () => EdsIcon(play_circle),
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Video',
      description: 'A nice video description',
      name: 'screen9video',
      type: 'screen9video',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: 'video',
      title: 'Video',
      description: '⚠ Files heavier than 1MB impact performance considerably',
      type: 'file',
      options: {
        accept: 'video/mp4',
      },
      validation: (Rule: Rule) =>
        Rule.custom(async (value: string) => {
          const videoAsset = getFileAsset(value, {
            projectId: projectId,
            dataset: dataset,
          })
          if (videoAsset.extension === 'mp4') return true
          return 'Invalid file extension. Only .mp4 files are allowed'
        }),
    },
    {
      name: 'thumbnail',
      type: 'imageWithAlt',
      title: 'Thumbnail',
      initialValue: {
        isDecorative: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      image: 'thumbnail',
    },
    prepare({ title = '', image }: { title: string; image: Reference }) {
      return {
        title,
        media: image,
      }
    },
  },
}
