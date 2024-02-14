export const Highlight = ({ children }: { children?: React.ReactNode }) => {
  return <span style={{ color: 'var(--title-highlight-color)' }}>{children}</span>
}
