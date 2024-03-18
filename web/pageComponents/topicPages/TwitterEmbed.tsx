import { TwitterEmbedData } from '../../types/types'
import RequestConsentContainer from '../../pageComponents/shared/iframe/RequestConsentContainer'
import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed'
import { BackgroundContainer } from '@components'
import styled from 'styled-components'
import IngressText from '../../pageComponents/shared/portableText/IngressText'
import TitleText from '../../pageComponents/shared/portableText/TitleText'

type TwitterEmbedProps = {
  data: TwitterEmbedData
  anchor?: string
}
const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
`
const StyledIngress = styled.div`
  padding: 0 0 var(--space-medium);
`
const StyledTitle = styled(TitleText)`
  margin-bottom: var(--space-xLarge);
`

const TwitterEmbed = ({ data, anchor }: TwitterEmbedProps) => {
  const { embedType, embedValue, designOptions, title, ingress } = data
  const { background, dark } = designOptions
  // After a while with TW, this isDark should be removed and only use dark from designOptions for dark
  const isDark = dark || background === 'Mid Blue' || background === 'Slate Blue'
  const Embed = () => {
    switch (embedType) {
      case 'timeline':
        return (
          <TwitterTimelineEmbed
            screenName={embedValue}
            sourceType="profile"
            options={{
              height: 800,
              align: 'center',
            }}
          />
        )
      case 'tweet':
        return <TwitterTweetEmbed tweetId={embedValue} options={{ align: 'center' }} />
      default:
        return null
    }
  }
  return (
    <>
      <BackgroundContainer background={background} id={anchor} twClassName={`${isDark ? 'dark' : ''}`}>
        <Container>
          {title && <StyledTitle value={title} />}
          {ingress && (
            <StyledIngress>
              <IngressText value={ingress} />
            </StyledIngress>
          )}

          <div className="cookieconsent-optin-marketing">
            <Embed />
          </div>
          <div className="cookieconsent-optout-marketing">
            <RequestConsentContainer cookiePolicy="marketing" />
          </div>
        </Container>
      </BackgroundContainer>
    </>
  )
}

export default TwitterEmbed
