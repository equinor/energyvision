import { forwardRef, type ImgHTMLAttributes } from 'react'

export const Image = forwardRef<
  HTMLImageElement,
  ImgHTMLAttributes<HTMLImageElement>
>(({ src }, ref) => {
  return (
    <img
      alt=''
      ref={ref}
      style={{
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
      }}
      src={src}
    />
  )
})
