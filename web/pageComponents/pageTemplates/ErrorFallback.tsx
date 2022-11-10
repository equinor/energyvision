import { Button, Text, Heading, Link } from '@components'
import styled from 'styled-components'
import { GlobalStyle, GlobalFontStyle } from '../../styles/globalStyles'
import type { FallbackProps } from 'react-error-boundary'

const Wrapper = styled.section`
  padding: clamp(40px, calc(14.3125px + 11.0032vw), 210px) clamp(16px, calc(-69.1942px + 22.7184vw), 367px);
`

const ContentWrapper = styled.div`
  margin: var(--space-xLarge) 0;
`

const StyledButton = styled(Button)`
  margin-bottom: var(--space-large);
`

const StyledDetails = styled.details`
  margin: var(--space-xLarge) 0;
`

const StyledSummary = styled.summary`
  font-size: var(--typeScale-2);
  margin-bottom: var(--space-medium);
`

const StyledCode = styled.code`
  padding: var(--space-small);
  background: var(--grey-20);
  display: block;
  border-radius: 10px;
  margin: var(--space-medium) 0;
`

const StyledPre = styled.pre`
  padding: var(--space-small);
  overflow-x: auto;
  line-height: 1.5em;
`

const sliceErrorStack = (stackTrace = '', numLines = 10) => {
  const lines = stackTrace.split('\n')
  const firstNLines = lines.slice(0, numLines)
  const joinedLines = firstNLines.join('\n')
  return joinedLines
}

const getMailLink = (): string => {
  const subject = 'Problem: unable to load website'

  if (typeof window === 'undefined') {
    return `mailto:noreply@equinor.com?subject=${encodeURIComponent(subject)}`
  }

  const body = `An error occured while viewing: ${window.location.href}`

  return `mailto:noreply@equinor.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Wrapper>
      <GlobalStyle />
      <GlobalFontStyle />
      <Heading level="h1" size="xl">
        An Error Occurred
      </Heading>

      <ContentWrapper>
        <Text>
          The application detected an error that prevented it from loading. This error has been automatically reported
          to the development team. You can try clicking the <strong>Reload the Page</strong> button below to return to
          the page you were on previously.
        </Text>

        <StyledButton onClick={resetErrorBoundary}>Reload the Page</StyledButton>

        <Text>
          If the error keeps occurring, please contact us at{' '}
          <Link type="externalUrl" href={getMailLink()}>
            noreply@equinor.com
          </Link>{' '}
          with the URL of the page you are trying to view and the details below:
        </Text>
      </ContentWrapper>

      <ContentWrapper>
        <Heading level="h2" size="lg">
          Error Details
        </Heading>
        <StyledCode>
          <pre>{error.message}</pre>
        </StyledCode>
        <StyledDetails>
          <StyledSummary>Expand to Show Error Stack Traces</StyledSummary>
          <Heading level="h3">Stack Trace</Heading>
          <StyledCode>
            <StyledPre>{sliceErrorStack(error.stack)}</StyledPre>
          </StyledCode>
        </StyledDetails>
      </ContentWrapper>
    </Wrapper>
  )
}
