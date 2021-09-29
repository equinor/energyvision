/* eslint-disable no-unused-vars */
import styled from 'styled-components'
import { Link } from '@components'
import { HTMLAttributes, forwardRef } from 'react'
import { youtube_alt, twitter, instagram, facebook, linkedin } from '@equinor/eds-icons'
import { Icon } from '@equinor/eds-core-react'

const StyledFooter = styled.footer`
  background-color: pink;
  min-height: var(--space-4xLarge);
  clear: both;
`
const SoMeLinks = styled.div`
  background-color: var(--slate-blue-95);
  display: flex;
  flex-direction: row;
  justify-content: center;
  a {
    color: white;
  }
`
const LinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
  { linkText: 'Terms and conditions', url: 'https://www.google.com/' },
  { linkText: 'Terms and conditions', url: 'https://www.google.com/' },
  { linkText: 'Terms and conditions', url: 'https://www.google.com/' },
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
            <a key={url} href={url}>
              {' '}
              <Icon data={icon} />
            </a>
          )
        })}
      </SoMeLinks>
      <LinksWrapper>
        {' '}
        {placeHolderlinks.map(({ url, linkText }) => {
          return (
            <Link variant="regular" key={url} href={url}>
              {' '}
              {linkText}
            </Link>
          )
        })}{' '}
      </LinksWrapper>
      <p>Copyright 2021 Equinor ASA</p>
    </StyledFooter>
  )
})
