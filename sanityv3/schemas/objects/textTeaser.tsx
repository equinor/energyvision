/* eslint-disable react/display-name */
import blocksToText from '../../helpers/blocksToText'
import { LeftAlignedImage, RightAlignedImage } from '../../icons'
import { RadioIconSelector } from '../components'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../editors'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'

import type { PortableTextBlock, Rule } from 'sanity'
import type { DownloadableImage } from './downloadableImage'
import type { DownloadableFile } from './files'
import type { LinkSelector } from './linkSelector'
import singleItemArray from './singleItemArray'
import { ThemeSelectorColor, ThemeSelectorValue } from '../components/ThemeSelector'
import { defaultColors } from '../defaultColors'

const titleContentType = configureTitleBlockContent({
  highlight: true,
  highlightTitle: 'Highlight text selected from theme below',
  extendedStyles: [
    {
      title: 'Normal',
      value: 'normal',
    },
  ],
})

const titleAlignmentOptions = [
  { value: 'left', icon: LeftAlignedImage },
  { value: 'right', icon: RightAlignedImage },
]

const blockConfig = {
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: true,
}

const blockContentType = configureBlockContent({ ...blockConfig })

//Keep in sync with web/pageComponents/shared/textTeaser/theme
export const textTeaserThemeColors = [
  { title: 'White', value: 0 },
  { title: 'Moss Green Light', value: 1 },
  { title: 'Spruce Wood', value: 2 },
  { title: 'Mist Blue', value: 3 },
  { title: 'Mid Yellow', value: 4 },
  { title: 'Mid Orange', value: 5 },
  { title: 'Mid Blue 1', value: 6 },
  { title: 'Mid Blue 2', value: 7 },
  { title: 'Mid Blue 3', value: 8 },
  { title: 'Mid Green', value: 9 },
  { title: 'Mist Blue 2', value: 10 },
  { title: 'Black text', value: 11 },
  { title: 'White text', value: 12 },
]

export const fromLargerTextThemeColors = [
  { title: 'White', value: 0 },
  { title: 'Moss Green Light', value: 1 },
  { title: 'Mid Blue 1', value: 6 },
  { title: 'Mid Blue 2', value: 7 },
  { title: 'Mist Blue 2', value: 10 },
]
export const fromNormalTextThemeColors = [
  { title: 'Moss Green Light', value: 13 },
  { title: 'Spruce Wood', value: 2 },
  { title: 'Mist Blue', value: 3 },
  { title: 'Mid Yellow', value: 4 },
  { title: 'Mid Orange', value: 5 },
  { title: 'Mid Blue 2', value: 7 },
  { title: 'Mid Blue 3', value: 8 },
  { title: 'Mid Green', value: 9 },
  { title: 'Black text', value: 11 },
  { title: 'White text', value: 12 },
]

