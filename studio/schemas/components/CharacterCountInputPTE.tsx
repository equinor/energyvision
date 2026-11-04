import { toPlainText } from '@portabletext/react';
import { Stack, Text } from '@sanity/ui';
import type { ArrayOfObjectsInputProps, PortableTextInputProps } from 'sanity';
import styled from 'styled-components';

// `components.input` on an array type expects ArrayOfObjectsInputProps.
// A Portable Text field receives PortableTextInputProps at runtime, so cast inside.
export function CharacterCountInputPTE(props: ArrayOfObjectsInputProps) {
  const ptProps = props as unknown as PortableTextInputProps;
  const characters = ptProps.value ? toPlainText(ptProps.value).length : 0;
  // the character limit set with `options.maxLength` on the type or the field
  const { maxLength: max } = (props.schemaType.options ?? {}) as {
    maxLength?: number;
  };
  return (
    <Stack gap={3}>
      <Container id={'PTE-height-container'}>
        {ptProps.renderDefault({
          ...ptProps,
          // remove the need to activate the PTE
          initialActive: true,
        })}
      </Container>
      <Text muted align={'right'} size={1}>
        Characters: {characters}
        {max ? ` / ${max}` : ''}
      </Text>
    </Stack>
  );
}
// add a specific height to the PTE without losing the ability to resize it
// `data-testid` is not a public API and can change between Studio releases
const Container = styled.div`
  [data-testid='pt-editor'][data-fullscreen='false'] {
    height: 100px;
  }
`;
