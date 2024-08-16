import { forwardRef, Ref, SVGProps } from 'react'
import { IconData } from '@equinor/eds-icons'

/**
 *  Use this to transform an icon for example arrow right can be rotated to
 *  45 deg/-90 deg to use it as external link icon or download icon.
 *  Similarly the + and close
 */
export type TransformableIconProps = {
  iconData: IconData
  /** Size, use if you need large icon resolutions
   * @default 24
   */
  size?: 16 | 18 | 24 | 32 | 40 | 48
  /** @ignore */
  ref?: Ref<SVGSVGElement>
} & SVGProps<SVGSVGElement>

export const TransformableIcon = forwardRef<SVGSVGElement, TransformableIconProps>(function ArrowRight(
  { iconData, size = 24, className = '', ...rest },
  ref,
) {
  let icon = iconData
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
      className={className}
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
export default TransformableIcon
