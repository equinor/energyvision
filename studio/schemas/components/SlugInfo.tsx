import { Box, Text } from '@sanity/ui';
import { IoWarningOutline } from 'react-icons/io5';
import { Details } from './Details';

export const SlugInfo = () => (
  <Details
    summary="About slug"
    tone="caution"
    icon={
      <IoWarningOutline
        aria-hidden="true"
        focusable="false"
        style={{ color: 'var(--card-fg-color)' }}
      />
    }
  >
    <Box paddingY={2} flex="none">
      <Text size={1}>
        Changing the slug after publishing can negatively affect SEO and break
        existing links. Double check for typos and get it right the first time.
      </Text>
    </Box>
  </Details>
);
