import { forwardRef, type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type BreadcrumbsListItemProps = HTMLAttributes<HTMLLIElement> & {
  active?: boolean;
};

export const BreadcrumbsListItem = forwardRef<
  HTMLLIElement,
  BreadcrumbsListItemProps
>(({ children, active, ...rest }, ref) => {
  return (
    <li
      ref={ref}
      {...rest}
      className={twMerge(
        'inline-flex items-baseline pr-3 text-grey-90 after:relative after:top-1 after:pl-3 after:text-md after:leading-none after:content-[">"] last:after:content-[""]',
      )}
    >
      <span
        className={`${active ? 'font-medium text-slate-blue-90' : 'font-bold'}`}
      >
        {children}
      </span>
    </li>
  );
});
