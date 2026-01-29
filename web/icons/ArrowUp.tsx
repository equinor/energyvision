import { arrow_up } from '@equinor/eds-icons'
import { forwardRef, type Ref, type SVGProps } from 'react'
import { TransformableIcon } from './TransformableIcon'

export type ArrowUpProps = {
  /** Size, use if you need large icon resolutions
   * @default 24
   */
  size?: 16 | 18 | 24 | 32 | 40 | 48
  /** @ignore */
  ref?: Ref<SVGSVGElement>
} & SVGProps<SVGSVGElement>

export const ArrowUp = forwardRef<SVGSVGElement, ArrowUpProps>(
  function ArrowUp({ ...rest }, ref) {
    return <TransformableIcon iconData={arrow_up} {...rest} ref={ref} />
  },
)
export default ArrowUp