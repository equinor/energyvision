import { Text } from '@sanity/ui';

const excludeFromSearchDescription = (
  <Text size={1} style={{ color: 'var(--card-badge-caution-fg-color)' }}>
    This only hides the route and its content from the website global search and
    newsroom. It does not affect search engines like Google.
  </Text>
);

export default {
  type: 'boolean',
  name: 'excludeFromSearch',
  title: 'Hide from Algolia global search and newsroom',
  description: excludeFromSearchDescription,
  initialValue: false,
};
