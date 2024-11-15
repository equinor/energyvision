import { forwardRef } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';

export type TabPanelProps = RadixTabs.TabsContentProps;

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { children, ...rest },
  ref
) {
  return (
    <RadixTabs.Content ref={ref} {...rest}>
      {children}
    </RadixTabs.Content>
  );
});