import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { LandscapeCard } from './LandscapeCard'
import { PortraitCard } from './PortraitCard'
import { default as NextLink } from 'next/link'

export type CardProps = {
  /** What kind of card is this (we'll probably add more options to this list) */
  type?: 'news' | 'promo'
  textOnly?: boolean
  orientation?: 'landscape' | 'portrait'
} & HTMLAttributes<HTMLDivElement>

export const CardLink = styled(NextLink)`
  text-decoration: none;
  color: inherit;
  &:hover {
    cursor: pointer;
  }
`

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { type = 'news', textOnly = false, orientation, style, children, ...rest },
  ref,
) {
  return (
    <>
      {orientation === 'landscape' ? (
        <LandscapeCard
          style={{
            ...style,
          }}
          {...rest}
          ref={ref}
        >
          {children}
        </LandscapeCard>
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
