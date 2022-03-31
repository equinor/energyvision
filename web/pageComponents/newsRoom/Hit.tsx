import styled from 'styled-components'
import { default as NextLink } from 'next/link'
import { Heading, FormattedDate } from '@components'

const StyledHitLink = styled.a`
  padding: var(--space-small) 0;
  display: block;
  color: var(--default-text);
  cursor: pointer;
  outline: none;
  text-decoration: none;
`

const StyledHeading = styled(Heading)`
  display: inline-block;
  ${StyledHitLink}:hover & {
    text-decoration: underline;
  }
`

const Date = styled.div`
  font-size: var(--typeScale-0);
`

/* type HitProps = {
  slug: string
  pageTitle: string
  publishDateTime?: string
  topicTags?: string[]
  countryTags?: string[]
  text: string
  objectId: string
}
 */
// @TODO Types
const Hit = ({ hit }: { hit: any }) => {
  return (
    <NextLink href={hit.slug} passHref>
      <StyledHitLink>
        <article>
          <Date>{hit.publishDateTime && <FormattedDate datetime={hit.publishDateTime} uppercase />}</Date>
          <StyledHeading level="h3" size="md">
            {hit.pageTitle}
          </StyledHeading>
          {/*  <Text>{hit.text}</Text> */}
        </article>
      </StyledHitLink>
    </NextLink>
  )
}

export default Hit
