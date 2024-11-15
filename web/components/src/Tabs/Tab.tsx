import { forwardRef } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';

export type TabProps = RadixTabs.TabsTriggerProps;

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { children, ...rest },
  ref
) {
  return (
    <RadixTabs.Trigger ref={ref} {...rest}>
      {children}
    </RadixTabs.Trigger>
  );
});