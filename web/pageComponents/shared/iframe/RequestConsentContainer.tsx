import styled from 'styled-components'
import { Text, Button, Heading } from '@components'
import { FormattedMessage, useIntl } from 'react-intl'

declare global {
  interface Window {
    Cookiebot: any
  }
}

const StyledDiv = styled.section`
  --border-radius: 10px;
  display: grid;
  grid-template-rows: min-content var(--space-large) min-content var(--space-large);
  grid-template-columns: min-content 1fr;
  grid-template-areas:
    '. heading'
    '. .'
    'icon text'
    '. .';
  border-radius: var(--border-radius);
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  background-color: var(--white-100);

  &:before {
    content: '';
    background-color: var(--slate-blue-95);
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    grid-column: 1 / 3;
    grid-row: 1;
  }
`

const CookieHeader = styled.div`
  grid-area: heading;
  padding: var(--space-medium) var(--space-large);
  padding-left: var(--icon-column-width);
  word-break: break-word;
  hyphens: auto;
`
const Icon = styled.div`
  grid-area: icon;
  padding: 0 var(--space-medium);
  /* Firefox has a bug related to grids, svg and the width of a div */
  width: max-content;
`

const SVG = styled.svg`
  height: 45px;
  width: 45px;
  @media (min-width: 650px) {
    height: auto;
    width: auto;
  }
`

const Content = styled.div`
  grid-area: text;
  padding-right: var(--space-medium);
  word-break: break-word;
  hyphens: auto;
`

const LeftAlignedButton = styled(Button)`
  text-align: left;
`

const StyledText = styled(Text)`
  /*  We don't want this text to be white even when the background container is
  dark because the text is still on white background. It's an override, so a good use
  case for important */
  .inverted-background & {
    color: var(--default-text) !important;
  }
`

type RequestConsentContainerProps = {
  hasSectionTitle?: boolean
  cookiePolicy: string
}

const RequestConsentContainer = ({ hasSectionTitle = true, cookiePolicy }: RequestConsentContainerProps) => {
  const intl = useIntl()
  const typeOfCookie =
    cookiePolicy === 'statistics'
      ? intl.formatMessage({ id: 'cookie_type_statistics', defaultMessage: 'statistic' })
      : intl.formatMessage({ id: 'cookie_type_marketing', defaultMessage: 'marketing' })
  return (
    <StyledDiv>
      <CookieHeader>
        <Heading inverted size="lg" level={hasSectionTitle ? 'h3' : 'h2'}>
          <FormattedMessage id="cookie_consent_header" defaultMessage="Accept Cookies" />
        </Heading>
      </CookieHeader>
      <Icon>
        <SVG
          width="69"
          height="68"
          viewBox="0 0 69 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
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
        </SVG>
      </Icon>
      <Content>
        <StyledText>
          <FormattedMessage
            id="cookie_consent"
            defaultMessage="Cookie settings"
            values={{
              typeOfCookies: typeOfCookie,
            }}
          />
        </StyledText>

        <LeftAlignedButton
          onClick={() => {
            window.Cookiebot.renew()
          }}
          color="secondary"
          variant="outlined"
        >
          <FormattedMessage id="cookie_settings" defaultMessage="Cookie settings" />
        </LeftAlignedButton>
      </Content>
    </StyledDiv>
  )
}

export default RequestConsentContainer
