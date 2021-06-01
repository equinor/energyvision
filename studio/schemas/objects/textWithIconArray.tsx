import React from 'react'
import blocksToText from '../../helpers/blocksToText'
import { view_module } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

export default {
  type: 'object',
  name: 'textWithIconArray',
  title: 'Group of Text with Icon',
  fields: [
    {
      type: 'array',
      name: 'group',
      title: 'Group of text with icon',
      of: [{ type: 'textWithIcon' }],
    },
  ],
  preview: {
    select: {
      group: 'group',
    },
    prepare({ group }: any) {
      const title = group.reduce((sum: string, current: any, index: number): string => {
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

      return {
        title: title,
        subtitle: `${group.length} Text with Icon component(s)`,
        media: <div>{EdsIcon(view_module)}</div>,
      }
    },
  },
}
