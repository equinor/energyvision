import React from 'react'
import * as Components from './sections'

export const DynamicSection = (props) => {
  const { sections } = props

  return sections.map((section) => {
    const Component = Components[section.__typename]
    return Component ? (
      <Component {...section} key={section.__typename + section.id} />
    ) : null
  })
}
