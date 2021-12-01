import React from 'react'
import blocksToText from '../../helpers/blocksToText'
import { view_module } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { Colors } from '../../helpers/ColorListValues'

export default {
  type: 'object',
  name: 'textWithIconArray',
  title: 'Group of Text with Icon',
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    {
      type: 'array',
      name: 'group',
      title: 'Group of text with icon',
      of: [{ type: 'textWithIcon' }],
    },
    {
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
    },
  ],
  preview: {
    select: {
      group: 'group',
    },
    prepare({ group }: any) {
      return {
        title: group ? generatePreviewTitle(group) : 'Missing content',
        subtitle: `${group ? group.length : 0} Text with Icon component(s)`,
        media: <div>{EdsIcon(view_module)}</div>,
      }
    },
  },
}

const generatePreviewTitle = (group: any) => {
  return group.reduce((sum: string, current: any, index: number): string => {
    const cutOff = 20

    let string = ''

    if (current.title) {
      string = current.title.substr(0, cutOff).trim()
    } else if (current.text) {
      const plainText = blocksToText(current.text)
      string = plainText.substr(0, cutOff).trim()
    } else {
      string = `Missing title and text`
    }

    return sum + `${index + 1}: ${string.length < cutOff ? string : string + '...'} `
  }, '')
}
