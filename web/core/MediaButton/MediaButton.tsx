import { ArrowRight, Pause, Play } from '../../icons'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import envisTwMerge from '../../twMerge'
import { CircularProgress } from '@core/Progress/CircularProgress'

type ModeVariants = 'play' | 'pause' | 'next' | 'previous'
type Variants = 'video' | 'default'
export type ButtonProps = {
  mode?: ModeVariants
  variant?: Variants
  /* Supply translated title for control button 
  eg. Pause
  */
  title?: string
  className?: string
  iconClassName?: string
  useTimer?: boolean
  paused?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const MediaButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { mode = 'play', variant = 'default', useTimer = false, paused, className = '', iconClassName = '', ...rest },
    ref,
  ) => {
    const getModeIcon = () => {
      switch (mode) {
        case 'pause':
          return <Pause />
        case 'next':
          return <ArrowRight />
        case 'previous':
          return <ArrowRight className="rotate-180" />

        case 'play':
        default:
          return <Play />
      }
    }

    const getButtonVariantClassNames = () => {
      switch (variant) {
        case 'video':
          return `border-none size-[48px] m-auto`
        default:
          return `
          size-[44px]
          ${useTimer ? `` : `border border-grey-50 dark:border-white-100`}
          text-slate-80
          focus:outline-none
          hover:bg-grey-50
          hover:text-white-100
          focus-visible:outline-slate-blue-95
          dark:hover:bg-white-transparent
          dark:focus-visible:outline-white-100`
      }
    }
    const getIconVariantClassNames = () => {
      switch (variant) {
        case 'video':
          return `size-10 
          bg-black-100/60 
          hover:bg-black-100
          text-white-100`
        default:
          return `size-10`
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        className={envisTwMerge(
          `relative
          flex 
          justify-center
          rounded-full
          items-center
          cursor-pointer 
          focus-none
          focus-visible:envis-outline
          ${getButtonVariantClassNames()}`,
          className,
        )}
        {...rest}
      >
        {useTimer && (
          <CircularProgress
            type="timer"
            duration={5}
            paused={paused ?? mode === 'pause'}
            variant="determinate"
            className="text-grey-50 absolute inset-0 size-[44px]"
          />
        )}
        <div
          className={envisTwMerge(
            `
          flex 
          justify-center
          items-center
          rounded-full 
          ${getIconVariantClassNames()}
          `,
            iconClassName,
          )}
        >
          {getModeIcon()}
        </div>
      </button>
    )
  },
)
