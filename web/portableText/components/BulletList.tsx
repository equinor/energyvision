import * as React from 'react'

export const BulletList = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ul className="">
      {React.Children.map(children, (listItem) => {
        if (!React.isValidElement(listItem)) return listItem

        const hasHighlight = React.Children.toArray(listItem.props.children).some((child) => {
          if (React.isValidElement(child)) {
            return child.props?.markType === 'highlight'
          }
          return false
        })

        return (
          <li className={hasHighlight ? 'marker:text-red-600' : 'marker:text-inherit'}>{listItem.props.children}</li>
        )
      })}
    </ul>
  )
}
