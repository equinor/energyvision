import envisTwMerge from '../../../twMerge'

export const InnerContainer = ({ children, className = '', ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={envisTwMerge(
      `w-full 
    h-[var(--topbar-height)]
    max-w-[calc(1920px-theme(padding.layout-sm)*2))]
    m-auto 
    py-3
    `,
      className,
    )}
    {...rest}
  >
    {children}
  </div>
)
