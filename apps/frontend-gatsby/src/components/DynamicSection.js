import * as Components from './sections'

export const DynamicSection = (props) => {
  const { sections } = props
  {
    sections.map((section) => {
      const Component = Components[section.__typename]
      return Component ? <Component {...section} key={section.id} /> : null
    })
  }
}
