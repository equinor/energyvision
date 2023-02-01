/* eslint-disable @typescript-eslint/ban-ts-comment */
import { movie } from '@equinor/eds-icons'
import { Rule } from 'sanity'
import { EdsIcon } from '../../icons'
import CharCounterEditor from '../components/CharCounterEditor'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../editors'

export type AnchorLink = {
  _type: 'anchorLink'
}

const titleContentType = configureTitleBlockContent()
const ingressContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export default {
  title: 'Video',
  name: 'video',
  type: 'object',

  fieldsets: [
    {
      title: 'Design options',
      name: 'design',
      description: 'Some options for design',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'array',
      title: 'Title',
      description: 'The (optional) title/heading shown above the iframe.',
      components: {
        input: CompactBlockEditor,
      },
      of: [titleContentType],
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      components: {
        input: CharCounterEditor,
      },
      of: [ingressContentType],
    },
    {
      name: 'video',
      type: 'mux.video',
      title: 'Video',
      validation: (Rule: Rule) => Rule.required(),
      // @ts-ignore
      // Rule.custom((value: string, context: any) => validateComponentAnchor(value, context)),
    },
    /*     {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      options: {
        borderradius: {
          outer: '100%',
          inner: '100%',
        },
        tooltip: true,
        list: Colors,
      },
      fieldset: 'design',
      initialValue: Colors[0],
    }, */
  ],
  preview: {
    select: {
      videoURL: 'videoURL',
    },
    prepare({ videoURL }: { videoURL: string }) {
      return {
        title: 'Video',
        subtitle: videoURL,
        media: EdsIcon(movie),
      }
    },
  },
}
