'use client'
import useSWR from 'swr'
import * as xml2js from 'xml2js'
import type { DesignOptions } from '../../types/index'
import { twMerge } from 'tailwind-merge'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import { PortableTextBlock } from 'next-sanity'
import Blocks from '@/portableText/Blocks'

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

export type StockValuesProps = {
  title?: PortableTextBlock[]
  hideTitle?: boolean
  designOptions: DesignOptions
  id: string
  type: string
  anchor?: string
  className?: string
}
// @TODO: use correct datetime & formatting
const StockValues = ({ title, hideTitle, designOptions, anchor, className = '' }: StockValuesProps) => {
  const { data, error } = useSWR(ENDPOINT, fetchData, { refreshInterval: 60000 })
  if (error) {
    console.error('An error occured while fetching stock values: ', error)
    return null
  }

  if (!data) return null

  const { bg, dark } = getBgAndDarkFromBackground(designOptions)

  const getOSETemplate = (price: string, currency: string, change: string, title: string, date: Date) => {
    return (
      <div className="flex w-fit flex-col items-center justify-start py-4">
        <div className="flex items-baseline gap-1">
          <div className="text-md">EQNR</div>
          <div className="px-1.5 text-2xl text-norwegian-woods-100">{error || !data?.OSE ? '---' : price}</div>
          <div className="text-md">{error || !data ? '---' : currency}</div>
        </div>
        <h2 className="mt-3 text-sm">{error || !data ? 'Oslo Stock Exchange (OSE)' : title}</h2>
        {/*           {data && format(new Date(date), 'd LLLL yyyy hh:mm (z)')} */}
        {data && <FormattedDateTime datetime={date} showTimezone className="text-sm" />}
      </div>
    )
  }
  const getNYSETemplate = (price: string, currency: string, change: string, title: string, date: Date) => {
    return (
      <div className="flex w-fit flex-col items-center justify-start py-4">
        <div className="flex items-baseline gap-1">
          <div className="text-md">EQNR</div>
          <div className="px-2 text-2xl text-norwegian-woods-100">{error || !data?.NYSE ? '---' : price}</div>
          <div className="text-md">{error || !data ? '---' : currency}</div>
        </div>
        <h2 className="mt-3 text-sm">{error || !data ? 'New York Stock Exchange (NYSE)' : title}</h2>
        {/*           {isLoading || error || !data ? '' : format(new Date(date), 'd LLLL yyyy hh:mm (z)')} */}
        {data && <FormattedDateTime datetime={date} showTimezone className="text-sm" />}
      </div>
    )
  }

  return (
    <section
      className={twMerge(`flex flex-col px-layout-sm lg:px-layout-lg ${bg} ${dark ? 'dark' : ''}`, className)}
      id={anchor}
    >
      {title && <Blocks value={title} variant="h2" blockClassName={`${hideTitle ? 'sr-only' : ''}`} />}
      <div className="flex w-full max-w-text justify-between px-20">
        {getOSETemplate(data?.OSE?.Quote, data?.OSE?.currency, data?.OSE.PctChange, data?.OSE?.title, data?.OSE?.Date)}
        {getNYSETemplate(
          data?.NYSE?.Quote,
          data?.NYSE?.currency,
          data?.NYSE.PctChange,
          data?.NYSE?.title,
          data?.NYSE?.Date,
        )}
      </div>
    </section>
  )
}

export default StockValues
