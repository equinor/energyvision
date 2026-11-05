import { Stack } from '@sanity/ui';
import type { PortableTextPluginsProps } from 'sanity';
import { CharacterCountPlugin } from './CharacterCountPlugin';

export function PortableTextEditorPlugins({
  maxChar,
  ...props
}: PortableTextPluginsProps & { maxChar: number }) {
  return (
    <Stack gap={3}>
      {props.renderDefault(props)}
      <CharacterCountPlugin maxChar={maxChar} />

      {/* Add more plugins here  */}
    </Stack>
  );
}
