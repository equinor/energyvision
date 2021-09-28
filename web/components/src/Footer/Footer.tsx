/* eslint-disable no-unused-vars */
import styled from 'styled-components'
import { Typography } from '@equinor/eds-core-react'
import {  HTMLAttributes, forwardRef } from 'react'
import { youtube_alt, twitter, instagram, facebook, linkedin } from '@equinor/eds-icons'



const StyledFooter = styled.footer`
  background-color: pink;
  min-height: var(--space-4xLarge);
  clear: both;
`
const SoMeLinks = styled.div`
  background-color: var(--slate-blue-95);
  display: flex;
  flex-direction: row;

`
const placeHolderSoMeLinks = [{url: "https://www.facebook.com/", icon: facebook}, {url: "https://www.twitter.com/", icon: twitter},{url: "https://www.linkedin.com/", icon: linkedin} ]

type FooterProps = {
  soMeLinks?: {
    icon?: any;
    url?: string;
  }[] | null;
  links?: {
    linkText?: string;
    url?: string;
  }[] | null;
} 



export const Footer = forwardRef<HTMLDivElement, FooterProps>(function Footer(
  { soMeLinks, links, ...rest },
  ref
  
) {
  return (
    <StyledFooter ref={ref} {...rest}>
      <SoMeLinks></SoMeLinks>
      <p>Copyright 2021 Equinor ASA</p>
    </StyledFooter>
  )
})