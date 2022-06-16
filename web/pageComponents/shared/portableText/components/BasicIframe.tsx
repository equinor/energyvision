import IFrame from '../../iframe/IFrame'

import type { PortableTextBlock } from '@portabletext/types'
import type { IFrameData } from 'types/types'
import styled from 'styled-components'

type IframeRenderer = {
  _key: string
  _type: string
} & IFrameData

const StyledIFrame = styled(IFrame)`
  padding: 0px;
  background: red;
`
type BlockProps = {
  isInline: boolean
  value: IframeRenderer
} & PortableTextBlock

export const BasicIframe = (iframe: BlockProps) => {
  const { value } = iframe
  const data = {
    ...value,
    type: value._type,
    id: value._key,
  }

  return (
    <IFrame
      frameTitle={data.frameTitle}
      url={data.url}
      cookiePolicy={data.cookiePolicy}
      aspectRatio={data.designOptions.aspectRatio}
      height={data.designOptions.height}
      hasSectionTitle={!!data.title}
    />
  )
}
