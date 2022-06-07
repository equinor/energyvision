import { TwitterEmbedData } from '../../types/types'
import RequestConsentContainer from '../../pageComponents/shared/iframe/RequestConsentContainer'
import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed'
import { BackgroundContainer } from '@components'
import styled from 'styled-components'

type TwitterEmbedProps = {
  data: TwitterEmbedData
}
const Container = styled.div`
  padding: var(--iframe-innerPadding, var(--space-3xLarge) var(--layout-paddingHorizontal-large));
  max-width: var(--iframe-maxWidth, var(--maxViewportWidth));
  margin: auto;
`

const TwitterEmbed = ({ data }: TwitterEmbedProps) => {
  const Embed = () => {
    switch (data.embedType) {
      case 'timeline':
        return (
          <TwitterTimelineEmbed
            screenName={data.embedValue}
            sourceType="profile"
            options={{
              height: 800,
              align: 'center',
            }}
          />
        )
      case 'tweet':
        return <TwitterTweetEmbed tweetId={data.embedValue} options={{ align: 'center' }} />
      default:
        return <div></div>
    }
  }
  return (
    <>
      <BackgroundContainer background="White">
        <Container>
          <div className={`cookieconsent-optin-marketing`}>
            <Embed />
          </div>
          <div className={`cookieconsent-optout-marketing`}>
            <RequestConsentContainer cookiePolicy={'marketing'} />
          </div>
        </Container>
      </BackgroundContainer>
    </>
  )
}

export default TwitterEmbed
