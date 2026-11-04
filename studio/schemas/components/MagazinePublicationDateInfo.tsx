import { Box, Text } from '@sanity/ui';
import { Details } from './Details';

export const MagazinePublicationDateInfo = () => (
  <Details summary="About dates and time in magazine articles">
    <Box paddingY={2} flex="none">
      <Text size={1}>
        The original publication date (firstPublishedAt) is set automatically
        when the article is first published and stays unchanged when you publish
        updates. The magazine page displays this date, or the document creation
        date if no original publication date is available.
      </Text>
    </Box>
    <Box paddingY={2} flex="none">
      <Text size={1}>
        Unlike news articles, magazine articles have no custom publication date
        control and the magazine page does not display a Last modified date.
      </Text>
    </Box>
  </Details>
);
