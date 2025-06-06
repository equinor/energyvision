/* eslint-disable react/display-name */
import { Flex, Stack, Text } from '@sanity/ui'
import blocksToText from '../../../helpers/blocksToText'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import {
  CardTheme,
  ThemePreview,
  ThemeSelector,
  ThemeSelectorColor,
  ThemeSelectorValue,
} from '../../components/ThemeSelector'
import { defaultColors } from '../../defaultColors'
import { configureTitleBlockContent } from '../../editors'
import { defineField, PreviewProps, type PortableTextBlock, type Rule } from 'sanity'
import styled from 'styled-components'
import { ImageWithAlt } from '../imageWithAlt'

const MediaContainer = styled.div`
  position: relative;
  width: 2.0625rem;
  height: 2.0625rem;
  min-width: 2.0625rem;
  border-radius: 0.0625rem;
  display: flex;
  overflow: hidden;
  overflow: clip;
  align-items: center;
  justify-content: center;
`
const StyledImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`

const titleContentType = configureTitleBlockContent()

export const homepageBannerThemeColors = [
  { title: 'Green', value: 0 },
  { title: 'White', value: 1 },
  { title: 'Blue', value: 2 },
]

//Keep in sync with web/sections/HomePageBanner/homepageBannerthemes
export const getColorForHomePageBannerTheme = (color: ThemeSelectorValue): ThemeSelectorColor => {
  switch (color.value) {
    //White
    case 1:
      return {
        background: {
          value: defaultColors[0].value,
          key: defaultColors[0].key,
        },
        foreground: {
          value: defaultColors[12].value,
          key: defaultColors[12].key,
        },
      }
    //Blue
    case 2:
      return {
        background: {
          value: defaultColors[3].value,
          key: defaultColors[3].key,
        },
        foreground: {
          value: defaultColors[0].value,
          key: defaultColors[0].key,
        },
      }
    //Green
    case 0:
    default:
      return {
        background: {
          value: defaultColors[12].value,
          key: defaultColors[12].key,
        },
        foreground: {
          value: defaultColors[0].value,
          key: defaultColors[0].key,
        },
      }
  }
}

type HomepageBannerPreviewProps = {
  backgroundType?: string
  colorTheme?: any
  imageUrl?: string
} & PreviewProps

export function HomepageBannerPreview(props: HomepageBannerPreviewProps) {
  const { title, backgroundType, colorTheme, imageUrl } = props
  //@ts-ignore:todo
  const plainTitle = title ? blocksToText(title) : undefined
  const subTitle = `Homepage banner`

  const color: ThemeSelectorValue = {
    title: colorTheme?.background?.[0]?.title as string,
    value: colorTheme?.background?.[0]?.value,
  }
  return (
    <Flex gap={2} padding={2} align={'center'}>
      {backgroundType !== '0' ? (
        <CardTheme getColorForThemeHandler={getColorForHomePageBannerTheme} color={color} preview thumbnail />
      ) : (
        <MediaContainer>
          <StyledImage src={imageUrl} alt="" />
        </MediaContainer>
      )}
      <Stack space={2}>
        <Text size={1}>{plainTitle}</Text>
        <Text muted size={1}>
          {subTitle}
        </Text>
      </Stack>
    </Flex>
  )
}

export type HomepageBanner = {
  _type: 'homepageBanner'
  title?: PortableTextBlock[]
  image: ImageWithAlt
  ctaCards: any[]
  background?: ThemeSelectorValue
}

export default {
  name: 'homepageBanner',
  title: 'Homepage banner',
  type: 'object',
  localize: true,
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Tagline',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [titleContentType],
    },
    defineField({
      title: 'Choose background type',
      name: 'backgroundType',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: '0' },
          { title: 'Color', value: '1' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: '0',
    }),
    {
      name: 'image',
      title: 'Background image',
      type: 'imageWithAlt',
      fieldset: 'design',
      hidden: ({ parent }) => parent?.backgroundType !== '0',
    },
    {
      name: 'attribution',
      title: 'Credit',
      type: 'string',
      fieldset: 'design',
      hidden: ({ parent }) => parent?.backgroundType !== '0',
    },
    defineField({
      name: 'colorTheme',
      title: 'Theme',
      type: 'object',
      hidden: ({ parent }) => parent?.backgroundType !== '1',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
        }),
        defineField({
          name: 'value',
          type: 'number',
        }),
      ],
      components: {
        input: (props) => {
          return (
            <ThemeSelector
              variant="cards"
              themeColors={homepageBannerThemeColors}
              getColorForThemeHandler={getColorForHomePageBannerTheme}
              {...props}
            />
          )
        },
        preview: ThemePreview,
      },
      preview: {
        select: {
          title: 'title',
          value: 'value',
        },
      },
    }),
    {
      title: 'CTA cards',
      name: 'ctaCards',
      type: 'array',
      of: [
        {
          title: 'CTA card',
          name: 'ctaCard',
          type: 'object',
          fields: [
            {
              name: 'overline',
              title: 'Eyebrow',
              type: 'string',
            },
            {
              name: 'link',
              type: 'array',
              title: 'Link or download',
              of: [
                { type: 'linkSelector', title: 'Link' },
                { type: 'downloadableImage', title: 'Call to action: Download image' },
                { type: 'downloadableFile', title: 'Call to action: Download file' },
              ],
              validation: (Rule: Rule) => Rule.max(1).error('Only one is permitted'),
            },
          ],
        },
      ],
    },
  ],
  components: {
    preview: HomepageBannerPreview,
  },
  preview: {
    select: {
      title: 'title',
      backgroundType: 'backgroundType',
      imageUrl: 'image.asset.url',
      colorTheme: 'colorTheme',
    },
  },
}
