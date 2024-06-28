import { ArrowRight, Pause, Play } from '../../icons'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import envisTwMerge from '../../twMerge'

type ModeVariants = 'play' | 'pause' | 'next' | 'previous'
export type ButtonProps = {
  mode?: ModeVariants
  /* Supply translated title for control button 
  eg. Pause
  */
  title?: string
  className?: string
  iconClassName?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const MediaButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ mode = 'play', className = '', iconClassName = '', ...rest }, ref) => {
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
    return (
      <button
        ref={ref}
        type="button"
        className={envisTwMerge(
          `m-auto 
          size-[48px] 
          flex 
          justify-center 
          items-center
          border-none 
          cursor-pointer 
          focus-none
          focus-visible:envis-outline`,
          className,
        )}
        {...rest}
      >
        <div
          className={envisTwMerge(
            `
          relative
          flex 
          justify-center
          items-center
          rounded-full 
          size-10 
          bg-black-100/60 
          hover:bg-black-100
          text-white-100
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
