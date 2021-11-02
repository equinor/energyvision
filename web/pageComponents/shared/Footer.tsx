import styled from 'styled-components'
import { Link } from '@components'
import { forwardRef } from 'react'
import { Typography } from '@equinor/eds-core-react'
import NextLink from 'next/link'
import Facebook from '../icons/Facebook'
import Instagram from '../icons/Instagram'
import Linkedin from '../icons/Linkedin'
import Twitter from '../icons/Twitter'
import Youtube from '../icons/Youtube'

const StyledFooter = styled.footer`
  min-height: var(--space-4xLarge);
  clear: both;
  color: white;
  background-color: var(--slate-blue-95);
  padding: var(--space-medium) 0;
`
const FooterTop = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: var(--layout-maxContent-wide);
  justify-content: space-between;
  padding: 0 var(--layout-paddingHorizontal-small) var(--space-medium);
  @media (max-width: 750px) {
    flex-direction: column;
  }
`
const LinkHeader = styled.h3`
  font-size: var(--typeScale-2);
  color: var(--white-100);
  padding: var(--space-small) 0;
  font-weight: var(--fontWeight-medium);
  line-height: var(--lineHeight-1);
`
const LinkWrapper = styled.section`
  display: flex;
  flex-direction: column;
  @media (max-width: 750px) {
    padding: var(--space-medium) 0;
    width: 70%;
  }
`

const LinksList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);

  column-gap: var(--space-medium);
  align-items: self-start;
  @media (min-width: 750px) {
    display: flex;
    flex-direction: column;
  }
`

const FooterLink = styled(Link)`
  font-size: var(--typeScale-0);
  padding: var(--space-xSmall) 0;
  color: var(--white-100);
  text-decoration: none;
  display: flex;
  flex-direction: row;
  height: 2rem;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: var(--moss-green-90);
      text-decoration: underline;
    }
  }
  &[data-focus-visible-added]:focus {
    outline-color: var(--energy-red-90);
    outline-style: dashed;
  }
  @media (max-width: 750px) {
    flex: 0 0 40%;
    max-width: 6rem;
  }
`
const FooterBottom = styled.div`
  min-height: var(--space-large);
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-small) var(--space-small);
`

const CompanyName = styled(Typography)`
  text-align: center;
  font-size: var(--typeScale-small);
  color: white;
  @media (max-width: 750px) {
    text-align: left;
  }
`

const SomeIcon = styled.span`
  display: inline-block;
  text-align: center;
  width: 30px;
  margin-right: var(--space-small);
  fill: var(--white-100);
  @media (hover: hover) and (pointer: fine) {
    ${FooterLink}:hover & {
      fill: var(--moss-green-90);
    }
  }
`
type FooterProps = {
  footerData?: { footerColumns: FooterColumns[] }
}

type FooterColumns = {
  id: string
  header: string
  linkList?: FooterLinkData[]
}

type SomeType = 'facebook' | 'instagram' | 'youtube' | 'twitter' | 'linkedin'

type FooterLinkData = {
  id: string
  type: 'someLink' | 'link'
  key: string
  label: string
  isStatic: boolean
  url?: string
  staticUrl?: string
  someType?: SomeType
  link?: {
    type: string
    slug: string
  }
}

function getSomeSvg(someType: SomeType) {
  switch (someType) {
    case 'facebook':
      return <Facebook width={12} />
    case 'instagram':
      return <Instagram width={24} />
    case 'linkedin':
      return <Linkedin width={24} />
    case 'twitter':
      return <Twitter width={24} />
    case 'youtube':
      return <Youtube width={24} />
    default:
      console.warn('Unknown SoMe type')
  }
}

function getLink(linkData: FooterLinkData) {
  // Fallback to home page, if this happens it is an error somewhere
  // Sanity should take care of the validation here, and this is temp. until
  // the static pages are migrated  {link.image && <FooterIcon image={link.image} />}
  if (!linkData) return 'something-wrong'
  const { isStatic, link, staticUrl, url } = linkData
  if (isStatic) {
    return staticUrl || '/'
  } else {
    return (link && link.slug) || (url && url) || '/'
  }
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(function Footer({ footerData, ...rest }, ref) {
  return (
    <StyledFooter ref={ref} {...rest}>
      <FooterTop>
        {footerData?.footerColumns.map(({ header, linkList }) => {
          return (
            <LinkWrapper key={header}>
              <LinkHeader>{header}</LinkHeader>
              <LinksList>
                {linkList?.map((link: FooterLinkData) => {
                  console.log('some', link.someType)
                  return (
                    <NextLink key={link.key} href={getLink(link)} passHref>
                      <FooterLink>
                        {link.type === 'someLink' && link.someType && <SomeIcon>{getSomeSvg(link.someType)}</SomeIcon>}
                        {link.label}
                      </FooterLink>
                    </NextLink>
                  )
                })}
              </LinksList>
            </LinkWrapper>
          )
        })}
      </FooterTop>
      <FooterBottom>
        {/*  @TODO How should we do this */}
        <CompanyName>Copyright 2021 Equinor ASA</CompanyName>
      </FooterBottom>
    </StyledFooter>
  )
})

export default Footer
