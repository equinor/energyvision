const DisplayLink: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>
> = ({ children, ...rest }) => {
  return (
    <div
      className='break-word mt-4 hyphens-auto text-mist-blue-100 text-xs'
      {...rest}
    >
      {children}
    </div>
  )
}

export default DisplayLink
