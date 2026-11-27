import { toPlainText } from '@portabletext/react';
import { Stack, Text } from '@sanity/ui';
import { useMemo } from 'react';
import {
  type ArrayOfObjectsInputProps,
  type PortableTextInputProps,
  useCurrentUser,
} from 'sanity';
import { isAllowed } from '../../helpers/isAllowed';

// `components.input` on an array type expects ArrayOfObjectsInputProps.
// A Portable Text field receives PortableTextInputProps at runtime, so cast inside.
export function CharacterCountInputPTE(props: ArrayOfObjectsInputProps) {
  const currentUser = useCurrentUser();
  const ptProps = props as unknown as PortableTextInputProps;
  const characters = ptProps.value ? toPlainText(ptProps.value).length : 0;
  const hasAccess = isAllowed(currentUser?.roles);
  const schemaType = useMemo(() => {
    const blockTypes = ptProps.schemaType.of;
    const hasRedDotDecorator = blockTypes.some(
      (blockType) =>
        blockType.name === 'block' &&
        blockType.marks?.decorators?.some(
          (decorator) => decorator.value === 'redDot',
        ),
    );

    if (!hasRedDotDecorator || hasAccess) return ptProps.schemaType;

    return {
      ...ptProps.schemaType,
      of: blockTypes.map((blockType) =>
        blockType.name === 'block'
          ? {
              ...blockType,
              marks: {
                ...blockType.marks,
                decorators: blockType.marks?.decorators?.filter(
                  (decorator) => decorator.value !== 'redDot',
                ),
              },
            }
          : blockType,
      ),
    };
  }, [ptProps.schemaType, hasAccess]);
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
    schemaType,
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
