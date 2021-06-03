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
  let url: string
  if (action?.type === 'internalUrl') {
    url = action.link?.type === 'news' ? `/news/${action.link?.slug}` : action.link?.slug || ''
  } else {
    url = '/'
  }
  return (
    <BackgroundContainer background={designOptions?.background}>
      <LinkContainer>
        {/*     Internal POC */}
        <NextLink passHref href={url}>
          <Button as="a" variant="outlined">
            {action.label}
          </Button>
        </NextLink>
      </LinkContainer>
    </BackgroundContainer>
  )
}

export default CallToAction
