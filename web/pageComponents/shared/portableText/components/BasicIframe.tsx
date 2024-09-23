import IFrame from '../../iframe/IFrame'
import type { PortableTextBlock } from '@portabletext/types'
import type { IFrameData } from 'types/index'
import styled from 'styled-components'
import { twMerge } from 'tailwind-merge'
import { useId } from '@equinor/eds-utils'
import Blocks from '../Blocks'

type IframeRenderer = {
  _key: string
  _type: string
} & IFrameData

const Container = styled.div`
  clear: both;
`
type BlockProps = {
  isInline?: boolean
  value: IframeRenderer
  className?: string
} & PortableTextBlock

export const BasicIframe = (iframe: BlockProps) => {
  const { value, className = '' } = iframe
  const data = {
    ...value,
    type: value._type,
    id: value._key,
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const iframeTitle = useId(null, 'iframe')

  return (
    <Container className={twMerge(`my-14 mx-auto flex flex-col gap-2`, className)}>
      <IFrame
        frameTitle={data.frameTitle}
        url={data.url}
        cookiePolicy={data.cookiePolicy}
        aspectRatio={data.designOptions.aspectRatio}
        height={data.designOptions.height}
        hasSectionTitle={!!data.title}
        describedBy={iframeTitle}
      />
      {value.title && <Blocks value={value.title} id={iframeTitle} className="text-sm" />}
    </Container>
  )
}
