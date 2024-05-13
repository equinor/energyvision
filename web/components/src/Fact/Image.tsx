import { FactImagePosition } from '@components'
import { HTMLAttributes } from 'react'

export const Image = ({
  children,
  imagePosition = 'left',
  ...rest
}: { imagePosition?: FactImagePosition } & HTMLAttributes<HTMLDivElement> & HTMLAttributes<HTMLImageElement>) => (
  <div
    className={`${
      imagePosition === 'right' ? 'lg:col-start-2 lg:row-start-1' : ''
    } relative w-full h-[400px] lg:h-auto`}
    {...rest}
  >
    {children}
  </div>
)
