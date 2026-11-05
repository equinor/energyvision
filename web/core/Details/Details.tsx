import {
  add_circle_filled,
  add_circle_outlined,
  remove,
  remove_outlined,
} from '@equinor/eds-icons';
import type { ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { TransformableIcon } from '@/icons/TransformableIcon';

export type DetailsProps = ComponentPropsWithRef<'details'>;

export type DetailsHeaderProps = ComponentPropsWithRef<'summary'> & {
  hasSectionTitle?: boolean;
  headerClassName?: string;
};

export type DetailsContentProps = ComponentPropsWithRef<'div'>;

function DetailsRoot({ className, ...props }: DetailsProps) {
  return (
    <details
      {...props}
      className={twMerge(
        'border-grey-40 border-b dark:border-white-100',
        className,
      )}
    />
  );
}

function Header({
  children,
  className,
  hasSectionTitle = false,
  headerClassName,
  ...props
}: DetailsHeaderProps) {
  const Heading = hasSectionTitle ? 'h3' : 'h2';

  return (
    <summary
      {...props}
      className={twMerge(
        'group/details-header focus-visible:envis-outline dark:focus-visible:envis-outline-invert flex w-full cursor-pointer list-none items-center justify-start border-none py-4 text-left decoration-1 underline-offset-4 outline-hidden hover:underline focus:no-underline focus:outline-hidden xl:pt-5 xl:pb-4 [&::-webkit-details-marker]:hidden',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid shrink-0 pr-4 [details[open]>summary>&]:hidden"
      >
        <TransformableIcon
          className="col-span-full row-span-full fill-slate-80 opacity-100 transition-opacity duration-200 ease-in-out group-hover/details-header:opacity-0 dark:fill-white-100"
          size={24}
          iconData={add_circle_outlined}
        />
        <TransformableIcon
          className="col-span-full row-span-full fill-slate-80 opacity-0 transition-opacity duration-200 ease-in-out group-hover/details-header:opacity-100 dark:fill-white-100"
          size={24}
          iconData={add_circle_filled}
        />
      </span>
      <span
        aria-hidden="true"
        className="hidden shrink-0 pr-4 [details[open]>summary>&]:grid"
      >
        <TransformableIcon
          className="col-span-full row-span-full fill-slate-80 opacity-100 transition-opacity duration-200 ease-in-out group-hover/details-header:opacity-0 dark:fill-white-100"
          size={24}
          iconData={remove_outlined}
        />
        <TransformableIcon
          className="col-span-full row-span-full fill-slate-80 opacity-0 transition-opacity duration-200 ease-in-out group-hover/details-header:opacity-100 dark:fill-white-100"
          size={24}
          iconData={remove}
        />
      </span>
      <Heading
        className={twMerge(
          'grow font-normal text-base max-xl:[details[open]>summary>&]:font-semibold',
          headerClassName,
        )}
      >
        {children}
      </Heading>
    </summary>
  );
}

function Content({ className, ...props }: DetailsContentProps) {
  return (
    <div
      {...props}
      className={twMerge(
        'mb-6 ml-2.5 flex flex-col gap-6 border-slate-80 border-l border-dashed pt-0 pr-4 pb-6 pl-7 dark:border-white-100',
        className,
      )}
    />
  );
}

export const Details = Object.assign(DetailsRoot, { Header, Content });
