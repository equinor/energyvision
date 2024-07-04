import { ArrowRight, Pause, Play } from '../../icons'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import envisTwMerge from '../../twMerge'

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
} & ButtonHTMLAttributes<HTMLButtonElement>

export const MediaButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ mode = 'play', variant = 'default', className = '', iconClassName = '', ...rest }, ref) => {
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
          return `size-[48px] `
        default:
          return `
          border
          border-north-sea-100
          text-north-sea-100
          focus:outline-none
          focus-visible:outline-slate-blue-95
          dark:border-white-100
          dark:border-white-100
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
          `m-auto 
          flex 
          justify-center
          rounded-full
          items-center
          border-none 
          cursor-pointer 
          focus-none
          focus-visible:envis-outline
          ${getButtonVariantClassNames()}`,
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
