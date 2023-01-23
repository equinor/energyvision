/* import React, { forwardRef } from 'react'
// eslint-disable-next-line import/no-unresolved
import { BlockEditor } from 'part:@sanity/form-builder'
import blocksToText from '../../helpers/blocksToText'

type CharCounterEditorProps = {
  value: []
} */
/* export const CharCounterEditor = forwardRef(function CharCounterEditor({
  value = [],
  ...rest
}: CharCounterEditorProps): JSX.Element {
  const plainText = blocksToText(value)
  return (
    <div>
      <BlockEditor value={value} {...rest} />
      <div style={{ color: 'var(--card-muted-fg-color)', fontSize: '0.8125rem' }}>Characters: {plainText.length}</div>
    </div>
  )
})
 */

import { PureComponent } from 'react'
// eslint-disable-next-line import/no-unresolved
import { BlockEditor, PortableTextInputProps } from 'sanity'
import blocksToText from '../../helpers/blocksToText'

export default class CustomEditor extends PureComponent {
  render() {
    // eslint-disable-next-line
    // @ts-ignore: How to do this with classes
    const { value = [] } = this.props
    const plainText = blocksToText(value)
    return (
      <div>
        <BlockEditor {...(this.props as PortableTextInputProps)} />
        <div>Characters: {plainText.length}</div>
      </div>
    )
  }
}
