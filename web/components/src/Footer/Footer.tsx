import styled from 'styled-components'
import { Typography } from '@equinor/eds-core-react'
import {  HTMLAttributes, forwardRef } from 'react'
import { youtube_alt, twitter, instagram, facebook, linkedin } from '@equinor/eds-icons'



const StyledFooter = styled.footer`
  background-color: pink;
  min-height: var(--space-4xLarge);

`
const SoMeLinks = styled.div`
  background-color: var(--slate-blue-95);
  display: flex;
  flex-direction: row;

`

type FooterProps = {
  soMeLinks?: {
    id: string;
    url?: string;
  }[] | null;
  links?: {
    linkText?: string;
    url?: string;
  }[] | null;
} 



export const Footer = forwardRef<HTMLDivElement, FooterProps>(function Footer(
  { ...props },
  
) {
  return (
    <StyledFooter {...props}>
      <SoMeLinks></SoMeLinks>
      <p>Copyright 2021 Equinor ASA</p>
    </StyledFooter>
  )
})