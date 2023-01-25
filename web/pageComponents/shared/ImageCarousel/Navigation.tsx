import { Button } from '@components'
import { Icon } from '@equinor/eds-core-react'
import { chevron_left, chevron_right } from '@equinor/eds-icons'
import styled from 'styled-components'
import { useSwiper } from 'swiper/react'

const SharedStyle = styled.div`
  height: calc(100% - var(--space-xxLarge));
  position: absolute;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 0 var(--space-small);
`

const Prev = styled(SharedStyle)`
  left: 0;
`

const Next = styled(SharedStyle)`
  right: 0;
`

const StyledButton = styled(Button)`
  background: var(--white-100);
  border: 1px solid var(--black-80);
  color: var(--black-80);

  &:hover {
    background: var(--black-80);
    color: var(--white-100);
  }
`

export const NavButton = ({ type }: { type: 'next' | 'prev' }) => {
  const swiper = useSwiper()

  const Wrapper = type === 'next' ? Next : Prev
  const ButtonIcon = type === 'next' ? chevron_right : chevron_left

  const handlePrev = () => {
    if (swiper.isBeginning) {
      swiper.slideTo(swiper.slides.length - 1)
    } else {
      swiper.slidePrev()
    }
  }

  const handleNext = () => {
    if (swiper.isEnd) {
      swiper.slideTo(0)
    } else {
      swiper.slideNext()
    }
  }

  const handler = type === 'next' ? handleNext : handlePrev
  const title = type === 'next' ? 'Next image' : 'Previous image'

  return (
    <Wrapper>
      <StyledButton variant="contained_icon" onClick={() => handler()} title={title}>
        <Icon size={16} data={ButtonIcon} />
      </StyledButton>
    </Wrapper>
  )
}
