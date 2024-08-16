import { forwardRef, Ref, SVGProps } from 'react'
import { arrow_forward } from '@equinor/eds-icons'
import { TransformableIcon } from './TransformableIcon'

export type ArrowRightProps = {
  /** Size, use if you need large icon resolutions
   * @default 24
   */
  size?: 16 | 18 | 24 | 32 | 40 | 48
  /** @ignore */
  ref?: Ref<SVGSVGElement>
} & SVGProps<SVGSVGElement>

export const ArrowRight = forwardRef<SVGSVGElement, ArrowRightProps>(function ArrowRight({ ...rest }, ref) {
  return <TransformableIcon iconData={arrow_forward} {...rest} ref={ref} />
})
export default ArrowRight
