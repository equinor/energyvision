import { AnchorHTMLAttributes, forwardRef } from 'react'
import styled from 'styled-components'
import { Link } from '@core/Link'
import { useIntl } from 'react-intl'

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

const StyledLink = styled(Link).attrs((props: { $active: boolean }) => props)`
  display: inline-block;
  position: relative;
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
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
  border-top: 1px solid var(--grey-30);
  border-bottom: 1px solid var(--grey-30);
`
const TagWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: auto;
  overflow-x: scroll;
  white-space: nowrap;
  padding: var(--space-large);
  grid-gap: var(--space-xLarge);

  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 1024px) {
    flex-wrap: wrap;
    padding: var(--space-large) var(--space-3xLarge);
    overflow: overlay;
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
  const linkClassNames = `inline-block text-base lg:text-xs relative no-underline hover:font-bold before:block before:content-[attr(data-title)] before:font-bold before:h-0 before:overflow-hidden before:invisible after:content-[''] after:absolute after:border-l-2 after:border-energy-red-100 after:right-[calc(var(--space-xLarge)_*-0.5)] after:h-full last:after:hidden`
  return (
    <Wrapper ref={ref} className="mb-8 mx-auto">
      <TagWrapper>
        <Link
          href={href}
          className={`${allTagLink.active ? 'font-bold' : 'font-normal'} ${linkClassNames}`}
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
        </Link>
        {tags.map((it: TagLink) => (
          <Link
            className={`${it.active ? 'font-bold' : 'font-normal'} ${linkClassNames}`}
            href={`${href}${`?tag=${it.label}`}`}
            key={`key_${it.label}`}
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
          </Link>
        ))}
      </TagWrapper>
    </Wrapper>
  )
})

export default MagazineTagBar
