export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /**
   * HTML list element to render
   * @default "ul"
   */
  as?: 'ul' | 'ol'
  /**
   * List heading title
   */
  title?: string
  /**
   * Change which HTML h-tag to render
   * @default "h3"
   */
  headingTag?: React.ElementType<HTMLHeadingElement>
  /**
   * Override list styling
   */
  className?: string
  /**
   * Override heading styling
   */
  headingClassName?: string
}
