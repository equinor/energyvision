import { toPlainText } from '@portabletext/react';
import { Stack, Text } from '@sanity/ui';
import type { ArrayOfObjectsInputProps, PortableTextInputProps } from 'sanity';

// `components.input` on an array type expects ArrayOfObjectsInputProps.
// A Portable Text field receives PortableTextInputProps at runtime, so cast inside.
export function CharacterCountInputPTE(props: ArrayOfObjectsInputProps) {
  const ptProps = props as unknown as PortableTextInputProps;
  const characters = ptProps.value ? toPlainText(ptProps.value).length : 0;
  // the character limit set with `options.maxLength` on the type or the field
  const { maxLength: max, editorVariant } = props.schemaType.options ?? {};
  const fieldName = props.path[props.path.length - 1];
  const isCompact =
    editorVariant === 'compact' ||
    (editorVariant === undefined &&
      typeof fieldName === 'string' &&
      /title$/i.test(fieldName));
  const input = ptProps.renderDefault({
    ...ptProps,
    initialActive: true,
  });

  return (
    <Stack gap={3}>
      {isCompact ? <div id="PTE-height-container">{input}</div> : input}
      <Text muted align={'right'} size={1}>
        Characters: {characters}
        {max ? ` / ${max}` : ''}
      </Text>
    </Stack>
  );
}
