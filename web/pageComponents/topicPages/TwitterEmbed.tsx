/* 'use client'
import { PortableTextBlock, TwitterEmbedData } from '../../types/index'
import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed'
import { Typography } from '@/core/Typography'
import { toPlainText } from '@portabletext/react'
import RequestConsentContainer from '@/core/IFrame/RequestConsentContainer'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { twMerge } from 'tailwind-merge'

type TwitterEmbedProps = {
  data: TwitterEmbedData
  anchor?: string
  className?: string
}

const TwitterEmbed = ({ data, anchor, className }: TwitterEmbedProps) => {
  const { embedType, embedValue, designOptions, title, ingress } = data
  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)

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
    <section id={anchor} className={twMerge(`${bg} ${dark ? 'dark' : ''}`, className)}>
      {title && (
        <div className="mb-11">
          <Typography as="h2" variant="h3">
            {plainTitle}
          </Typography>
        </div>
      )}
      {ingress && <Blocks variant="ingress" value={ingress} className="px-0 pt-0 pb-4" />}

      <div className="cookieconsent-optin-marketing">
        <Embed />
      </div>
      <div className="cookieconsent-optout-marketing">
        <RequestConsentContainer cookiePolicy={['marketing']} />
      </div>
    </section>
  )
}

export default TwitterEmbed
 */
