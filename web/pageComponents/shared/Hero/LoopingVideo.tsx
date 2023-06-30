import { HLSPlayer } from '@components'
import { useSanityLoader } from '../../../lib/hooks/useSanityLoader'
import styled from 'styled-components'
import { LoopingVideoData, LoopingVideoRatio } from '../../../types'

const DEFAULT_MAX_WIDTH = 1920

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
  const thumbnailURL = useSanityLoader(thumbnail, DEFAULT_MAX_WIDTH, undefined)
  return (
    <StyledFigure ratio={ratio}>
      <HLSPlayer loop muted autoPlay title={title} poster={thumbnailURL.src} src={url} style={style} />
    </StyledFigure>
  )
}
