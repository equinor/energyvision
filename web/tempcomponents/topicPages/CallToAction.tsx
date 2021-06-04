import styled from 'styled-components'
import { BackgroundContainer, Button } from '@components'
import type { CallToActionData } from '../../types/types'
import { default as NextLink } from 'next/link'

type TeaserProps = {
  data: CallToActionData
}

const LinkContainer = styled.figure`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: 0 auto;
`

const CallToAction = ({ data }: TeaserProps) => {
  const { designOptions, action } = data
  if (!action) return null

  const { type, link, href, label } = action
  let url: string
  if (type === 'internalUrl') {
    url = link?.type === 'news' ? `/news/${link?.slug}` : link?.slug || ''
  } else if (type === 'externalUrl') {
    url = href || ''
  } else {
    url = '/'
  }
  return (
    <BackgroundContainer background={designOptions?.background}>
      <LinkContainer>
        {type === 'internalUrl' ? (
          <NextLink passHref href={url}>
            <Button as="a" variant="outlined" color="secondary">
              {label}
            </Button>
          </NextLink>
        ) : (
          <Button as="a" variant="outlined" href={url} color="secondary">
            {label}
          </Button>
        )}
      </LinkContainer>
    </BackgroundContainer>
  )
}

export default CallToAction
