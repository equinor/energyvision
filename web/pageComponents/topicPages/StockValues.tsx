/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import useSWR from 'swr'
import * as xml2js from 'xml2js'
import { BackgroundContainer } from '@core/Backgrounds'
import { FormattedDate } from '@core/FormattedDateTime'
import type { StockValuesData } from '../../types/index'
import { twMerge } from 'tailwind-merge'
import { useTranslations } from 'next-intl'

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

const ENDPOINT = `https://tools.eurolandir.com/tools/pricefeed/xmlirmultiiso5.aspx?companyid=9053`

// @TODO: use correct datetime & formatting
const StockValues = ({
  data: { designOptions },
  anchor,
  className,
  ...rest
}: {
  data: StockValuesData
  anchor?: string
  className?: string
}) => {
  const { data, error } = useSWR(ENDPOINT, fetchData, { refreshInterval: 60000 })
  const t = useTranslations()
  if (error) {
    console.error('An error occured while fetching stock values: ', error)
    return null
  }

  if (!data) return null

  const { background } = designOptions

  return (
    <BackgroundContainer
      className={twMerge(`grid grid-cols-[1fr] gap-8 sm:grid-cols-[1fr,1fr]`, className)}
      background={background}
      {...rest}
      id={anchor}
    >
      <div className="text-center">
        <p>
          EQNR
          <span className="text-xl my-0 mx-1 text-moss-green-100 font-medium">{data.OSE?.Quote}</span>
          {data.OSE?.currency}
        </p>
        <p className="font-semibold uppercase mb-1 mx-0 mt-0 p-0">{data.OSE?.title}</p>
        <p className="font-semibold mb-1 mx-0 mt-0 p-0">
          <FormattedDate datetime={data.OSE?.Date} /> CET
        </p>
      </div>
      <div className="text-center">
        <p>
          EQNR
          <span className="text-xl my-0 mx-1 text-moss-green-100 font-medium">{data.NYSE?.Quote}</span>
          {data.NYSE?.currency}
        </p>
        <p className="font-semibold uppercase mb-1 mx-0 mt-0 p-0">{data.NYSE?.title}</p>
        <p className="font-semibold mb-1 mx-0 mt-0 p-0">
          <FormattedDate datetime={data.NYSE?.Date} /> CET{' '}
          <span className="font-medium italic">{t('stock_nyse_time_delay_message')}</span>
        </p>
      </div>
    </BackgroundContainer>
  )
}

export default StockValues
