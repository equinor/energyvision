import { Box, Button, Flex } from '@sanity/ui';
import { type StringInputProps, unset } from 'sanity';

export const SubscriptionTypeInput = (props: StringInputProps) => (
  <Flex align="center" gap={2}>
    <Box flex={1}>{props.renderDefault(props)}</Box>
    <Button
      text="Clear"
      mode="ghost"
      disabled={props.readOnly || props.value === undefined}
      onClick={() => props.onChange(unset())}
    />
  </Flex>
);
