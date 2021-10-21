/* eslint-disable no-unused-vars */
import styled from 'styled-components'
import { Link, Heading } from '@components'
import { HTMLAttributes, forwardRef } from 'react'
import { Typography } from '@equinor/eds-core-react'
import NextLink from 'next/link'

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

const LinkWrapper = styled.section`
  display: flex;
  flex-direction: column;
  @media (max-width: 750px) {
    padding: var(--space-medium) 0;
    width: 70%;
  }
`
const LinksList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  @media (max-width: 750px) {
    height: 5rem;
  }
`
const LinkHeader = styled(Heading)`
  font-size: var(--typeScale-2);
  color: white;
  padding: var(--space-small) 0;
`

const FooterLink = styled(Link)`
  font-size: var(--typeScale-0);
  padding: var(--space-xSmall) 0;
  color: white;
  text-decoration: none;

  &:hover {
    color: var(--moss-green-90);
  }
  @media (max-width: 750px) {
    flex: 0 0 40%;
    max-width: 5rem;
  }
`
const FooterBottom = styled.div`
  min-height: var(--space-large);
  padding: var(--space-small) var(--layout-paddingHorizontal-small);
`

const CompanyName = styled(Typography)`
  text-align: center;
  font-size: var(--typeScale-0);
  color: white;
  @media (max-width: 750px) {
    text-align: left;
  }
`

type FooterProps = {
  footerData?: { footerColumns: FooterColumns[] }
}

type FooterColumns = {
  header: string
  linkList?: FooterLinkData[]
}
type FooterLinkData = {
  label: string
  isStatic: boolean
  url?: string
  staticUrl?: string
  _key?: string
  link?: {
    type: string
    slug: string
  }
  image?: {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
}

function getLink(linkData: FooterLinkData) {
  // Fallback to home page, if this happens it is an error somewhere
  // Sanity should take care of the validation here, and this is temp. until
  // the static pages are migrated
  if (!linkData) return 'something-wrong'
  const { isStatic, link, staticUrl, url } = linkData
  if (isStatic) {
    return staticUrl || '/'
  } else {
    return (link && link.slug) || (url && url) || '/'
  }
}

export const Footer = forwardRef<HTMLDivElement, FooterProps>(function Footer({ footerData, ...rest }, ref) {
  return (
    <StyledFooter ref={ref} {...rest}>
      <FooterTop>
        {footerData?.footerColumns.map(({ header, linkList }) => {
          return (
            <LinkWrapper key={header}>
              {' '}
              <LinkHeader>{header}</LinkHeader>
              <LinksList>
                {linkList?.map((link: FooterLinkData) => {
                  return (
                    <NextLink key={link._key} href={getLink(link)} passHref>
                      <FooterLink>{link.label}</FooterLink>
                    </NextLink>
                  )
                })}
              </LinksList>
            </LinkWrapper>
          )
        })}
      </FooterTop>
      <FooterBottom>
        <CompanyName>Copyright 2021 Equinor ASA</CompanyName>
      </FooterBottom>
    </StyledFooter>
  )
})
