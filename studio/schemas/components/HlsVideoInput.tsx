import { Card, Stack } from '@sanity/ui';
import type { ObjectInputProps } from 'sanity';
import HLSPlayer from './HLSPlayer';

type HlsVideoValue = {
  id?: string;
  title?: string;
  url?: string;
};

export const HlsVideoInput = (props: ObjectInputProps<HlsVideoValue>) => {
  const url = props.value?.url;

  return (
    <Stack gap={3}>
      {props.renderDefault(props)}
      {url && (
        <Card border paddingX={6} tone="transparent">
          <HLSPlayer
            src={url}
            controls={true}
            width="100%"
            height="350px"
            style={{ marginBottom: '-5px', background: 'black' }}
          />
        </Card>
      )}
    </Stack>
  );
};
