import { Stack, Text } from '@sanity/ui';
import type { TextInputProps } from 'sanity';

export function CharacterCountInputText(props: TextInputProps) {
  const characters = props.value?.length ?? 0;
  const options = props.schemaType.options;
  const max =
    options && 'maxLength' in options && typeof options.maxLength === 'number'
      ? options.maxLength
      : undefined;

  return (
    <Stack gap={3}>
      {props.renderDefault(props)}
      <Text muted align="right" size={1}>
        Characters: {characters}
        {max ? ` / ${max}` : ''}
      </Text>
    </Stack>
  );
}
