import { Box, Text } from '@sanity/ui';
import { MdInfoOutline } from 'react-icons/md';
import { Details } from './Details';

export const DecorativeImageInfo = () => (
  <Details
    summary="When should I set image as decorative?"
    tone="primary"
    icon={
      <MdInfoOutline
        aria-hidden="true"
        focusable="false"
        style={{ color: 'var(--card-fg-color)' }}
      />
    }
  >
    <Box paddingY={2}>
      <Text size={1}>
        Use this only if the image is purely decorative and adds no meaningful
        context to the page.
      </Text>
    </Box>
    <Box paddingBottom={2}>
      <Text size={1} weight="semibold">
        Downsides of missing alternative text
      </Text>
      <ul style={{ listStyle: 'disc', margin: 0, paddingLeft: '1.25rem' }}>
        <li>
          <Text size={1}>
            <strong>Accessibility:</strong> Screen readers will completely skip
            the image. If the image conveys critical information (like an
            infographic), visually impaired users will miss that content
            entirely. If there is text in image, please provide textual
            alternative and refer to it in the alternative text.
          </Text>
        </li>
        <li>
          <Text size={1}>
            <strong>Zero Image Search Traffic:</strong> Search engines rely on
            alt text to index images. If left blank, your photos cannot rank or
            appear in Google Images, rendering them invisible to users browsing
            visually.
          </Text>
        </li>
        <li>
          <Text size={1}>
            <strong>Loss of Page Context:</strong> Google cross-references alt
            text against your surrounding page content to establish topical
            authority. Missing descriptions mean less context for Googlebot to
            fully grasp the depth of your page.
          </Text>
        </li>
      </ul>
    </Box>
    <Box>
      <Text size={1} weight="semibold">
        When is it OK?
      </Text>
      <ul style={{ listStyle: 'disc', margin: 0, paddingLeft: '1.25rem' }}>
        <li>
          <Text size={1}>
            <strong>Decorative Elements:</strong> Background shapes, accent
            lines, or generic abstract patterns.
          </Text>
        </li>
        <li>
          <Text size={1}>
            <strong>Redundant Images:</strong> An icon of a house placed
            directly next to the text link "Home".
          </Text>
        </li>
      </ul>
    </Box>
  </Details>
);
