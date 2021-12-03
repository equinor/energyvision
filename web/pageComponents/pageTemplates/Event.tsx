import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import getConfig from 'next/config'
import styled from 'styled-components'
import IFrame from '../../pageComponents/shared/IFrame'
import RelatedContent from '../../pageComponents/shared/RelatedContent'
import Lead from '../../pageComponents/shared/Lead'

import ContactList from '../../pageComponents/shared/ContactList'
import { TitleBlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { blocksToText } from '../../common/helpers'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import Promotion from '../../pageComponents/topicPages/Promotion'
import AddToCalendar from '../../pageComponents/topicPages/AddToCalendar'

import type { EventDateType, EventSchema } from '../../types/types'
import { zonedTimeToUtc } from 'date-fns-tz'
import { Heading } from '@components'

const { publicRuntimeConfig } = getConfig()

const EventLayout = styled.article`
  --banner-paddingHorizontal: clamp(16px, calc(-69.1942px + 22.7184vw), 367px);
  --banner-paddingVertical: clamp(40px, calc(14.3125px + 11.0032vw), 210px);
`

const Header = styled.div`
  background: var(--moss-green-50);
  padding: var(--banner-paddingVertical) var(--layout-paddingHorizontal-medium);
`

const HeaderInner = styled.div`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;

  & > h2 {
    color: var(--moss-green-100);
  }
`

const ContentWrapper = styled.div`
  margin: var(--space-3xLarge) 0;
`

const LeadParagraph = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: 0 auto var(--space-3xLarge) 0;

  & > p {
    margin-bottom: 0;
  }
`

const Content = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;

  > div > aside:last-child,
  > div > div:last-child {
    margin-bottom: 0;
    p:last-child {
      margin-bottom: 0;
    }
  }
`

const Related = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: 1700px;
  margin: var(--space-4xLarge) auto;
`

const getFormattedDate = ({
  date: dateString,
  startTime: startTimeString,
  endTime: endTimeString,
  timezone,
}: EventDateType) => {
  const getDateFields = (date: Date) => ({
    day: date.getDate(),
    month: date.toLocaleString('default', { month: 'short' }),
    year: date.getFullYear().toString(),
    zone: date.toLocaleTimeString('es-NO', { timeZoneName: 'short' }).split(' ')[1],
  })

  if (startTimeString && endTimeString) {
    const [hours, minutes] = startTimeString.split(':')
    const startDate = zonedTimeToUtc(new Date(dateString).setHours(Number(hours), Number(minutes)), timezone)
    const { day, month, year, zone } = getDateFields(startDate)
    const dateResult = `${day} ${month} ${year}`
    const timeResult = `${startTimeString.replace(':', '.')} - ${endTimeString.replace(':', '.')} ${zone}`

    return { date: dateResult, time: timeResult }
  } else {
    const { day, month, year } = getDateFields(new Date(dateString))
    const dateResult = `${day} ${month} ${year}`

    return { date: dateResult, time: null }
  }
}

export default function Event({ data }: { data: EventSchema }): JSX.Element {
  const { title, slug } = data
  const { location, ingress, content, iframe, promotedPeople, relatedLinks, eventDate } = data.content
  const { documentTitle, metaDescription, openGraphImage } = data.seoAndSome

  const plainTitle = title ? blocksToText(title) : ''

  const { pathname } = useRouter()
  const { date, time } = getFormattedDate(eventDate)

  const fullUrlDyn = pathname.indexOf('http') === -1 ? `${publicRuntimeConfig.domain}${pathname}` : pathname
  const fullUrl = fullUrlDyn.replace('[slug]', slug)
  return (
    <>
      <NextSeo
        title={documentTitle || plainTitle}
        description={metaDescription}
        openGraph={{
          title: plainTitle,
          description: metaDescription,
          type: 'website',
          url: fullUrl,
          images: openGraphImage?.asset && getOpenGraphImages(openGraphImage),
        }}
      ></NextSeo>

      <main>
        <EventLayout>
          <Header>
            <HeaderInner>
              {title && (
                <SimpleBlockContent
                  blocks={title}
                  serializers={{
                    types: {
                      block: (props) => <TitleBlockRenderer level="h1" size="2xl" {...props} />,
                    },
                  }}
                />
              )}
              <Heading level="h2" size="xl">
                {date}
              </Heading>
              {time && <p>{time}</p>}
              {location && <p>{location}</p>}
              {eventDate?.date && <AddToCalendar event={data} />}
            </HeaderInner>
          </Header>
          <ContentWrapper>
            {ingress && (
              <LeadParagraph>
                <Lead blocks={ingress}></Lead>
              </LeadParagraph>
            )}
            {content && (
              <Content>
                <SimpleBlockContent blocks={content}></SimpleBlockContent>
              </Content>
            )}
          </ContentWrapper>

          {iframe && <IFrame data={iframe} />}

          {promotedPeople?.people && promotedPeople?.people.length > 0 && (
            <Promotion
              data={{
                id: 'promotedPeople',
                type: 'people',
                title: promotedPeople.title,
                content: { promotions: promotedPeople.people },
              }}
            />
          )}
          <ContactList />
          {relatedLinks?.links && relatedLinks.links.length > 0 && (
            <Related>
              <RelatedContent data={relatedLinks} />
            </Related>
          )}
        </EventLayout>
      </main>
    </>
  )
}
