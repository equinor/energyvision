import { AnchorHTMLAttributes, forwardRef } from 'react'
import styled from 'styled-components'
import { Link } from '@components'
import UncontrolledSearchBox from '../searchIndexPages/magazineIndex/UncontrolledSearchBoxV2'
import Box from './Box'

export type MagazineTagBarProps = {
  tags: TagLink[]
  isIndexPage?: boolean
  onClick?: any
} & AnchorHTMLAttributes<HTMLAnchorElement>

export type TagLink = {
  label: string
  link: string
}
const StyledLink = styled(Link)`
  display: inline-block;
  position: relative;
  padding-left: 4px;
  &:hover {
    font-weight: bold !important;
  }

  &:before {
    display: block;
    content: attr(data-title);
    font-weight: bold;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
  &:after {
    content: '';
    position: absolute;
    border-left: 2px solid var(--energy-red-100);
    right: calc(var(--space-xLarge) * -0.5);
    height: 100%;
  }
  @media (max-width: 750px) {
    &:nth-child(3n):after {
      display: none;
    }
  }
  &:last-child:after {
    display: none;
  }
`
const Wrapper = styled.div`
  display: grid;
  grid-gap: 0px;
  grid-template-columns: auto auto;
  border: 1px solid var(--slate-blue-70);
  @media (max-width: 750px) {
    grid-template-columns: auto;
  }
`

const SearchBoxWrapper = styled.div`
  display: none;
  @media (min-width: 1000px) {
    display: block;
  }
`
const TagWrapper = styled.div`
  margin: var(--space-medium) var(--space-xLarge) var(--space-medium) auto;
  display: grid;
  padding-left: var(--space-3xLarge);
  grid-gap: var(--space-xLarge);
  @media (max-width: 750px) {
    grid-template-columns: repeat(3, max-content);
    padding-left: 0px;
    margin: var(--space-medium) auto var(--space-medium) auto;
  }
  grid-template-columns: repeat(6, max-content);
`

const MagazineTagBar = forwardRef<HTMLDivElement, MagazineTagBarProps>(function MagazineTagBar(
  { tags, onClick, isIndexPage },
  ref,
) {
  return (
    <Wrapper ref={ref}>
      <TagWrapper>
        <StyledLink underline={false} href="#" key="ALL" data-title="ALL">
          ALL
        </StyledLink>
        {tags.map((it: TagLink) => (
          <StyledLink underline={false} href={it.link} key={it.label} data-title={it.label} onClick={onClick}>
            {it.label}
          </StyledLink>
        ))}
      </TagWrapper>
      <SearchBoxWrapper>{isIndexPage ? <UncontrolledSearchBox /> : <Box />}</SearchBoxWrapper>
    </Wrapper>
  )
})

export default MagazineTagBar
