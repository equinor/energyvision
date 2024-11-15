import { forwardRef } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';

export type TabPanelsProps = { children: React.ReactNode };

export const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(function TabPanels(
  { children, ...rest },
  ref
) {
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
});