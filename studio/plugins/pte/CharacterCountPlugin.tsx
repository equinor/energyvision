import { useEditor, useEditorSelector } from '@portabletext/editor';
import { getValue } from '@portabletext/editor/selectors';
import { Text } from '@sanity/ui';
import blocksToText from '../../helpers/blocksToText';

export const CharacterCountPlugin = ({ maxChar }: { maxChar: number }) => {
  const editor = useEditor();
  const value = useEditorSelector(editor, getValue);
  const count = blocksToText(value)?.length ?? 0;

  return (
    <Text size={1} style={{ color: 'orange' }}>
      Characters: {count}/{maxChar}
    </Text>
  );
};
