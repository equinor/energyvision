import styled from 'styled-components'
import { Hits } from './Hits'
import Filters from '../common/Filters'
import { MagazineTagFilter } from './MagazineTagFilter'

const MagazineContent = styled.div`
  padding: 0 var(--space-xxLarge);
`
const MagazineStoryContent = () => {
  return (
    <>
      <MagazineTagFilter attribute="magazineTags" defaultValue={'Performance'} />
      <MagazineContent />
      <Hits />
    </>
  )
}

export default MagazineStoryContent
