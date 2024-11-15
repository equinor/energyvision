import { forwardRef } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';

export type TabListProps = RadixTabs.TabsListProps;

export const TabList = forwardRef<HTMLDivElement, TabListProps>(function TabList(
  { children, ...rest },
  ref
) {
  return (
    <RadixTabs.List ref={ref} {...rest}>
      {children}
    </RadixTabs.List>
  );
});