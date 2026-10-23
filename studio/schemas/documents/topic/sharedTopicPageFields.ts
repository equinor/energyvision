import { createElement } from 'react';
import type { ArrayOfObjectsInputProps } from 'sanity';
import { Flags } from '../../../src/lib/datasetHelpers';
import { RolesBasedArrayInput } from '../../components/RolesBasedArrayInput';
import { defaultColors } from '../../defaultColors';

export const seo = {
  title: 'Meta information',
  name: 'seo',
  type: 'titleAndMeta',
  fieldset: 'other',
};
export const openGraphImage = {
  title: 'Open Graph Image',
  name: 'openGraphImage',
  type: 'imageWithAlt',
  description:
    'You can override the hero image as the SoMe image by uploading another image here.',
  fieldset: 'other',
};

export const stickyMenu = {
  name: 'stickyMenu',
  title: 'Sticky Menu',
  type: 'stickyMenu',
  fieldset: 'other',
};

export const content = {
  name: 'content',
  type: 'array',
  title: 'Page sections',
  of: [
    { type: 'textBlock' },
    { type: 'teaser' },
    { type: 'cardsList' },
    { type: 'figure' },
    { type: 'fullWidthImage' },
    { type: 'pullQuote', initialValue: { background: defaultColors[0] } },
    { type: 'accordion' },
    { type: 'promoTileArray' },
    { type: 'iframe' },
    { type: 'fullWidthVideo' },
    { type: 'textWithIconArray' },
    { type: 'keyNumbers' },
    { type: 'textTeaser' },
    { type: 'statCallout' },
    { type: 'promotion' },
    { type: 'anchorLink' },
    { type: 'imageCarousel' },
    { type: 'iframeCarousel' },
    { type: 'videoPlayer' },
    { type: 'videoPlayerCarousel' },
    { type: 'embeddedVideoList' },
    { type: 'tableV2' },
    { type: 'imageForText' },
    Flags.HAS_CAMPAIGN_BLOCKS && { type: 'grid' },
    Flags.HAS_CAMPAIGN_BLOCKS && { type: 'campaignBanner' },
    Flags.HAS_FORMS && { type: 'form' },
    Flags.HAS_NEWS && { type: 'newsList' },
    { type: 'stockValuesApi' },
    { type: 'cookieDeclaration' },
    { type: 'anchorLinkList' },
    { type: 'tabs' },
    { type: 'importTable' },
    Flags.HAS_EVENT && { type: 'promoteEvents' },
    Flags.HAS_MAGAZINE && {
      type: 'promoteMagazine',
    },
    { type: 'promotePeople' },
    { type: 'promoteTopics' },
    { type: 'promoteTopicsV2' },
    { type: 'promoteExternalLinkV2' },
    Flags.HAS_NEWS && { type: 'promoteNews' },
    Flags.HAS_PEOPLE && { type: 'personList' },
    { type: 'pieChartBlock', title: 'Pie chart' },
    { type: 'lineChartBlock', title: 'Line chart' },
    { type: 'barChartBlock', title: 'Bar chart' },
    { type: 'promotionsV2' },
    Flags.IS_DEV && { type: 'anchorSearch' },
  ].filter((e) => e),
  components: {
    input: (props: ArrayOfObjectsInputProps) =>
      createElement(RolesBasedArrayInput, {
        ...props,
        schemaType: {
          ...props.schemaType,
          of: props.schemaType.of.filter(
            (member) =>
              member.name !== 'promoteTopics' &&
              member.name !== 'promoteTopicsV2' &&
              member.name !== 'promoteExternalLinkV2' &&
              member.name !== 'promotion',
          ),
        },
      }),
  },
  options: {
    insertMenu: {
      filter: true,
      groups: [
        {
          name: 'promotions',
          title: 'Promotional',
          of: [
            'promoteMagazine',
            'promotePeople',
            'promotionsV2',
            'promoteEvents',
            'promoteNews',
            'statCallout',
          ],
        },
        {
          name: 'carousels',
          title: 'Carousels',
          of: ['imageCarousel', 'videoPlayerCarousel', 'iframeCarousel'],
        },
        {
          name: 'charts',
          title: 'Charts',
          of: ['barChartBlock', 'pieChartBlock', 'lineChartBlock'],
        },
      ],
    },
  },
};
