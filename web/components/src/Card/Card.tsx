import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { outlineTemplate, Tokens } from '@utils'
import { LandscapeCard } from './LandscapeCard'
import { PortraitCard } from './PortraitCard'

const { outline } = Tokens

export type CardProps = {
  /** What kind of card is this (we'll probably add more options to this list) */
  type?: 'news' | 'promo'
  textOnly?: boolean
  orientation?: 'landscape' | 'portrait'
} & HTMLAttributes<HTMLDivElement>

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

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { type = 'news', textOnly = false, orientation, style, children, ...rest },
  ref,
) {
  return (
    <>
      {orientation === 'landscape' ? (
        <LandscapeCard>{children}</LandscapeCard>
      ) : (
        <PortraitCard
          type={type}
          textOnly={textOnly}
          style={{
            ...style,
          }}
          {...rest}
          ref={ref}
        >
          {children}
        </PortraitCard>
      )}
    </>
  )
})
