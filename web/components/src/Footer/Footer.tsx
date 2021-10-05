/* eslint-disable no-unused-vars */
import styled from 'styled-components'
import { Link } from '@components'
import { HTMLAttributes, forwardRef } from 'react'
import { youtube_alt, twitter, instagram, facebook, linkedin } from '@equinor/eds-icons'
import { Icon, Typography } from '@equinor/eds-core-react'

const StyledFooter = styled.footer`
  min-height: var(--space-4xLarge);
  clear: both;
  color: white;
  background-color: var(--slate-blue-95);
`

const SoMeLinks = styled.div`
  background-color: var(--slate-blue-95);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  min-height: var(--space-large);
  padding: var(--space-small) var(--space-small);
  a {
    color: white;
  }
`
const SoMeHeader = styled(Typography)`
  font-size: var(--typeScale-3);
  padding: var(--space-xSmall) var(--space-medium);
  color: white;
`

const FooterLink = styled(Link)`
  font-size: var(--typeScale-0);
  padding: var(--space-xSmall) 0;
  color: white;
  text-decoration: none;
  &:hover {
    color: var(--heritage-red-90);
  }
`
const FooterBottom = styled.div`
  min-height: var(--space-large);
  padding: var(--space-medium) var(--space-large);
`
const LinksWrapper = styled.div`
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0 var(--space-arge);
  display: flex;
  height: 5em;
  flex-basis: 60.66%;
  max-width: 66.66%;
`
const FooterTop = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: var(--layout-maxContent-medium);
  min-height: var(--space-3xLarge);
  padding: var(--space-medium) var(--space-large);
  margin: 0 auto;
  justify-content: space-between;
`

const SoMeLink = styled(Link)`
  font-size: var(--typeScale-0);
  margin-bottom: var(--space-small);
  text-decoration: none;
  padding: 0 var(--space-xSmall);

  & > svg {
    height: 2.3rem;
    width: 2.3rem;
  }
  &:hover {
    color: var(--heritage-red-90);
  }
`

const CompanyName = styled(Typography)`
  text-align: center;
  font-size: var(--typeScale-0);
  color: white;
`
const SoMeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const placeHolderSoMeLinks = [
  { url: 'https://www.facebook.com/', icon: facebook },
  { url: 'https://www.twitter.com/', icon: twitter },
  { url: 'https://www.linkedin.com/', icon: linkedin },
  { url: 'https://www.youtube.com/', icon: youtube_alt },
  { url: 'https://www.instagram.com/', icon: instagram },
]
const placeHolderlinks = [
  { linkText: 'Terms and conditions', url: 'https://www.google.com/' },
  { linkText: 'Privacy policy', url: 'https://www.google.com/' },
  { linkText: 'Site info', url: 'https://www.google.com/' },
  { linkText: 'RSS', url: 'https://www.google.com/' },
  { linkText: 'Contact us', url: 'https://www.google.com/' },
  { linkText: 'Cookie policy', url: 'https://www.google.com/' },
  { linkText: 'Investors', url: 'https://www.google.com/' },
  { linkText: 'Suppliers', url: 'https://www.google.com/' },
]

type FooterProps = {
  soMeLinks?:
    | {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        icon?: any
        url?: string
      }[]
    | null
  links?:
    | {
        linkText?: string
        url?: string
      }[]
    | null
}

export const Footer = forwardRef<HTMLDivElement, FooterProps>(function Footer({ soMeLinks, links, ...rest }, ref) {
  return (
    <StyledFooter ref={ref} {...rest}>
      <FooterTop>
        <SoMeWrapper>
          <SoMeHeader>Connect with us</SoMeHeader>
          <SoMeLinks>
            {placeHolderSoMeLinks.map(({ url, icon }) => {
              return (
                <SoMeLink aria-label={url} key={url} href={url}>
                  <Icon data={icon} />
                </SoMeLink>
              )
            })}
          </SoMeLinks>
        </SoMeWrapper>
        <LinksWrapper>
          {placeHolderlinks.map(({ url, linkText }) => {
            return (
              <FooterLink variant="regular" key={url} href={url}>
                {' '}
                {linkText}
              </FooterLink>
            )
          })}
        </LinksWrapper>
      </FooterTop>
      <FooterBottom>
        <CompanyName>Copyright 2021 Equinor ASA</CompanyName>
      </FooterBottom>
    </StyledFooter>
  )
})
