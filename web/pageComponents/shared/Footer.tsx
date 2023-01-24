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

import type { FooterLinkData, SomeType, FooterColumns } from '../../types/types'

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
  font-size: var(--typeScale-05);
  padding: var(--space-xSmall) 0;
  color: var(--white-100);
  text-decoration: none;
  display: flex;
  flex-direction: row;
  height: var(--space-xLarge);
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
    max-width: var(--space-4xLarge);
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
      console.warn('Unable to get social icon for footer: Unknown SoMe type passed')
  }
}

function getLink(linkData: FooterLinkData) {
  // Fallback to home page, if this happens it is an error somewhere
  // Sanity should take care of the validation here, and this is temp. until
  // the static pages are migrated  {link.image && <FooterIcon image={link.image} />}
  if (!linkData) return 'something-wrong'
  const { link } = linkData

  return (link && link.slug) || '/'
}

type FooterProps = {
  footerData?: { footerColumns: FooterColumns[] }
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(function Footer({ footerData, ...rest }, ref) {
  const dt = new Date()
  return (
    <StyledFooter ref={ref} {...rest}>
      <FooterTop>
        {footerData?.footerColumns?.map(({ header, linkList }) => {
          return (
            <LinkWrapper key={header}>
              <LinkHeader>{header}</LinkHeader>
              <LinksList>
                {linkList?.map((link: FooterLinkData) => {
                  const { id, type, someType, label, url } = link
                  if (url)
                    return (
                      <FooterLink href={url} key={id}>
                        {type === 'someLink' && someType && (
                          <SomeIcon aria-hidden={true}>{getSomeSvg(someType)}</SomeIcon>
                        )}
                        {label}
                      </FooterLink>
                    )
                  return (
                    <NextLink key={id} href={getLink(link)} passHref legacyBehavior>
                      <FooterLink>
                        {type === 'someLink' && someType && (
                          <SomeIcon aria-hidden={true}>{getSomeSvg(someType)}</SomeIcon>
                        )}
                        {label}
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
        <CompanyName>Copyright {dt.getFullYear()} Equinor ASA</CompanyName>
      </FooterBottom>
    </StyledFooter>
  )
})

export default Footer
