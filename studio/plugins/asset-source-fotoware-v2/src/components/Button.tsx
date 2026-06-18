import { type ButtonHTMLAttributes, forwardRef } from 'react'

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, onClick }, ref) => {
  return (
    <button ref={ref} onClick={onClick} className='log-in my-2 px-4 py-2'>
      {children}
    </button>
  )
})
