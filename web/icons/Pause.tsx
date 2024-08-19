import { forwardRef, Ref, SVGProps } from 'react'

export type PauseProps = {
  /** Size, use if you need large icon resolutions
   * @default 1em
   */
  size?: string | number
  /** @ignore */
  ref?: Ref<SVGSVGElement>
} & SVGProps<SVGSVGElement>

export const Pause = forwardRef<SVGSVGElement, PauseProps>(function Pause(
  { size = '1em', className = '', ...rest },
  ref,
) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 512 512`}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0}
      aria-hidden
      className={className}
      {...rest}
    >
      <path d="M120.16 45A20.162 20.162 0 0 0 100 65.16v381.68A20.162 20.162 0 0 0 120.16 467h65.68A20.162 20.162 0 0 0 206 446.84V65.16A20.162 20.162 0 0 0 185.84 45h-65.68zm206 0A20.162 20.162 0 0 0 306 65.16v381.68A20.162 20.162 0 0 0 326.16 467h65.68A20.162 20.162 0 0 0 412 446.84V65.16A20.162 20.162 0 0 0 391.84 45h-65.68z"></path>
    </svg>
  )
})
export default Pause
