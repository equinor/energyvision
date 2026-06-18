import { text_field } from '@equinor/eds-icons'
import { useEffect } from 'react'
import {
  type ObjectInputProps,
  PatchEvent,
  type PortableTextBlock,
  type Rule,
  unset,
} from 'sanity'
import { capitalizeFirstLetter } from '../../../helpers/formatters'
import { EdsIcon } from '../../../icons'

export type TabsItem = {
  _type: 'tabsItem'
  title?: string
  content?: PortableTextBlock[]
}

const tabPanelTypes = [
  {
    title: 'Key numbers',
    value: 'tabsKeyNumbers',
  },
  {
    title: 'Information panel',
    value: 'tabsInfoPanel',
  },
]

const getPanelType = (tabPanel?: {
  panelType?: string
  keyNumbersPanel?: { _type?: string }
  infoPanel?: { _type?: string }
  panel?: Array<{ _type?: string }>
}) => {
  return (
    tabPanel?.panelType ??
    tabPanel?.keyNumbersPanel?._type ??
    tabPanel?.infoPanel?._type ??
    tabPanel?.panel?.[0]?._type
  )
}

type TabPanelValue = {
  panelType?: string
  keyNumbersPanel?: Record<string, unknown>
  infoPanel?: Record<string, unknown>
  panel?: Array<{ _type?: string }>
}

const TabsPanelInput = (props: ObjectInputProps<TabPanelValue>) => {
  const { onChange, renderDefault, value } = props

  useEffect(() => {
    if (!value?.panelType) {
      return
    }

    const fieldsToUnset = [] as string[]

    /*     if (
      value.panelType === 'tabsKeyNumbers' &&
      (value.infoPanel || value.videoPanel)
    ) {
      fieldsToUnset.push('infoPanel', 'videoPanel')
    } */

    /*     if (
      value.panelType === 'tabsInfoPanel' &&
      (value.keyNumbersPanel || value.videoPanel)
    ) {
      fieldsToUnset.push('keyNumbersPanel', 'videoPanel')
    } */
    /*     if (
      value.panelType === 'tabsEmbeddedVideosPanel' &&
      (value.keyNumbersPanel || value.infoPanel)
    ) {
      fieldsToUnset.push('keyNumbersPanel', 'infoPanel')
    } */

    if (value.panel?.length) {
      fieldsToUnset.push('panel')
    }

    if (fieldsToUnset.length === 0) {
      return
    }

    onChange(
      PatchEvent.from(fieldsToUnset.map(fieldName => unset([fieldName]))),
    )
  }, [onChange, value])

  return renderDefault(props)
}

export default {
  title: 'Tabs item',
  name: 'tabsItem',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().error(),
    },
    {
      type: 'object',
      name: 'tabPanel',
      components: {
        input: TabsPanelInput,
      },
      fields: [
        {
          name: 'panelType',
          title: 'Panel type',
          description: 'Select the panel type for this tab item.',
          type: 'string',
          options: {
            list: tabPanelTypes,
            layout: 'radio',
          },
          validation: (rule: Rule) =>
            rule.custom((value, context) => {
              const parent = context.parent as {
                panel?: Array<{ _type?: string }>
              }

              return value || parent?.panel?.[0]?._type
                ? true
                : 'Select a tab panel type'
            }),
        },
        {
          name: 'keyNumbersPanel',
          title: 'Key numbers panel',
          type: 'tabsKeyNumbers',
          hidden: ({ parent }: { parent?: { panelType?: string } }) =>
            parent?.panelType !== 'tabsKeyNumbers',
          validation: (rule: Rule) =>
            rule.custom((value, context) => {
              const parent = context.parent as { panelType?: string }

              return parent?.panelType === 'tabsKeyNumbers' && !value
                ? 'Add key numbers panel content'
                : true
            }),
        },
        {
          name: 'infoPanel',
          title: 'Information panel',
          type: 'tabsInfoPanel',
          hidden: ({ parent }: { parent?: { panelType?: string } }) =>
            parent?.panelType !== 'tabsInfoPanel',
          validation: (rule: Rule) =>
            rule.custom((value, context) => {
              const parent = context.parent as { panelType?: string }

              return parent?.panelType === 'tabsInfoPanel' && !value
                ? 'Add information panel content'
                : true
            }),
        },
        {
          type: 'array',
          name: 'panel',
          deprecated: true,
          description: 'Use the panel types above.',
          title: 'Legacy tab panel',
          of: [
            {
              name: 'tabsKeyNumbers',
              type: 'tabsKeyNumbers',
              title: 'Key numbers',
            },
            {
              name: 'tabsInfoPanel',
              type: 'tabsInfoPanel',
            },
          ],
          options: { sortable: false },
          hidden: ({
            parent,
          }: {
            parent?: { panelType?: string; panel?: Array<unknown> }
          }) => Boolean(parent?.panelType) || !parent?.panel?.length,
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      tabPanel: 'tabPanel',
    },
    prepare({ title = '', tabPanel }: { title: string; tabPanel?: any }) {
      const panelType = getPanelType(tabPanel) ?? ''
      const panelTitle =
        tabPanelTypes.find(type => type.value === panelType)?.title ??
        'Unknown panel type'

      return {
        title: title || 'Missing title',
        subtitle: `${capitalizeFirstLetter(panelTitle)}`,
        media: EdsIcon(text_field),
      }
    },
  },
}
