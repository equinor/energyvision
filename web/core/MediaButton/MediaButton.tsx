import { type ButtonHTMLAttributes, forwardRef, type Key } from 'react';
import { twMerge } from 'tailwind-merge';
import { CircularProgress } from '@/core/Progress/CircularProgress';
import { ArrowRight, Pause, Play } from '../../icons';

type ModeVariants = 'play' | 'pause' | 'next' | 'previous';
type Variants = 'video' | 'default';
export type ButtonProps = {
  mode?: ModeVariants;
  variant?: Variants;
  /* Supply translated title for control button 
  eg. Pause
  */
  title?: string;
  className?: string;
  iconClassName?: string;
  useTimer?: boolean;
  paused?: boolean;
  timerKey?: Key;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const MediaButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      mode = 'play',
      variant = 'default',
      useTimer = false,
      paused,
      timerKey,
      className = '',
      iconClassName = '',
      ...rest
    },
    ref,
  ) => {
    const getModeIcon = () => {
      switch (mode) {
        case 'pause':
          return <Pause />;
        case 'next':
          return <ArrowRight />;
        case 'previous':
          return <ArrowRight className="rotate-180" />;
        default:
          return <Play />;
      }
    };

    const getButtonVariantClassNames = () => {
      switch (variant) {
        case 'video':
          return `border-none size-[48px] m-auto`;
        default:
          return `
          size-[44px]
          ${useTimer ? `` : `border border-grey-60 dark:border-white-100`}
          text-slate-80
          focus:outline-hidden
          hover:bg-autumn-storm-60
          hover:border-autumn-storm-60
          hover:text-white-100
          focus-visible:outline-slate-blue-95
          dark:hover:bg-white-100
          dark:hover:border-white-100
          disabled:border-grey-40
          dark:disabled:border-white-100/40
          disabled:pointer-events-none`;
      }
    };
    const getIconVariantClassNames = () => {
      switch (variant) {
        case 'video':
          return `size-10 
          bg-black-100/60 
          hover:bg-black-100
          text-white-100`;
        default:
          return `size-10 dark:text-white-100 group-hover/mediabutton:dark:text-slate-80 group-disabled/mediabutton:text-grey-40`;
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        className={twMerge(
          `group/mediabutton focus-none focus-visible:envis-outline dark:focus-visible:envis-outline-invert relative flex cursor-pointer items-center justify-center rounded-full ${getButtonVariantClassNames()}`,
          className,
        )}
        {...rest}
      >
        {useTimer && (
          <CircularProgress
            key={timerKey}
            type="timer"
            duration={5}
            paused={paused ?? mode === 'pause'}
            variant="determinate"
            className="absolute inset-0 size-[44px]"
            trackClassName="group-hover/mediabutton:stroke-autumn-storm-60 dark:group-hover/mediabutton:stroke-grey-30"
          />
        )}
        <div
          className={twMerge(
            `flex items-center justify-center rounded-full ${getIconVariantClassNames()} `,
            iconClassName,
          )}
        >
          {getModeIcon()}
        </div>
      </button>
    );
  },
);