//Keep in sync with web/pageComponents/shared/textTeaser/theme
export const getColorForThemeTextTeaser = (color: ThemeSelectorValue): ThemeSelectorColor => {
  switch (color.value) {
    case 1:
      return {
        background: {
          value: defaultColors[1].value,
          key: defaultColors[1].key,
        },
        //highlight color
        foreground: {
          value: defaultColors[8].value,
          key: defaultColors[8].key,
        },
      }
    case 2:
      return {
        background: {
          value: defaultColors[2].value,
          key: defaultColors[2].key,
        },
        foreground: {
          value: defaultColors[9].value,
          key: defaultColors[9].key,
        },
      }
    case 3:
      return {
        background: {
          value: defaultColors[3].value,
          key: defaultColors[3].key,
        },
        foreground: {
          value: defaultColors[9].value,
          key: defaultColors[9].key,
        },
      }
    case 4:
      return {
        background: {
          value: defaultColors[4].value,
          key: defaultColors[4].key,
        },
        foreground: {
          value: defaultColors[9].value,
          key: defaultColors[9].key,
        },
      }
    case 5:
      return {
        background: {
          value: defaultColors[5].value,
          key: defaultColors[5].key,
        },
        foreground: {
          value: defaultColors[9].value,
          key: defaultColors[9].key,
        },
      }
    case 6:
      return {
        background: {
          value: defaultColors[6].value,
          key: defaultColors[6].key,
        },
        foreground: {
          value: defaultColors[5].value,
          key: defaultColors[5].key,
        },
      }
    case 7:
      return {
        background: {
          value: defaultColors[6].value,
          key: defaultColors[6].key,
        },
        foreground: {
          value: defaultColors[4].value,
          key: defaultColors[4].key,
        },
      }
    case 8:
      return {
        background: {
          value: defaultColors[6].value,
          key: defaultColors[6].key,
        },
        foreground: {
          value: defaultColors[0].value,
          key: defaultColors[0].key,
        },
      }
    case 9:
      return {
        background: {
          value: defaultColors[7].value,
          key: defaultColors[7].key,
        },
        foreground: {
          value: defaultColors[9].value,
          key: defaultColors[9].key,
        },
      }
    case 10:
      return {
        background: {
          value: defaultColors[3].value,
          key: defaultColors[3].key,
        },
        foreground: {
          value: defaultColors[6].value,
          key: defaultColors[6].key,
        },
      }
    case 11:
      return {
        background: {
          value: defaultColors[0].value,
          key: defaultColors[0].key,
        },
        foreground: {
          value: defaultColors[9].value,
          key: defaultColors[9].key,
        },
      }
    case 12:
      return {
        background: {
          value: defaultColors[9].value,
          key: defaultColors[9].key,
        },
        foreground: {
          value: defaultColors[0].value,
          key: defaultColors[0].key,
        },
      }
    case 13: {
      //black on moss green light
      return {
        background: {
          value: defaultColors[1].value,
          key: defaultColors[1].key,
        },
        foreground: {
          value: defaultColors[9].value,
          key: defaultColors[9].key,
        },
      }
    }

    case 0:
    default:
      return {
        background: {
          value: defaultColors[0].value,
          key: defaultColors[0].key,
        },
        foreground: {
          value: defaultColors[8].value,
          key: defaultColors[8].key,
        },
      }
  }
}

export type TextTeaser = {
  _type: 'textTeaser'
  title?: PortableTextBlock[]
  text?: PortableTextBlock[]
  action?: (LinkSelector | DownloadableFile | DownloadableImage)[]
  titlePosition?: string
  theme?: ThemeSelectorValue
}

export default {
  name: 'textTeaser',
  title: 'Text Teaser',
  type: 'object',
  localize: true,
  fieldsets: [
    {
      name: 'link',
      title: 'Link',
      description: 'Select either an internal link or external URL.',
    },
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [titleContentType],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'text',
      title: 'Text content',
      type: 'array',
      of: [blockContentType],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => {
          return validateCharCounterEditor(value, 600)
        }).error(),
    },

    singleItemArray({
      name: 'action',
      title: 'Link/action',
      description: 'Select the link or downloadable file for the teaser',
      type: 'array',
      of: [
        { type: 'linkSelector', title: 'Link' },
        { type: 'downloadableImage', title: 'Downloadable image' },
        { type: 'downloadableFile', title: 'Downloadable file' },
      ],
    }),
    {
      name: 'titlePosition',
      title: 'Title position',
      description: 'Select which side of the teaser the title should be displayed at on larger screens.',
      type: 'string',
      fieldset: 'design',
      components: {
        input: function ({ onChange, value }: { onChange: any; value: string }) {
          return (
            <RadioIconSelector
              name="imageAlignmentSelector"
              options={titleAlignmentOptions}
              defaultValue="left"
              currentValue={value}
              onChange={onChange}
            />
          )
        },
      },
    },
    {
      title: 'Theme (for title)',
      description:
        'When you have selected highlight in the title, choose colour combination for the title text/background. If no highlighted is selected colour will be black or white (on blue background) If no theme is selected the default is white background with black text.',
      name: 'theme',
      type: 'themeList',
      fieldset: 'design',
    },
  ],
  preview: {
    select: {
      title: 'title',
      text: 'text',
    },
    prepare({ title, text }: { title: PortableTextBlock[]; text: PortableTextBlock[] }) {
      const plainTitle = blocksToText(title)
      return {
        title: plainTitle || 'Missing teaser title',
        subtitle: blocksToText(text) || 'Mising teaser text',
      }
    },
  },
}
