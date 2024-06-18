import { ComponentType } from 'react'
import { BlockAnnotationProps } from 'sanity'

// redeclare the type of the props to include the value.marker or add the prop type via extension
declare module 'sanity' {
  interface PortableTextObject {
    marker?: string
  }
}

export const FootnoteRenderer: ComponentType<BlockAnnotationProps> = (props) => {
  const { value, renderDefault } = props
  const { marker } = value
  return (
    <span>
      {renderDefault(props)}
      {marker && <span style={{ verticalAlign: 'super', fontSize: '0.8rem' }}>{marker}</span>}
    </span>
  )
}
