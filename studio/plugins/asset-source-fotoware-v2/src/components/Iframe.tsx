import { forwardRef, type IframeHTMLAttributes } from 'react'

export const Iframe = forwardRef<
  HTMLIFrameElement,
  IframeHTMLAttributes<HTMLIFrameElement>
>(({ title, src }, ref) => {
  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        minHeight: '80vh',
        border: 'none',
      }}
    />
  )
})
