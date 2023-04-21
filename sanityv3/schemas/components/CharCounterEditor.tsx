import { PureComponent } from 'react'
// eslint-disable-next-line import/no-unresolved
import { BlockEditor, PortableTextInputProps } from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { Stack, Text } from '@sanity/ui'

export default class CustomEditor extends PureComponent {
  render() {
    // eslint-disable-next-line
    // @ts-ignore: How to do this with classes
    const { value = [] } = this.props
    const plainText = blocksToText(value)
    return (
      <>
        <BlockEditor {...(this.props as PortableTextInputProps)} />
        <div>Characters: {plainText.length}</div>
      </>
    )
  }
}

// @TODO: set correct props type, waiting to hear back from Sanity
export function CharCounterEditor(props: any) {
  const content = props.value ? blocksToText(props.value) : []
  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      <Text muted size={1}>
        Characters: {content?.length || 0}
      </Text>
    </Stack>
  )
}
