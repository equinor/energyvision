import { AnchorHTMLAttributes, forwardRef } from 'react'
import styled from 'styled-components'
import { Link } from '@components'
//import UncontrolledSearchBox from '../searchIndexPages/magazineIndex/UncontrolledSearchBoxV2'
//import Box from './Box'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'

export type MagazineTagBarProps = {
  tags: TagLink[]
  isIndexPage?: boolean
  href: string
  onClick?: (value: string) => void
}

export type TagLink = {
  label: string
  active: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement>

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

const ActiveLink = styled(StyledLink)`
  font-weight: bold !important;
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
    input {
      border-top: 0;
      border-right: 0;
      border-bottom: 0;
      &:focus {
        box-shadow: 1px 0 0 1px solid var(--slate-blue-70);
      }
    }
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

const allTagLink: TagLink = {
  href: '#',
  label: 'All',
  active: true,
}

const StyledTagLink: React.FC<React.PropsWithChildren<TagLink>> = ({ active, href, label, onClick }: TagLink) => {
  return active ? (
    <ActiveLink underline={false} href={href} key={label} data-title={label} onClick={onClick}>
      {label}
    </ActiveLink>
  ) : (
    <StyledLink underline={false} href={href} key={label} data-title={label} onClick={onClick}>
      {label}
    </StyledLink>
  )
}

const MagazineTagBar = forwardRef<HTMLDivElement, MagazineTagBarProps>(function MagazineTagBar(
  { tags, onClick, href },
  ref,
) {
  const intl = useIntl()
  allTagLink.label = intl.formatMessage({ id: 'magazine_tag_filter_all', defaultMessage: 'ALL' })
  allTagLink.active = tags.find((it) => it.active) === undefined
  return (
    <Wrapper ref={ref}>
      <TagWrapper>
        <StyledTagLink
          href={href}
          label={allTagLink.label}
          active={allTagLink.active}
          onClick={(event) => {
            if (onClick) {
              event.preventDefault()
              onClick('ALL')
              allTagLink.active = true
            }
          }}
        >
          ALL
        </StyledTagLink>
        {tags.map((it: TagLink) => (
          <StyledTagLink
            label={it.label}
            href={encodeURI(`?magazineTags=${it.label}`)}
            key={`key_${it.label}`}
            active={it.active}
            onClick={(event) => {
              if (onClick) {
                event.preventDefault()
                onClick(it.label)
                allTagLink.active = false
              }
            }}
          />
        ))}
      </TagWrapper>
      {/*<SearchBoxWrapper>
        {isIndexPage ? (
          <UncontrolledSearchBox />
        ) : (
          <Box
            onSubmit={(query) => {
              router.push(encodeURI(`${href}?query=${query}`))
            }}
          />
        )}
          </SearchBoxWrapper> */}
    </Wrapper>
  )
})

export default MagazineTagBar
