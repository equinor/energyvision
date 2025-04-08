const DisplayLink: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>> = ({
  children,
  ...rest
}) => {
  return (
    <p className="text-mist-blue-100 text-xs mx-0 mt-2 mb-4 break-word hyphens-auto" {...rest}>
      {children}
    </p>
  )
}

export default DisplayLink
