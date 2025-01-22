/* eslint-disable @typescript-eslint/ban-ts-comment */
import { twMerge } from 'tailwind-merge';
import { getUrlFromAction } from '../../common/helpers';
import { BaseLink } from '@core/Link';
import { getLocaleFromName } from '../../lib/localization';
import { ArrowRight } from '../../icons';
import { LinkData } from '../../types/index';
import { forwardRef } from 'react';

type GridLinkArrowProps = {
  action?: LinkData;
  className?: string;
  bgColor?: string;
  variant?: "square" | "circle" ;
};

const GridLinkArrow = forwardRef<HTMLDivElement, GridLinkArrowProps>(function GridLinkArrow(
  { action, className = '', bgColor, variant = 'square' },
  ref,
) {
  const url = action && getUrlFromAction(action);

  const bgClassName = () => {
    switch (bgColor) {
      case 'bg-yellow-50':
      case 'bg-green-50':
      case 'bg-orange-50':
      case 'bg-mist-blue-100':
      case 'bg-moss-green-50':
      case 'bg-spruce-wood-90':
        return `text-slate-80 hover:bg-slate-80 hover:text-white-100 focus-visible:bg-slate-80 focus-visible:text-white-100`;
      case 'bg-white-100':
        return `text-slate-80 hover:bg-grey-50 hover:text-white-100 focus-visible:bg-grey-50 focus-visible:text-white-100`;
      case 'bg-blue-50':
      case 'bg-slate-80':
      default:
        return `text-white-100 hover:bg-white-100 hover:text-slate-80 focus-visible:bg-white-100 focus-visible:text-slate-80`;
    }
  };

  const variantClassName = () => {
    switch (variant) {
      case 'circle':
        return `m-1 p-2 hover:rounded-full`;
      default:
        return ``;
    }
  }

  return (
    <>
      {action && url && (
        <div
          ref={ref}
          className={twMerge(
            `absolute bottom-0 right-0 focus-visible:-translate-y-[5px] focus-visible:-translate-x-[5px] pt-4 3xl:pt-12 w-full flex justify-end`,
            className,
          )}
        >
          <BaseLink
            href={url as string}
            {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
            type={action.type}
            className={twMerge(
              `group
              py-2
              px-4
              focus:outline-none
              ${bgClassName()}
              ${variantClassName()}
              focus-visible:envis-outline
              dark:focus-visible:envis-outline`,
            )}
          >
            <span className="sr-only">{`${action.label} ${
              action.extension ? `(${action.extension.toUpperCase()})` : ''
            }`}</span>
            <ArrowRight className={variant === 'circle' ? 'size-7' :`size-10`} />
          </BaseLink>
        </div>
      )}
    </>
  );
});

export default GridLinkArrow;