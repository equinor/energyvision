import styled from 'styled-components'
import { Link } from '@components'
import { forwardRef } from 'react'
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
const LinkHeader = styled.h3`
  font-size: var(--typeScale-2);
  color: white;
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
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  height: 2rem;

  &:hover {
    color: var(--moss-green-90);
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
const StyledFigure = styled.figure`
  margin: 0 10px 0 0;
  width: 30px;
  height: 30px;
  padding-top: 2px;
`

const SomeIcon = styled.span`
  display: inline-block;
  width: 30px;
`

type FooterProps = {
  footerData?: { footerColumns: FooterColumns[] }
}

type FooterColumns = {
  id: string
  header: string
  linkList?: FooterLinkData[]
}
type FooterLinkData = {
  id: string
  type: 'someLink' | 'link'
  key: string
  label: string
  isStatic: boolean
  url?: string
  staticUrl?: string
  someType?: 'facebook' | 'instagram' | 'youtube' | 'twitter' | 'linkedin'
  link?: {
    type: string
    slug: string
  }
}

function getSomeSvg(someType: string) {
  // @ TODO Real SVG
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 42 33">
      <g clipPath="url(#clip0_2639:72511)">
        <path
          fill="white"
          d="M40.9196 0.662651C39.164 1.59036 37.4084 2.25301 35.3826 2.6506C33.7621 1.06024 31.6013 0 29.0354 0C24.3087 0 20.3923 3.71084 20.3923 8.3494C20.3923 9.01205 20.5273 9.6747 20.6624 10.2048C13.5048 9.93976 7.15756 6.62651 2.97106 1.59036C2.29582 2.78313 1.75563 4.24096 1.75563 5.83133C1.75563 8.74699 3.24116 11.2651 5.53698 12.7229C4.18649 12.7229 2.83601 12.3253 1.62058 11.6627V11.7952C1.62058 15.7711 4.59164 19.2169 8.50804 20.012C7.8328 20.1446 7.02251 20.2771 6.21222 20.2771C5.67203 20.2771 5.13183 20.2771 4.59164 20.1446C5.67203 23.4578 8.91318 25.8434 12.6945 25.9759C9.72347 28.2289 6.07717 29.5542 2.02572 29.5542C1.35048 29.5542 0.675241 29.5542 0 29.4217C3.78135 31.8072 8.37299 33.1325 13.2347 33.1325C29.0354 33.1325 37.8135 20.4096 37.8135 9.40964C37.8135 9.01205 37.8135 8.74699 37.8135 8.3494C39.4341 7.15663 40.9196 5.69879 42.135 3.9759C40.6495 4.63855 38.8939 5.03614 37.1383 5.3012C38.8939 4.24096 40.2444 2.51807 40.9196 0.662651Z"
        ></path>
        <path
          fill="url(#paint0_linear_2639:72511)"
          d="M40.9196 0.662651C39.164 1.59036 37.4084 2.25301 35.3826 2.6506C33.7621 1.06024 31.6013 0 29.0354 0C24.3087 0 20.3923 3.71084 20.3923 8.3494C20.3923 9.01205 20.5273 9.6747 20.6624 10.2048C13.5048 9.93976 7.15756 6.62651 2.97106 1.59036C2.29582 2.78313 1.75563 4.24096 1.75563 5.83133C1.75563 8.74699 3.24116 11.2651 5.53698 12.7229C4.18649 12.7229 2.83601 12.3253 1.62058 11.6627V11.7952C1.62058 15.7711 4.59164 19.2169 8.50804 20.012C7.8328 20.1446 7.02251 20.2771 6.21222 20.2771C5.67203 20.2771 5.13183 20.2771 4.59164 20.1446C5.67203 23.4578 8.91318 25.8434 12.6945 25.9759C9.72347 28.2289 6.07717 29.5542 2.02572 29.5542C1.35048 29.5542 0.675241 29.5542 0 29.4217C3.78135 31.8072 8.37299 33.1325 13.2347 33.1325C29.0354 33.1325 37.8135 20.4096 37.8135 9.40964C37.8135 9.01205 37.8135 8.74699 37.8135 8.3494C39.4341 7.15663 40.9196 5.69879 42.135 3.9759C40.6495 4.63855 38.8939 5.03614 37.1383 5.3012C38.8939 4.24096 40.2444 2.51807 40.9196 0.662651Z"
        ></path>
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          y2="33.1325"
          x2="21.0675"
          y1="0"
          x1="21.0675"
          id="paint0_linear_2639:72511"
        >
          <stop stopColor="white"></stop>
          <stop stopOpacity="0" stopColor="white" offset="1"></stop>
        </linearGradient>
        <clipPath id="clip0_2639:72511">
          <rect fill="white" height="33" width="42"></rect>
        </clipPath>
      </defs>
    </svg>
  )
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
        <CompanyName>Copyright 2021 Equinor ASA</CompanyName>
      </FooterBottom>
    </StyledFooter>
  )
})
export default Footer
