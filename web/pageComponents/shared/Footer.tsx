import styled from 'styled-components'
import { Link } from '@components'
import { forwardRef } from 'react'
import { Typography } from '@equinor/eds-core-react'
import NextLink from 'next/link'
import Image from './Image'

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
  @media (max-width: 750px) {
  }
`

type FooterProps = {
  footerData?: { footerColumns: FooterColumns[] }
}

type ImageProps = {
  _type: string
  asset: {
    _ref: string
    _type: string
  }
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
  image?: ImageProps
  link?: {
    type: string
    slug: string
  }
}
const FooterIcon = ({ data }: any) => {
  const { image } = data
  if (!image) return null
  return (
    <StyledFigure>
      {' '}
      <Image maxWidth={50} image={image} aspectRatio={0.7} layout="responsive" role="presentation" />
    </StyledFigure>
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
                  return (
                    <NextLink key={link._key} href={getLink(link)} passHref>
                      <FooterLink>
                        {link.image && <FooterIcon data={link} />}
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
