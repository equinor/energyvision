/* eslint-disable no-unused-vars */
import styled from 'styled-components'
import { Link } from '@components'
import { HTMLAttributes, forwardRef } from 'react'
import { youtube_alt, twitter, instagram, facebook, linkedin } from '@equinor/eds-icons'
import { Icon, Typography } from '@equinor/eds-core-react'

const StyledFooter = styled.footer`
  background-color: pink;
  min-height: var(--space-4xLarge);
  clear: both;
`

const SoMeLinks = styled.div`
  background-color: var(--slate-blue-95);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  min-height: var(--space-4xLarge);
  padding: var(--space-large) var(--space-large);
  a {
    color: white;
  }
`
const FooterLink = styled(Link)`
  font-size: var(--typeScale-0);
  padding: var(--space-small);

  text-decoration: none;
  &:hover {
    color: var(--heritage-red-90);
  }
`
const FooterBottom = styled.div`
  min-height: var(--space-3xLarge);
  padding: var(--space-large) var(--space-large);
`
const SoMeLink = styled(Link)`
  font-size: var(--typeScale-0);
  margin-bottom: var(--space-small);
  text-decoration: none;
  padding: 0 var(--space-xSmall);
  & > svg {
    height: 2.4rem;
    width: 2.4rem;
  }
  &:hover {
    color: var(--heritage-red-90);
  }
`
const LinksWrapper = styled.div`
  padding: var(--space-small) var(--layout-paddingHorizontal-large);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;

  margin-left: auto;
  margin-right: auto;
`

const CompanyName = styled(Typography)`
  padding-top: var(--space-small);
  text-align: center;
  font-size: var(--typeScale-0);
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
  { linkText: 'Contact us', url: 'https://www.google.com/' },
  { linkText: 'Cookie policy', url: 'https://www.google.com/' },
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
      <SoMeLinks>
        {placeHolderSoMeLinks.map(({ url, icon }) => {
          return (
            <SoMeLink key={url} href={url}>
              <Icon data={icon} />
            </SoMeLink>
          )
        })}
      </SoMeLinks>
      <FooterBottom>
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
        <CompanyName>Copyright 2021 Equinor ASA</CompanyName>
      </FooterBottom>
    </StyledFooter>
  )
})
