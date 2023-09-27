import styled from 'styled-components'
import { forwardRef } from 'react'
import { Typography } from '@equinor/eds-core-react'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from '../icons'
import type { FooterLinkData, SomeType, FooterColumns } from '../../types/types'
import { default as NextLink } from 'next/link'

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

const CompanyName = styled(Typography)`
  text-align: center;
  font-size: var(--typeScale-small);
  color: white;
  @media (max-width: 750px) {
    text-align: left;
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
  grid-row-gap: var(--space-small);
  column-gap: var(--space-medium);
  align-items: self-start;
  @media (min-width: 750px) {
    display: flex;
    flex-direction: column;
    grid-row-gap: 0px;
  }
`

const FooterLink = styled(NextLink)`
  font-size: var(--typeScale-05);
  padding: var(--space-xSmall) 0;
  color: var(--white-100);
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
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
  display: flex;
  justify-content: left;
  min-height: var(--space-large);
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-small) var(--space-small);

  @media (min-width: 750px) {
    justify-content: center;
  }
`

const CompanyName = styled.span`
  font-size: var(--typeScale-small);
  color: white;
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
  const iconMap = {
    facebook: <Facebook width={12} />,
    instagram: <Instagram width={24} />,
    linkedin: <Linkedin width={24} />,
    twitter: <Twitter width={24} />,
    youtube: <Youtube width={24} />,
  }

  if (!(someType in iconMap)) console.warn('Unable to get social icon for footer: Unknown SoMe type passed')

  return iconMap[someType] || null
}

function getLink(linkData: FooterLinkData) {
  const { link } = linkData || {}
  return link?.slug ?? '/'
}

type FooterProps = {
  footerData?: { footerColumns: FooterColumns[] }
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(function Footer({ footerData, ...rest }, ref) {
  return (
    <StyledFooter ref={ref} {...rest}>
      <FooterTop>
        {footerData?.footerColumns?.map(({ header, linkList }) => (
          <LinkWrapper key={header}>
            <LinkHeader>{header}</LinkHeader>
            <LinksList>
              {linkList?.map((link: FooterLinkData) => {
                const { id, type, someType, label, url } = link
                const icon = type === 'someLink' && someType ? getSomeSvg(someType) : null

                return (
                  <FooterLink key={id} href={url || getLink(link)}>
                    {icon && <SomeIcon aria-hidden={true}>{icon}</SomeIcon>}
                    {label}
                  </FooterLink>
                )
              })}
            </LinksList>
          </LinkWrapper>
        ))}
      </FooterTop>
      <FooterBottom>
        <CompanyName>Copyright {new Date().getFullYear()} Equinor ASA</CompanyName>
      </FooterBottom>
    </StyledFooter>
  )
})

export default Footer
