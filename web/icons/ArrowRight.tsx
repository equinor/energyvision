import { forwardRef, Ref, SVGProps } from 'react'
import { arrow_forward } from '@equinor/eds-icons'
import { twMerge } from 'tailwind-merge'

export type ArrowRightProps = {
  /** Size, use if you need large icon resolutions
   * @default 24
   */
  size?: 16 | 18 | 24 | 32 | 40 | 48
  /** @ignore */
  ref?: Ref<SVGSVGElement>
} & SVGProps<SVGSVGElement>

export const ArrowRight = forwardRef<SVGSVGElement, ArrowRightProps>(function ArrowRight(
  { size = 24, className = '', ...rest },
  ref,
) {
  let icon = arrow_forward
  if (size < 24) {
    // fallback to normal icon if small is not made yet
    icon = icon.sizes?.small || icon
  }
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="currentColor"
      aria-hidden
      className={twMerge(``, className)}
      {...rest}
    >
      {Array.isArray(icon.svgPathData) ? (
        icon.svgPathData.map((pathData) => {
          return <path key={pathData} fillRule="evenodd" clipRule="evenodd" d={pathData} />
        })
      ) : (
        <path fillRule="evenodd" clipRule="evenodd" d={icon.svgPathData} />
      )}
    </svg>
  )
})
export default ArrowRight
