import { AnchorHTMLAttributes, forwardRef } from 'react'
import styled from 'styled-components'
import { Link } from '@components'
import { useIntl } from 'react-intl'
import { Flags } from '../../common/helpers/datasetHelpers'

export type MagazineTagBarProps = {
  tags: TagLink[]
  href: string
  onClick?: (value: string) => void
  defaultActive: boolean
}

export type TagLink = {
  label: string
  active: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement>

const StyledLink = styled(Link).attrs((props: { active: boolean }) => props)`
  display: inline-block;
  position: relative;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  &:hover {
    font-weight: bold;
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

  &:last-child:after {
    display: none;
  }
`
const Wrapper = styled.div`
  display: flex;
  align-content: center;
  margin: 0 auto 0 auto;
  border-top: 1px solid var(--grey-30);
  border-bottom: 1px solid var(--grey-30);
`
const TagWrapper = Flags.IS_DEV
  ? styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  padding: var(--space-large) var(--space-3xLarge);
  grid-gap: var(--space-xLarge);
  @media (max-width: 750px) {
    padding: var(--space-large);
  }
  @media (max-width: 1150px) {
  padding: var(--space-large) var(--space-3xLarge) var(--space-large) 0;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    margin: var(--space-medium);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    )
  }
`
  : styled.div`
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      padding: var(--space-large) var(--space-3xLarge);
      grid-gap: var(--space-xLarge);
      @media (max-width: 750px) {
        padding: var(--space-large);
      }
    `

const allTagLink: TagLink = {
  href: '#',
  label: 'All',
  active: false,
}

const MagazineTagBar = forwardRef<HTMLDivElement, MagazineTagBarProps>(function MagazineTagBar(
  { tags, onClick, href, defaultActive = false },
  ref,
) {
  const intl = useIntl()
  allTagLink.label = intl.formatMessage({ id: 'magazine_tag_filter_all', defaultMessage: 'ALL' })
  allTagLink.active = defaultActive
  return (
    <Wrapper ref={ref}>
      <TagWrapper>
        <StyledLink
          href={href}
          active={allTagLink.active}
          underline={false}
          data-title={allTagLink.label}
          onClick={(event) => {
            if (onClick) {
              event.preventDefault()
              onClick('ALL')
              allTagLink.active = true
            }
          }}
        >
          {allTagLink.label}
        </StyledLink>
        {tags.map((it: TagLink) => (
          <StyledLink
            underline={false}
            href={`${href}${`?tag=${it.label}`}`}
            key={`key_${it.label}`}
            active={it.active}
            data-title={it.label}
            onClick={(event) => {
              if (onClick) {
                event.preventDefault()
                onClick(it.label)
                allTagLink.active = false
              }
            }}
          >
            {it.label}
          </StyledLink>
        ))}
      </TagWrapper>
    </Wrapper>
  )
})

export default MagazineTagBar
