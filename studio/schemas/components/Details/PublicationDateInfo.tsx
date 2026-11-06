import { Box } from '@sanity/ui';
import { Details } from './Details';

export const PublicationDateInfo = () => (
  <Details summary="About dates and time in article">
    <Box paddingY={2} flex="none">
      <p className="text-2xs">
        You can set a custom publication date below to replace the automatically
        generated publication date and time.
      </p>
      <ul
        style={{
          listStyle: 'disc',
          margin: 0,
          paddingLeft: '1.25rem',
          paddingTop: '0.5rem',
        }}
      >
        <li>
          <p className="text-2xs">
            The original publication date and time stays the same when you
            publish updates.
          </p>
        </li>
        <li>
          <p className="text-2xs">
            If you publish an update more than five minutes later, the article
            will also show “Last modified.”
          </p>
        </li>
        <li>
          <p className="text-2xs">
            “Last modified” is updated every time you publish a new update.
          </p>
        </li>
      </ul>
    </Box>
  </Details>
);
