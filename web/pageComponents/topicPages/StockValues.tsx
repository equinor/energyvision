/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from 'swr'
import * as xml2js from 'xml2js'
import styled from 'styled-components'
import { BackgroundContainer, FormattedDate } from '@components'
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
      title: 'OSLO STOCK EXCHANGE (OSE)',
      currency: 'NOK',
    }
    const NYSE = {
      ...stockData.filter((i: any) => i.RicCode === 'EQNR.NYSE')[0],
      title: 'NEW YORK STOCK EXCHANGE (NYSE)',
      currency: 'USD',
    }

    return { OSE, NYSE }
  } catch (error) {
    throw new Error('An error occurred while parsing StockValues data.')
  }
}

const Container = styled.div`
  padding: var(--iframe-innerPadding, var(--space-3xLarge) var(--layout-paddingHorizontal-large));
  max-width: var(--iframe-maxWidth, var(--maxViewportWidth));
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

const ENDPOINT = `https://tools.eurolandir.com/tools/pricefeed/xmlirmultiiso5.aspx?companyid=9053`

// @TODO: use correct datetime & formatting
const StockValues = ({ data: { designOptions }, ...rest }: { data: StockValuesData }) => {
  const { data, error } = useSWR(ENDPOINT, fetchData, { refreshInterval: 60000 })

  if (error) {
    console.error(error)
    return null
  }

  if (!data) return null

  const { background } = designOptions

  return (
    <BackgroundContainer background={background} {...rest}>
      <Container>
        <Item>
          <p>
            EQNR
            <Price>{data.OSE?.Quote}</Price>
            {data.OSE?.currency}
          </p>
          <Subtitle>{data.OSE?.title}</Subtitle>
          <Subtitle>
            <FormattedDate datetime={data.OSE?.Date} />
          </Subtitle>
        </Item>
        <Item>
          <p>
            EQNR
            <Price>{data.NYSE?.Quote}</Price>
            {data.NYSE?.currency}
          </p>
          <Subtitle>{data.NYSE?.title}</Subtitle>
          <Subtitle>
            <FormattedDate datetime={data.NYSE?.Date} />
          </Subtitle>
        </Item>
      </Container>
    </BackgroundContainer>
  )
}

export default StockValues
