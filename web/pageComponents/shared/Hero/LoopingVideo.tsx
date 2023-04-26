import { HLSPlayer } from '@components'
import styled from 'styled-components'
import { urlFor } from '../../../common/helpers'
import { LoopingVideoData, LoopingVideoRatio } from '../../../types'

const StyledFigure = styled.figure<{ ratio: LoopingVideoRatio }>`
  justify-content: center;
  display: flex;
  background-color: var(--grey-10);
  min-width: 100%;
  margin: 0;
  ${({ ratio }) =>
    ratio === 'narrow' && {
      'max-height': '500px',
    }};
`

export const LoopingVideo = ({ video }: { video: LoopingVideoData }) => {
  const { title, url, thumbnail, ratio } = video
  const style: React.CSSProperties = {
    width: '100%',
    objectFit: ratio === 'narrow' ? 'cover' : undefined,
  }
  return (
    <StyledFigure ratio={ratio}>
      <HLSPlayer loop muted autoPlay title={title} poster={urlFor(thumbnail).url()} src={url} style={style} />
    </StyledFigure>
  )
}
