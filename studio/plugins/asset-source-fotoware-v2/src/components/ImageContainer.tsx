import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

export type ImageContainerProps = {
  children?: ReactNode
} & HTMLAttributes<HTMLDivElement>

export const ImageContainer = forwardRef<HTMLDivElement, ImageContainerProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: '800px',
          height: 'auto',
          position: 'relative',
        }}
      >
        {children}
      </div>
    )
  },
)
