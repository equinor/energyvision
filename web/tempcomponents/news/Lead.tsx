import { IngressBlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { PortableTextProps } from '@sanity/block-content-to-react'

const Lead = ({ blocks }: PortableTextProps) => {
  return (
    <SimpleBlockContent
      blocks={blocks}
      serializers={{
        types: {
          block: IngressBlockRenderer,
        },
      }}
    ></SimpleBlockContent>
  )
}

export default Lead
