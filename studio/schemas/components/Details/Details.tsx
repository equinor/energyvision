import { ChevronRightIcon } from '@sanity/icons/ChevronRight';
import { Box, Card, type CardTone, Flex, Text } from '@sanity/ui';
import type { ReactNode } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import styled from 'styled-components';

type DetailsProps = {
  summary: ReactNode;
  children: ReactNode;
  open?: boolean;
  tone?: CardTone;
  icon?: ReactNode;
};

const Summary = styled.summary`
  cursor: pointer;
  list-style: none;
  border-radius: inherit;

  &::-webkit-details-marker {
    display: none;
  }

  &:focus-visible {
    outline: 2px solid var(--card-focus-ring-color);
    outline-offset: 2px;
  }

  details[open] > & [data-details-icon] {
    transform: rotate(90deg);
  }
`;

const Icon = styled.span`
  display: inline-flex;
  transition: transform 150ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Details = ({
  summary,
  children,
  open = false,
  tone = 'primary',
  icon,
}: DetailsProps) => (
  <Card as="details" open={open} padding={3} radius={2} tone={tone}>
    <Summary>
      <Flex align="center" gap={2}>
        <Icon aria-hidden="true" data-details-icon="">
          <Text size={1}>
            <ChevronRightIcon />
          </Text>
        </Icon>
        <Box flex={1}>
          <Text size={1} weight="semibold">
            {summary}
          </Text>
        </Box>
        <Box flex="none">
          <Text size={1}>
            {icon ?? (
              <MdInfoOutline
                aria-hidden="true"
                focusable="false"
                style={{ color: 'var(--card-badge-default-fg-color)' }}
              />
            )}
          </Text>
        </Box>
      </Flex>
    </Summary>
    <Box marginTop={3} paddingTop={2} paddingLeft={4}>
      <Flex direction="column" gap={3}>
        {children}
      </Flex>
    </Box>
  </Card>
);
