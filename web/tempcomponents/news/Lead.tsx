import { IngressBlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { PortableTextEntry } from '@sanity/block-content-to-react'

type LeadProps = {
  blocks: PortableTextEntry[]
}

const Lead = ({ blocks }: LeadProps) => {
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
