import blocksToText from '../../helpers/blocksToText'
import { Stack, Text } from '@sanity/ui'

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
