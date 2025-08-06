import { PortableTextBlock, TwitterEmbedData } from '../../types/index'
import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed'
import { BackgroundContainer } from '@core/Backgrounds'
import IngressText from '../../pageComponents/shared/portableText/IngressText'
import { Typography } from '@core/Typography'
import { toPlainText } from '@portabletext/react'
import RequestConsentContainer from '@core/IFrame/RequestConsentContainer'

type TwitterEmbedProps = {
  data: TwitterEmbedData
  anchor?: string
  className?: string
}

const TwitterEmbed = ({ data, anchor, className }: TwitterEmbedProps) => {
  const { embedType, embedValue, designOptions, title, ingress } = data
  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''

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
    <BackgroundContainer {...designOptions} id={anchor} className={className} renderFragmentWhenPossible>
      {title && (
        <div className="mb-11">
          <Typography>{plainTitle}</Typography>
        </div>
      )}
      {ingress && (
        <div className="pt-0 px-0 pb-4">
          <IngressText value={ingress} />
        </div>
      )}

      <div className="cookieconsent-optin-marketing">
        <Embed />
      </div>
      <div className="cookieconsent-optout-marketing">
        <RequestConsentContainer cookiePolicy={['marketing']} />
      </div>
    </BackgroundContainer>
  )
}

export default TwitterEmbed
