import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { outlineTemplate, Tokens } from '@utils'

const { outline } = Tokens

export const AspectImagePlaceholder = styled.div`
  background-color: hsl(0, 0%, 86%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  /* TODO: Fix border radius on image */
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`
type ImagePlaceholderProps = {
  height?: string
  width?: string
} & HTMLAttributes<HTMLDivElement>

export const ImagePlaceholder = styled.div<ImagePlaceholderProps>`
  background-color: hsl(0, 0%, 86%);
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '100%')};
  /*   Sry, no love for future self*/
  @media (min-width: 750px) {
    height: 100%;
    width: 100%;
  }
`
type RatioBoxProps = {
  aspect?: string
}
export const RatioBox = styled.div<RatioBoxProps>`
  position: relative;
  height: 0;
  display: block;
  width: 100%;
  padding-bottom: ${(props) => (props.aspect ? props.aspect : '56.25%')};
`

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-row-gap: 4rem;
  grid-column-gap: 2rem;
`

/* Where should this be located. Should Card link be an actual component, or 
a more generic wrapper link component */
export const CardLink = styled.a`
  text-decoration: none;
  color: inherit;
  &:hover {
    cursor: pointer;
  }
  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }
`
