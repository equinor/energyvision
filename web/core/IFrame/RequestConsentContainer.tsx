import { Typography } from '@core/Typography'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { defaultLanguage } from '../../languages'
import { CookieType } from '../../types'
import { Button } from '@core/Button'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cookiebot: any
  }
}

type RequestConsentContainerProps = {
  hasSectionTitle?: boolean
  cookiePolicy: CookieType[]
}

const handleCookiebotRenew = (locale?: string) => {
  if (window?.Cookiebot) {
    try {
      window.document
        .getElementById('Cookiebot')
        ?.setAttribute('data-culture', locale == 'no' ? 'nb' : locale || defaultLanguage.locale)
      window.Cookiebot?.renew()
    } catch (error) {
      console.error('An error occured while trying to run the Cookiebot script: ', error)
    }
  }
}

const RequestConsentContainer = ({ hasSectionTitle = true, cookiePolicy }: RequestConsentContainerProps) => {
  const router = useRouter()
  const intl = useIntl()
  const getCookieInformationText = (cookiePolicy: CookieType[]) => {
    if (cookiePolicy.length === 1) {
      return intl.formatMessage(
        { id: 'cookie_consent', defaultMessage: 'Cookie consent' },
        {
          typeOfCookies: intl.formatMessage({ id: `cookie_type_${cookiePolicy[0]}`, defaultMessage: 'statistic' }),
        },
      )
    }
    if (cookiePolicy.length === 2) {
      return intl.formatMessage(
        { id: 'cookie_consent_two', defaultMessage: 'Cookie consent' },
        {
          type1: intl.formatMessage({ id: `cookie_type_${cookiePolicy[0]}`, defaultMessage: 'statistic' }),
          type2: intl.formatMessage({ id: `cookie_type_${cookiePolicy[1]}`, defaultMessage: 'statistic' }),
        },
      )
    }
    return intl.formatMessage(
      { id: 'cookie_consent_many', defaultMessage: 'Cookie consent' },
      {
        type1: intl.formatMessage({ id: `cookie_type_${cookiePolicy[0]}`, defaultMessage: 'statistic' }),
        type2: intl.formatMessage({ id: `cookie_type_${cookiePolicy[1]}`, defaultMessage: 'statistic' }),
        type3: intl.formatMessage({ id: `cookie_type_${cookiePolicy[2]}`, defaultMessage: 'statistic' }),
      },
    )
  }
  return (
    <div className="flex flex-col rounded-md ">
      <div className="bg-slate-blue-95 dark px-6 py-4 rounded-t-md border border-slate-blue-95">
        <Typography variant="lg" as={hasSectionTitle ? 'h3' : 'h2'}>
          <FormattedMessage id="cookie_consent_header" defaultMessage="Accept Cookies" />
        </Typography>
      </div>
      <div className="flex flex-row items-start gap-6 px-6 py-4 border border-grey-40 rounded-b-md">
        <svg
          width="69"
          height="68"
          viewBox="0 0 69 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          className="w-full h-auto max-w-[69px]"
        >
          <path
            d="M59.6418 28.8779C59.0543 27.9655 57.0021 27.989 57.0021 27.989C55.1336 30.6031 50.6422 27.8263 50.6422 27.8263C47.3063 29.2316 45.2709 24.7532 45.2709 24.7532C40.7823 24.1212 41.4757 19.6822 41.4757 19.6822C39.2426 19.26 39.8692 15.4581 39.8692 15.4581C39.8692 15.4581 41.1083 14.5011 40.4985 13.8011C40.1108 13.356 40.0868 12.0786 40.1206 11.2066C37.2065 10.3721 34.177 9.94901 31.1311 9.95115C14.1076 9.95115 0.307373 22.9458 0.307373 38.9756C0.307373 55.0053 14.1076 68 31.1311 68C48.1545 68 61.9547 55.0053 61.9547 38.9756C61.9584 35.4931 61.295 32.0386 59.9963 28.7779C59.8381 28.9461 59.7154 28.9923 59.6418 28.8779Z"
            fill="#243746"
          />
          <path
            d="M47.864 19.9024C49.8096 19.9024 51.3867 18.4173 51.3867 16.5853C51.3867 14.7533 49.8096 13.2682 47.864 13.2682C45.9185 13.2682 44.3413 14.7533 44.3413 16.5853C44.3413 18.4173 45.9185 19.9024 47.864 19.9024Z"
            fill="#3F3D56"
          />
          <path
            d="M65.4774 23.2198C67.4229 23.2198 69.0001 21.7347 69.0001 19.9027C69.0001 18.0707 67.4229 16.5856 65.4774 16.5856C63.5318 16.5856 61.9547 18.0707 61.9547 19.9027C61.9547 21.7347 63.5318 23.2198 65.4774 23.2198Z"
            fill="#3F3D56"
          />
          <path
            d="M51.3871 6.63415C53.3326 6.63415 54.9098 5.14905 54.9098 3.31707C54.9098 1.4851 53.3326 0 51.3871 0C49.4415 0 47.8644 1.4851 47.8644 3.31707C47.8644 5.14905 49.4415 6.63415 51.3871 6.63415Z"
            fill="#3F3D56"
          />
          <path
            opacity="0.1"
            d="M21.444 19.9023L15.7534 27.3653L9.1145 32.341V35.658L12.908 39.8046V44.7803L10.0627 49.756"
            fill="black"
          />
          <path
            opacity="0.1"
            d="M44.7332 28.1951V32.1968L42.2868 38.6993L40.819 42.2006L43.2655 46.7024L44.2441 49.7036L48.158 51.2042L49.6258 53.7053V59.7074"
            fill="black"
          />
          <path
            opacity="0.1"
            d="M27.4054 41.4633L26.5924 44.5435L27.4054 46.439V49.756L24.9666 55.9163L27.4054 57.5748L30.2506 59.7073"
            fill="black"
          />
        </svg>

        <div className="flex flex-col gap-6">
          <Typography variant="body">{getCookieInformationText(cookiePolicy)}</Typography>
          <Button onClick={() => handleCookiebotRenew(router?.locale)} variant="outlined" className="text-left">
            <FormattedMessage id="cookie_settings" defaultMessage="Cookie settings" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RequestConsentContainer
