/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from 'swr'
import * as xml2js from 'xml2js'
import styled from 'styled-components'
import { BackgroundContainer, FormattedDate } from '@components'
import { FormattedMessage } from 'react-intl'
import type { StockValuesData } from '../../types/types'

const fetchData = async (url: string) => {
  const response = await fetch(url)

  if (!response.ok) {
    const error = new Error('An error occurred while fetching StockValues data.')
    throw error
  }

  try {
    const textResponse = await response.text()
    const parser = new xml2js.Parser({ explicitArray: false })
    const parsed = await parser.parseStringPromise(textResponse)

    const stockData = parsed.EuroInvestorQuotes.data

    const OSE = {
      ...stockData.filter((i: any) => i.RicCode === 'EQNR.OSL')[0],
      title: 'Oslo Stock Exchange (OSE)',
      currency: 'NOK',
    }
    const NYSE = {
      ...stockData.filter((i: any) => i.RicCode === 'EQNR.NYSE')[0],
      title: 'New York Stock Exchange (NYSE)',
      currency: 'USD',
    }

    return { OSE, NYSE }
  } catch (error) {
    throw new Error('An error occurred while parsing StockValues data.')
  }
}

const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--space-large);

  @media (min-width: 750px) {
    grid-template-columns: 1fr 1fr;
  }
`

const Item = styled.div`
  text-align: center;
`

const Price = styled.span`
  font-size: var(--typeScale-4);
  font-weight: var(--fontWeight-medium);
  color: var(--moss-green-100);
  margin: 0 var(--space-xSmall);
`

const Subtitle = styled.p`
  font-weight: var(--fontWeight-bolder);
  margin: 0 0 var(--space-xSmall);
  padding: 0;
`

const MarketTitle = styled(Subtitle)`
  text-transform: uppercase;
`

const TimeDelay = styled.span`
  font-style: italic;
  font-weight: var(--fontWeight-medium);
`

const ENDPOINT = `https://tools.eurolandir.com/tools/pricefeed/xmlirmultiiso5.aspx?companyid=9053`

// @TODO: use correct datetime & formatting
const StockValues = ({ data: { designOptions }, anchor, ...rest }: { data: StockValuesData; anchor?: string }) => {
  const { data, error } = useSWR(ENDPOINT, fetchData, { refreshInterval: 60000 })

  if (error) {
    console.error('An error occured while fetching stock values: ', error)
    return null
  }

  if (!data) return null

  const { background } = designOptions

  return (
    <BackgroundContainer background={{ backgroundColor: background }} {...rest} id={anchor}>
      <Container>
        <Item>
          <p>
            EQNR
            <Price>{data.OSE?.Quote}</Price>
            {data.OSE?.currency}
          </p>
          <MarketTitle>{data.OSE?.title}</MarketTitle>
          <Subtitle>
            <FormattedDate datetime={data.OSE?.Date} /> CET
          </Subtitle>
        </Item>
        <Item>
          <p>
            EQNR
            <Price>{data.NYSE?.Quote}</Price>
            {data.NYSE?.currency}
          </p>
          <MarketTitle>{data.NYSE?.title}</MarketTitle>
          <Subtitle>
            <FormattedDate datetime={data.NYSE?.Date} /> CET{' '}
            <TimeDelay>
              <FormattedMessage id="stock_nyse_time_delay_message" defaultMessage="at least 20 minutes delayed" />
            </TimeDelay>
          </Subtitle>
        </Item>
      </Container>
    </BackgroundContainer>
  )
}

export default StockValues
