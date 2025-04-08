import { TwitterEmbedData } from '../../types/index'
import RequestConsentContainer from '../../pageComponents/shared/iframe/RequestConsentContainer'
import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed'
import { BackgroundContainer } from '@core/Backgrounds'
import IngressText from '../../pageComponents/shared/portableText/IngressText'
import TitleText from '../../pageComponents/shared/portableText/TitleText'
import { twMerge } from 'tailwind-merge'

type TwitterEmbedProps = {
  data: TwitterEmbedData
  anchor?: string
  className?: string
}

const TwitterEmbed = ({ data, anchor, className }: TwitterEmbedProps) => {
  const { embedType, embedValue, designOptions, title, ingress } = data

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
      <BackgroundContainer {...designOptions} id={anchor} renderFragmentWhenPossible>
        <div className={twMerge(`pb-page-content px-layout-lg max-w-viewport mx-auto`, className)}>
          {title && (
            <div className="mb-11">
              <TitleText value={title} />
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
        </div>
      </BackgroundContainer>
    </>
  )
}

export default TwitterEmbed
