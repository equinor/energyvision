const DisplayLink: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>> = ({
  children,
  ...rest
}) => {
  return (
    <div className="break-word mt-4 text-xs hyphens-auto text-mist-blue-100" {...rest}>
      {children}
    </div>
  )
}

export default DisplayLink
