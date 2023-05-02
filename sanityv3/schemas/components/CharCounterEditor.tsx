import blocksToText from '../../helpers/blocksToText'
import { Stack, Text } from '@sanity/ui'
import { ArrayOfObjectsInputProps, PortableTextBlock } from 'sanity'

export function CharCounterEditor(props: ArrayOfObjectsInputProps) {
  const content = props.value ? blocksToText(props.value as PortableTextBlock[]) : []
  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      <Text muted size={1}>
        Characters: {content?.length || 0}
      </Text>
    </Stack>
  )
}
