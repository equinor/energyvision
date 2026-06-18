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
        minHeight: '65vh',
        maxHeight: '75vh',
        border: 'none',
      }}
    />
  )
})
