import { Box, Text } from '@sanity/ui';
import { Details } from './Details';

export const PublicationDateInfo = () => (
  <Details summary="About dates and time in article">
    <Box paddingY={2} flex="none">
      <Text size={1}>
        The original publication date (firstPublishedAt) is set automatically
        when the article is first published and stays unchanged when you publish
        updates. The news page displays this date, or the document creation date
        if no original publication date is available.
      </Text>
    </Box>
    <Box paddingY={2} flex="none">
      <Text size={1}>
        Enable a custom publication date below to override the publication date
        displayed on the website. This does not change the original publication
        date.
      </Text>
    </Box>
    <Box paddingY={2} flex="none">
      <Text size={1}>
        The last modified date (lastModifiedAt) is updated each time you
        publish. The news page shows “Last modified” only when this date is more
        than five minutes after the displayed publication date. If no last
        modified date is available, the document update date is used instead.
      </Text>
    </Box>
  </Details>
);
