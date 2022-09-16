import styled from 'styled-components'
import { Hits } from './Hits'

const MagazineContent = styled.div`
  padding: 0 var(--space-xxLarge);
`
const MagazineStoryContent = () => {
  return (
    <>
      <MagazineContent />
      <Hits />
    </>
  )
}

export default MagazineStoryContent
