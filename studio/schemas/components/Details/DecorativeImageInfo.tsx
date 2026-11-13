import { Box } from '@sanity/ui';
import { MdInfoOutline } from 'react-icons/md';
import { Details } from './Details';

export const DecorativeImageInfo = () => (
  <Details
    summary="When should I set an image as decorative?"
    tone="primary"
    icon={
      <MdInfoOutline
        aria-hidden="true"
        focusable="false"
        style={{ color: 'var(--card-fg-color)' }}
      />
    }
  >
    <p className="text-2xs">
      In general alt texts should be added for images unless you use generic
      images of e.g. oceans or skies that don’t add any additional information.
    </p>
    <Box paddingBottom={2}>
      <p className="font-semibold text-2xs">Alt texts are important for</p>
      <ul style={{ listStyle: 'disc', margin: 0, paddingLeft: '1.25rem' }}>
        <li>
          <p className="text-2xs">Accessibility (read by screen readers)</p>
        </li>
        <li>
          <p className="text-2xs">Google</p>
        </li>
        <li>
          <p className="text-2xs">Explaining content in infographics</p>
        </li>
      </ul>
    </Box>
  </Details>
);
